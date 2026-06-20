/**
 * app.js — CCPC 묘지 관리 시스템 프론트엔드 로직
 *
 * 데이터 소스:
 *  1) 기본값: GAS_WEB_APP_URL이 설정되면 Google Sheets(Apps Script API)에서 로드
 *  2) 설정 전이거나 실패 시: seed-data.json (PDF에서 추출한 초기 데이터)을 로드해 오프라인으로도 동작
 *
 * GAS_WEB_APP_URL은 SETUP.md 안내에 따라 배포 후 이 값을 본인의 Web App URL로 바꿔주세요.
 */

// ⚠️ 배포 후 이 줄을 본인의 Apps Script 웹앱 URL로 교체하세요. (SETUP.md 참고)
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbx_rg95yqYiOW648SCmNgMoGXy1l6ErtkDqTwtnbaH0wTBNaM_j4ynHiaLY_CX90x8BlQ/exec';

const STATUS_LABELS = { A: 'Available', R: 'Reserved', C: 'To Be Confirmed', U: 'Used', X: '특이사항' };

let STATE = {
  lots: [],          // 전체 슬롯 데이터 (배열)
  bySection: '16',    // 현재 선택된 section ('15'|'16'|'all')
  view: 'map',        // 'map'|'table'|'stats'
  search: '',
  isAdmin: false,
  sortKey: null,
  sortDir: 1,
  settings: { default_lot_price: { value: '3000' }, default_funeral_cost: { value: '1500' } },
};

// ------------------------------------------------------------------
// JSONP 헬퍼 (GAS와 통신; CORS 우회용으로 기존 시스템과 동일한 패턴)
// ------------------------------------------------------------------
let jsonpCounter = 0;
function jsonpRequest(url, params) {
  return new Promise((resolve, reject) => {
    const cbName = 'jsonp_cb_' + (jsonpCounter++);
    const script = document.createElement('script');
    const qs = new URLSearchParams({ ...params, callback: cbName }).toString();
    window[cbName] = (data) => {
      resolve(data);
      delete window[cbName];
      script.remove();
    };
    script.onerror = () => {
      reject(new Error('JSONP request failed: ' + url));
      delete window[cbName];
      script.remove();
    };
    script.src = url + '?' + qs;
    document.body.appendChild(script);
    setTimeout(() => {
      if (window[cbName]) {
        reject(new Error('JSONP timeout'));
        delete window[cbName];
        script.remove();
      }
    }, 15000);
  });
}

async function gasCall(action, params = {}) {
  if (!GAS_WEB_APP_URL) throw new Error('GAS_WEB_APP_URL not configured');
  return jsonpRequest(GAS_WEB_APP_URL, { action, ...params });
}

// ------------------------------------------------------------------
// 데이터 로드
// ------------------------------------------------------------------
async function loadData() {
  showMapLoading();
  if (GAS_WEB_APP_URL) {
    try {
      const res = await gasCall('getall');
      if (res.ok) {
        STATE.lots = res.lots.map(normalizeLot);
        await loadSettingsRemote();
        setLastSync('Google Sheets 연결됨');
        render();
        return;
      }
    } catch (err) {
      console.warn('GAS load failed, falling back to seed data:', err);
    }
  }
  // fallback: seed json
  try {
    const res = await fetch('seed-data.json');
    const data = await res.json();
    STATE.lots = data.map(normalizeLot);
    setLastSync(GAS_WEB_APP_URL ? 'Sheets 연결 실패 — 초기 데이터로 표시 중' : '오프라인 초기 데이터 (Sheets 미연동)');
  } catch (err) {
    setLastSync('데이터 로드 실패');
    console.error(err);
  }
  render();
}

function normalizeLot(l) {
  return {
    id: l.id || `${l.section}-${l.lot}-${l.slot_no}`,
    section: String(l.section),
    lot: String(l.lot),
    slot_no: String(l.slot_no),
    status: l.status || 'A',
    name: l.name || '',
    name_kr: l.name_kr || '',
    contact: l.contact || '',
    burial_date: l.burial_date || '',
    lot_price: l.lot_price || '',
    funeral_cost: l.funeral_cost || '',
    paid_amount: l.paid_amount || '',
    payment_status: l.payment_status || '',
    notes: l.notes || '',
    updated_at: l.updated_at || '',
    updated_by: l.updated_by || '',
  };
}

async function loadSettingsRemote() {
  try {
    const res = await gasCall('getsettings');
    if (res.ok) STATE.settings = res.settings;
  } catch (e) { /* keep defaults */ }
}

function setLastSync(msg) {
  document.getElementById('lastSync').textContent = '  ·  ' + msg + '  ·  ' + new Date().toLocaleTimeString('ko-KR');
}

function showMapLoading() {
  document.getElementById('mapContainer').innerHTML = '<div class="loading-spinner"></div> 데이터 불러오는 중...';
}

// ------------------------------------------------------------------
// Toast
// ------------------------------------------------------------------
let toastTimer;
function showToast(msg, isError) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (isError ? ' error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = 'toast'; }, 2600);
}

// ------------------------------------------------------------------
// 필터링
// ------------------------------------------------------------------
function getFilteredLots() {
  let lots = STATE.lots;
  if (STATE.bySection !== 'all') {
    lots = lots.filter(l => l.section === STATE.bySection);
  }
  if (STATE.search.trim()) {
    const q = STATE.search.trim().toLowerCase();
    lots = lots.filter(l =>
      l.lot.toLowerCase().includes(q) ||
      l.slot_no.toLowerCase().includes(q) ||
      (l.name || '').toLowerCase().includes(q) ||
      (l.name_kr || '').toLowerCase().includes(q) ||
      l.id.toLowerCase().includes(q)
    );
  }
  return lots;
}

function findLot(section, lot, slot_no) {
  return STATE.lots.find(l => l.section === section && l.lot === lot && l.slot_no === slot_no);
}

// ------------------------------------------------------------------
// 렌더링 디스패치
// ------------------------------------------------------------------
function render() {
  document.getElementById('viewMap').style.display = STATE.view === 'map' ? '' : 'none';
  document.getElementById('viewTable').style.display = STATE.view === 'table' ? '' : 'none';
  document.getElementById('viewStats').style.display = STATE.view === 'stats' ? '' : 'none';

  if (STATE.view === 'map') renderMap();
  else if (STATE.view === 'table') renderTable();
  else if (STATE.view === 'stats') renderStats();
}

// ===================================================================
// 지도뷰 (Map View)
// ===================================================================
function renderMap() {
  const container = document.getElementById('mapContainer');

  if (STATE.bySection === 'all') {
    container.innerHTML = '';
    ['16', '15'].forEach(sec => {
      const wrap = document.createElement('div');
      wrap.style.marginBottom = '32px';
      wrap.innerHTML = `<div class="map-direction-label">${SECTION_LAYOUTS[sec].label}</div>`;
      wrap.appendChild(buildSectionGrid(sec));
      container.appendChild(wrap);
    });
    return;
  }

  const sec = STATE.bySection;
  container.innerHTML = '';
  const dirLabel = document.createElement('div');
  dirLabel.className = 'map-direction-label';
  dirLabel.textContent = SECTION_LAYOUTS[sec].label + (STATE.search ? ` · "${STATE.search}" 검색결과 강조` : '');
  container.appendChild(dirLabel);
  container.appendChild(buildSectionGrid(sec));
}

function buildSectionGrid(sec) {
  const layout = SECTION_LAYOUTS[sec];
  const grid = document.createElement('div');
  grid.className = 'lot-grid';
  grid.style.gridTemplateColumns = `repeat(${layout.gridCols}, minmax(54px, 1fr))`;
  grid.style.gridTemplateRows = `repeat(${layout.gridRows}, auto)`;

  const searchQ = STATE.search.trim().toLowerCase();

  layout.lots.forEach(lotDef => {
    const block = document.createElement('div');
    block.className = 'lot-block';
    block.style.gridColumn = `${lotDef.col} / span ${lotDef.colSpan}`;
    block.style.gridRow = `${lotDef.row} / span ${lotDef.rowSpan}`;

    const labelEl = document.createElement('div');
    labelEl.className = 'lot-block-label';
    labelEl.textContent = lotDef.lot;
    block.appendChild(labelEl);

    const slotsWrap = document.createElement('div');
    slotsWrap.className = 'lot-slots';
    const nRows = Math.ceil(lotDef.slots.length / lotDef.cols) || 1;
    slotsWrap.style.gridTemplateColumns = `repeat(${lotDef.cols}, 1fr)`;
    slotsWrap.style.gridTemplateRows = `repeat(${nRows}, 1fr)`;

    if (lotDef.slots.length === 0) {
      const cell = document.createElement('div');
      cell.className = 'slot-cell empty';
      slotsWrap.appendChild(cell);
    } else {
      lotDef.slots.forEach(slotNo => {
        const lotData = findLot(sec, lotDef.lot, slotNo);
        const cell = document.createElement('div');
        const status = lotData ? lotData.status : 'A';
        cell.className = `slot-cell status-${status}`;
        const isMatch = searchQ && lotData && (
          lotDef.lot.toLowerCase().includes(searchQ) ||
          slotNo.toLowerCase().includes(searchQ) ||
          (lotData.name || '').toLowerCase().includes(searchQ)
        );
        if (isMatch) cell.classList.add('highlight');

        cell.title = lotData && lotData.name ? `${lotDef.lot}-${slotNo}: ${lotData.name}` : `${lotDef.lot}-${slotNo}`;
        cell.innerHTML = `
          <div class="slot-no">${slotNo.replace(/[ab]$/,'')}</div>
          ${lotData && lotData.name ? `<div class="slot-name">${escapeHtml(truncate(lotData.name, 10))}</div>` : ''}
        `;
        cell.addEventListener('click', () => openSlotModal(sec, lotDef.lot, slotNo));
        slotsWrap.appendChild(cell);
      });
    }
    block.appendChild(slotsWrap);
    grid.appendChild(block);
  });

  return grid;
}

function truncate(s, n) { return s.length > n ? s.slice(0, n - 1) + '…' : s; }
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

// ===================================================================
// 표뷰 (Table View)
// ===================================================================
function renderTable() {
  let lots = getFilteredLots();

  if (STATE.sortKey) {
    lots = [...lots].sort((a, b) => {
      const av = (a[STATE.sortKey] || '').toString();
      const bv = (b[STATE.sortKey] || '').toString();
      const an = parseFloat(av), bn = parseFloat(bv);
      let cmp;
      if (!isNaN(an) && !isNaN(bn) && /^-?\d+\.?\d*$/.test(av) && /^-?\d+\.?\d*$/.test(bv)) {
        cmp = an - bn;
      } else {
        cmp = av.localeCompare(bv, 'ko');
      }
      return cmp * STATE.sortDir;
    });
  } else {
    lots = [...lots].sort((a, b) => a.section.localeCompare(b.section) || a.lot.localeCompare(b.lot, undefined, {numeric:true}) || a.slot_no.localeCompare(b.slot_no, undefined, {numeric:true}));
  }

  const tbody = document.getElementById('tableBody');
  if (lots.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><div class="big">🔍</div>검색 결과가 없습니다.</div></td></tr>`;
    return;
  }

  tbody.innerHTML = lots.map(l => `
    <tr>
      <td class="mono">${l.section}</td>
      <td class="mono">${l.lot}</td>
      <td class="mono">${l.slot_no}</td>
      <td><span class="status-badge ${l.status}">${STATUS_LABELS[l.status] || l.status}</span></td>
      <td>${escapeHtml(l.name) || '<span class="muted">—</span>'}</td>
      <td>${l.lot_price ? '$' + Number(l.lot_price).toLocaleString() : '<span class="muted">—</span>'}</td>
      <td>${l.funeral_cost ? '$' + Number(l.funeral_cost).toLocaleString() : '<span class="muted">—</span>'}</td>
      <td>${l.payment_status ? escapeHtml(l.payment_status) : '<span class="muted">—</span>'}</td>
      <td class="row-actions">
        <button class="btn btn-sm" data-act="view" data-id="${l.id}">보기</button>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('button[data-act="view"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lot = STATE.lots.find(l => l.id === btn.dataset.id);
      if (lot) openSlotModal(lot.section, lot.lot, lot.slot_no);
    });
  });
}

// ===================================================================
// 통계뷰 (Stats View)
// ===================================================================
function renderStats() {
  const lots = getFilteredLots();
  const bySection = {};
  const byStatus = {};
  lots.forEach(l => {
    bySection[l.section] = (bySection[l.section] || 0) + 1;
    byStatus[l.status] = (byStatus[l.status] || 0) + 1;
  });

  const statClass = { A: 'sage', R: 'gold', C: 'clay', U: '', X: '' };
  const statsBar = document.getElementById('statsBar');
  statsBar.innerHTML = `
    <div class="stat"><div class="num">${lots.length}</div><div class="lbl">전체 슬롯</div></div>
    ${Object.keys(byStatus).sort().map(st => `
      <div class="stat ${statClass[st] || ''}">
        <div class="num">${byStatus[st]}</div>
        <div class="lbl">${STATUS_LABELS[st] || st}</div>
      </div>
    `).join('')}
  `;

  const totalLotPrice = lots.reduce((sum, l) => sum + (parseFloat(l.lot_price) || 0), 0);
  const totalFuneralCost = lots.reduce((sum, l) => sum + (parseFloat(l.funeral_cost) || 0), 0);
  const totalPaid = lots.reduce((sum, l) => sum + (parseFloat(l.paid_amount) || 0), 0);

  document.getElementById('statsDetail').innerHTML = `
    <h3 style="margin-top:0;font-family:var(--font-display);">매출 / 비용 요약</h3>
    <div class="detail-row"><span class="k">묘지 가격 합계</span><span class="v">$${totalLotPrice.toLocaleString()}</span></div>
    <div class="detail-row"><span class="k">장례 비용 합계</span><span class="v">$${totalFuneralCost.toLocaleString()}</span></div>
    <div class="detail-row"><span class="k">납부 합계</span><span class="v">$${totalPaid.toLocaleString()}</span></div>
    <div class="detail-row"><span class="k">미수금 (추정)</span><span class="v">$${Math.max(0, totalLotPrice + totalFuneralCost - totalPaid).toLocaleString()}</span></div>
    <h3 style="font-family:var(--font-display);">Section별 분포</h3>
    ${Object.keys(bySection).sort().map(s => `<div class="detail-row"><span class="k">Section ${s}</span><span class="v">${bySection[s]}개 슬롯</span></div>`).join('')}
  `;
}

// ===================================================================
// 모달: 상세보기 / 수정 / 신규등록
// ===================================================================
function openModal(title, bodyHtml, footerHtml) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = bodyHtml;
  document.getElementById('modalFooter').innerHTML = footerHtml;
  document.getElementById('modalOverlay').style.display = 'flex';
}
function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

function openSlotModal(section, lot, slot_no) {
  const data = findLot(section, lot, slot_no) || normalizeLot({ section, lot, slot_no, status: 'A' });

  if (STATE.isAdmin) {
    renderEditForm(data, false);
  } else {
    renderDetailView(data);
  }
}

function renderDetailView(l) {
  const body = `
    <div class="detail-row"><span class="k">위치</span><span class="v mono">Section ${l.section} · Lot ${l.lot} · Slot ${l.slot_no}</span></div>
    <div class="detail-row"><span class="k">상태</span><span class="v"><span class="status-badge ${l.status}">${STATUS_LABELS[l.status] || l.status}</span></span></div>
    <div class="detail-row"><span class="k">이름</span><span class="v">${escapeHtml(l.name) || '—'}</span></div>
    ${l.name_kr ? `<div class="detail-row"><span class="k">한글 이름</span><span class="v">${escapeHtml(l.name_kr)}</span></div>` : ''}
    ${l.contact ? `<div class="detail-row"><span class="k">연락처</span><span class="v">${escapeHtml(l.contact)}</span></div>` : ''}
    ${l.burial_date ? `<div class="detail-row"><span class="k">안장일</span><span class="v">${escapeHtml(l.burial_date)}</span></div>` : ''}
    ${l.lot_price ? `<div class="detail-row"><span class="k">묘지 가격</span><span class="v">$${Number(l.lot_price).toLocaleString()}</span></div>` : ''}
    ${l.funeral_cost ? `<div class="detail-row"><span class="k">장례 비용</span><span class="v">$${Number(l.funeral_cost).toLocaleString()}</span></div>` : ''}
    ${l.paid_amount ? `<div class="detail-row"><span class="k">납부액</span><span class="v">$${Number(l.paid_amount).toLocaleString()}</span></div>` : ''}
    ${l.payment_status ? `<div class="detail-row"><span class="k">납부 상태</span><span class="v">${escapeHtml(l.payment_status)}</span></div>` : ''}
    ${l.notes ? `<div class="detail-row"><span class="k">비고</span><span class="v">${escapeHtml(l.notes)}</span></div>` : ''}
    ${l.updated_at ? `<div class="detail-row"><span class="k muted">최종 수정</span><span class="v muted" style="font-size:12px;">${escapeHtml(l.updated_at)} ${l.updated_by ? '· ' + escapeHtml(l.updated_by) : ''}</span></div>` : ''}
  `;
  const footer = `<button class="btn" id="btnModalClose2">닫기</button>`;
  openModal(`${l.section}구역 Lot ${l.lot} - ${l.slot_no}`, body, footer);
  document.getElementById('btnModalClose2').addEventListener('click', closeModal);
}

function renderEditForm(l, isNew) {
  const body = `
    <div class="form-grid">
      <div class="field full">
        <label>위치</label>
        <div class="mono" style="padding:8px 0;">Section ${l.section} · Lot ${l.lot} · Slot ${l.slot_no}</div>
      </div>
      <div class="field">
        <label>상태</label>
        <select id="f_status">
          <option value="A" ${l.status==='A'?'selected':''}>Available (사용 가능)</option>
          <option value="R" ${l.status==='R'?'selected':''}>Reserved (예약됨)</option>
          <option value="C" ${l.status==='C'?'selected':''}>To Be Confirmed</option>
          <option value="U" ${l.status==='U'?'selected':''}>Used (사용중)</option>
          <option value="X" ${l.status==='X'?'selected':''}>특이사항</option>
        </select>
      </div>
      <div class="field">
        <label>이름 (영문)</label>
        <input id="f_name" type="text" value="${escapeAttr(l.name)}" placeholder="예: John Doe">
      </div>
      <div class="field">
        <label>한글 이름</label>
        <input id="f_name_kr" type="text" value="${escapeAttr(l.name_kr)}">
      </div>
      <div class="field">
        <label>연락처</label>
        <input id="f_contact" type="text" value="${escapeAttr(l.contact)}" placeholder="010-0000-0000">
      </div>
      <div class="field">
        <label>안장일</label>
        <input id="f_burial_date" type="date" value="${escapeAttr(l.burial_date)}">
      </div>
      <div class="field">
        <label>묘지 가격 (USD)</label>
        <input id="f_lot_price" type="number" value="${escapeAttr(l.lot_price)}" placeholder="${STATE.settings.default_lot_price?.value || ''}">
      </div>
      <div class="field">
        <label>장례 비용 (USD)</label>
        <input id="f_funeral_cost" type="number" value="${escapeAttr(l.funeral_cost)}" placeholder="${STATE.settings.default_funeral_cost?.value || ''}">
      </div>
      <div class="field">
        <label>납부액 (USD)</label>
        <input id="f_paid_amount" type="number" value="${escapeAttr(l.paid_amount)}">
      </div>
      <div class="field">
        <label>납부 상태</label>
        <select id="f_payment_status">
          <option value="" ${!l.payment_status?'selected':''}>—</option>
          <option value="완납" ${l.payment_status==='완납'?'selected':''}>완납</option>
          <option value="일부납" ${l.payment_status==='일부납'?'selected':''}>일부납</option>
          <option value="미납" ${l.payment_status==='미납'?'selected':''}>미납</option>
        </select>
      </div>
      <div class="field full">
        <label>비고</label>
        <textarea id="f_notes">${escapeHtml(l.notes)}</textarea>
      </div>
    </div>
  `;
  const footer = `
    ${!isNew ? `<button class="btn btn-danger" id="btnDeleteSlot">삭제</button>` : ''}
    <span class="spacer"></span>
    <button class="btn" id="btnCancelEdit">취소</button>
    <button class="btn btn-primary" id="btnSaveSlot">저장</button>
  `;
  openModal(`${isNew ? '신규 등록' : '수정'} — ${l.section}구역 Lot ${l.lot} / ${l.slot_no}`, body, footer);

  document.getElementById('btnCancelEdit').addEventListener('click', closeModal);
  document.getElementById('btnSaveSlot').addEventListener('click', () => saveSlotFromForm(l));
  const delBtn = document.getElementById('btnDeleteSlot');
  if (delBtn) delBtn.addEventListener('click', () => confirmDeleteSlot(l));
}

function escapeAttr(s) { return escapeHtml(s || ''); }

async function saveSlotFromForm(original) {
  const payload = {
    id: original.id,
    section: original.section,
    lot: original.lot,
    slot_no: original.slot_no,
    status: document.getElementById('f_status').value,
    name: document.getElementById('f_name').value.trim(),
    name_kr: document.getElementById('f_name_kr').value.trim(),
    contact: document.getElementById('f_contact').value.trim(),
    burial_date: document.getElementById('f_burial_date').value,
    lot_price: document.getElementById('f_lot_price').value,
    funeral_cost: document.getElementById('f_funeral_cost').value,
    paid_amount: document.getElementById('f_paid_amount').value,
    payment_status: document.getElementById('f_payment_status').value,
    notes: document.getElementById('f_notes').value.trim(),
  };

  const saveBtn = document.getElementById('btnSaveSlot');
  saveBtn.disabled = true;
  saveBtn.textContent = '저장 중...';

  try {
    if (GAS_WEB_APP_URL) {
      const res = await gasCall('upsert', { payload: JSON.stringify(payload), user: getAdminName() });
      if (!res.ok) throw new Error(res.error || 'save failed');
    }
    // 로컬 state 업데이트 (낙관적 업데이트)
    const idx = STATE.lots.findIndex(l => l.id === payload.id);
    const merged = normalizeLot({ ...original, ...payload, updated_at: new Date().toISOString(), updated_by: getAdminName() });
    if (idx >= 0) STATE.lots[idx] = merged; else STATE.lots.push(merged);

    closeModal();
    showToast(GAS_WEB_APP_URL ? '저장했습니다 (Google Sheets 반영됨)' : '저장했습니다 (로컬에만 반영 — Sheets 미연동)');
    render();
  } catch (err) {
    showToast('저장 실패: ' + err.message, true);
    saveBtn.disabled = false;
    saveBtn.textContent = '저장';
  }
}

function confirmDeleteSlot(l) {
  if (!confirm(`${l.section}구역 Lot ${l.lot} / ${l.slot_no} 데이터를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) return;
  deleteSlot(l);
}

async function deleteSlot(l) {
  try {
    if (GAS_WEB_APP_URL) {
      const res = await gasCall('delete', { id: l.id, user: getAdminName() });
      if (!res.ok) throw new Error(res.error || 'delete failed');
    }
    STATE.lots = STATE.lots.filter(x => x.id !== l.id);
    closeModal();
    showToast('삭제했습니다');
    render();
  } catch (err) {
    showToast('삭제 실패: ' + err.message, true);
  }
}

function getAdminName() {
  return localStorage.getItem('ccpc_cemetery_admin_name') || 'admin';
}

// ===================================================================
// 신규 등록 (새 Lot/Slot 만들기 — 기존 레이아웃 밖의 항목도 등록 가능)
// ===================================================================
function openNewEntryModal() {
  const body = `
    <div class="form-grid">
      <div class="field">
        <label>Section</label>
        <select id="new_section">
          <option value="16">Section 16</option>
          <option value="15">Section 15</option>
        </select>
      </div>
      <div class="field">
        <label>Lot 번호</label>
        <input id="new_lot" type="text" placeholder="예: 193">
      </div>
      <div class="field full">
        <label>슬롯 번호</label>
        <input id="new_slot" type="text" placeholder="예: 81">
      </div>
    </div>
    <p class="muted" style="font-size:12.5px;margin-top:14px;">
      Section/Lot/슬롯 번호를 입력 후 '다음'을 누르면 상세 정보(이름, 비용 등)를 입력하는 화면으로 이동합니다.
      이미 등록된 슬롯이면 기존 데이터를 불러와 수정할 수 있습니다.
    </p>
  `;
  const footer = `
    <button class="btn" id="btnCancelNew">취소</button>
    <button class="btn btn-primary" id="btnNextNew">다음</button>
  `;
  openModal('신규 등록', body, footer);
  document.getElementById('btnCancelNew').addEventListener('click', closeModal);
  document.getElementById('btnNextNew').addEventListener('click', () => {
    const section = document.getElementById('new_section').value;
    const lot = document.getElementById('new_lot').value.trim();
    const slot_no = document.getElementById('new_slot').value.trim();
    if (!lot || !slot_no) { showToast('Lot 번호와 슬롯 번호를 입력해주세요.', true); return; }
    const existing = findLot(section, lot, slot_no);
    const data = existing || normalizeLot({
      section, lot, slot_no, status: 'U',
      lot_price: STATE.settings.default_lot_price?.value || '',
      funeral_cost: STATE.settings.default_funeral_cost?.value || '',
    });
    renderEditForm(data, !existing);
  });
}

// ===================================================================
// 이벤트 바인딩 / 초기화
// ===================================================================
function bindEvents() {
  document.querySelectorAll('.chip[data-section]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-section]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      STATE.bySection = chip.dataset.section;
      render();
    });
  });

  document.querySelectorAll('.tab[data-view]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab[data-view]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      STATE.view = tab.dataset.view;
      render();
    });
  });

  let searchDebounce;
  document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      STATE.search = e.target.value;
      render();
    }, 150);
  });

  document.querySelectorAll('#dataTable th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (STATE.sortKey === key) STATE.sortDir *= -1;
      else { STATE.sortKey = key; STATE.sortDir = 1; }
      renderTable();
    });
  });

  document.getElementById('btnSync').addEventListener('click', loadData);
  document.getElementById('btnNewEntry').addEventListener('click', openNewEntryModal);
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  document.getElementById('btnAdminToggle').addEventListener('click', toggleAdminMode);
  document.getElementById('btnAdminOff').addEventListener('click', () => setAdminMode(false));
}

function toggleAdminMode() {
  if (STATE.isAdmin) { setAdminMode(false); return; }
  const pin = prompt('관리자 모드 PIN을 입력하세요:');
  if (pin === null) return;
  // 간단한 PIN 보호 (SETUP.md에서 변경 방법 안내). 보안이 중요하면 GAS 쪽에서 별도 인증을 추가하세요.
  const ADMIN_PIN = '0000';
  if (pin !== ADMIN_PIN) { showToast('PIN이 일치하지 않습니다.', true); return; }
  const name = prompt('관리자 이름(또는 이니셜)을 입력하세요 (변경 기록에 표시됩니다):', getAdminName());
  if (name) localStorage.setItem('ccpc_cemetery_admin_name', name);
  setAdminMode(true);
}

function setAdminMode(on) {
  STATE.isAdmin = on;
  document.getElementById('adminBanner').style.display = on ? 'flex' : 'none';
  document.getElementById('btnAdminToggle').textContent = on ? '🔓 관리자 모드 (켜짐)' : '⚙ 관리자 모드';
  showToast(on ? '관리자 모드를 켰습니다.' : '관리자 모드를 끔');
  render();
}

// ------------------------------------------------------------------
// 시작
// ------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  loadData();
});
