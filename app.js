// ====================================================
// CCPC 묘지 관리 시스템 — app.js
// ====================================================

const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbx_rg95yqYiOW648SCmNgMoGXy1l6ErtkDqTwtnbaH0wTBNaM_j4ynHiaLY_CX90x8BlQ/exec';

const STATUS_LABELS = { A:'Available', R:'Reserved', C:'확인 필요', U:'Used' };

let STATE = {
  data: [],           // 전체 데이터
  section: '15',
  view: 'stats',
  search: '',
  isAdmin: false,
  mapZoom: 1,
};

// ─── JSONP ─────────────────────────────────────────
let _cbIdx = 0;
function jsonpRequest(url, params) {
  return new Promise((resolve, reject) => {
    const cb = 'cb_' + (_cbIdx++);
    const s = document.createElement('script');
    const qs = new URLSearchParams({ ...params, callback: cb }).toString();
    window[cb] = d => { resolve(d); delete window[cb]; s.remove(); };
    s.onerror = () => { reject(new Error('JSONP failed')); delete window[cb]; s.remove(); };
    s.src = url + '?' + qs;
    document.body.appendChild(s);
    setTimeout(() => { if(window[cb]){ reject(new Error('timeout')); delete window[cb]; s.remove(); }}, 15000);
  });
}
async function gasCall(action, params={}) {
  if (!GAS_WEB_APP_URL) throw new Error('no url');
  return jsonpRequest(GAS_WEB_APP_URL, { action, ...params });
}

// ─── Data Load ─────────────────────────────────────
async function loadData() {
  if (GAS_WEB_APP_URL) {
    try {
      // 섹션별로 나눠서 로드 — 한 번에 전체를 받으면 JSONP 응답이 너무 커서 잘릴 수 있음
      const [res15, res16] = await Promise.all([
        gasCall('getsection', { section: '15' }),
        gasCall('getsection', { section: '16' }),
      ]);
      if ((res15.ok && res15.lots) || (res16.ok && res16.lots)) {
        const lots15 = (res15.ok && res15.lots) ? res15.lots : [];
        const lots16 = (res16.ok && res16.lots) ? res16.lots : [];
        STATE.data = [...lots15, ...lots16].map(normalize);
        const total = STATE.data.length;
        setSync(`Google Sheets 연결됨 (${total}개)`);
        render();
        return;
      }
    } catch(e) { console.warn('GAS 실패, 로컬 데이터 사용:', e.message); }
  }
  try {
    const r = await fetch('grave-data.json');
    STATE.data = (await r.json()).map(normalize);
    setSync('오프라인 데이터');
  } catch(e) { setSync('데이터 로드 실패'); }
  render();
}

function normalize(r) {
  return {
    id: r.id || `${r.section}-${r.lot}-${r.grave}`,
    section: String(r.section),
    lot: String(r.lot),
    grave: String(r.grave || r.slot_no || ''),
    dir: r.dir || '',
    status: r.status || 'U',
    name: r.name || '',
    name_kr: r.name_kr || '',
  };
}

function setSync(msg) {
  document.getElementById('lastSync').textContent = ' · ' + msg + ' · ' + new Date().toLocaleTimeString('ko-KR');
}

// ─── Toast ─────────────────────────────────────────
let _toastTimer;
function showToast(msg, isErr) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (isErr ? ' error' : '');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.className = 'toast', 2800);
}

// ─── Filter ────────────────────────────────────────
function getFiltered() {
  // 검색어와 무관하게 항상 현재 section 전체 반환
  return STATE.data.filter(r => r.section === STATE.section);
}

function getLots() {
  const data = getFiltered();
  const lots = {};
  data.forEach(r => {
    if (!lots[r.lot]) lots[r.lot] = [];
    lots[r.lot].push(r);
  });
  return lots;
}

// ─── Render dispatch ───────────────────────────────
function render() {
  const main = document.getElementById('mainArea');
  const isFullView = STATE.view === 'map' || STATE.view === 'pdfview';
  main.className = isFullView ? 'main no-scroll' : 'main';

  document.getElementById('viewList').style.display  = STATE.view === 'list'    ? '' : 'none';
  document.getElementById('viewMap').style.display   = STATE.view === 'map'     ? '' : 'none';
  document.getElementById('viewPdf').style.display   = STATE.view === 'pdfview' ? '' : 'none';
  document.getElementById('viewStats').style.display = STATE.view === 'stats'   ? '' : 'none';
  document.getElementById('searchWrap').style.display = '';

  if (STATE.view === 'list')    renderList();
  if (STATE.view === 'map')     renderMap();
  if (STATE.view === 'pdfview') renderPdfView();
  if (STATE.view === 'stats')   renderStats();
}

function escHtml(s) {
  return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ─── LIST VIEW ─────────────────────────────────────
function renderList() {
  const lots = getLots();
  const container = document.getElementById('listContainer');

  if (Object.keys(lots).length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="big">🔍</div>데이터가 없습니다.</div>';
    return;
  }
  clearTimeout(window._searchReturnTimer);

  // 컬럼 헤더 (DIR 없음)
  const headerCols = `<div class="lv-h-grave">Grave</div><div class="lv-h-status">상태</div><div class="lv-h-name">Name</div><div class="lv-h-kr">이름</div>`;

  const sorted = Object.entries(lots).sort((a,b) => parseInt(a[0]) - parseInt(b[0]));

  // 4개씩 묶어서 행(row-of-lots) 구성
  let html = '';
  for (let i = 0; i < sorted.length; i += 4) {
    const chunk = sorted.slice(i, i + 4);
    html += `<div class="lots-row">`;
    chunk.forEach(([lotNo, graves]) => {
      const usedCount = graves.filter(r => r.status !== 'A').length;
      const availCount = graves.filter(r => r.status === 'A').length;
      html += `
      <div class="lot-group">
        <div class="lot-header">
          <span class="lot-num">Lot ${lotNo}</span>
          <span class="lot-summary">
            <span class="ls-used">사용중/예약 ${usedCount}</span>
            <span class="ls-avail">Available ${availCount}</span>
          </span>
        </div>
        <div class="lv-header">${headerCols}</div>
        <div class="lv-rows">
      `;
      graves
        .sort((a,b) => parseInt(a.grave) - parseInt(b.grave))
        .forEach(r => {
          const krVal = r.name_kr || toKoreanName(r.name);
          html += `
          <div class="lv-row status-bg-${r.status}" data-id="${r.id}">
            <div class="lv-cell lv-grave mono">${escHtml(r.grave)}</div>
            <div class="lv-cell lv-status"><span class="status-badge ${r.status}">${STATUS_LABELS[r.status]||r.status}</span></div>
            <div class="lv-cell lv-name">${r.status === 'A' ? '<span class="avail-dash">—</span>' : escHtml(r.name)}</div>
            <div class="lv-cell lv-kr kr-name-cell" data-id="${r.id}" title="클릭 → 한글 이름 수정">
              ${r.status === 'A' ? '' : (escHtml(krVal) || '<span class="kr-empty">+ 입력</span>')}
            </div>
          </div>`;
        });
      html += `</div></div>`;
    });
    html += `</div>`;
  }

  container.innerHTML = html;

  // 검색어가 있으면: 매칭 셀 강조 + 스크롤. 없으면 5초 후 초기화
  if (STATE.search.trim()) {
    const q = STATE.search.trim().toLowerCase();
    let foundRows = [];
    container.querySelectorAll('.lv-row').forEach(row => {
      const r = STATE.data.find(d => d.id === row.dataset.id);
      if (!r) return;
      if (r.lot.toLowerCase().includes(q) || r.grave.toLowerCase().includes(q) ||
          (r.name||'').toLowerCase().includes(q) || (r.name_kr||'').toLowerCase().includes(q)) {
        row.classList.add('search-blink');
        foundRows.push(row);
      }
    });

    if (foundRows.length > 0) {
      // 찾으면 → Lot 번호 알림 + 첫 번째 행으로 스크롤
      clearTimeout(window._searchReturnTimer);
      const foundLots = [...new Set(foundRows.map(row => {
        const r = STATE.data.find(d => d.id === row.dataset.id);
        return r ? r.lot : null;
      }).filter(Boolean))];
      if (foundLots.length === 1) {
        showToast(`Lot ${foundLots[0]} 에서 찾았습니다.`);
      } else {
        showToast(`Lot ${foundLots.join(', ')} 에서 ${foundRows.length}명 찾았습니다.`);
      }
      setTimeout(() => foundRows[0].scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
    } else {
      // 못 찾으면 → "없음" 메시지 + 5초 후 초기화
      showToast('검색 결과가 없습니다.', true);
      clearTimeout(window._searchReturnTimer);
      window._searchReturnTimer = setTimeout(() => {
        STATE.search = '';
        document.getElementById('searchInput').value = '';
        document.getElementById('searchClear').style.display = 'none';
        render();
      }, 5000);
    }
  }

  // 행 클릭 → 상세 모달
  container.querySelectorAll('.lv-row').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('.kr-name-cell') || e.target.tagName === 'INPUT') return;
      const r = STATE.data.find(d => d.id === row.dataset.id);
      if (r) openDetailModal(r);
    });
  });

  // 한글 이름 인라인 편집
  container.querySelectorAll('.kr-name-cell').forEach(cell => {
    cell.addEventListener('click', e => {
      e.stopPropagation();
      if (cell.querySelector('input')) return;
      const r = STATE.data.find(d => d.id === cell.dataset.id);
      if (!r || r.status === 'A') return;
      const cur = r.name_kr || toKoreanName(r.name);
      const input = document.createElement('input');
      input.type = 'text'; input.value = cur;
      input.className = 'kr-name-input';
      input.placeholder = '한글 이름';
      cell.innerHTML = ''; cell.appendChild(input);
      input.focus(); input.select();

      async function save() {
        const newVal = input.value.trim();
        if (newVal === r.name_kr) { cell.textContent = newVal || ''; if(!newVal) cell.innerHTML='<span class="kr-empty">+ 입력</span>'; return; }
        try {
          if (GAS_WEB_APP_URL) {
            const res = await gasCall('upsert', { payload: JSON.stringify({...r, name_kr: newVal}), user: 'editor' });
            if (!res.ok) throw new Error(res.error);
          }
          r.name_kr = newVal;
          cell.textContent = newVal; if(!newVal) cell.innerHTML='<span class="kr-empty">+ 입력</span>';
          showToast('저장됐습니다');
        } catch(err) {
          showToast('저장 실패: ' + err.message, true);
          cell.textContent = r.name_kr || ''; if(!r.name_kr) cell.innerHTML='<span class="kr-empty">+ 입력</span>';
        }
      }
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') input.blur();
        if (e.key === 'Escape') { cell.textContent = r.name_kr || ''; if(!r.name_kr) cell.innerHTML='<span class="kr-empty">+ 입력</span>'; }
      });
      input.addEventListener('blur', save);
    });
  });
}

// ─── MAP VIEW ──────────────────────────────────────
// ─── PDF VIEW — 현재 섹션 원본 전체 화면 ───────────
const PDF_MAP = { '15': 'map-section15-1.jpg', '16': 'map-section16-1.jpg' };

function renderPdfView() {
  const sec = STATE.section;
  const img = document.getElementById('pdfMainImg');
  const label = document.getElementById('pdfLabel');
  img.src = PDF_MAP[sec];
  label.textContent = `Section ${sec} 원본 PDF`;
}

// ─── MAP VIEW (인터랙티브 그리드 — 현재 섹션 전체) ──
const MAP_LAYOUTS = {
  '15': {
    gridCols: 35, gridRows: 5,
    lots: [
      // ── 상단 열 (row 1~2) ──────────────────────────
      // 286: 57,58,59,60
      { lot:'286', col:1,  row:1, cols:4, graves:['57','58','59','60'] },
      // 285: 61,62,31,32
      { lot:'285', col:5,  row:1, cols:4, graves:['61','62','31','32'] },
      // 284: 상단 51,52,53,54 / 하단 33,34,35
      { lot:'284', col:9,  row:1, cols:4, graves:['51','52','53','54','33','34','35'] },
      // 283: 36,37,38
      { lot:'283', col:13, row:1, cols:3, graves:['36','37','38'] },
      // 282: 빈칸 (col 16, 1칸)
      // 281: 40,41,55,56 (40,41은 281 소속)
      { lot:'281', col:17, row:1, cols:4, graves:['40','41','55','56'] },
      // 280: 42,43,44,45
      { lot:'280', col:21, row:1, cols:4, graves:['42','43','44','45'] },
      // 279: 46 (1개)
      { lot:'279', col:25, row:1, cols:1, graves:['46'] },
      // 278: 48,49,50
      { lot:'278', col:26, row:1, cols:3, graves:['48','49','50'] },

      // ── 하단 열 (row 4~5) ──────────────────────────
      // 233: 63 (1개)
      { lot:'233', col:1,  row:4, cols:1, graves:['63'] },
      // 234: 상단 64,65,66,67 / 하단 1,2,69,70
      { lot:'234', col:2,  row:4, cols:4, graves:['64','65','66','67','1','2','69','70'] },
      // 235: 상단 68,1,2,3 / 하단 71,72,73,74
      { lot:'235', col:6,  row:4, cols:4, graves:['68','1b','2b','3b','71','72','73','74'] },
      // 236: 4,5,6,7
      { lot:'236', col:10, row:4, cols:4, graves:['4','5','6','7'] },
      // 237: 8,9,10,11
      { lot:'237', col:14, row:4, cols:4, graves:['8','9','10','11'] },
      // 238: 상단 12,13,14,15 / 하단 75,76
      { lot:'238', col:18, row:4, cols:4, graves:['12','13','14','15','75','76'] },
      // 239: 상단 16,17,18,19 / 하단 77,78,79,80
      { lot:'239', col:22, row:4, cols:4, graves:['16','17','18','19','77','78','79','80'] },
      // 240: 20,21,22,23
      { lot:'240', col:26, row:4, cols:4, graves:['20','21','22','23'] },
      // 241: 24,25,26
      { lot:'241', col:30, row:4, cols:3, graves:['24','25','26'] },
      // 242: 28,29,30
      { lot:'242', col:33, row:4, cols:3, graves:['28','29','30'] },
    ]
  },
  '16': {
    gridCols: 78, gridRows: 8,
    lots: [
      // 최상단 — 232(col1~2), 231(col4~5), 230(col7~8)
      { lot:'232', col:1,  row:1, cols:2, graves:['1','2','3','4'] },
      { lot:'231', col:4,  row:1, cols:2, graves:['1','2','3','4'] },
      { lot:'230', col:7,  row:1, cols:2, graves:['3','4'] },
      // Row 3 — 186~206 순서대로 겹침 없이 배치
      { lot:'186', col:1,  row:3, cols:2, graves:['1','2'] },
      { lot:'187', col:3,  row:3, cols:4, graves:['203','204','205','206'] },
      { lot:'188', col:7,  row:3, cols:4, graves:['207','208','209','210'] },
      { lot:'189', col:11, row:3, cols:4, graves:['211','212','213','214'] },
      { lot:'190', col:15, row:3, cols:4, graves:['215','216','217','218'] },
      { lot:'191', col:19, row:3, cols:4, graves:['219','220','221','222'] },
      { lot:'192', col:23, row:3, cols:4, graves:['223','224','225','226'] },
      { lot:'193', col:27, row:3, cols:4, graves:['81','82','83','84','93','94','95','96'] },
      { lot:'194', col:31, row:3, cols:4, graves:['85','86','87','88','97','98','99','100'] },
      { lot:'195', col:35, row:3, cols:4, graves:['89','90','91','92','101','102','103','104'] },
      { lot:'196', col:39, row:3, cols:4, graves:['129','130','131','132','137','138','139','140'] },
      { lot:'197', col:43, row:3, cols:4, graves:['145','146','147','148','149','150','151','152','153','154','155','156'] },
      { lot:'198', col:47, row:3, cols:4, graves:['161','162','163','164','165','166','167','168','169','170','171','172'] },
      { lot:'199', col:51, row:3, cols:2, graves:['177','178'] },
      { lot:'200', col:53, row:3, cols:4, graves:['179','180','181','182'] },
      { lot:'201', col:57, row:3, cols:4, graves:['183','184','185','186'] },
      { lot:'202', col:61, row:3, cols:4, graves:['187','188','189','190'] },
      { lot:'203', col:65, row:3, cols:4, graves:['191','192','193','194'] },
      { lot:'204', col:69, row:3, cols:4, graves:['195','196','197','198'] },
      { lot:'205', col:73, row:3, cols:4, graves:['199','200','201','202'] },
      { lot:'206', col:77, row:3, cols:2, graves:['3','4'] },
      // Row 5 — 170~165
      { lot:'170', col:27, row:5, cols:4, graves:['105','106','107','108','117','118','119','120'] },
      { lot:'169', col:31, row:5, cols:4, graves:['109','110','111','112','121','122','123','124'] },
      { lot:'168', col:35, row:5, cols:4, graves:['113','114','115','116','125','126','127','128'] },
      { lot:'167', col:39, row:5, cols:4, graves:['133','134','135','136','141','142','143','144'] },
      { lot:'166', col:43, row:5, cols:4, graves:['153','154','155','156','157','158','159','160'] },
      { lot:'165', col:47, row:5, cols:4, graves:['169','170','171','172','173','174','175','176'] },
      // Row 7 — 139~144
      { lot:'139', col:27, row:7, cols:4, graves:['1'] },
      { lot:'140', col:31, row:7, cols:4, graves:['1','2','3','4'] },
      { lot:'141', col:35, row:7, cols:4, graves:['1','2','3','4'] },
      { lot:'142', col:39, row:7, cols:4, graves:['1','2','3','4'] },
      { lot:'143', col:43, row:7, cols:4, graves:['1','2','3','4'] },
      { lot:'144', col:47, row:7, cols:4, graves:['1','2','3','4'] },
    ]
  }
};

function findRecord(sec, lot, grave) {
  return STATE.data.find(r => r.section===sec && r.lot===lot && r.grave===grave);
}

function renderMap() {
  const wrap = document.getElementById('mapImgWrap');
  if (!wrap) return;
  const sec = STATE.section;
  const layout = MAP_LAYOUTS[sec];
  if (!layout) return;

  let html = `<div class="imap-grid" style="grid-template-columns:repeat(${layout.gridCols},1fr);grid-template-rows:repeat(${layout.gridRows},auto);">`;

  // WEST/EAST/SOUTH 방향 레이블
  if (sec==='15') {
    html += `<div class="imap-dir-label" style="grid-column:1/${layout.gridCols+1};grid-row:3">SOUTH ↓ &nbsp;&nbsp; WEST ↑</div>`;
  }

  layout.lots.forEach(lotDef => {
    const nCols = lotDef.cols;
    const nRows = Math.ceil(lotDef.graves.length / nCols);
    html += `<div class="imap-lot" style="grid-column:${lotDef.col}/span ${nCols};grid-row:${lotDef.row}/span ${nRows};">`;
    html += `<div class="imap-lot-label">${lotDef.lot}</div>`;
    html += `<div class="imap-cells" style="grid-template-columns:repeat(${nCols},1fr);">`;

    lotDef.graves.forEach(grave => {
      const r = findRecord(sec, lotDef.lot, grave);
      const status = r ? r.status : 'U';
      const name = r ? r.name : '';
      const nameKr = r ? (r.name_kr || toKoreanName(name)) : '';
      const displayName = nameKr || name;
      const id = r ? r.id : `${sec}-${lotDef.lot}-${grave}`;

      html += `<div class="imap-cell status-cell-${status}" data-id="${id}" data-sec="${sec}" data-lot="${lotDef.lot}" data-grave="${grave}" title="Lot ${lotDef.lot} / Grave ${grave}">
        <div class="imap-grave-no">${grave}</div>
        ${status !== 'A' && displayName ? `<div class="imap-name" title="${escHtml(displayName)}">${escHtml(displayName.slice(0,4))}</div>` : ''}
      </div>`;
    });

    html += `</div></div>`;
  });

  html += `</div>`;

  // 방향 레이블 추가
  let dirHtml = `<div class="imap-direction-bar">`;
  if (sec==='15') dirHtml += `<span>← EAST &nbsp;&nbsp; WEST →</span><span style="margin-left:auto">SOUTH ↓</span>`;
  if (sec==='16') dirHtml += `<span>WEST ← &nbsp;&nbsp;</span><span style="margin-left:auto">→ EAST</span>`;
  dirHtml += `</div>`;

  wrap.innerHTML = dirHtml + html;

  // 검색 중이면: 매칭 셀 빨간 테두리 + 해당 영역으로 스크롤. 없으면 5초 복귀
  if (STATE.search.trim()) {
    const q = STATE.search.trim().toLowerCase();
    const matchedCells = [];
    wrap.querySelectorAll('.imap-cell').forEach(cell => {
      const { sec: csec, lot, grave } = cell.dataset;
      const r = findRecord(csec, lot, grave);
      if (!r) return;
      if (lot.toLowerCase().includes(q) || grave.toLowerCase().includes(q) ||
          (r.name||'').toLowerCase().includes(q) || (r.name_kr||'').toLowerCase().includes(q)) {
        cell.classList.add('search-blink');
        matchedCells.push(cell);
      }
    });
    if (matchedCells.length > 0) {
      clearTimeout(window._searchReturnTimer);
      const foundLots = [...new Set(matchedCells.map(c => c.dataset.lot))];
      if (foundLots.length === 1) {
        showToast(`Lot ${foundLots[0]} 에서 찾았습니다.`);
      } else {
        showToast(`Lot ${foundLots.join(', ')} 에서 ${matchedCells.length}명 찾았습니다.`);
      }
      setTimeout(() => matchedCells[0].scrollIntoView({ behavior:'smooth', block:'center', inline:'center' }), 100);
    } else {
      showToast('검색 결과가 없습니다.', true);
      clearTimeout(window._searchReturnTimer);
      window._searchReturnTimer = setTimeout(() => {
        STATE.search = '';
        document.getElementById('searchInput').value = '';
        document.getElementById('searchClear').style.display = 'none';
        render();
      }, 5000);
    }
  }

  // 셀 클릭 → 수정 모달
  wrap.querySelectorAll('.imap-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const { sec, lot, grave } = cell.dataset;
      let r = findRecord(sec, lot, grave);
      if (!r) {
        // 아직 데이터 없으면 임시 생성
        r = { id: cell.dataset.id, section: sec, lot, grave, status: 'A', name: '', name_kr: '', dir: '' };
      }
      openEditModal(r);
    });
  });
}

// ─── 편집 모달 ─────────────────────────────────────
function openEditModal(r) {
  document.getElementById('modalTitle').textContent = `Section ${r.section} · Lot ${r.lot} · Grave ${r.grave}`;
  document.getElementById('modalBody').innerHTML = `
    <div class="form-grid">
      <div class="field full">
        <label>상태</label>
        <select id="f_status">
          <option value="A" ${r.status==='A'?'selected':''}>Available</option>
          <option value="U" ${r.status==='U'?'selected':''}>Used (사용중)</option>
          <option value="R" ${r.status==='R'?'selected':''}>Reserved (예약)</option>
          <option value="C" ${r.status==='C'?'selected':''}>확인 필요</option>
        </select>
      </div>
      <div class="field">
        <label>Name (영문)</label>
        <input id="f_name" type="text" value="${escHtml(r.name)}" placeholder="Last, First">
      </div>
      <div class="field">
        <label>이름 (한글)</label>
        <input id="f_name_kr" type="text" value="${escHtml(r.name_kr)}" placeholder="홍 길동">
      </div>
    </div>
  `;
  document.getElementById('modalFooter').innerHTML = `
    <button class="btn" id="btnCancelEdit">취소</button>
    <button class="btn btn-primary" id="btnSaveEdit">저장</button>
  `;
  document.getElementById('modalOverlay').style.display = 'flex';
  document.getElementById('btnCancelEdit').onclick = () => document.getElementById('modalOverlay').style.display = 'none';
  document.getElementById('btnSaveEdit').onclick = () => saveMapEdit(r);
}

async function saveMapEdit(original) {
  const newStatus = document.getElementById('f_status').value;
  const newName   = document.getElementById('f_name').value.trim();
  const newNameKr = document.getElementById('f_name_kr').value.trim();

  const payload = { ...original, status: newStatus, name: newName, name_kr: newNameKr };

  const btn = document.getElementById('btnSaveEdit');
  btn.disabled = true; btn.textContent = '저장 중...';

  try {
    if (GAS_WEB_APP_URL) {
      const res = await gasCall('upsert', { payload: JSON.stringify(payload), user: 'map-editor' });
      if (!res.ok) throw new Error(res.error);
    }
    // 로컬 state 업데이트
    const idx = STATE.data.findIndex(r => r.id === original.id);
    if (idx >= 0) {
      STATE.data[idx] = { ...STATE.data[idx], ...payload };
    } else {
      STATE.data.push(payload);
    }
    document.getElementById('modalOverlay').style.display = 'none';
    showToast(GAS_WEB_APP_URL ? '저장됐습니다' : '저장됐습니다 (로컬)');
    renderMap(); // 맵 다시 그리기
  } catch(err) {
    showToast('저장 실패: ' + err.message, true);
    btn.disabled = false; btn.textContent = '저장';
  }
}

function initMapZoom() {
  const wrap = document.getElementById('mapImgWrap');

  document.getElementById('btnZoomIn').onclick    = () => { STATE.mapZoom = Math.min(STATE.mapZoom*1.25, 5); applyZoom(); };
  document.getElementById('btnZoomOut').onclick   = () => { STATE.mapZoom = Math.max(STATE.mapZoom/1.25, 0.4); applyZoom(); };
  document.getElementById('btnZoomReset').onclick = () => { STATE.mapZoom = 1; applyZoom(); };

  function applyZoom() {
    const grid = wrap.querySelector('.imap-grid');
    if (grid) grid.style.transform = `scale(${STATE.mapZoom})`;
  }

  wrap.addEventListener('wheel', e => {
    e.preventDefault();
    STATE.mapZoom = Math.min(Math.max(STATE.mapZoom * (e.deltaY>0?0.9:1.1), 0.4), 5);
    applyZoom();
  }, { passive: false });

  let isDrag=false, sx, sy, sl, st;
  wrap.addEventListener('mousedown', e => { isDrag=true; sx=e.pageX-wrap.offsetLeft; sy=e.pageY-wrap.offsetTop; sl=wrap.scrollLeft; st=wrap.scrollTop; wrap.style.cursor='grabbing'; });
  wrap.addEventListener('mouseleave', ()=>{ isDrag=false; wrap.style.cursor='grab'; });
  wrap.addEventListener('mouseup',    ()=>{ isDrag=false; wrap.style.cursor='grab'; });
  wrap.addEventListener('mousemove',  e=>{ if(!isDrag) return; e.preventDefault(); wrap.scrollLeft=sl-(e.pageX-wrap.offsetLeft-sx); wrap.scrollTop=st-(e.pageY-wrap.offsetTop-sy); });

  // PDF View 줌/드래그 (단일 패널)
  let pdfZoom = 1;
  document.getElementById('btnPdfZoomIn').onclick    = () => { pdfZoom = Math.min(pdfZoom*1.3,6); document.getElementById('pdfMainImg').style.transform=`scale(${pdfZoom})`; };
  document.getElementById('btnPdfZoomOut').onclick   = () => { pdfZoom = Math.max(pdfZoom/1.3,0.3); document.getElementById('pdfMainImg').style.transform=`scale(${pdfZoom})`; };
  document.getElementById('btnPdfZoomReset').onclick = () => { pdfZoom=1; document.getElementById('pdfMainImg').style.transform='scale(1)'; };

  const pdfW = document.getElementById('pdfMainWrap');
  let pd=false, px, py, pl, pt;
  pdfW.addEventListener('mousedown', e=>{ pd=true; px=e.pageX-pdfW.offsetLeft; py=e.pageY-pdfW.offsetTop; pl=pdfW.scrollLeft; pt=pdfW.scrollTop; pdfW.style.cursor='grabbing'; });
  pdfW.addEventListener('mouseleave', ()=>{ pd=false; pdfW.style.cursor='grab'; });
  pdfW.addEventListener('mouseup',    ()=>{ pd=false; pdfW.style.cursor='grab'; });
  pdfW.addEventListener('mousemove',  e=>{ if(!pd) return; pdfW.scrollLeft=pl-(e.pageX-pdfW.offsetLeft-px); pdfW.scrollTop=pt-(e.pageY-pdfW.offsetTop-py); });
  pdfW.addEventListener('wheel', e => {
    e.preventDefault();
    pdfZoom = Math.min(Math.max(pdfZoom*(e.deltaY>0?0.9:1.1),0.3),6);
    document.getElementById('pdfMainImg').style.transform=`scale(${pdfZoom})`;
  }, { passive:false });

  // Section 바뀔 때 PDF 이미지 자동 교체
  document.querySelectorAll('.chip[data-section]').forEach(c => {
    c.addEventListener('click', () => {
      if (STATE.view === 'pdfview') {
        renderPdfView();
        pdfZoom = 1;
        document.getElementById('pdfMainImg').style.transform = 'scale(1)';
      }
    });
  });
}

// ─── STATS VIEW ────────────────────────────────────
function renderStats() {
  const q = STATE.search.trim().toLowerCase();
  const all = q ? STATE.data.filter(r =>
    r.lot.toLowerCase().includes(q) || r.grave.toLowerCase().includes(q) ||
    (r.name||'').toLowerCase().includes(q) || (r.name_kr||'').toLowerCase().includes(q)
  ) : STATE.data;
  const sections = ['15','16'];
  const bySection = {};
  sections.forEach(s => { bySection[s] = { total:0, available:0, used:0, reserved:0, confirmed:0, lots: new Set() }; });
  all.forEach(r => {
    const s = r.section;
    if (!bySection[s]) return;
    bySection[s].total++;
    bySection[s].lots.add(r.lot);
    if (r.status==='A') bySection[s].available++;
    else if (r.status==='R') bySection[s].reserved++;
    else if (r.status==='C') bySection[s].confirmed++;
    else bySection[s].used++;
  });
  const grand = { total:0, available:0, used:0, reserved:0, confirmed:0 };
  sections.forEach(s => {
    ['total','available','used','reserved','confirmed'].forEach(k => grand[k] += bySection[s][k]);
  });

  document.getElementById('statsBar').innerHTML = `
    <div class="stat"><div class="num">${grand.total}</div><div class="lbl">전체 슬롯</div></div>
    <div class="stat sage"><div class="num">${grand.available}</div><div class="lbl">Available</div></div>
    <div class="stat"><div class="num">${grand.used}</div><div class="lbl">사용중</div></div>
    <div class="stat gold"><div class="num">${grand.reserved}</div><div class="lbl">Reserved</div></div>
    <div class="stat clay"><div class="num">${grand.confirmed}</div><div class="lbl">확인 필요</div></div>
  `;

  const detail = document.getElementById('statsDetail');
  detail.style.cssText = 'background:transparent;border:none;display:flex;gap:24px;flex-wrap:wrap;padding:0;';
  detail.innerHTML = sections.map(s => {
    const d = bySection[s];
    const lotCount = d.lots.size;
    return `
    <div class="stats-section-card">
      <div class="stats-section-header">
        <span class="stats-section-title">Section ${s}</span>
        <span class="stats-section-sub">전체 ${d.total}개 슬롯 · ${lotCount}개 Lot</span>
      </div>
      <div class="stats-progress-wrap">
        <div class="stats-progress-bar">
          <div class="stats-progress-fill used" style="width:${d.total?Math.round(d.used/d.total*100):0}%"></div>
          <div class="stats-progress-fill reserved" style="width:${d.total?Math.round(d.reserved/d.total*100):0}%"></div>
          <div class="stats-progress-fill confirmed" style="width:${d.total?Math.round(d.confirmed/d.total*100):0}%"></div>
        </div>
      </div>
      <div class="stats-grid">
        <div class="stats-cell available"><div class="stats-cell-num">${d.available}</div><div class="stats-cell-lbl">Available</div><div class="stats-cell-pct">${d.total?Math.round(d.available/d.total*100):0}%</div></div>
        <div class="stats-cell used"><div class="stats-cell-num">${d.used}</div><div class="stats-cell-lbl">사용중</div><div class="stats-cell-pct">${d.total?Math.round(d.used/d.total*100):0}%</div></div>
        <div class="stats-cell reserved"><div class="stats-cell-num">${d.reserved}</div><div class="stats-cell-lbl">Reserved</div><div class="stats-cell-pct">${d.total?Math.round(d.reserved/d.total*100):0}%</div></div>
        <div class="stats-cell confirmed"><div class="stats-cell-num">${d.confirmed}</div><div class="stats-cell-lbl">확인 필요</div><div class="stats-cell-pct">${d.total?Math.round(d.confirmed/d.total*100):0}%</div></div>
      </div>
    </div>`;
  }).join('');
}

// ─── Detail Modal ──────────────────────────────────
function openDetailModal(r) {
  document.getElementById('modalTitle').textContent = `Section ${r.section} · Lot ${r.lot} · Grave ${r.grave}`;
  const krVal = r.name_kr || toKoreanName(r.name);
  document.getElementById('modalBody').innerHTML = `
    <div class="detail-row"><span class="k">상태</span><span class="v"><span class="status-badge ${r.status}">${STATUS_LABELS[r.status]||r.status}</span></span></div>
    <div class="detail-row"><span class="k">Name</span><span class="v">${escHtml(r.name)||'—'}</span></div>
    <div class="detail-row"><span class="k">이름</span><span class="v">${escHtml(krVal)||'—'}</span></div>
    ${r.dir ? `<div class="detail-row"><span class="k">방향</span><span class="v">${escHtml(r.dir)}</span></div>` : ''}
  `;
  document.getElementById('modalFooter').innerHTML = `<button class="btn" onclick="document.getElementById('modalOverlay').style.display='none'">닫기</button>`;
  document.getElementById('modalOverlay').style.display = 'flex';
}

// ─── 한글 성씨 변환 ─────────────────────────────────
const LAST_NAME_MAP = {
  'Kim':'김','Lee':'이','Park':'박','Pak':'박','Choi':'최','Choe':'최',
  'Jung':'정','Chung':'정','Jeong':'정','Yoon':'윤','Yun':'윤',
  'Lim':'임','Im':'임','Kwon':'권','Cho':'조','Yang':'양','Chang':'장',
  'Baek':'백','Paek':'백','Ahn':'안','An':'안','Oh':'오','Han':'한',
  'Yoo':'유','Yu':'유','Hong':'홍','Sim':'심','Shim':'심',
  'Sohn':'손','Son':'손','Moon':'문','Jun':'전','Jeon':'전',
  'Ban':'반','Koh':'고','Ko':'고','Hyeon':'현','Hyun':'현','Gu':'구',
  'Nam':'남','Hwang':'황','Rhee':'이','So':'소','Chun':'천','Cha':'차',
  'Ma':'마','Suh':'서','Ra':'나','Sa':'사','Faron':'파론',
  'Lim':'임','Baek':'백','Moon':'문','Kwon':'권',
};
function toKoreanName(n) {
  if (!n || !n.trim()) return '';
  // "Lee, Doo Ri" 형식 (Last, First)
  if (n.includes(',')) {
    const [last, first] = n.split(',').map(s=>s.trim());
    const kr = LAST_NAME_MAP[last];
    return kr ? `${kr} ${first}` : `${last}, ${first}`;
  }
  // "Doo Ri Lee" 형식 (First Last)
  const parts = n.trim().split(/\s+/);
  if (parts.length < 2) return '';
  const last = parts[parts.length-1];
  const first = parts.slice(0,-1).join(' ');
  const kr = LAST_NAME_MAP[last];
  return kr ? `${kr} ${first}` : `${last}, ${first}`;
}

// ─── 관리자 모드 ────────────────────────────────────
function toggleAdmin() {
  if (STATE.isAdmin) { STATE.isAdmin=false; document.getElementById('adminBanner').style.display='none'; document.getElementById('btnAdminToggle').textContent='⚙ 관리자 모드'; showToast('관리자 모드 해제'); return; }
  const pin = prompt('관리자 PIN:');
  if (pin === null) return;
  if (pin !== '0000') { showToast('PIN이 틀렸습니다', true); return; }
  STATE.isAdmin = true;
  document.getElementById('adminBanner').style.display='flex';
  document.getElementById('btnAdminToggle').textContent='🔓 관리자 (켜짐)';
  showToast('관리자 모드');
}

// ─── 인트로 ────────────────────────────────────────
function initIntro() {
  const overlay = document.getElementById('introOverlay');
  if (!overlay) return;
  overlay.addEventListener('click', () => {
    if (overlay.dataset.animating) return;
    overlay.dataset.animating = '1';
    const prompt = document.getElementById('introClickPrompt');
    if (prompt) prompt.style.opacity = '0';
    const mapEl = document.getElementById('introMap');
    mapEl.style.transition = 'transform 5.0s cubic-bezier(0.4,0,0.2,1), opacity 2.0s ease 4.0s';
    mapEl.style.transformOrigin = '30% 66%';
    mapEl.style.transform = 'scale(3.5)';
    mapEl.style.opacity = '0';
    setTimeout(() => {
      overlay.style.transition = 'opacity 0.6s';
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.style.display='none'; }, 600);
    }, 6200);
  });
}

// ─── 이벤트 바인딩 ──────────────────────────────────
function bindEvents() {
  document.querySelectorAll('.chip[data-section]').forEach(c => {
    c.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-section]').forEach(x=>x.classList.remove('active'));
      c.classList.add('active');
      STATE.section = c.dataset.section;
      render();
    });
  });

  document.querySelectorAll('.view-tab[data-view]').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.view-tab').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      STATE.view = t.dataset.view;
      render();
    });
  });

  // 검색: 엔터로만 실행
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      STATE.search = searchInput.value;
      searchClear.style.display = STATE.search ? 'flex' : 'none';
      render();
    }
    if (e.key === 'Escape') {
      clearSearch();
    }
  });

  searchClear.addEventListener('click', clearSearch);

  function clearSearch() {
    STATE.search = '';
    searchInput.value = '';
    searchClear.style.display = 'none';
    clearTimeout(window._searchReturnTimer);
    render();
  }

  document.getElementById('btnSync').addEventListener('click', loadData);
  document.getElementById('btnAdminToggle').addEventListener('click', toggleAdmin);
  document.getElementById('btnAdminOff').addEventListener('click', () => { STATE.isAdmin=false; document.getElementById('adminBanner').style.display='none'; document.getElementById('btnAdminToggle').textContent='⚙ 관리자 모드'; });
  document.getElementById('modalClose').addEventListener('click', () => document.getElementById('modalOverlay').style.display='none');
  document.getElementById('modalOverlay').addEventListener('click', e => { if(e.target.id==='modalOverlay') e.target.style.display='none'; });
  document.addEventListener('keydown', e => { if(e.key==='Escape') document.getElementById('modalOverlay').style.display='none'; });
}

// ─── 시작 ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  initIntro();
  initMapZoom();
  loadData();
});
