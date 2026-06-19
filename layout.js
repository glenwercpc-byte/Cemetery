/**
 * layout.js
 * Section 15, 16의 시각적 배치(그리드 좌표)를 정의합니다.
 * PDF 원본의 실제 모양을 최대한 반영했습니다 (간격, 4구역 분할 등).
 * 좌표 단위: CSS grid column/row (1부터 시작)
 *
 * 각 lot 객체:
 *  - lot: lot 번호
 *  - col, row: 그리드 시작 위치
 *  - colSpan, rowSpan: 차지하는 칸 수
 *  - slots: 이 lot에 속한 슬롯 번호 배열 (좌->우, 상->하 순서. 실제 슬롯 데이터와 매칭)
 *  - cols: 한 행에 슬롯이 몇 개씩 배치되는지 (slots를 cols개씩 나눠 여러 줄로 표시)
 */

const SECTION_LAYOUTS = {
  // ===================== SECTION 16 =====================
  '16': {
    label: 'Section 16',
    gridCols: 26,
    gridRows: 13,
    direction: { west: 'top-left', east: 'bottom-right' },
    lots: [
      // 최상단 작은 블록 (230,231,232) - 4슬롯씩
      { lot:'232', col:2,  row:1, colSpan:2, rowSpan:2, cols:2, slots:['1','2','3','4'] },
      { lot:'231', col:5,  row:1, colSpan:2, rowSpan:2, cols:2, slots:['4','3','2','1'] },
      { lot:'230', col:9,  row:1, colSpan:2, rowSpan:2, cols:2, slots:['3','4'] },

      // 메인 1행 (186-206) - 단순 lot
      { lot:'186', col:1,  row:3, colSpan:1, rowSpan:1, cols:2, slots:['1','2'] },
      { lot:'187', col:2,  row:3, colSpan:1, rowSpan:1, cols:4, slots:['203','204','205','206'] },
      { lot:'188', col:3,  row:3, colSpan:1, rowSpan:1, cols:4, slots:['207','208','209','210'] },
      { lot:'189', col:4,  row:3, colSpan:1, rowSpan:1, cols:4, slots:['211','212','213','214'] },
      { lot:'190', col:5,  row:3, colSpan:1, rowSpan:1, cols:4, slots:['215','216','217','218'] },
      { lot:'191', col:6,  row:3, colSpan:1, rowSpan:1, cols:4, slots:['219','220','221','222'] },
      { lot:'192', col:7,  row:3, colSpan:1, rowSpan:1, cols:4, slots:['223','224','225','226'] },

      // 193-198 (4줄 x 4칸의 큰 lot, 단 D행은 165-169로 별도 표기)
      { lot:'193', col:8,  row:3, colSpan:1, rowSpan:3, cols:4, slots:['81','82','83','84','93','94','95','96','105','106','107','108'] },
      { lot:'194', col:9,  row:3, colSpan:1, rowSpan:3, cols:4, slots:['85','86','87','88','97','98','99','100','109','110','111','112'] },
      { lot:'195', col:10, row:3, colSpan:1, rowSpan:3, cols:4, slots:['129','130','137','138','101','102','103','104','113','114','115','116'] },
      { lot:'196', col:11, row:3, colSpan:1, rowSpan:3, cols:4, slots:['145','146','147','148','131','132','139','140b','133','134','141','142'] },
      { lot:'197', col:12, row:3, colSpan:1, rowSpan:3, cols:4, slots:['161','162','163','164','149','150','151','152','153','154','155','156'] },
      { lot:'198', col:13, row:3, colSpan:1, rowSpan:3, cols:4, slots:['161b','162b','163b','164b','165b','166b','167b','168b','169b','170b','171b','172b'] },

      // 199-206 단순 lot
      { lot:'199', col:14, row:3, colSpan:1, rowSpan:1, cols:2, slots:['177','178'] },
      { lot:'200', col:15, row:3, colSpan:1, rowSpan:1, cols:4, slots:['179','180','181','182'] },
      { lot:'201', col:16, row:3, colSpan:1, rowSpan:1, cols:4, slots:['183','184','185','186b'] },
      { lot:'202', col:17, row:3, colSpan:1, rowSpan:1, cols:4, slots:['187','188','189','190'] },
      { lot:'203', col:18, row:3, colSpan:1, rowSpan:1, cols:4, slots:['191','192','193','194'] },
      { lot:'204', col:19, row:3, colSpan:1, rowSpan:1, cols:4, slots:['195','196','197','198'] },
      { lot:'205', col:20, row:3, colSpan:1, rowSpan:1, cols:4, slots:['199','200','201','202'] },
      { lot:'206', col:21, row:3, colSpan:1, rowSpan:1, cols:2, slots:['3','4'] },

      // 193-198 아래 D행 = 165,166,167,168,169 (별도 lot)
      { lot:'169', col:8,  row:6, colSpan:1, rowSpan:1, cols:5, slots:['120','121','122','123','124'] },
      { lot:'168', col:9,  row:6, colSpan:1, rowSpan:1, cols:4, slots:['125','126','127','128'] },
      { lot:'167', col:10, row:6, colSpan:1, rowSpan:1, cols:4, slots:['135','136','143','144'] },
      { lot:'166', col:11, row:6, colSpan:1, rowSpan:1, cols:4, slots:['157','158','159','160'] },
      { lot:'165', col:12, row:6, colSpan:1, rowSpan:1, cols:4, slots:['173','174','175','176'] },

      // 그 아래 140-144 (소형 4슬롯 lot)
      { lot:'140', col:10, row:8, colSpan:1, rowSpan:1, cols:4, slots:['1','2','3','4'] },
      { lot:'141', col:11, row:8, colSpan:1, rowSpan:1, cols:4, slots:['1','2','3','4'] },
      { lot:'142', col:12, row:8, colSpan:1, rowSpan:1, cols:4, slots:['1','2','3','4'] },
      { lot:'143', col:13, row:8, colSpan:1, rowSpan:1, cols:4, slots:['1','2','3','4'] },
      { lot:'144', col:14, row:8, colSpan:1, rowSpan:1, cols:4, slots:['1','2','3','4'] },
    ]
  },

  // ===================== SECTION 15 =====================
  '15': {
    label: 'Section 15',
    gridCols: 18,
    gridRows: 5,
    direction: { west: 'top', east: 'bottom', south: 'left' },
    lots: [
      { lot:'286', col:1,  row:1, colSpan:1, rowSpan:3, cols:1, slots:[] },
      { lot:'285', col:2,  row:1, colSpan:1, rowSpan:3, cols:1, slots:[] },
      { lot:'284', col:3,  row:1, colSpan:1, rowSpan:3, cols:4, slots:['51','52','53','54'] },
      { lot:'283', col:4,  row:1, colSpan:1, rowSpan:3, cols:1, slots:[] },
      { lot:'282', col:5,  row:1, colSpan:1, rowSpan:3, cols:1, slots:[] },
      { lot:'281', col:6,  row:1, colSpan:1, rowSpan:3, cols:2, slots:['55','56'] },
      { lot:'280', col:7,  row:1, colSpan:1, rowSpan:3, cols:1, slots:[] },
      { lot:'279', col:8,  row:1, colSpan:1, rowSpan:3, cols:1, slots:[] },
      { lot:'278', col:9,  row:1, colSpan:1, rowSpan:3, cols:1, slots:[] },

      { lot:'234', col:1, row:4, colSpan:2, rowSpan:1, cols:5, slots:['57','58','59','60','61','63','64','65','66','67','1','2','69','70'] },
      { lot:'235', col:3, row:4, colSpan:1, rowSpan:1, cols:4, slots:['62','68','1b','2b','3b','71','72','73','74'] },
      { lot:'236', col:4, row:4, colSpan:1, rowSpan:1, cols:4, slots:['31','32','4','5','6','7'] },
      { lot:'237', col:5, row:4, colSpan:1, rowSpan:1, cols:4, slots:['33','34','35','8','9','10','11'] },
      { lot:'238', col:6, row:4, colSpan:1, rowSpan:1, cols:4, slots:['36','37','38','39','12','13','14','15','75','76'] },
      { lot:'239', col:7, row:4, colSpan:1, rowSpan:1, cols:5, slots:['40','41','16','17','18','19','20','77','78','79','80'] },
      { lot:'240', col:8, row:4, colSpan:1, rowSpan:1, cols:4, slots:['43','44','45','21','22','23','24'] },
      { lot:'241', col:9, row:4, colSpan:1, rowSpan:1, cols:3, slots:['46','47','25','26','27'] },
      { lot:'242', col:10,row:4, colSpan:1, rowSpan:1, cols:3, slots:['48','49','50','28a','29','30'] },
    ]
  }
};

if (typeof module !== 'undefined') module.exports = { SECTION_LAYOUTS };
