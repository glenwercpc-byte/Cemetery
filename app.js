// ====================================================
// CCPC 묘지 관리 시스템 — app.js
// ====================================================

const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbx_rg95yqYiOW648SCmNgMoGXy1l6ErtkDqTwtnbaH0wTBNaM_j4ynHiaLY_CX90x8BlQ/exec';

const STATUS_LABELS = { A:'Available', R:'Reserved', C:'To Be Confirmed', U:'Used' };

let STATE = {
  data: [],           // 전체 데이터
  section: '16',
  view: 'list',
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
      const res = await gasCall('getall');
      if (res.ok && res.lots && res.lots.length > 0) {
        STATE.data = res.lots.map(normalize);
        setSync('Google Sheets 연결됨');
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
  let data = STATE.data.filter(r => r.section === STATE.section);
  if (STATE.search.trim()) {
    const q = STATE.search.trim().toLowerCase();
    data = data.filter(r =>
      r.lot.includes(q) || r.grave.includes(q) ||
      r.name.toLowerCase().includes(q) || r.name_kr.toLowerCase().includes(q)
    );
  }
  return data;
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
  document.getElementById('viewList').style.display  = STATE.view === 'list'  ? '' : 'none';
  document.getElementById('viewMap').style.display   = STATE.view === 'map'   ? '' : 'none';
  document.getElementById('viewStats').style.display = STATE.view === 'stats' ? '' : 'none';
  document.getElementById('searchWrap').style.display = STATE.view !== 'map' ? '' : 'none';

  if (STATE.view === 'list')  renderList();
  if (STATE.view === 'map')   renderMap();
  if (STATE.view === 'stats') renderStats();
}

function escHtml(s) {
  return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ─── LIST VIEW ─────────────────────────────────────
function renderList() {
  const lots = getLots();
  const container = document.getElementById('listContainer');

  if (Object.keys(lots).length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="big">🔍</div>검색 결과가 없습니다.</div>';
    return;
  }

  // 헤더
  const hasDir = STATE.section === '16';
  const headerCols = hasDir
    ? `<div class="lv-h-grave">Grave</div><div class="lv-h-dir">Dir</div><div class="lv-h-status">상태</div><div class="lv-h-name">Name</div><div class="lv-h-kr">이름</div>`
    : `<div class="lv-h-grave">Grave</div><div class="lv-h-status">상태</div><div class="lv-h-name">Name</div><div class="lv-h-kr">이름</div>`;

  let html = '';
  Object.entries(lots)
    .sort((a,b) => parseInt(a[0]) - parseInt(b[0]))
    .forEach(([lotNo, graves]) => {
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
        <div class="lv-header ${hasDir ? 'has-dir' : ''}">${headerCols}</div>
        <div class="lv-rows">
      `;
      graves
        .sort((a,b) => parseInt(a.grave) - parseInt(b.grave))
        .forEach(r => {
          const krVal = r.name_kr || toKoreanName(r.name);
          const dirCell = hasDir ? `<div class="lv-cell lv-dir">${escHtml(r.dir)}</div>` : '';
          html += `
          <div class="lv-row status-bg-${r.status}${hasDir?' has-dir-row':''}" data-id="${r.id}">
            <div class="lv-cell lv-grave mono">${escHtml(r.grave)}</div>
            ${dirCell}
            <div class="lv-cell lv-status"><span class="status-badge ${r.status}">${STATUS_LABELS[r.status]||r.status}</span></div>
            <div class="lv-cell lv-name">${r.status === 'A' ? '<span class="avail-dash">—</span>' : escHtml(r.name)}</div>
            <div class="lv-cell lv-kr kr-name-cell" data-id="${r.id}" title="클릭 → 한글 이름 수정">
              ${r.status === 'A' ? '' : (escHtml(krVal) || '<span class="kr-empty">+ 입력</span>')}
            </div>
          </div>`;
        });
      html += `</div></div>`;
    });

  container.innerHTML = html;

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
const MAP_IMAGES = { '15': 'map-section15-1.jpg', '16': 'map-section16-1.jpg' };

function renderMap() {
  const img = document.getElementById('mapImg');
  const src = MAP_IMAGES[STATE.section];
  if (img.dataset.src !== src) {
    img.src = src;
    img.dataset.src = src;
    STATE.mapZoom = 1;
    document.getElementById('mapImgInner').style.transform = 'scale(1)';
  }
}

function initMapZoom() {
  const wrap = document.getElementById('mapImgWrap');
  const inner = document.getElementById('mapImgInner');

  document.getElementById('btnZoomIn').onclick = () => { STATE.mapZoom = Math.min(STATE.mapZoom * 1.3, 6); inner.style.transform = `scale(${STATE.mapZoom})`; };
  document.getElementById('btnZoomOut').onclick = () => { STATE.mapZoom = Math.max(STATE.mapZoom / 1.3, 0.5); inner.style.transform = `scale(${STATE.mapZoom})`; };
  document.getElementById('btnZoomReset').onclick = () => { STATE.mapZoom = 1; inner.style.transform = 'scale(1)'; };

  // 핀치 줌 (모바일)
  let lastDist = 0;
  wrap.addEventListener('touchstart', e => { if(e.touches.length===2) lastDist = Math.hypot(e.touches[0].clientX-e.touches[1].clientX, e.touches[0].clientY-e.touches[1].clientY); });
  wrap.addEventListener('touchmove', e => {
    if(e.touches.length===2) {
      const d = Math.hypot(e.touches[0].clientX-e.touches[1].clientX, e.touches[0].clientY-e.touches[1].clientY);
      STATE.mapZoom = Math.min(Math.max(STATE.mapZoom * (d/lastDist), 0.5), 6);
      inner.style.transform = `scale(${STATE.mapZoom})`;
      lastDist = d; e.preventDefault();
    }
  }, { passive: false });

  // 마우스 휠 줌
  wrap.addEventListener('wheel', e => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    STATE.mapZoom = Math.min(Math.max(STATE.mapZoom * delta, 0.5), 6);
    inner.style.transform = `scale(${STATE.mapZoom})`;
  }, { passive: false });

  // 드래그
  let isDragging = false, startX, startY, scrollLeft, scrollTop;
  wrap.addEventListener('mousedown', e => { isDragging=true; startX=e.pageX-wrap.offsetLeft; startY=e.pageY-wrap.offsetTop; scrollLeft=wrap.scrollLeft; scrollTop=wrap.scrollTop; wrap.style.cursor='grabbing'; });
  wrap.addEventListener('mouseleave', () => { isDragging=false; wrap.style.cursor='grab'; });
  wrap.addEventListener('mouseup', () => { isDragging=false; wrap.style.cursor='grab'; });
  wrap.addEventListener('mousemove', e => { if(!isDragging) return; e.preventDefault(); const x=e.pageX-wrap.offsetLeft; const y=e.pageY-wrap.offsetTop; wrap.scrollLeft=scrollLeft-(x-startX); wrap.scrollTop=scrollTop-(y-startY); });
}

// ─── STATS VIEW ────────────────────────────────────
function renderStats() {
  const all = STATE.data;
  const sections = ['15','16'];
  const bySection = {};
  sections.forEach(s => { bySection[s] = { total:0, available:0, used:0, reserved:0, confirmed:0 }; });
  all.forEach(r => {
    const s = r.section;
    if (!bySection[s]) return;
    bySection[s].total++;
    if (r.status==='A') bySection[s].available++;
    else if (r.status==='R') bySection[s].reserved++;
    else if (r.status==='C') bySection[s].confirmed++;
    else bySection[s].used++;
  });
  const grand = { total:0, available:0, used:0, reserved:0, confirmed:0 };
  sections.forEach(s => Object.keys(grand).forEach(k => grand[k] += bySection[s][k]));

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
    return `
    <div class="stats-section-card">
      <div class="stats-section-header">
        <span class="stats-section-title">Section ${s}</span>
        <span class="stats-section-sub">전체 ${d.total}개 슬롯</span>
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

  let searchTimer;
  document.getElementById('searchInput').addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { STATE.search = e.target.value; render(); }, 150);
  });

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
