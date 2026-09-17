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

// ─── GAS 호출 — fetch 방식 (모바일 호환성 우선, JSONP 폴백) ───
let _cbIdx = 0;
async function gasCall(action, params={}) {
  if (!GAS_WEB_APP_URL) throw new Error('no url');

  // 1차: fetch로 시도 (모바일에서 안정적)
  try {
    const qs = new URLSearchParams({ action, ...params }).toString();
    const resp = await fetch(GAS_WEB_APP_URL + '?' + qs, { redirect: 'follow' });
    const text = await resp.text();
    // JSONP 응답이면 파싱 (callback 없이도 JSON으로 올 수 있음)
    const json = text.startsWith('{') ? JSON.parse(text)
               : text.match(/\((.+)\);?$/) ? JSON.parse(text.match(/\((.+)\);?$/)[1])
               : null;
    if (json) return json;
  } catch(e) { /* fetch 실패 시 JSONP 폴백 */ }

  // 2차: JSONP 폴백
  return new Promise((resolve, reject) => {
    const cb = 'cb_' + (_cbIdx++);
    const s = document.createElement('script');
    const qs = new URLSearchParams({ action, ...params, callback: cb }).toString();
    window[cb] = d => { resolve(d); delete window[cb]; s.remove(); };
    s.onerror = () => { reject(new Error('JSONP failed')); delete window[cb]; s.remove(); };
    s.src = GAS_WEB_APP_URL + '?' + qs;
    document.body.appendChild(s);
    setTimeout(() => { if(window[cb]){ reject(new Error('timeout')); delete window[cb]; s.remove(); }}, 30000);
  });
}

// ─── 설정 동기화 (백그라운드, 렌더 차단 안 함) ────
async function syncSettings() {
  try {
    const settingsRes = await gasCall('getsettings', {});
    if (!settingsRes.ok || !settingsRes.settings) return;
    const s = settingsRes.settings;

    // 가격 동기화
    if (s.price && s.price.value) {
      localStorage.setItem('ccpc_price_calc', s.price.value);
    }

    // 규정 텍스트 동기화
    const existing = (() => {
      try { return JSON.parse(localStorage.getItem('ccpc_report_2026') || 'null'); }
      catch(e) { return null; }
    })();
    const merged = (Array.isArray(existing) && existing.length === 6) ? [...existing] : Array(6).fill(null);
    let anyReport = false;
    for (let i = 0; i <= 5; i++) {
      const key = `report_${i}`;
      if (s[key] && s[key].value) {
        try {
          const item = JSON.parse(s[key].value);
          if (item && typeof item.title === 'string') {
            merged[i] = item;
            anyReport = true;
          }
        } catch(e) {}
      }
    }
    if (anyReport && merged.every(m => m !== null)) {
      localStorage.setItem('ccpc_report_2026', JSON.stringify(merged));
    }
  } catch(e) {
    console.warn('설정 동기화 실패 (무시):', e.message);
  }
}

// ─── Data Load ─────────────────────────────────────
async function loadData() {
  setSync('로딩 중...');
  if (GAS_WEB_APP_URL) {
    try {
      let lots15 = [], lots16 = [];
      try {
        const res15 = await gasCall('getsection', { section: '15' });
        if (res15.ok && res15.lots) lots15 = res15.lots;
      } catch(e) { console.warn('Section 15 로드 실패:', e.message); }
      try {
        const res16 = await gasCall('getsection', { section: '16' });
        if (res16.ok && res16.lots) lots16 = res16.lots;
      } catch(e) { console.warn('Section 16 로드 실패:', e.message); }

      if (lots15.length > 0 || lots16.length > 0) {
        STATE.data = [...lots15, ...lots16].map(normalize);
        setSync('Google Sheets 연결됨');
        render(); // 먼저 렌더링

        // 설정 동기화는 백그라운드에서 별도로 (렌더 차단 안 함)
        syncSettings();
        return;
      }
    } catch(e) { console.warn('GAS 연결 실패:', e.message); }
  }
  try {
    const r = await fetch('grave-data.json');
    STATE.data = (await r.json()).map(normalize);
    setSync('오프라인 데이터');
  } catch(e) { setSync('데이터 로드 실패'); }
  render();
}

function normalize(r) {
  // GAS는 slot_no 필드명 사용, 로컬 JSON은 grave 필드명 사용
  // id에서 직접 파싱해서 확실히 추출 (id 형식: "16-193-81")
  let grave = r.grave || r.slot_no || '';
  if (!grave && r.id) {
    const parts = String(r.id).split('-');
    if (parts.length >= 3) grave = parts.slice(2).join('-'); // 하이픈 포함 grave번호 지원
  }
  return {
    id: r.id || `${r.section}-${r.lot}-${grave}`,
    section: String(r.section || ''),
    lot: String(r.lot || ''),
    grave: String(grave),
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
  // MAP_LAYOUTS를 정의된 유일한 소스(Single Source of Truth)로 사용
  // List View도 Map View와 동일한 lot/grave 구조를 기준으로 렌더링
  const sec = STATE.section;
  const layout = MAP_LAYOUTS[sec];
  const q = STATE.search.trim().toLowerCase();

  const lots = {};

  layout.lots.forEach(lotDef => {
    if (lotDef.graves.length === 0) return; // 빈 블록(우리 구역 아님) 제외

    if (!lots[lotDef.lot]) lots[lotDef.lot] = [];

    lotDef.graves.forEach(grave => {
      // 이미 같은 lot+grave 조합이 있으면 중복 추가 안 함
      if (lots[lotDef.lot].some(r => r.grave === grave)) return;

      // STATE.data에서 실제 데이터(이름, 상태 등) 매칭
      const r = findRecord(sec, lotDef.lot, grave);
      const record = r || {
        id: `${sec}-${lotDef.lot}-${grave}`,
        section: sec, lot: lotDef.lot, grave,
        status: 'A', name: '', name_kr: '', dir: ''
      };

      // 검색 필터는 renderList에서 강조로 처리 — 여기서는 항상 전체 반환
      lots[lotDef.lot].push(record);
    });

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
  document.getElementById('viewReport').style.display= STATE.view === 'report'  ? '' : 'none';
  document.getElementById('searchWrap').style.display =
    (STATE.view === 'list' || STATE.view === 'map') ? '' : 'none';

  // Map View일 때만 줌 버튼 표시
  const zoomBtns = document.getElementById('mapZoomBtns');
  if (zoomBtns) zoomBtns.style.display = STATE.view === 'map' ? 'flex' : 'none';

  if (STATE.view === 'list')    renderList();
  if (STATE.view === 'map')     renderMap();   // renderMap 내부에서 그리드를 재생성하므로 blink 자동 초기화
  if (STATE.view === 'pdfview') renderPdfView();
  if (STATE.view === 'stats')   renderStats();
  if (STATE.view === 'report')  renderReportView();
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
            <div class="lv-cell lv-name">
              ${r.status === 'A' ? '<span class="avail-dash">—</span>' :
                window.innerWidth <= 720
                  ? `<div class="lv-name-combined"><span class="lv-name-en">${escHtml(r.name)}</span>${krVal ? `<span class="lv-name-ko">${escHtml(krVal)}</span>` : ''}</div>`
                  : escHtml(r.name)
              }
            </div>
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
        showToast(`Section ${STATE.section}, Lot ${foundLots[0]} 에서 찾았습니다.`);
      } else {
        showToast(`Section ${STATE.section}, Lot ${foundLots.join(', ')} 에서 ${foundRows.length}명 찾았습니다.`);
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
      if (!STATE.isAdmin) return; // 조회 모드 — 수정 불가
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
    gridCols: 36, gridRows: 8,
    lots: [
      // ── row 1: WEST 레이블 (grid 내 배치) ──────────────
      // ── row 2~3: 상단 열 (286~278) ─────────────────────
      { lot:'286', col:1,  row:2, cols:4, graves:['57','58','59','60'] },
      { lot:'285', col:5,  row:2, cols:4, graves:['61','62','31','32'] },
      { lot:'284', col:9,  row:2, cols:4, graves:['51','52','53','54','33','34','35'] },
      { lot:'283', col:13, row:2, cols:3, graves:['36','37','38'] },
      { lot:'282', col:16, row:2, cols:1, graves:[] },
      { lot:'282', col:16, row:3, cols:1, graves:['39'] },
      { lot:'281', col:17, row:2, cols:4, graves:['40','41','55','56'] },
      { lot:'280', col:21, row:2, cols:4, graves:['42','43','44','45'] },
      { lot:'279', col:25, row:2, cols:1, graves:['46'] },
      { lot:'278', col:26, row:2, cols:3, graves:['48','49','50'] },
      // ── row 4: EAST 레이블 (grid 내 배치) ──────────────
      // ── row 5~6: 하단 열 (233~242) ─────────────────────
      { lot:'233', col:1,  row:5, cols:1, graves:['63'] },
      { lot:'234', col:2,  row:5, cols:4, graves:['64','65','66','67','1','2','69','70'] },
      { lot:'235', col:6,  row:5, cols:4, graves:['68','1b','2b','3b','71','72','73','74'] },
      { lot:'236', col:10, row:5, cols:4, graves:['4','5','6','7'] },
      { lot:'237', col:14, row:5, cols:4, graves:['8','9','10','11'] },
      { lot:'238', col:18, row:5, cols:4, graves:['12','13','14','15','75','76'] },
      { lot:'239', col:22, row:5, cols:4, graves:['16','17','18','19','77','78','79','80'] },
      { lot:'240', col:26, row:5, cols:4, graves:['20','21','22','23'] },
      { lot:'241', col:30, row:5, cols:3, graves:['24','25','26'] },
      { lot:'242', col:33, row:5, cols:3, graves:['28','29','30'] },
      // ── row 7: SOUTH / NORTH 레이블 (grid 내 배치) ──────
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
      { lot:'197', col:43, row:3, cols:4, graves:['145','146','147','148','149','150','151','152'] },
      { lot:'198', col:47, row:3, cols:4, graves:['161','162','163','164','165','166','167','168'] },
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
      { lot:'140', col:31, row:7, cols:4, graves:['4','3','2','1'] },
      { lot:'141', col:35, row:7, cols:4, graves:['4','3','2','1'] },
      { lot:'142', col:39, row:7, cols:4, graves:['4','3','2','1'] },
      { lot:'143', col:43, row:7, cols:4, graves:['4','3','2','1'] },
      { lot:'144', col:47, row:7, cols:4, graves:['4','3','2','1'] },
    ]
  }
};

// 통계 Available 클릭 → 해당 섹션 Map View로 전환 + Available 셀 빨간 깜빡임
function showAvailableOnMap(sec) {
  // 섹션 전환
  STATE.section = sec;
  document.querySelectorAll('.chip[data-section]').forEach(c => {
    c.classList.toggle('active', c.dataset.section === sec);
  });

  // Map View 탭 활성화
  STATE.view = 'map';
  document.querySelectorAll('.view-tab[data-view]').forEach(t => {
    t.classList.toggle('active', t.dataset.view === 'map');
  });

  // 렌더링 후 Available 셀 강조
  render();

  setTimeout(() => {
    const wrap = document.getElementById('mapImgWrap');
    if (!wrap) return;
    let first = null;
    wrap.querySelectorAll('.imap-cell').forEach(cell => {
      const { sec: csec, lot, grave } = cell.dataset;
      const r = findRecord(csec, lot, grave);
      const status = r ? r.status : 'A';
      if (status === 'A') {
        cell.classList.add('available-blink');
        if (!first) first = cell;
      }
    });
    // 첫 번째 Available 셀로 스크롤
    if (first) {
      setTimeout(() => first.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }), 200);
    }
    showToast(`Section ${sec} — Available ${document.querySelectorAll('.available-blink').length}개 표시 중 (클릭하면 정지)`);

    // 아무데나 클릭하면 blink 정지 → 빨간 라인 유지
    function stopBlink() {
      document.querySelectorAll('.imap-cell.available-blink').forEach(cell => {
        cell.classList.remove('available-blink');
        cell.classList.add('available-stopped');
      });
    }
    document.addEventListener('click', stopBlink, { once: true });
  }, 150);
}

// 통계 확인 필요 클릭 → 해당 섹션 Map View + 다크 브라운 깜빡임
function showConfirmOnMap(sec) {
  STATE.section = sec;
  document.querySelectorAll('.chip[data-section]').forEach(c => {
    c.classList.toggle('active', c.dataset.section === sec);
  });
  STATE.view = 'map';
  document.querySelectorAll('.view-tab[data-view]').forEach(t => {
    t.classList.toggle('active', t.dataset.view === 'map');
  });
  render();

  setTimeout(() => {
    const wrap = document.getElementById('mapImgWrap');
    if (!wrap) return;
    let first = null;
    wrap.querySelectorAll('.imap-cell').forEach(cell => {
      const { sec: csec, lot, grave } = cell.dataset;
      const r = findRecord(csec, lot, grave);
      const status = r ? r.status : 'A';
      if (status === 'C') {
        cell.classList.add('confirm-blink');
        if (!first) first = cell;
      }
    });
    if (first) {
      setTimeout(() => first.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }), 200);
    }
    const cnt = document.querySelectorAll('.confirm-blink').length;
    showToast(`Section ${sec} — 확인 필요 ${cnt}개 표시 중 (클릭하면 정지)`);

    function stopConfirmBlink() {
      document.querySelectorAll('.imap-cell.confirm-blink').forEach(cell => {
        cell.classList.remove('confirm-blink');
        cell.classList.add('confirm-stopped');
      });
    }
    document.addEventListener('click', stopConfirmBlink, { once: true });
  }, 150);
}

// ─── 구역도 팝업 ────────────────────────────────────
let _mvScale = 1;
let _mvBlinkTimer = null;

// joined 이미지(2000px 기준) 내 lot 좌표 매핑
// S15: row26 기준, 셀 크기 ~9.8x13.9px
// S16: 추후 추가
const LOT_COORDS = {
  '15': {
    '1':{x:941,y:830},'2':{x:933,y:830},'3':{x:924,y:830},'4':{x:916,y:830},'5':{x:908,y:830},'6':{x:900,y:830},'7':{x:892,y:830},'8':{x:883,y:830},
    '9':{x:871,y:830},'10':{x:859,y:830},'11':{x:851,y:830},'12':{x:843,y:830},'13':{x:834,y:830},'14':{x:825,y:830},'15':{x:817,y:830},'16':{x:805,y:830},
    '17':{x:792,y:830},'18':{x:781,y:830},'19':{x:772,y:830},'20':{x:507,y:693},'21':{x:516,y:693},'22':{x:524,y:693},'23':{x:533,y:693},'24':{x:541,y:693},
    '25':{x:549,y:693},'26':{x:558,y:693},'27':{x:566,y:693},'28':{x:574,y:693},'29':{x:587,y:693},'30':{x:599,y:693},'31':{x:607,y:693},'32':{x:615,y:693},
    '33':{x:623,y:693},'34':{x:632,y:693},'35':{x:640,y:693},'36':{x:648,y:693},'37':{x:656,y:693},'38':{x:664,y:693},'39':{x:673,y:693},'40':{x:680,y:693},
    '41':{x:688,y:693},'42':{x:697,y:693},'43':{x:705,y:693},'44':{x:714,y:693},'45':{x:723,y:693},'46':{x:735,y:693},'47':{x:747,y:693},'48':{x:755,y:693},
    '49':{x:764,y:693},'50':{x:772,y:693},'51':{x:781,y:693},'52':{x:792,y:693},'53':{x:805,y:693},'54':{x:817,y:693},'55':{x:825,y:693},'56':{x:834,y:693},
    '57':{x:843,y:693},'58':{x:851,y:693},'59':{x:859,y:693},'60':{x:871,y:693},'61':{x:883,y:693},'62':{x:892,y:693},'63':{x:900,y:693},'64':{x:908,y:693},
    '65':{x:916,y:693},'66':{x:924,y:693},'67':{x:933,y:693},'68':{x:941,y:693},'69':{x:953,y:693},'70':{x:965,y:693},'71':{x:974,y:693},'72':{x:982,y:693},
    '73':{x:990,y:693},'74':{x:998,y:693},'75':{x:1007,y:693},'76':{x:1015,y:693},'77':{x:1023,y:693},'78':{x:1031,y:693},'79':{x:1041,y:693},'80':{x:1053,y:693},
    '81':{x:1064,y:693},'82':{x:1073,y:693},'83':{x:1086,y:693},'84':{x:1098,y:693},'85':{x:1106,y:693},'86':{x:1119,y:693},'87':{x:1136,y:693},'88':{x:1064,y:705},
    '89':{x:1053,y:705},'90':{x:1041,y:705},'91':{x:1031,y:705},'92':{x:1023,y:705},'93':{x:1015,y:705},'94':{x:1007,y:705},'95':{x:998,y:705},'96':{x:990,y:705},
    '97':{x:982,y:705},'98':{x:974,y:705},'99':{x:965,y:705},'100':{x:953,y:705},'101':{x:941,y:705},'102':{x:933,y:705},'103':{x:924,y:705},'104':{x:916,y:705},
    '105':{x:908,y:705},'106':{x:900,y:705},'107':{x:892,y:705},'108':{x:883,y:705},'109':{x:871,y:705},'110':{x:859,y:705},'111':{x:851,y:705},'112':{x:843,y:705},
    '113':{x:834,y:705},'114':{x:825,y:705},'115':{x:817,y:705},'116':{x:805,y:705},'117':{x:792,y:705},'118':{x:781,y:705},'119':{x:772,y:705},'120':{x:764,y:705},
    '121':{x:755,y:705},'122':{x:747,y:705},'123':{x:735,y:705},'124':{x:723,y:705},'125':{x:714,y:705},'126':{x:705,y:705},'127':{x:697,y:705},'128':{x:688,y:705},
    '129':{x:680,y:705},'130':{x:673,y:705},'131':{x:664,y:705},'132':{x:656,y:705},'133':{x:648,y:705},'134':{x:640,y:705},'135':{x:632,y:705},'136':{x:623,y:705},
    '137':{x:615,y:705},'138':{x:607,y:705},'139':{x:599,y:705},'140':{x:587,y:705},'141':{x:574,y:705},'142':{x:566,y:705},'143':{x:558,y:705},'144':{x:549,y:705},
    '145':{x:541,y:705},'146':{x:533,y:705},'147':{x:524,y:705},'148':{x:516,y:705},'149':{x:507,y:705},'150':{x:516,y:666},'151':{x:524,y:666},'152':{x:533,y:666},
    '153':{x:541,y:666},'154':{x:549,y:666},'155':{x:558,y:666},'156':{x:566,y:666},'157':{x:574,y:666},'158':{x:1136,y:643},'159':{x:1119,y:643},'160':{x:1136,y:607},
    '161':{x:1119,y:607},'162':{x:1106,y:607},'163':{x:1098,y:607},'164':{x:1086,y:607},'165':{x:1073,y:607},'166':{x:1064,y:607},'167':{x:1053,y:607},'168':{x:1041,y:607},
    '169':{x:1031,y:607},'170':{x:1023,y:607},'171':{x:1015,y:607},'172':{x:1007,y:607},'173':{x:998,y:607},'174':{x:990,y:607},'175':{x:982,y:607},'176':{x:974,y:607},
    '177':{x:965,y:607},'178':{x:953,y:607},'179':{x:941,y:607},'180':{x:933,y:607},'181':{x:924,y:607},'182':{x:916,y:607},'183':{x:908,y:607},'184':{x:900,y:607},
    '185':{x:892,y:607},'186':{x:883,y:607},'187':{x:871,y:607},'188':{x:859,y:607},'189':{x:851,y:607},'190':{x:843,y:607},'191':{x:834,y:607},'192':{x:825,y:607},
    '193':{x:817,y:607},'194':{x:805,y:607},'195':{x:792,y:607},'196':{x:516,y:595},'197':{x:524,y:595},'198':{x:533,y:595},'199':{x:541,y:595},'200':{x:549,y:595},
    '201':{x:558,y:595},'202':{x:566,y:595},'203':{x:574,y:595},'204':{x:587,y:595},'205':{x:599,y:595},'206':{x:607,y:595},'207':{x:615,y:595},'208':{x:623,y:595},
    '209':{x:632,y:595},'210':{x:640,y:595},'211':{x:648,y:595},'212':{x:656,y:595},'213':{x:664,y:595},'214':{x:673,y:595},'215':{x:680,y:595},'216':{x:688,y:595},
    '217':{x:697,y:595},'218':{x:705,y:595},'219':{x:714,y:595},'220':{x:723,y:595},'221':{x:735,y:595},'222':{x:747,y:595},'223':{x:755,y:595},'224':{x:764,y:595},
    '225':{x:772,y:595},'226':{x:781,y:595},'227':{x:792,y:595},'228':{x:1136,y:584},'229':{x:1119,y:584},'230':{x:1106,y:584},'231':{x:1119,y:573},'232':{x:1106,y:573},
    '233':{x:1106,y:549},'234':{x:1098,y:549},'235':{x:1086,y:549},'236':{x:1073,y:549},'237':{x:1064,y:549},'238':{x:1053,y:549},'239':{x:1041,y:549},'240':{x:1031,y:549},
    '241':{x:1023,y:549},'242':{x:1015,y:549},'243':{x:1007,y:549},'244':{x:998,y:549},'245':{x:990,y:549},'246':{x:982,y:549},'247':{x:974,y:549},'248':{x:965,y:549},
    '249':{x:953,y:549},'250':{x:941,y:549},'251':{x:933,y:549},'252':{x:924,y:549},'253':{x:916,y:549},'254':{x:908,y:549},'255':{x:900,y:549},'256':{x:892,y:549},
    '257':{x:883,y:549},'258':{x:871,y:549},'259':{x:859,y:549},'260':{x:851,y:549},'261':{x:843,y:549},'262':{x:834,y:549},'263':{x:825,y:549},'264':{x:817,y:549},
    '265':{x:805,y:549},'266':{x:792,y:549},'267':{x:781,y:549},'268':{x:772,y:549},'269':{x:764,y:549},'270':{x:755,y:549},'271':{x:747,y:549},'272':{x:735,y:549},
    '273':{x:723,y:549},'274':{x:714,y:549},'275':{x:705,y:549},'276':{x:697,y:549},'277':{x:688,y:549},'278':{x:680,y:549},'279':{x:673,y:549},'280':{x:664,y:549},
    '281':{x:656,y:549},'282':{x:648,y:549},'283':{x:640,y:549},'284':{x:632,y:549},'285':{x:623,y:549},'286':{x:615,y:549},'287':{x:607,y:549},'288':{x:599,y:549},
    '289':{x:587,y:549},'290':{x:574,y:549},'291':{x:566,y:549},'292':{x:558,y:549},'293':{x:549,y:549},'294':{x:541,y:549},'295':{x:566,y:563},'296':{x:558,y:563},
    '297':{x:549,y:563},'298':{x:541,y:563},'299':{x:1053,y:495},'300':{x:1041,y:495},'301':{x:1031,y:495},'302':{x:1041,y:486},'303':{x:1031,y:486},'304':{x:1023,y:486},
    '305':{x:1015,y:486},'306':{x:1007,y:486},'307':{x:998,y:486},'308':{x:990,y:486},'309':{x:982,y:486},'310':{x:974,y:486},'311':{x:965,y:486},'312':{x:953,y:486},
    '313':{x:941,y:486},'314':{x:933,y:486},'315':{x:924,y:486},'316':{x:916,y:486},'317':{x:908,y:486},'318':{x:900,y:486},'319':{x:892,y:486},'320':{x:883,y:486},
    '321':{x:871,y:486},'322':{x:859,y:486},'323':{x:851,y:486},'324':{x:843,y:486},'325':{x:834,y:486},'326':{x:825,y:486},'327':{x:817,y:486},'328':{x:805,y:486},
    '329':{x:792,y:486},'330':{x:781,y:486},'331':{x:772,y:486},'332':{x:764,y:486},'333':{x:755,y:486},'334':{x:747,y:486},'335':{x:735,y:486},'336':{x:723,y:486},
    '337':{x:714,y:486},'338':{x:705,y:486},'339':{x:697,y:486},'340':{x:688,y:486},'341':{x:680,y:486},'342':{x:673,y:486},'343':{x:664,y:486},'344':{x:656,y:486},
    '345':{x:648,y:486},'346':{x:640,y:486},'347':{x:632,y:486},'348':{x:623,y:486},'349':{x:615,y:486},'350':{x:607,y:486},'351':{x:1015,y:457},'352':{x:1007,y:457},
    '353':{x:998,y:457},'354':{x:990,y:457},'355':{x:982,y:457},'356':{x:974,y:457},'357':{x:990,y:426},'358':{x:982,y:426},'359':{x:974,y:426},'360':{x:965,y:426},
    '361':{x:953,y:426},'362':{x:941,y:426},'363':{x:933,y:426},'364':{x:924,y:426},'365':{x:916,y:426},'366':{x:908,y:426},'367':{x:900,y:426},'368':{x:892,y:426},
    '369':{x:883,y:426},'370':{x:871,y:426},'371':{x:859,y:426},'372':{x:851,y:426},'373':{x:843,y:426},'374':{x:834,y:426},'375':{x:825,y:426},'376':{x:817,y:426},
    '377':{x:805,y:426},'378':{x:792,y:426},'379':{x:781,y:426},'380':{x:772,y:426},'381':{x:764,y:426},'382':{x:755,y:426},'383':{x:747,y:426},'384':{x:735,y:426},
    '385':{x:723,y:426},'386':{x:714,y:426},'387':{x:705,y:426},'388':{x:697,y:426},'389':{x:688,y:426},'390':{x:680,y:426},'391':{x:673,y:426},'392':{x:664,y:426},
    '393':{x:656,y:426},'394':{x:648,y:426},'395':{x:640,y:426},'396':{x:632,y:426},'397':{x:965,y:402},'398':{x:953,y:402},'399':{x:941,y:402},'400':{x:933,y:402},
    '401':{x:924,y:402},'402':{x:916,y:402},'403':{x:908,y:402},'404':{x:900,y:402},'405':{x:892,y:402},'406':{x:883,y:402},'407':{x:871,y:402},'408':{x:859,y:402},
    '409':{x:851,y:402},'410':{x:843,y:402},'411':{x:834,y:402},'412':{x:825,y:402},'413':{x:817,y:402},'414':{x:805,y:402},'415':{x:792,y:402},'416':{x:781,y:402},
    '417':{x:772,y:402},'418':{x:764,y:402},'419':{x:755,y:402},'420':{x:747,y:402},'421':{x:735,y:402},'422':{x:723,y:402},'423':{x:714,y:402},'424':{x:705,y:402},
    '425':{x:697,y:402},'426':{x:688,y:402},'427':{x:680,y:402},'428':{x:673,y:402},'429':{x:664,y:402},'430':{x:656,y:402},'431':{x:648,y:402},'432':{x:908,y:340},
    '433':{x:900,y:340},'434':{x:892,y:340},'435':{x:883,y:340},'436':{x:871,y:340},'437':{x:859,y:340},'438':{x:851,y:340},'439':{x:843,y:340},'440':{x:834,y:340},
    '441':{x:825,y:340},'442':{x:817,y:340},'443':{x:805,y:340},'444':{x:792,y:340},'445':{x:781,y:340},'446':{x:772,y:340},'447':{x:764,y:340},'448':{x:871,y:310},
    '449':{x:859,y:310},'450':{x:851,y:310},'451':{x:843,y:310},'452':{x:834,y:310},'453':{x:825,y:310},'454':{x:817,y:310},'455':{x:805,y:310},'456':{x:792,y:310},
    '457':{x:781,y:310},'458':{x:772,y:310},'459':{x:764,y:310},'460':{x:755,y:310},'461':{x:747,y:310},'462':{x:735,y:310},'463':{x:723,y:310},'464':{x:714,y:310},
    '465':{x:705,y:310},'466':{x:697,y:310}
  },
  '16': {
    '1':{x:644,y:223},'11':{x:653,y:236},'12':{x:623,y:236},'32':{x:614,y:236},'35':{x:586,y:236},'36':{x:586,y:253},'139':{x:328,y:670},'140':{x:365,y:670},
    '141':{x:403,y:670},'142':{x:440,y:670},'143':{x:478,y:670},'144':{x:515,y:670},'149':{x:492,y:236},'150':{x:492,y:223},'165':{x:515,y:492},'166':{x:478,y:492},
    '167':{x:440,y:492},'168':{x:403,y:492},'169':{x:365,y:492},'170':{x:328,y:492},'186':{x:74,y:313},'187':{x:102,y:313},'188':{x:140,y:313},'189':{x:177,y:313},
    '190':{x:215,y:313},'191':{x:252,y:313},'192':{x:290,y:313},'193':{x:328,y:313},'194':{x:365,y:313},'195':{x:403,y:313},'196':{x:440,y:313},'197':{x:478,y:313},
    '198':{x:515,y:313},'199':{x:544,y:313},'200':{x:572,y:313},'201':{x:609,y:313},'202':{x:647,y:313},'203':{x:685,y:313},'204':{x:722,y:313},'205':{x:760,y:313},
    '206':{x:788,y:313},'230':{x:130,y:134},'231':{x:102,y:134},'232':{x:74,y:134}
  }
};
// 셀 크기 (joined 2000px 기준)
const LOT_CELL = { w: 10, h: 14 };

function openMapViewer(sec, lotNo) {
  _mvScale = 1;
  const img = document.getElementById('mapviewerImg');
  img.style.transform = 'scale(1)';
  img.style.transformOrigin = 'top left';

  const title = lotNo
    ? `⛪ 구역도 — Section ${sec} · Lot ${lotNo}`
    : '⛪ CCPC 묘지 구역도 (Section 15 & 16)';
  document.getElementById('mapviewerTitle').textContent = title;
  document.getElementById('mapviewerOverlay').style.display = 'flex';

  // 드래그
  const body = document.getElementById('mapviewerBody');
  let drag=false, sx, sy, sl, st;
  const onDown  = e => { drag=true; sx=e.pageX; sy=e.pageY; sl=body.scrollLeft; st=body.scrollTop; body.style.cursor='grabbing'; };
  const onUp    = () => { drag=false; body.style.cursor='grab'; };
  const onMove  = e => { if(!drag) return; body.scrollLeft=sl-(e.pageX-sx); body.scrollTop=st-(e.pageY-sy); };
  body.addEventListener('mousedown', onDown);
  body.addEventListener('mouseleave', onUp);
  body.addEventListener('mouseup', onUp);
  body.addEventListener('mousemove', onMove);

  // 기존 블링크 제거
  const old = document.getElementById('mvBlink');
  if (old) old.remove();
  if (_mvBlinkTimer) { clearInterval(_mvBlinkTimer); _mvBlinkTimer = null; }

  // lot 번호가 있으면 블링크 박스 표시
  if (lotNo && LOT_COORDS[sec] && LOT_COORDS[sec][lotNo]) {
    const coord = LOT_COORDS[sec][lotNo];
    setTimeout(() => {
      const imgEl = document.getElementById('mapviewerImg');
      const imgRect = imgEl.getBoundingClientRect();
      // joined 이미지 2000px 기준 → 실제 표시 픽셀 변환
      const dispW = imgRect.width;  // 실제 표시 너비
      const scaleF = dispW / 2000;
      
      const bx = coord.x * scaleF - (LOT_CELL.w * scaleF / 2);
      const by = coord.y * scaleF - (LOT_CELL.h * scaleF / 2);
      const bw = LOT_CELL.w * scaleF * 1.5;
      const bh = LOT_CELL.h * scaleF * 2;

      const blink = document.createElement('div');
      blink.id = 'mvBlink';
      blink.style.cssText = `
        position:absolute;
        left:${bx}px; top:${by}px;
        width:${bw}px; height:${bh}px;
        border:2.5px solid #e63946;
        border-radius:3px;
        pointer-events:none;
        z-index:20;
        box-shadow:0 0 8px rgba(230,57,70,.6);
      `;
      document.getElementById('mapviewerBody').appendChild(blink);

      // 3초 주기 블링크
      let visible = true;
      _mvBlinkTimer = setInterval(() => {
        visible = !visible;
        blink.style.opacity = visible ? '1' : '0';
      }, 500);

      // 해당 위치로 스크롤
      body.scrollLeft = Math.max(0, bx - body.clientWidth/2);
      body.scrollTop  = Math.max(0, by - body.clientHeight/2);

      showToast(`Section ${sec} · Lot ${lotNo} 위치 표시 중`);
    }, 200);
  }
}

function mapviewerZoom(f) {
  _mvScale = Math.min(Math.max(_mvScale*f, 0.3), 5);
  const img = document.getElementById('mapviewerImg');
  img.style.transform = `scale(${_mvScale})`;
  img.style.transformOrigin = 'top left';
}
function mapviewerReset() {
  _mvScale = 1;
  const img = document.getElementById('mapviewerImg');
  img.style.transform = 'scale(1)';
  const body = document.getElementById('mapviewerBody');
  body.scrollLeft = 0; body.scrollTop = 0;
}

function findRecord(sec, lot, grave) {
  // 모두 문자열로 변환해서 비교 (GAS에서 숫자로 올 수 있음)
  const s = String(sec), l = String(lot), g = String(grave);
  return STATE.data.find(r =>
    String(r.section) === s && String(r.lot) === l && String(r.grave) === g
  );
}

function renderMap() {
  const wrap = document.getElementById('mapImgWrap');
  if (!wrap) return;
  const sec = STATE.section;
  const layout = MAP_LAYOUTS[sec];
  if (!layout) return;

  let html = `<div class="imap-grid" style="grid-template-columns:repeat(${layout.gridCols},1fr);grid-template-rows:repeat(${layout.gridRows},auto);">`;

  // ── 방향 레이블 — grid 내 정확한 위치에 배치 ──────────
  if (sec === '15') {
    // WEST: lot 281 상단 (col 17, row 1)
    html += `<div class="imap-dir-cell" style="grid-column:17/span 4;grid-row:1;">WEST</div>`;
    // EAST: lot 238 하단 셀(75,76) 아래 (col 18, row 7)
    html += `<div class="imap-dir-cell" style="grid-column:18/span 4;grid-row:7;">EAST</div>`;
    // SOUTH: 233 왼쪽 (col 1, row 8)
    html += `<div class="imap-dir-cell imap-dir-side" style="grid-column:1/span 1;grid-row:8;">SOUTH</div>`;
    // NORTH: 242 오른쪽 (col 36, row 8)
    html += `<div class="imap-dir-cell imap-dir-side" style="grid-column:36/span 1;grid-row:8;">NORTH</div>`;
  }
  if (sec === '16') {
    // WEST: lot 195 상단 (col 35, row 2)
    html += `<div class="imap-dir-cell" style="grid-column:35/span 4;grid-row:2;">WEST</div>`;
    // EAST: lot 141 하단 (col 35, row 8)
    html += `<div class="imap-dir-cell" style="grid-column:35/span 4;grid-row:8;">EAST</div>`;
  }

  const seenLots = new Set(); // 같은 lot이 여러 블록일 때 라벨은 첫 번째만

  layout.lots.forEach(lotDef => {
    const nCols = lotDef.cols || 1;
    const nRows = lotDef.graves.length > 0 ? Math.ceil(lotDef.graves.length / nCols) : 1;
    const isContinuation = seenLots.has(lotDef.lot);
    seenLots.add(lotDef.lot);

    // 연속 블록(같은 lot의 두 번째~)은 위 블록과 시각적으로 이어지게
    const extraStyle = isContinuation ? 'border-top:none;margin-top:-1px;' : '';
    const emptyClass = lotDef.graves.length === 0 ? ' imap-lot-empty' : '';
    html += `<div class="imap-lot${isContinuation ? ' imap-lot-cont' : ''}${emptyClass}" style="grid-column:${lotDef.col}/span ${nCols};grid-row:${lotDef.row}/span ${nRows};${extraStyle}">`;

    // 첫 번째 블록만 lot 라벨 표시
    if (!isContinuation) {
      html += `<div class="imap-lot-label">${lotDef.lot}</div>`;
    }

    html += `<div class="imap-cells" style="grid-template-columns:repeat(${nCols},1fr);">`;

    if (lotDef.graves.length === 0) {
      // 빈 블록 — 셀 없이 얇은 테두리 라인으로만 표시 (우리 구역 아님)
      html += `<div style="flex:1;"></div>`;
    } else {
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
    }

    html += `</div></div>`;
  });

  html += `</div>`;

  wrap.innerHTML = html;

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
        showToast(`Section ${STATE.section}, Lot ${foundLots[0]} 에서 찾았습니다.`);
      } else {
        showToast(`Section ${STATE.section}, Lot ${foundLots.join(', ')} 에서 ${matchedCells.length}명 찾았습니다.`);
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
      if (!STATE.isAdmin) return; // 조회 모드 — 수정 불가
      const { sec, lot, grave } = cell.dataset;
      let r = findRecord(sec, lot, grave);
      if (!r) {
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
    <button class="btn" onclick="openMapViewer('${r.section}','${r.lot}')">🗾 구역도</button>
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
  const sections = ['15','16'];
  const bySection = {};

  sections.forEach(s => {
    bySection[s] = { total:0, available:0, used:0, reserved:0, confirmed:0, lots: new Set() };
    const layout = MAP_LAYOUTS[s];
    if (!layout) return;

    layout.lots.forEach(lotDef => {
      if (lotDef.graves.length === 0) return; // 빈 블록 제외

      lotDef.graves.forEach(grave => {
        // 중복 grave 제외 (같은 lot이 두 블록으로 나뉜 경우)
        const uid = `${s}-${lotDef.lot}-${grave}`;
        if (bySection[s]._seen) {
          if (bySection[s]._seen.has(uid)) return;
        } else {
          bySection[s]._seen = new Set();
        }
        bySection[s]._seen.add(uid);

        // 검색 필터
        if (q) {
          const r = findRecord(s, lotDef.lot, grave);
          const matches =
            lotDef.lot.toLowerCase().includes(q) ||
            grave.toLowerCase().includes(q) ||
            (r && (r.name||'').toLowerCase().includes(q)) ||
            (r && (r.name_kr||'').toLowerCase().includes(q));
          if (!matches) return;
        }

        bySection[s].total++;
        bySection[s].lots.add(lotDef.lot);

        const r = findRecord(s, lotDef.lot, grave);
        const status = r ? r.status : 'A';
        if (status==='A') bySection[s].available++;
        else if (status==='R') bySection[s].reserved++;
        else if (status==='C') bySection[s].confirmed++;
        else bySection[s].used++;
      });
    });
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
        <div class="stats-cell available stats-cell-clickable" onclick="showAvailableOnMap('${s}')" title="클릭 → Map View에서 Available 표시">
          <div class="stats-cell-num">${d.available}</div>
          <div class="stats-cell-lbl">Available</div>
          <div class="stats-cell-pct">${d.total?Math.round(d.available/d.total*100):0}%</div>
          <div class="stats-cell-hint">🗺 지도에서 보기</div>
        </div>
        <div class="stats-cell used"><div class="stats-cell-num">${d.used}</div><div class="stats-cell-lbl">사용중</div><div class="stats-cell-pct">${d.total?Math.round(d.used/d.total*100):0}%</div></div>
        <div class="stats-cell reserved"><div class="stats-cell-num">${d.reserved}</div><div class="stats-cell-lbl">Reserved</div><div class="stats-cell-pct">${d.total?Math.round(d.reserved/d.total*100):0}%</div></div>
        <div class="stats-cell confirmed stats-cell-clickable" onclick="showConfirmOnMap('${s}')" title="클릭 → Map View에서 확인 필요 표시">
          <div class="stats-cell-num">${d.confirmed}</div>
          <div class="stats-cell-lbl">확인 필요</div>
          <div class="stats-cell-pct">${d.total?Math.round(d.confirmed/d.total*100):0}%</div>
          <div class="stats-cell-hint">🗺 지도에서 보기</div>
        </div>
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
  document.getElementById('modalFooter').innerHTML = `
    <button class="btn" onclick="openMapViewer('${r.section}','${r.lot}')">🗾 구역도</button>
    <button class="btn" onclick="document.getElementById('modalOverlay').style.display='none'">닫기</button>
  `;
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
  if (STATE.isAdmin) { STATE.isAdmin=false; document.getElementById('btnAdminToggle').textContent='⚙ 관리자 모드'; showToast('관리자 모드 해제'); return; }
  const pin = prompt('관리자 PIN:');
  if (pin === null) return;
  if (pin !== '0000') { showToast('PIN이 틀렸습니다', true); return; }
  STATE.isAdmin = true;
  
  document.getElementById('btnAdminToggle').textContent='🔓 관리자 모드';
  showToast('관리자 모드');
}

// ─── 인트로 ────────────────────────────────────────
// 인트로 버튼에서 호출 — 조회/관리자 모드 선택
// 관리자 비밀번호 확인
function checkAdminPassword() {
  const overlay = document.getElementById('introOverlay');
  if (!overlay || overlay.dataset.animating) return;

  // 인트로 위에 비밀번호 입력 레이어 생성
  let pwLayer = document.getElementById('pwLayer');
  if (pwLayer) { pwLayer.remove(); }

  pwLayer = document.createElement('div');
  pwLayer.id = 'pwLayer';
  pwLayer.style.cssText = `
    position:fixed; inset:0; z-index:20000;
    display:flex; align-items:center; justify-content:center;
    background:rgba(0,0,0,0.6);
  `;
  pwLayer.innerHTML = `
    <div style="background:white;border-radius:16px;padding:32px 36px;text-align:center;min-width:280px;box-shadow:0 8px 32px rgba(0,0,0,.3);">
      <div style="font-size:28px;margin-bottom:10px;">🔑</div>
      <div style="font-family:var(--font-display);font-size:17px;font-weight:700;margin-bottom:4px;">관리자 모드</div>
      <div style="font-size:12px;color:#888;margin-bottom:20px;">장례 위원장 전용</div>
      <input id="pwInput" type="password" maxlength="10"
        placeholder="비밀번호 입력"
        style="width:100%;padding:10px 14px;border:2px solid #ddd;border-radius:8px;font-size:18px;text-align:center;letter-spacing:6px;outline:none;box-sizing:border-box;font-family:monospace;"
        onkeydown="if(event.key==='Enter')submitPw();">
      <div id="pwError" style="color:#e63946;font-size:12px;margin-top:8px;min-height:18px;"></div>
      <div style="display:flex;gap:10px;margin-top:16px;">
        <button onclick="document.getElementById('pwLayer').remove()"
          style="flex:1;padding:10px;border:1px solid #ddd;border-radius:8px;background:white;cursor:pointer;font-size:14px;">취소</button>
        <button onclick="submitPw()"
          style="flex:1;padding:10px;border:none;border-radius:8px;background:#1a365d;color:white;cursor:pointer;font-size:14px;font-weight:700;">확인</button>
      </div>
    </div>`;
  document.body.appendChild(pwLayer);
  setTimeout(() => document.getElementById('pwInput')?.focus(), 100);
}

function submitPw() {
  const input = document.getElementById('pwInput');
  const errEl = document.getElementById('pwError');
  if (!input) return;
  if (input.value === '1424') {
    document.getElementById('pwLayer').remove();
    startApp('admin');
  } else {
    errEl.textContent = '비밀번호가 올바르지 않습니다.';
    input.value = '';
    input.focus();
  }
}

function startApp(mode) {
  const overlay = document.getElementById('introOverlay');
  if (!overlay || overlay.dataset.animating) return;
  overlay.dataset.animating = '1';

  if (mode === 'admin') {
    STATE.isAdmin = true;
    
    document.getElementById('btnAdminToggle').textContent = '🔓 관리자 모드';
    // 관리자 모드: 새로고침 + 관리자 버튼 표시
    document.getElementById('btnSync').style.display = '';
    document.getElementById('btnAdminToggle').style.display = '';
    document.getElementById('btnViewMode').style.display = 'none';
  } else {
    // 조회 모드: 새로고침 숨김, 관리자 버튼 → "조회 모드" 표시
    document.getElementById('btnSync').style.display = 'none';
    document.getElementById('btnAdminToggle').style.display = 'none';
    document.getElementById('btnViewMode').style.display = '';
  }

  // 1단계: 타이틀 박스 페이드아웃
  // animation이 opacity를 제어하므로 먼저 animation을 끊고 설정
  const center = document.getElementById('introCenter');
  if (center) {
    // 현재 계산된 transform 값을 먼저 읽어서 고정
    const computed = window.getComputedStyle(center);
    const currentTransform = computed.transform;
    center.style.animation = 'none';
    center.style.transform = currentTransform;
    center.style.opacity = computed.opacity;
    center.offsetHeight; // reflow
    center.style.opacity = '0';
  }

  // 타이틀 페이드와 동시에 맵 처리
  setTimeout(() => {
    const mapEl = document.getElementById('introMap');
    const isMobile = window.innerWidth <= 720;
    if (isMobile) {
      // 모바일: 줌인 스킵, 바로 페이드아웃
      overlay.style.transition = 'opacity 0.6s';
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.style.display = 'none'; }, 600);
    } else {
      // 데스크탑: 맵 줌인 애니메이션
      mapEl.classList.add('map-zoom-out');
      setTimeout(() => {
        overlay.style.transition = 'opacity 0.5s';
        overlay.style.opacity = '0';
        setTimeout(() => { overlay.style.display = 'none'; }, 500);
      }, 5500);
    }
  }, 0);
}

function initIntro() {
  const center = document.getElementById('introCenter');
  if (!center) return;

  function centerBox() {
    const w = center.offsetWidth;
    const h = center.offsetHeight;
    center.style.transform = 'none';
    center.style.left = '50%';
    center.style.top  = '50%';
    center.style.marginLeft = (-w / 2) + 'px';
    center.style.marginTop  = (-h / 2) + 'px';
  }

  // DOM 렌더 직후 즉시 위치 설정 (점프 방지)
  centerBox();
  // 폰트 로드 후 재보정
  setTimeout(centerBox, 100);
  setTimeout(centerBox, 400);
  window.addEventListener('resize', centerBox);
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
      const q = searchInput.value.trim().toLowerCase();
      if (!q) { clearSearch(); return; }

      STATE.search = searchInput.value;
      searchClear.style.display = 'flex';

      // 현재 섹션에서 MAP_LAYOUTS 기준으로 결과 있는지 확인
      function hasResultInSection(sec) {
        const layout = MAP_LAYOUTS[sec];
        if (!layout) return false;
        for (const lotDef of layout.lots) {
          if (lotDef.graves.length === 0) continue;
          for (const grave of lotDef.graves) {
            if (lotDef.lot.toLowerCase().includes(q) || grave.toLowerCase().includes(q)) return true;
            const r = findRecord(sec, lotDef.lot, grave);
            if (r && ((r.name||'').toLowerCase().includes(q) || (r.name_kr||'').toLowerCase().includes(q))) return true;
          }
        }
        return false;
      }

      const curSec = STATE.section;
      const otherSec = curSec === '15' ? '16' : '15';

      if (!hasResultInSection(curSec) && hasResultInSection(otherSec)) {
        // 다른 섹션에 결과 있으면 자동 전환
        STATE.section = otherSec;
        document.querySelectorAll('.chip[data-section]').forEach(c => {
          c.classList.toggle('active', c.dataset.section === otherSec);
        });
        showToast(`Section ${otherSec}에서 찾았습니다.`);
      }

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

  const btnSync = document.getElementById('btnSync');
  if (btnSync) btnSync.addEventListener('click', loadData);
  // btnAdminToggle — 클릭 불가 텍스트, 이벤트 없음
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
