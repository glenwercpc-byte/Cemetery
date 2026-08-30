// ===================================================================
// report.js — 규정 및 현황 뷰
// ===================================================================
const REPORT_KEY = 'ccpc_report_2026';
const YEAR = new Date().getFullYear();

const REPORT_DEFAULTS = [
  { title: '공원 묘지 주소',
    content: 'Ridgewood Memorial Park\n990 N. Milwaukee Ave. Des Plaines, IL 60016' },
  { title: '공원 묘지 이용 대상 및 규정',
    content: '• 시카고언약장로교회 교인 및 직계 가족 (부모, 자녀)\n• 교회 공원묘지는 필요에 따라 사전에 구매할 수 있다.' },
  { title: '공원 묘지 현황',
    content: '• Section 15 - 총 13기 (평석 only)\n• Section 16 - 총 43기 (입석 17기, 평석 26기)' },
  { title: '공원묘지 사용/예약 현황',
    content: '1) 2020년: Sect. 16 - 입석 2기\n2) 2021년: Sect. 16 - 입석 8기 (7기로 보고된 것을 바로잡음)\n3) 2022년: Sect. 16 - 입석 16기\n4) 2023년: Sect. 16 - 입석 2기, 평석 2기\n5) 2024년: Sect. 16 - 입석 2기, 4기 인수전 예약인지, 1기 반납\n         Sect. 15 - 평석 2기\n6) 2025년: Sect. 16 - 입석 1기, 반납(189-214)' },
  { title: '공원 묘지 가격',
    content: '',
    price: {
      s15: { market: 5995, pct: 35, note: '평석만 허용' },
      s16_standing: { market: 5595, pct: 45 },
      s16_flat:     { market: 5595, pct: 36 }
    }
  },
  { title: '기타 사항',
    content: '1) 교회 공원 묘지 가격은 매년 연말 당회에서 결정을 한다\n2) 묘지 판매 금액은 별도의 계좌에 적립하고 운영한다' }
];

const PRICE_KEY = 'ccpc_price_calc';

function getSections() {
  try {
    const s = localStorage.getItem(REPORT_KEY);
    if (s) return JSON.parse(s);
  } catch(e) {}
  return REPORT_DEFAULTS.map(d => ({...d}));
}

function getPriceData() {
  try {
    const s = localStorage.getItem(PRICE_KEY);
    if (s) return JSON.parse(s);
  } catch(e) {}
  return REPORT_DEFAULTS[4].price;
}

function calcPrice(market, pct) {
  return (market * pct / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function editMarket(id) {
  const display = document.getElementById(id + '-display');
  const input   = document.getElementById(id);
  if (!display || !input) return;
  display.style.display = 'none';
  input.style.display   = '';
  input.focus();
  input.select();
}

function doneEditMarket(id) {
  const display = document.getElementById(id + '-display');
  const input   = document.getElementById(id);
  if (!display || !input) return;
  const val = parseFloat(input.value) || 0;
  display.textContent = '$' + Number(val).toLocaleString('en-US');
  input.style.display   = 'none';
  display.style.display = '';
  updatePriceCalc();
}

function updatePriceCalc() {
  const s15m  = parseFloat(document.getElementById('s15market')?.value  || 0);
  const s15p  = parseFloat(document.getElementById('s15pct')?.value     || 0);
  const s16sm = parseFloat(document.getElementById('s16smarket')?.value || 0);
  const s16sp = parseFloat(document.getElementById('s16spct')?.value    || 0);
  const s16fm = parseFloat(document.getElementById('s16fmarket')?.value || 0);
  const s16fp = parseFloat(document.getElementById('s16fpct')?.value    || 0);

  if (document.getElementById('s15result'))
    document.getElementById('s15result').textContent  = '$' + calcPrice(s15m,  s15p);
  if (document.getElementById('s16sresult'))
    document.getElementById('s16sresult').textContent = '$' + calcPrice(s16sm, s16sp);
  if (document.getElementById('s16fresult'))
    document.getElementById('s16fresult').textContent = '$' + calcPrice(s16fm, s16fp);
}

function priceCardHtml(sec, i) {
  const isAdmin = (typeof STATE !== 'undefined' && STATE.isAdmin);
  const ro = isAdmin ? '' : 'readonly style="pointer-events:none;background:var(--paper);"';
  const pd = getPriceData();

  function fmtMarket(val) {
    return '$' + Number(val).toLocaleString('en-US');
  }

  return `
  <div class="report-section-card">
    <div class="report-section-header">
      <span class="report-num">${i + 1}</span>
      <input class="report-title-input" id="rt${i}"
        value="${sec.title.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}">
    </div>
    <div class="price-calc-wrap">
      <table class="price-table">
        <thead><tr>
          <th>구분</th><th>시세</th><th>비율 (%)</th><th>교회 가격</th>
        </tr></thead>
        <tbody>
          <tr class="price-row">
            <td><strong>Section 15</strong><br><small>평석만 허용</small></td>
            <td class="price-market-cell">
              <span class="price-market-display" id="s15market-display"
                onclick="editMarket('s15market')" title="클릭하여 수정">${fmtMarket(pd.s15.market)}</span>
              <input type="number" id="s15market" class="price-input" value="${pd.s15.market}"
                oninput="updatePriceCalc()" style="display:none;" step="1" min="0"
                onblur="doneEditMarket('s15market')">
            </td>
            <td>
              <input type="number" id="s15pct" class="price-input pct" value="${pd.s15.pct}"
                oninput="updatePriceCalc()" step="0.1" min="0" max="100" ${ro}> %
            </td>
            <td class="price-result" id="s15result">$${calcPrice(pd.s15.market, pd.s15.pct)}</td>
          </tr>
          <tr class="price-section-divider"><td colspan="4"></td></tr>
          <tr class="price-row">
            <td><strong>Section 16</strong><br><small>입석</small></td>
            <td class="price-market-cell">
              <span class="price-market-display" id="s16smarket-display"
                onclick="editMarket('s16smarket')" title="클릭하여 수정">${fmtMarket(pd.s16_standing.market)}</span>
              <input type="number" id="s16smarket" class="price-input" value="${pd.s16_standing.market}"
                oninput="updatePriceCalc()" style="display:none;" step="1" min="0"
                onblur="doneEditMarket('s16smarket')">
            </td>
            <td>
              <input type="number" id="s16spct" class="price-input pct" value="${pd.s16_standing.pct}"
                oninput="updatePriceCalc()" step="0.1" min="0" max="100" ${ro}> %
            </td>
            <td class="price-result" id="s16sresult">$${calcPrice(pd.s16_standing.market, pd.s16_standing.pct)}</td>
          </tr>
          <tr class="price-row">
            <td><strong>Section 16</strong><br><small>평석</small></td>
            <td class="price-market-cell">
              <span class="price-market-display" id="s16fmarket-display"
                onclick="editMarket('s16fmarket')" title="클릭하여 수정">${fmtMarket(pd.s16_flat.market)}</span>
              <input type="number" id="s16fmarket" class="price-input" value="${pd.s16_flat.market}"
                oninput="updatePriceCalc()" style="display:none;" step="1" min="0"
                onblur="doneEditMarket('s16fmarket')">
            </td>
            <td>
              <input type="number" id="s16fpct" class="price-input pct" value="${pd.s16_flat.pct}"
                oninput="updatePriceCalc()" step="0.1" min="0" max="100" ${ro}> %
            </td>
            <td class="price-result" id="s16fresult">$${calcPrice(pd.s16_flat.market, pd.s16_flat.pct)}</td>
          </tr>
        </tbody>
      </table>
      <div class="price-hint">※ 시세를 클릭하면 수정할 수 있습니다</div>
    </div>
  </div>`;
}

function cardHtml(s, i) {
  const isAdmin = (typeof STATE !== 'undefined' && STATE.isAdmin);
  const ro = isAdmin ? '' : 'readonly style="pointer-events:none;background:var(--paper);"';
  if (i === 4) return priceCardHtml(s, i);
  return `
  <div class="report-section-card">
    <div class="report-section-header">
      <span class="report-num">${i + 1}</span>
      <input class="report-title-input" id="rt${i}" ${ro}
        value="${s.title.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}">
    </div>
    <textarea class="report-content-input" id="rc${i}"
      rows="${s.content.split('\n').length}"
      style="overflow:hidden;${isAdmin?'':'pointer-events:none;background:var(--paper);'}"
      oninput="${isAdmin?"this.rows=1;this.rows=this.value.split('\\\\n').length||1;":''}"
      ${isAdmin?'':'readonly'}
    >${s.content.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</textarea>
  </div>`;
}

function renderReportView() {
  const title = YEAR + '년 장례 규정 및 현황';
  const secs = getSections();
  const left  = secs.filter((_, i) => i % 2 === 0);
  const right = secs.filter((_, i) => i % 2 === 1);

  document.getElementById('reportBody').innerHTML = `
    <div class="report-view-inner">
      <div class="report-view-header">
        <h2>${title}</h2>
        <div style="display:flex;gap:8px;">
          ${(typeof STATE !== 'undefined' && STATE.isAdmin) ? '<button class="btn btn-sm" onclick="saveReport()">💾 저장</button>' : ''}
          <button class="btn btn-sm" onclick="printReport()">🖨️ 인쇄</button>
        </div>
      </div>
      <div class="report-two-col">
        <div class="report-col">${left.map((s,i) => cardHtml(s, i*2)).join('')}</div>
        <div class="report-col">${right.map((s,i) => cardHtml(s, i*2+1)).join('')}</div>
      </div>
    </div>`;
}

function saveReport() {
  const secs = getSections();
  secs.forEach((_, i) => {
    if (i === 4) return; // 5번은 price 별도 저장
    const t = document.getElementById('rt' + i);
    const c = document.getElementById('rc' + i);
    if (t) secs[i].title = t.value;
    if (c) secs[i].content = c.value;
  });
  // 5번 제목 저장
  const t4 = document.getElementById('rt4');
  if (t4) secs[4].title = t4.value;

  // 가격 데이터 저장
  const pd = {
    s15:         { market: parseFloat(document.getElementById('s15market')?.value || 0),
                   pct:    parseFloat(document.getElementById('s15pct')?.value || 0) },
    s16_standing:{ market: parseFloat(document.getElementById('s16smarket')?.value || 0),
                   pct:    parseFloat(document.getElementById('s16spct')?.value || 0) },
    s16_flat:    { market: parseFloat(document.getElementById('s16fmarket')?.value || 0),
                   pct:    parseFloat(document.getElementById('s16fpct')?.value || 0) }
  };

  try {
    localStorage.setItem(REPORT_KEY, JSON.stringify(secs));
    localStorage.setItem(PRICE_KEY, JSON.stringify(pd));
    if (typeof showToast === 'function') showToast('저장됐습니다.');
    else alert('저장됐습니다.');
  } catch(e) {
    if (typeof showToast === 'function') showToast('저장 실패', true);
  }
}

function printReport() {
  const secs = getSections();
  secs.forEach((_, i) => {
    if (i === 4) return;
    const t = document.getElementById('rt' + i);
    const c = document.getElementById('rc' + i);
    if (t) secs[i].title = t.value;
    if (c) secs[i].content = c.value;
  });
  const t4 = document.getElementById('rt4');
  if (t4) secs[4].title = t4.value;

  const pd = {
    s15:         { market: parseFloat(document.getElementById('s15market')?.value||0),
                   pct:    parseFloat(document.getElementById('s15pct')?.value||0) },
    s16_standing:{ market: parseFloat(document.getElementById('s16smarket')?.value||0),
                   pct:    parseFloat(document.getElementById('s16spct')?.value||0) },
    s16_flat:    { market: parseFloat(document.getElementById('s16fmarket')?.value||0),
                   pct:    parseFloat(document.getElementById('s16fpct')?.value||0) }
  };

  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const fmt = (m,p) => '$' + calcPrice(m,p);

  const priceContent = `1) Section 15
   a. ${fmt(pd.s15.market, pd.s15.pct)} (시세 $${pd.s15.market.toLocaleString()}의 ${pd.s15.pct}%)
   b. 평석만 허용
2) Section 16
   a. 입석: ${fmt(pd.s16_standing.market, pd.s16_standing.pct)} (시세 $${pd.s16_standing.market.toLocaleString()}의 ${pd.s16_standing.pct}%)
   b. 평석: ${fmt(pd.s16_flat.market, pd.s16_flat.pct)} (시세 $${pd.s16_flat.market.toLocaleString()}의 ${pd.s16_flat.pct}%)`;

  secs[4].content = priceContent;

  const w = window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8">
<title>${YEAR}년 장례 규정 및 현황</title>
<style>
  body{font-family:'Malgun Gothic','맑은 고딕',AppleGothic,sans-serif;margin:36px;color:#222;font-size:14px;}
  table{width:100%;border-collapse:collapse;margin-top:8px;}
  td{border:1px solid #888;padding:11px 15px;vertical-align:top;}
  .hd{background:#1a365d;color:white;text-align:center;font-size:16px;font-weight:bold;padding:14px;}
  .lb{font-weight:bold;background:#f0f4f8;width:18%;text-align:center;}
  .sn{font-weight:bold;color:#1a365d;margin:10px 0 4px 0;font-size:14px;}
  .sc{white-space:pre-wrap;font-size:13px;line-height:1.9;padding-left:14px;color:#333;}
  .footer{margin-top:28px;text-align:center;font-size:11px;color:#aaa;border-top:1px solid #eee;padding-top:12px;}
</style></head><body>
<table>
  <tr><td colspan="2" class="hd">장례 위원회 ${YEAR}년 사역 계획 보고</td></tr>
  <tr><td class="lb">장례위원회</td>
    <td>• 모든 장례 절차를 지원하고, 본 교회가 소유한 공원묘지를 관리 및 운영한다</td></tr>
  <tr><td class="lb">공원묘지</td>
    <td>${secs.map((s,i)=>`<div class="sn">${i+1}. ${esc(s.title)}</div><div class="sc">${esc(s.content)}</div>`).join('')}</td>
  </tr>
</table>
<div class="footer">시카고언약장로교회 (Chicago Covenant Presbyterian Church)</div>
</body></html>`);
  w.document.close();
  setTimeout(()=>w.print(),500);
}
