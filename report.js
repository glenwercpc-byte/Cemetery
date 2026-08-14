// ===================================================================
// report.js — 규정 및 현황 뷰 (통계처럼 한 화면으로 표시)
// ===================================================================
const REPORT_KEY = 'ccpc_report_2026';
const YEAR = new Date().getFullYear();

const REPORT_DEFAULTS = [
  {
    title: '공원 묘지 주소',
    content: 'Ridgewood Memorial Park\n990 N. Milwaukee Ave. Des Plaines, IL 60016'
  },
  {
    title: '공원 묘지 이용 대상 및 규정',
    content: '• 시카고언약장로교회 교인 및 직계 가족 (부모, 자녀)\n• 교회 공원묘지는 필요에 따라 사전에 구매할 수 있다.'
  },
  {
    title: '공원 묘지 현황',
    content: '• Section 15 - 총 13기 (평석 only)\n• Section 16 - 총 43기 (입석 17기, 평석 26기)'
  },
  {
    title: '공원묘지 사용/예약 현황',
    content: '1) 2020년: Sect. 16 - 입석 2기\n2) 2021년: Sect. 16 - 입석 8기 (7기로 보고된 것을 바로잡음)\n3) 2022년: Sect. 16 - 입석 16기\n4) 2023년: Sect. 16 - 입석 2기, 평석 2기\n5) 2024년: Sect. 16 - 입석 2기, 4기 인수전 예약인지, 1기 반납\n         Sect. 15 - 평석 2기\n6) 2025년: Sect. 16 - 입석 1기, 반납(189-214)'
  },
  {
    title: '공원 묘지 가격',
    content: '1) Section 15\n   a. $1,847.50 (시세 $5,295.00의 35%)\n   b. 평석만 허용\n2) Section 16\n   a. 입석: $2,497.50 (시세 $5,595의 45%)\n   b. 평석: $1,988.00 (시세 $5,595의 36%)'
  },
  {
    title: '기타 사항',
    content: '1) 교회 공원 묘지 가격은 매년 연말 당회에서 결정을 한다\n2) 묘지 판매 금액은 별도의 계좌에 적립하고 운영한다'
  }
];

function getSections() {
  try {
    const s = localStorage.getItem(REPORT_KEY);
    if (s) return JSON.parse(s);
  } catch(e) {}
  return REPORT_DEFAULTS.map(d => ({...d}));
}

// 통계처럼 한 화면에 렌더링 — 1~3 왼쪽, 4~6 오른쪽 2열 배치
function renderReportView() {
  const title = YEAR + '년 장례 규정 및 현황';
  document.getElementById('reportViewTitle').textContent = title;

  const secs = getSections();
  const left  = secs.slice(0, 3);   // 1,2,3
  const right = secs.slice(3, 6);   // 4,5,6

  function cardHtml(s, i) {
    return `
    <div class="report-section-card">
      <div class="report-section-header">
        <span class="report-num">${i + 1}</span>
        <input class="report-title-input" id="rt${i}"
          value="${s.title.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}">
      </div>
      <textarea class="report-content-input" id="rc${i}"
        rows="${Math.max(3, s.content.split('\n').length + 1)}"
      >${s.content.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</textarea>
    </div>`;
  }

  document.getElementById('reportBody').innerHTML = `
    <div class="report-two-col">
      <div class="report-col">${left.map((s,i) => cardHtml(s, i)).join('')}</div>
      <div class="report-col">${right.map((s,i) => cardHtml(s, i + 3)).join('')}</div>
    </div>`;
}

function saveReport() {
  const secs = getSections();
  secs.forEach((_, i) => {
    const t = document.getElementById('rt' + i);
    const c = document.getElementById('rc' + i);
    if (t) secs[i].title = t.value;
    if (c) secs[i].content = c.value;
  });
  try {
    localStorage.setItem(REPORT_KEY, JSON.stringify(secs));
    if (typeof showToast === 'function') showToast('저장됐습니다.');
    else alert('저장됐습니다.');
  } catch(e) {
    if (typeof showToast === 'function') showToast('저장 실패', true);
    else alert('저장 실패: ' + e.message);
  }
}

function printReport() {
  const secs = getSections();
  secs.forEach((_, i) => {
    const t = document.getElementById('rt' + i);
    const c = document.getElementById('rc' + i);
    if (t) secs[i].title = t.value;
    if (c) secs[i].content = c.value;
  });
  const esc = s => String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  const w = window.open('', '_blank');
  w.document.write(`<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8">
<title>${YEAR}년 장례 규정 및 현황</title>
<style>
  body{font-family:'Malgun Gothic','맑은 고딕',AppleGothic,sans-serif;margin:36px;color:#222;font-size:14px;}
  table{width:100%;border-collapse:collapse;margin-top:8px;}
  td{border:1px solid #888;padding:11px 15px;vertical-align:top;}
  .hd{background:#1a365d;color:white;text-align:center;font-size:16px;font-weight:bold;padding:14px;letter-spacing:.04em;}
  .lb{font-weight:bold;background:#f0f4f8;width:18%;text-align:center;}
  .sn{font-weight:bold;color:#1a365d;margin:10px 0 4px 0;font-size:14px;}
  .sc{white-space:pre-wrap;font-size:13px;line-height:1.9;padding-left:14px;color:#333;}
  .footer{margin-top:28px;text-align:center;font-size:11px;color:#aaa;border-top:1px solid #eee;padding-top:12px;}
  @media print{body{margin:18px;}}
</style></head><body>
<table>
  <tr><td colspan="2" class="hd">장례 위원회 ${YEAR}년 사역 계획 보고</td></tr>
  <tr>
    <td class="lb">장례위원회</td>
    <td>• 모든 장례 절차를 지원하고, 본 교회가 소유한 공원묘지를 관리 및 운영한다</td>
  </tr>
  <tr>
    <td class="lb">공원묘지</td>
    <td>${secs.map((s,i) => `
      <div class="sn">${i+1}. ${esc(s.title)}</div>
      <div class="sc">${esc(s.content)}</div>
    `).join('')}</td>
  </tr>
  <tr><td class="lb">비고</td><td style="height:60px;"></td></tr>
</table>
<div class="footer">
  시카고언약장로교회 (Chicago Covenant Presbyterian Church)
</div>
</body></html>`);
  w.document.close();
  setTimeout(() => w.print(), 500);
}
