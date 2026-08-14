const REPORT_KEY = 'ccpc_report';
const YEAR = new Date().getFullYear();

const DEFAULTS = [
  { title:'공원 묘지 주소', content:'Ridgewood Memorial Park\n990 N. Milwaukee Ave. Des Plaines, IL 60016' },
  { title:'공원 묘지 이용 대상 및 규정', content:'• 시카고언약장로교회 교인 및 직계 가족 (부모, 자녀)\n• 교회 공원묘지는 필요에 따라 사전에 구매할 수 있다.' },
  { title:'공원 묘지 현황', content:'• Section 15 - 총 13기 (평석 only)\n• Section 16 - 총 43기 (입석 17기, 평석 26기)' },
  { title:'공원묘지 사용/예약 현황', content:'1) 2020년: Sect. 16 - 입석 2기\n2) 2021년: Sect. 16 - 입석 8기\n3) 2022년: Sect. 16 - 입석 16기\n4) 2023년: Sect. 16 - 입석 2기, 평석 2기\n5) 2024년: Sect. 16 - 입석 2기, 4기 인수전 예약인지, 1기 반납\n         Sect. 15 - 평석 2기\n6) 2025년: Sect. 16 - 입석 1기, 반납(189-214)' },
  { title:'공원 묘지 가격', content:'1) Section 15\n   a. $1,847.50 (시세 $5,295.00의 35%)\n   b. 평석만 허용\n2) Section 16\n   a. 입석: $2,497.50 (시세 $5,595의 45%)\n   b. 평석: $1,988.00 (시세 $5,595의 36%)' },
  { title:'기타 사항', content:'1) 교회 공원 묘지 가격은 매년 연말 당회에서 결정을 한다\n2) 묘지 판매 금액은 별도의 계좌에 적립하고 운영한다' }
];

function getSections() {
  try { const s = localStorage.getItem(REPORT_KEY); if(s) return JSON.parse(s); } catch(e){}
  return DEFAULTS.map(d=>({...d}));
}

function toggleReportMenu() {
  const m = document.getElementById('reportDropMenu');
  m.style.display = m.style.display==='none' ? 'block' : 'none';
}

function openReport() {
  document.getElementById('reportTitleText').textContent = YEAR+'년 장례 규정 및 현황';
  document.getElementById('reportMenuLabel').textContent = YEAR+'년 장례 규정 및 현황';
  const secs = getSections();
  document.getElementById('reportBody').innerHTML = secs.map((s,i)=>`
    <div style="margin-bottom:20px;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
        <span style="font-weight:700;color:#b3543f;min-width:24px;">${i+1}.</span>
        <input style="flex:1;padding:6px 10px;border:1px solid #ccc;border-radius:4px;font-size:14px;font-family:inherit;"
          id="rt${i}" value="${s.title.replace(/"/g,'&quot;')}">
      </div>
      <textarea id="rc${i}" rows="${Math.max(3,s.content.split('\n').length+1)}"
        style="width:100%;padding:8px 10px;border:1px solid #ccc;border-radius:4px;font-size:13.5px;font-family:inherit;line-height:1.7;resize:vertical;box-sizing:border-box;">${s.content}</textarea>
    </div>`).join('');
  document.getElementById('reportOverlay').style.display = 'flex';
}

function saveReport() {
  const secs = getSections();
  secs.forEach((_,i) => {
    secs[i].title = document.getElementById('rt'+i)?.value || secs[i].title;
    secs[i].content = document.getElementById('rc'+i)?.value || secs[i].content;
  });
  try { localStorage.setItem(REPORT_KEY, JSON.stringify(secs)); alert('저장됐습니다.'); }
  catch(e) { alert('저장 실패'); }
}

function printReport() {
  const secs = getSections();
  secs.forEach((_,i) => {
    secs[i].title = document.getElementById('rt'+i)?.value || secs[i].title;
    secs[i].content = document.getElementById('rc'+i)?.value || secs[i].content;
  });
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const w = window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8">
<title>${YEAR}년 장례 규정 및 현황</title>
<style>
body{font-family:'Malgun Gothic','맑은 고딕',sans-serif;margin:36px;color:#222;}
table{width:100%;border-collapse:collapse;}
td{border:1px solid #888;padding:10px 14px;vertical-align:top;}
.th{background:#1a365d;color:white;text-align:center;font-size:16px;font-weight:bold;padding:14px;}
.hl{font-weight:bold;background:#f7f7f7;width:20%;}
.st{font-weight:bold;color:#1a365d;margin:10px 0 4px;}
.sc{white-space:pre-wrap;font-size:13px;line-height:1.8;padding-left:12px;}
.footer{margin-top:30px;text-align:center;font-size:11px;color:#999;}
</style></head><body>
<table>
<tr><td colspan="2" class="th">장례 위원회 ${YEAR}년 사역 계획 보고</td></tr>
<tr><td class="hl">장례위원회</td><td>• 모든 장례 절차를 지원하고, 본 교회가 소유한 공원묘지를 관리 및 운영한다</td></tr>
<tr><td class="hl">공원묘지</td><td>${secs.map((s,i)=>`<div class="st">${i+1}. ${esc(s.title)}</div><div class="sc">${esc(s.content)}</div>`).join('')}</td></tr>
<tr><td class="hl">비고</td><td>&nbsp;</td></tr>
</table>
<div class="footer">시카고언약장로교회 · Chicago Covenant Presbyterian Church</div>
</body></html>`);
  w.document.close();
  setTimeout(()=>w.print(),400);
}

// 드롭메뉴 레이블 초기화
document.addEventListener('DOMContentLoaded', ()=>{
  const el = document.getElementById('reportMenuLabel');
  if(el) el.textContent = YEAR+'년 장례 규정 및 현황';
  // 외부 클릭 닫기
  document.addEventListener('click', e=>{
    const wrap = document.querySelector('.report-menu-wrap');
    if(wrap && !wrap.contains(e.target)){
      const m = document.getElementById('reportDropMenu');
      if(m) m.style.display='none';
    }
  });
});
