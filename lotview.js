/* Lot View — OCR 기반 정확 좌표 */
const LV_IMG_W=1588, LV_IMG_H=1605;
// 패딩(200px*2) 포함 실제 회전 래퍼 크기 (fitScale 계산용)
const LV_WRAP_W=1988, LV_WRAP_H=2005;
const LV_ROT=-15;          // CSS rotate 각도
const LV_S15={"1":{x:1110,y:308},"2":{x:1470,y:1108},"3":{x:968,y:608},"4":{x:1325,y:1492},"5":{x:1323,y:1476},"6":{x:1322,y:1459},"7":{x:1320,y:1443},"8":{x:1310,y:1131},"9":{x:1296,y:716},"10":{x:1253,y:658},"11":{x:1224,y:620},"12":{x:1196,y:581},"13":{x:1164,y:538},"14":{x:1132,y:494},"15":{x:1103,y:456},"16":{x:1060,y:398},"17":{x:1058,y:426},"18":{x:1058,y:453},"19":{x:1056,y:480},"20":{x:1200,y:1352},"21":{x:1172,y:1409},"22":{x:1148,y:1460},"23":{x:1150,y:1187},"24":{x:1084,y:832},"25":{x:1017,y:478},"26":{x:1018,y:451},"27":{x:1020,y:424},"28":{x:1022,y:397},"29":{x:1424,y:1021},"30":{x:1424,y:992},"31":{x:1424,y:965},"32":{x:1424,y:937},"33":{x:1424,y:910},"34":{x:1425,y:881},"35":{x:1425,y:855},"36":{x:1427,y:828},"37":{x:1336,y:854},"38":{x:1427,y:774},"39":{x:1426,y:746},"40":{x:1428,y:720},"41":{x:1153,y:817},"42":{x:844,y:926},"43":{x:909,y:911},"44":{x:982,y:894},"45":{x:1054,y:877},"46":{x:1151,y:855},"47":{x:1248,y:833},"48":{x:1313,y:818},"49":{x:1386,y:801},"50":{x:1386,y:828},"51":{x:1386,y:852},"52":{x:1386,y:882},"53":{x:1385,y:914},"54":{x:1384,y:944},"55":{x:1384,y:964},"56":{x:1384,y:991},"57":{x:1360,y:904},"58":{x:1338,y:826},"59":{x:1343,y:878},"60":{x:1351,y:956},"61":{x:1359,y:1033},"62":{x:1364,y:1092},"63":{x:1370,y:1143},"64":{x:1375,y:1195},"65":{x:1380,y:1247},"66":{x:1380,y:1273},"67":{x:1380,y:1302},"68":{x:1380,y:1324},"69":{x:1380,y:1356},"70":{x:1281,y:990},"71":{x:1207,y:716},"72":{x:884,y:392},"73":{x:883,y:419},"74":{x:882,y:446},"75":{x:880,y:476},"76":{x:879,y:502},"77":{x:878,y:529},"78":{x:877,y:556},"79":{x:878,y:557},"80":{x:879,y:557},"81":{x:880,y:558},"82":{x:881,y:558},"83":{x:869,y:586},"84":{x:856,y:615},"85":{x:847,y:634},"86":{x:833,y:666},"87":{x:834,y:640},"88":{x:836,y:603},"89":{x:837,y:580},"90":{x:838,y:552},"91":{x:838,y:525},"92":{x:840,y:498},"93":{x:842,y:470},"94":{x:842,y:444},"95":{x:844,y:416},"96":{x:932,y:502},"97":{x:1020,y:587},"98":{x:1107,y:673},"99":{x:1206,y:769},"100":{x:1256,y:942},"101":{x:1307,y:1115},"102":{x:1341,y:1230},"103":{x:1344,y:1215},"104":{x:1375,y:1268},"105":{x:1371,y:1226},"106":{x:1366,y:1174},"107":{x:1361,y:1122},"108":{x:1355,y:1064},"109":{x:1347,y:986},"110":{x:1339,y:909},"111":{x:1339,y:833},"112":{x:1361,y:911},"113":{x:1365,y:951},"114":{x:1356,y:920},"115":{x:1356,y:899},"116":{x:1357,y:869},"117":{x:1357,y:842},"118":{x:1357,y:817},"119":{x:1357,y:798},"120":{x:1355,y:778},"121":{x:1333,y:846},"122":{x:1313,y:905},"123":{x:1284,y:995},"124":{x:1254,y:1085},"125":{x:1232,y:1152},"126":{x:1210,y:1220},"127":{x:1190,y:1280},"128":{x:1168,y:1347},"129":{x:1148,y:1407},"130":{x:1149,y:1379},"131":{x:1125,y:1328},"132":{x:1103,y:1282},"133":{x:1081,y:1237},"134":{x:1059,y:1192},"135":{x:1038,y:1146},"136":{x:1013,y:1095},"137":{x:992,y:1050},"138":{x:970,y:1004},"139":{x:948,y:959},"140":{x:916,y:891},"141":{x:880,y:817},"142":{x:859,y:771},"143":{x:837,y:726},"144":{x:1000,y:933},"145":{x:1145,y:1116},"146":{x:1290,y:1300},"147":{x:1290,y:1300},"148":{x:1148,y:1460},"149":{x:1200,y:1352},"150":{x:1176,y:1325},"151":{x:1198,y:1238},"152":{x:1179,y:1270},"153":{x:1165,y:1202},"154":{x:1126,y:894},"155":{x:1220,y:1249},"156":{x:1220,y:1234},"157":{x:1220,y:1220},"158":{x:1220,y:1207},"159":{x:1220,y:1194},"160":{x:1220,y:1179},"161":{x:1220,y:1166},"162":{x:1220,y:1153},"163":{x:1220,y:1138},"164":{x:1220,y:1124},"165":{x:1220,y:1110},"166":{x:1220,y:1096},"167":{x:1052,y:873},"168":{x:1041,y:909},"169":{x:1042,y:883},"170":{x:1043,y:855},"171":{x:1043,y:826},"172":{x:1044,y:798},"173":{x:1046,y:768},"174":{x:1054,y:747},"175":{x:1094,y:751},"176":{x:1134,y:754},"177":{x:1178,y:758},"178":{x:1238,y:763},"179":{x:1297,y:769},"180":{x:1337,y:772},"181":{x:1320,y:760},"182":{x:1306,y:749},"183":{x:1291,y:738},"184":{x:1276,y:727},"185":{x:1262,y:716},"186":{x:1245,y:704},"187":{x:1230,y:728},"188":{x:1228,y:819},"189":{x:1227,y:880},"190":{x:1225,y:941},"191":{x:1224,y:1010},"192":{x:1222,y:1078},"193":{x:1221,y:1139},"194":{x:1218,y:1231},"195":{x:1216,y:1330},"196":{x:1060,y:1323},"197":{x:1060,y:1323},"198":{x:1095,y:1326},"199":{x:1117,y:1239},"200":{x:1139,y:1152},"201":{x:1163,y:1054},"202":{x:1184,y:967},"203":{x:1206,y:880},"204":{x:1206,y:908},"205":{x:1206,y:934},"206":{x:1204,y:960},"207":{x:1204,y:988},"208":{x:1204,y:1016},"209":{x:1204,y:1044},"210":{x:1181,y:1096},"211":{x:1181,y:1110},"212":{x:1181,y:1124},"213":{x:1181,y:1138},"214":{x:1181,y:1153},"215":{x:1181,y:1166},"216":{x:1181,y:1179},"217":{x:1181,y:1194},"218":{x:1181,y:1207},"219":{x:1181,y:1220},"220":{x:1181,y:1234},"221":{x:1181,y:1249},"222":{x:1179,y:1368},"223":{x:1188,y:1412},"224":{x:1198,y:1462},"225":{x:1197,y:1490},"226":{x:1199,y:1421},"227":{x:1201,y:1338},"228":{x:1150,y:1242},"229":{x:1150,y:1242},"230":{x:1142,y:1245},"231":{x:1142,y:1232},"232":{x:1142,y:1330},"233":{x:1142,y:1314},"234":{x:1142,y:1294},"235":{x:1142,y:1268},"236":{x:1142,y:1238},"237":{x:1142,y:1211},"238":{x:1142,y:1185},"239":{x:1142,y:1157},"240":{x:1142,y:1129},"241":{x:1142,y:1081},"242":{x:1154,y:1047},"243":{x:1155,y:1018},"244":{x:1156,y:986},"245":{x:1156,y:960},"246":{x:1156,y:934},"247":{x:1156,y:907},"248":{x:1156,y:878},"249":{x:1156,y:850},"250":{x:1156,y:822},"251":{x:1156,y:796},"252":{x:1157,y:767},"253":{x:1157,y:741},"254":{x:1158,y:695},"255":{x:1158,y:650},"256":{x:1159,y:604},"257":{x:1156,y:617},"258":{x:1152,y:635},"259":{x:1148,y:653},"260":{x:1145,y:665},"261":{x:1143,y:677},"262":{x:1140,y:691},"263":{x:1136,y:704},"264":{x:1134,y:716},"265":{x:1130,y:734},"266":{x:1125,y:753},"267":{x:1122,y:770},"268":{x:1119,y:783},"269":{x:1116,y:795},"270":{x:1116,y:822},"271":{x:1116,y:860},"272":{x:1115,y:918},"273":{x:1114,y:975},"274":{x:1114,y:1018},"275":{x:1113,y:1061},"276":{x:1112,y:1100},"277":{x:1112,y:1143},"278":{x:1111,y:1181},"279":{x:1104,y:1081},"280":{x:1104,y:1102},"281":{x:1104,y:1129},"282":{x:1104,y:1157},"283":{x:1104,y:1185},"284":{x:1104,y:1211},"285":{x:1104,y:1238},"286":{x:1104,y:1268},"287":{x:1104,y:1294},"288":{x:1104,y:1314},"289":{x:1104,y:1330},"290":{x:1104,y:1245},"291":{x:1107,y:1406},"292":{x:1108,y:1434},"293":{x:1109,y:1452},"294":{x:1060,y:1423},"295":{x:1058,y:1404},"296":{x:1073,y:1249},"297":{x:1073,y:1234},"298":{x:1073,y:1220},"299":{x:1073,y:1207},"300":{x:1073,y:1194},"301":{x:1073,y:1179},"302":{x:1073,y:1166},"303":{x:1073,y:1153},"304":{x:1073,y:1138},"305":{x:1073,y:1124},"306":{x:1073,y:1110},"307":{x:1073,y:1096},"308":{x:1064,y:1040},"309":{x:1064,y:1013},"310":{x:1062,y:986},"311":{x:1058,y:965},"312":{x:1053,y:936},"313":{x:1048,y:908},"314":{x:1044,y:889},"315":{x:1040,y:868},"316":{x:1037,y:849},"317":{x:1033,y:830},"318":{x:1030,y:811},"319":{x:1026,y:792},"320":{x:1068,y:712},"321":{x:1069,y:683},"322":{x:1070,y:654},"323":{x:1070,y:634},"324":{x:1050,y:658},"325":{x:1028,y:686},"326":{x:1028,y:711},"327":{x:1028,y:732},"328":{x:1028,y:765},"329":{x:1027,y:795},"330":{x:1027,y:820},"331":{x:1027,y:848},"332":{x:1026,y:874},"333":{x:1026,y:902},"334":{x:1026,y:929},"335":{x:1024,y:958},"336":{x:1024,y:984},"337":{x:1023,y:1012},"338":{x:1022,y:1038},"339":{x:1022,y:1073},"340":{x:1024,y:1101},"341":{x:1022,y:1128},"342":{x:1022,y:1152},"343":{x:1021,y:1182},"344":{x:1021,y:1210},"345":{x:1021,y:1237},"346":{x:1020,y:1264},"347":{x:1020,y:1291},"348":{x:1020,y:1322},"349":{x:1019,y:1349},"350":{x:1019,y:1376},"351":{x:1019,y:1397},"352":{x:996,y:1373},"353":{x:970,y:1347},"354":{x:970,y:1321},"355":{x:970,y:1294},"356":{x:970,y:1266},"357":{x:970,y:1239},"358":{x:970,y:1212},"359":{x:970,y:1184},"360":{x:970,y:1156},"361":{x:971,y:1119},"362":{x:972,y:1082},"363":{x:972,y:1058},"364":{x:973,y:1030},"365":{x:973,y:1005},"366":{x:974,y:981},"367":{x:974,y:956},"368":{x:975,y:931},"369":{x:976,y:902},"370":{x:961,y:909},"371":{x:946,y:917},"372":{x:936,y:922},"373":{x:924,y:945},"374":{x:924,y:953},"375":{x:926,y:937},"376":{x:927,y:923},"377":{x:929,y:903},"378":{x:932,y:880},"379":{x:933,y:861},"380":{x:935,y:846},"381":{x:935,y:872},"382":{x:934,y:902},"383":{x:934,y:930},"384":{x:952,y:1112},"385":{x:970,y:1294},"386":{x:933,y:1010},"387":{x:933,y:1041},"388":{x:932,y:1069},"389":{x:932,y:1100},"390":{x:931,y:1127},"391":{x:931,y:1151},"392":{x:930,y:1182},"393":{x:930,y:1210},"394":{x:930,y:1155},"395":{x:930,y:1265},"396":{x:930,y:1294},"397":{x:928,y:1320},"398":{x:930,y:1340},"399":{x:921,y:1303},"400":{x:914,y:1279},"401":{x:907,y:1252},"402":{x:901,y:1227},"403":{x:895,y:1203},"404":{x:888,y:1178},"405":{x:882,y:1154},"406":{x:882,y:1126},"407":{x:882,y:1100},"408":{x:882,y:1062},"409":{x:882,y:1037},"410":{x:887,y:1023},"411":{x:892,y:1008},"412":{x:898,y:992},"413":{x:903,y:978},"414":{x:907,y:964},"415":{x:899,y:973},"416":{x:893,y:980},"417":{x:887,y:986},"418":{x:883,y:991},"419":{x:877,y:997},"420":{x:873,y:1003},"421":{x:865,y:1011},"422":{x:858,y:1019},"423":{x:853,y:1025},"424":{x:848,y:1031},"425":{x:843,y:1036},"426":{x:842,y:1071},"427":{x:841,y:1100},"428":{x:843,y:1126},"429":{x:842,y:1156},"430":{x:841,y:1182},"431":{x:841,y:1182},"432":{x:840,y:1262},"433":{x:840,y:1262},"434":{x:840,y:1262},"435":{x:840,y:1262},"436":{x:840,y:1262},"437":{x:840,y:1262},"438":{x:840,y:1262},"439":{x:840,y:1262},"440":{x:882,y:1037},"441":{x:882,y:1037},"442":{x:882,y:1037},"443":{x:882,y:1037},"444":{x:882,y:1037},"445":{x:935,y:846},"446":{x:935,y:846},"447":{x:935,y:846},"448":{x:840,y:1262},"449":{x:840,y:1262},"450":{x:840,y:1262},"451":{x:840,y:1262},"452":{x:840,y:1262},"453":{x:840,y:1262},"454":{x:840,y:1262},"455":{x:840,y:1262},"456":{x:882,y:1037},"457":{x:882,y:1037},"458":{x:935,y:846},"459":{x:843,y:1036},"460":{x:843,y:1036},"461":{x:843,y:1036},"462":{x:843,y:1036},"463":{x:843,y:1036},"464":{x:843,y:1036},"465":{x:843,y:1036},"466":{x:843,y:1036}};
const LV_S16={"2":{x:192,y:155},"3":{x:648,y:149},"9":{x:786,y:630},"12":{x:799,y:388},"16":{x:502,y:171},"18":{x:632,y:177},"19":{x:398,y:596},"22":{x:178,y:239},"27":{x:148,y:308},"34":{x:274,y:614},"44":{x:503,y:124},"77":{x:692,y:796},"86":{x:833,y:666},"88":{x:836,y:603},"90":{x:838,y:552},"113":{x:798,y:415},"116":{x:794,y:496},"117":{x:792,y:522},"118":{x:791,y:550},"122":{x:786,y:664},"123":{x:784,y:692},"127":{x:772,y:798},"130":{x:744,y:802},"132":{x:744,y:744},"133":{x:744,y:717},"134":{x:746,y:690},"135":{x:748,y:662},"136":{x:750,y:636},"137":{x:748,y:602},"138":{x:750,y:576},"139":{x:751,y:549},"140":{x:752,y:522},"141":{x:754,y:494},"142":{x:755,y:467},"143":{x:756,y:440},"144":{x:758,y:414},"145":{x:758,y:386},"148":{x:764,y:297},"150":{x:766,y:244},"157":{x:718,y:241},"158":{x:717,y:269},"159":{x:716,y:296},"162":{x:711,y:384},"164":{x:710,y:438},"165":{x:710,y:465},"166":{x:709,y:492},"167":{x:708,y:519},"168":{x:708,y:546},"169":{x:708,y:573},"170":{x:707,y:600},"172":{x:698,y:660},"173":{x:697,y:687},"174":{x:696,y:715},"175":{x:695,y:741},"184":{x:648,y:848},"185":{x:650,y:821},"186":{x:651,y:794},"187":{x:653,y:767},"188":{x:654,y:739},"189":{x:656,y:712},"190":{x:658,y:685},"191":{x:659,y:659},"192":{x:660,y:633},"193":{x:660,y:597},"194":{x:660,y:573},"195":{x:660,y:549},"196":{x:660,y:525},"197":{x:660,y:501},"198":{x:666,y:464},"199":{x:666,y:436},"200":{x:668,y:409},"201":{x:671,y:383},"202":{x:673,y:356},"203":{x:673,y:325},"204":{x:674,y:294},"205":{x:676,y:266},"206":{x:676,y:240},"208":{x:675,y:186},"212":{x:630,y:211},"213":{x:628,y:239},"214":{x:626,y:265},"219":{x:620,y:406},"220":{x:619,y:434},"226":{x:612,y:598},"227":{x:612,y:632},"228":{x:612,y:656},"229":{x:610,y:684},"230":{x:608,y:712},"231":{x:606,y:739},"232":{x:606,y:766},"233":{x:605,y:792},"234":{x:604,y:820},"235":{x:603,y:846},"236":{x:600,y:871},"244":{x:563,y:908},"247":{x:566,y:818},"248":{x:568,y:791},"249":{x:569,y:764},"250":{x:570,y:738},"251":{x:571,y:710},"274":{x:543,y:208},"275":{x:541,y:234},"276":{x:540,y:260},"277":{x:538,y:288},"280":{x:534,y:376},"282":{x:532,y:430},"283":{x:532,y:458},"284":{x:530,y:484},"285":{x:530,y:511},"287":{x:525,y:566},"289":{x:522,y:628},"290":{x:522,y:654},"291":{x:521,y:682},"292":{x:520,y:708},"293":{x:520,y:736},"294":{x:520,y:762},"295":{x:517,y:790},"296":{x:516,y:818},"298":{x:516,y:867},"306":{x:475,y:814},"307":{x:478,y:786},"308":{x:478,y:760},"310":{x:480,y:707},"312":{x:483,y:652},"313":{x:484,y:626},"319":{x:490,y:456},"322":{x:494,y:374},"323":{x:496,y:349},"324":{x:497,y:312},"325":{x:497,y:287},"326":{x:500,y:260},"327":{x:500,y:233},"328":{x:502,y:206},"329":{x:505,y:182},"334":{x:456,y:230},"335":{x:456,y:257},"336":{x:454,y:284},"338":{x:448,y:348},"339":{x:450,y:372},"340":{x:448,y:398},"342":{x:446,y:454},"343":{x:445,y:481},"346":{x:441,y:563},"349":{x:434,y:648},"350":{x:431,y:675},"351":{x:430,y:702},"353":{x:970,y:1347},"354":{x:970,y:1321},"356":{x:970,y:1266},"357":{x:970,y:1239},"358":{x:971,y:1210},"359":{x:970,y:1184},"362":{x:394,y:672},"363":{x:395,y:647},"366":{x:399,y:562},"368":{x:401,y:506},"369":{x:402,y:480},"370":{x:404,y:454},"371":{x:404,y:426},"372":{x:406,y:398},"373":{x:408,y:372},"376":{x:411,y:284},"377":{x:412,y:257},"378":{x:414,y:229},"379":{x:418,y:203},"383":{x:365,y:228},"384":{x:364,y:254},"385":{x:362,y:281},"386":{x:932,y:1073},"387":{x:357,y:344},"388":{x:358,y:369},"389":{x:356,y:396},"390":{x:356,y:423},"391":{x:354,y:452},"392":{x:354,y:478},"393":{x:354,y:506},"394":{x:352,y:533},"395":{x:930,y:1265},"396":{x:930,y:1294},"397":{x:348,y:620},"398":{x:350,y:645},"399":{x:886,y:1311},"400":{x:338,y:702},"403":{x:308,y:642},"405":{x:882,y:1154},"406":{x:310,y:558},"407":{x:310,y:531},"408":{x:883,y:1072},"409":{x:313,y:476},"410":{x:314,y:450},"412":{x:316,y:396},"413":{x:320,y:368},"416":{x:322,y:280},"417":{x:324,y:253},"420":{x:278,y:220},"421":{x:277,y:252},"422":{x:276,y:278},"423":{x:274,y:306},"424":{x:271,y:340},"425":{x:270,y:366},"426":{x:842,y:1071},"427":{x:268,y:420},"428":{x:267,y:448},"429":{x:268,y:472},"430":{x:841,y:1182},"431":{x:265,y:529},"433":{x:264,y:580},"437":{x:789,y:1180},"438":{x:790,y:1152},"439":{x:790,y:1124},"445":{x:240,y:250},"446":{x:241,y:224},"450":{x:791,y:1098},"452":{x:750,y:1070},"465":{x:657,y:1094}};
const LV_SVG=`<circle data-lot="1" data-sec="15" cx="1110" cy="308" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="2" data-sec="15" cx="1470" cy="1108" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="3" data-sec="15" cx="968" cy="608" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="4" data-sec="15" cx="1325" cy="1492" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="5" data-sec="15" cx="1323" cy="1476" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="6" data-sec="15" cx="1322" cy="1459" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="7" data-sec="15" cx="1320" cy="1443" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="8" data-sec="15" cx="1310" cy="1131" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="9" data-sec="15" cx="1296" cy="716" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="10" data-sec="15" cx="1253" cy="658" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="11" data-sec="15" cx="1224" cy="620" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="12" data-sec="15" cx="1196" cy="581" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="13" data-sec="15" cx="1164" cy="538" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="14" data-sec="15" cx="1132" cy="494" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="15" data-sec="15" cx="1103" cy="456" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="16" data-sec="15" cx="1060" cy="398" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="17" data-sec="15" cx="1058" cy="426" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="18" data-sec="15" cx="1058" cy="453" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="19" data-sec="15" cx="1056" cy="480" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="20" data-sec="15" cx="1200" cy="1352" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="21" data-sec="15" cx="1172" cy="1409" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="22" data-sec="15" cx="1148" cy="1460" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="23" data-sec="15" cx="1150" cy="1187" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="24" data-sec="15" cx="1084" cy="832" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="25" data-sec="15" cx="1017" cy="478" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="26" data-sec="15" cx="1018" cy="451" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="27" data-sec="15" cx="1020" cy="424" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="28" data-sec="15" cx="1022" cy="397" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="29" data-sec="15" cx="1424" cy="1021" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="30" data-sec="15" cx="1424" cy="992" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="31" data-sec="15" cx="1424" cy="965" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="32" data-sec="15" cx="1424" cy="937" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="33" data-sec="15" cx="1424" cy="910" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="34" data-sec="15" cx="1425" cy="881" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="35" data-sec="15" cx="1425" cy="855" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="36" data-sec="15" cx="1427" cy="828" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="37" data-sec="15" cx="1336" cy="854" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="38" data-sec="15" cx="1427" cy="774" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="39" data-sec="15" cx="1426" cy="746" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="40" data-sec="15" cx="1428" cy="720" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="41" data-sec="15" cx="1153" cy="817" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="42" data-sec="15" cx="844" cy="926" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="43" data-sec="15" cx="909" cy="911" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="44" data-sec="15" cx="982" cy="894" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="45" data-sec="15" cx="1054" cy="877" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="46" data-sec="15" cx="1151" cy="855" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="47" data-sec="15" cx="1248" cy="833" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="48" data-sec="15" cx="1313" cy="818" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="49" data-sec="15" cx="1386" cy="801" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="50" data-sec="15" cx="1386" cy="828" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="51" data-sec="15" cx="1386" cy="852" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="52" data-sec="15" cx="1386" cy="882" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="53" data-sec="15" cx="1385" cy="914" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="54" data-sec="15" cx="1384" cy="944" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="55" data-sec="15" cx="1384" cy="964" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="56" data-sec="15" cx="1384" cy="991" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="57" data-sec="15" cx="1360" cy="904" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="58" data-sec="15" cx="1338" cy="826" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="59" data-sec="15" cx="1343" cy="878" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="60" data-sec="15" cx="1351" cy="956" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="61" data-sec="15" cx="1359" cy="1033" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="62" data-sec="15" cx="1364" cy="1092" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="63" data-sec="15" cx="1370" cy="1143" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="64" data-sec="15" cx="1375" cy="1195" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="65" data-sec="15" cx="1380" cy="1247" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="66" data-sec="15" cx="1380" cy="1273" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="67" data-sec="15" cx="1380" cy="1302" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="68" data-sec="15" cx="1380" cy="1324" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="69" data-sec="15" cx="1380" cy="1356" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="70" data-sec="15" cx="1281" cy="990" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="71" data-sec="15" cx="1207" cy="716" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="72" data-sec="15" cx="884" cy="392" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="73" data-sec="15" cx="883" cy="419" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="74" data-sec="15" cx="882" cy="446" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="75" data-sec="15" cx="880" cy="476" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="76" data-sec="15" cx="879" cy="502" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="77" data-sec="15" cx="878" cy="529" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="78" data-sec="15" cx="877" cy="556" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="79" data-sec="15" cx="878" cy="557" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="80" data-sec="15" cx="879" cy="557" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="81" data-sec="15" cx="880" cy="558" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="82" data-sec="15" cx="881" cy="558" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="83" data-sec="15" cx="869" cy="586" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="84" data-sec="15" cx="856" cy="615" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="85" data-sec="15" cx="847" cy="634" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="86" data-sec="15" cx="833" cy="666" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="87" data-sec="15" cx="834" cy="640" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="88" data-sec="15" cx="836" cy="603" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="89" data-sec="15" cx="837" cy="580" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="90" data-sec="15" cx="838" cy="552" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="91" data-sec="15" cx="838" cy="525" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="92" data-sec="15" cx="840" cy="498" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="93" data-sec="15" cx="842" cy="470" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="94" data-sec="15" cx="842" cy="444" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="95" data-sec="15" cx="844" cy="416" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="96" data-sec="15" cx="932" cy="502" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="97" data-sec="15" cx="1020" cy="587" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="98" data-sec="15" cx="1107" cy="673" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="99" data-sec="15" cx="1206" cy="769" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="100" data-sec="15" cx="1256" cy="942" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="101" data-sec="15" cx="1307" cy="1115" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="102" data-sec="15" cx="1341" cy="1230" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="103" data-sec="15" cx="1344" cy="1215" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="104" data-sec="15" cx="1375" cy="1268" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="105" data-sec="15" cx="1371" cy="1226" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="106" data-sec="15" cx="1366" cy="1174" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="107" data-sec="15" cx="1361" cy="1122" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="108" data-sec="15" cx="1355" cy="1064" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="109" data-sec="15" cx="1347" cy="986" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="110" data-sec="15" cx="1339" cy="909" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="111" data-sec="15" cx="1339" cy="833" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="112" data-sec="15" cx="1361" cy="911" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="113" data-sec="15" cx="1365" cy="951" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="114" data-sec="15" cx="1356" cy="920" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="115" data-sec="15" cx="1356" cy="899" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="116" data-sec="15" cx="1357" cy="869" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="117" data-sec="15" cx="1357" cy="842" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="118" data-sec="15" cx="1357" cy="817" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="119" data-sec="15" cx="1357" cy="798" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="120" data-sec="15" cx="1355" cy="778" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="121" data-sec="15" cx="1333" cy="846" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="122" data-sec="15" cx="1313" cy="905" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="123" data-sec="15" cx="1284" cy="995" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="124" data-sec="15" cx="1254" cy="1085" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="125" data-sec="15" cx="1232" cy="1152" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="126" data-sec="15" cx="1210" cy="1220" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="127" data-sec="15" cx="1190" cy="1280" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="128" data-sec="15" cx="1168" cy="1347" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="129" data-sec="15" cx="1148" cy="1407" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="130" data-sec="15" cx="1149" cy="1379" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="131" data-sec="15" cx="1125" cy="1328" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="132" data-sec="15" cx="1103" cy="1282" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="133" data-sec="15" cx="1081" cy="1237" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="134" data-sec="15" cx="1059" cy="1192" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="135" data-sec="15" cx="1038" cy="1146" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="136" data-sec="15" cx="1013" cy="1095" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="137" data-sec="15" cx="992" cy="1050" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="138" data-sec="15" cx="970" cy="1004" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="139" data-sec="15" cx="948" cy="959" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="140" data-sec="15" cx="916" cy="891" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="141" data-sec="15" cx="880" cy="817" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="142" data-sec="15" cx="859" cy="771" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="143" data-sec="15" cx="837" cy="726" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="144" data-sec="15" cx="1000" cy="933" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="145" data-sec="15" cx="1145" cy="1116" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="146" data-sec="15" cx="1290" cy="1300" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="147" data-sec="15" cx="1290" cy="1300" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="148" data-sec="15" cx="1148" cy="1460" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="149" data-sec="15" cx="1200" cy="1352" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="150" data-sec="15" cx="1176" cy="1325" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="151" data-sec="15" cx="1198" cy="1238" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="152" data-sec="15" cx="1179" cy="1270" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="153" data-sec="15" cx="1165" cy="1202" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="154" data-sec="15" cx="1126" cy="894" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="155" data-sec="15" cx="1220" cy="1249" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="156" data-sec="15" cx="1220" cy="1234" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="157" data-sec="15" cx="1220" cy="1220" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="158" data-sec="15" cx="1220" cy="1207" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="159" data-sec="15" cx="1220" cy="1194" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="160" data-sec="15" cx="1220" cy="1179" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="161" data-sec="15" cx="1220" cy="1166" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="162" data-sec="15" cx="1220" cy="1153" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="163" data-sec="15" cx="1220" cy="1138" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="164" data-sec="15" cx="1220" cy="1124" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="165" data-sec="15" cx="1220" cy="1110" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="166" data-sec="15" cx="1220" cy="1096" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="167" data-sec="15" cx="1052" cy="873" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="168" data-sec="15" cx="1041" cy="909" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="169" data-sec="15" cx="1042" cy="883" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="170" data-sec="15" cx="1043" cy="855" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="171" data-sec="15" cx="1043" cy="826" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="172" data-sec="15" cx="1044" cy="798" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="173" data-sec="15" cx="1046" cy="768" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="174" data-sec="15" cx="1054" cy="747" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="175" data-sec="15" cx="1094" cy="751" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="176" data-sec="15" cx="1134" cy="754" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="177" data-sec="15" cx="1178" cy="758" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="178" data-sec="15" cx="1238" cy="763" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="179" data-sec="15" cx="1297" cy="769" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="180" data-sec="15" cx="1337" cy="772" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="181" data-sec="15" cx="1320" cy="760" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="182" data-sec="15" cx="1306" cy="749" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="183" data-sec="15" cx="1291" cy="738" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="184" data-sec="15" cx="1276" cy="727" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="185" data-sec="15" cx="1262" cy="716" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="186" data-sec="15" cx="1245" cy="704" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="187" data-sec="15" cx="1230" cy="728" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="188" data-sec="15" cx="1228" cy="819" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="189" data-sec="15" cx="1227" cy="880" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="190" data-sec="15" cx="1225" cy="941" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="191" data-sec="15" cx="1224" cy="1010" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="192" data-sec="15" cx="1222" cy="1078" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="193" data-sec="15" cx="1221" cy="1139" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="194" data-sec="15" cx="1218" cy="1231" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="195" data-sec="15" cx="1216" cy="1330" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="196" data-sec="15" cx="1060" cy="1323" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="197" data-sec="15" cx="1060" cy="1323" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="198" data-sec="15" cx="1095" cy="1326" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="199" data-sec="15" cx="1117" cy="1239" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="200" data-sec="15" cx="1139" cy="1152" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="201" data-sec="15" cx="1163" cy="1054" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="202" data-sec="15" cx="1184" cy="967" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="203" data-sec="15" cx="1206" cy="880" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="204" data-sec="15" cx="1206" cy="908" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="205" data-sec="15" cx="1206" cy="934" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="206" data-sec="15" cx="1204" cy="960" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="207" data-sec="15" cx="1204" cy="988" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="208" data-sec="15" cx="1204" cy="1016" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="209" data-sec="15" cx="1204" cy="1044" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="210" data-sec="15" cx="1181" cy="1096" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="211" data-sec="15" cx="1181" cy="1110" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="212" data-sec="15" cx="1181" cy="1124" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="213" data-sec="15" cx="1181" cy="1138" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="214" data-sec="15" cx="1181" cy="1153" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="215" data-sec="15" cx="1181" cy="1166" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="216" data-sec="15" cx="1181" cy="1179" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="217" data-sec="15" cx="1181" cy="1194" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="218" data-sec="15" cx="1181" cy="1207" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="219" data-sec="15" cx="1181" cy="1220" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="220" data-sec="15" cx="1181" cy="1234" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="221" data-sec="15" cx="1181" cy="1249" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="222" data-sec="15" cx="1179" cy="1368" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="223" data-sec="15" cx="1188" cy="1412" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="224" data-sec="15" cx="1198" cy="1462" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="225" data-sec="15" cx="1197" cy="1490" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="226" data-sec="15" cx="1199" cy="1421" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="227" data-sec="15" cx="1201" cy="1338" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="228" data-sec="15" cx="1150" cy="1242" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="229" data-sec="15" cx="1150" cy="1242" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="230" data-sec="15" cx="1142" cy="1245" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="231" data-sec="15" cx="1142" cy="1232" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="232" data-sec="15" cx="1142" cy="1330" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="233" data-sec="15" cx="1142" cy="1314" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="234" data-sec="15" cx="1142" cy="1294" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="235" data-sec="15" cx="1142" cy="1268" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="236" data-sec="15" cx="1142" cy="1238" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="237" data-sec="15" cx="1142" cy="1211" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="238" data-sec="15" cx="1142" cy="1185" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="239" data-sec="15" cx="1142" cy="1157" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="240" data-sec="15" cx="1142" cy="1129" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="241" data-sec="15" cx="1142" cy="1081" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="242" data-sec="15" cx="1154" cy="1047" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="243" data-sec="15" cx="1155" cy="1018" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="244" data-sec="15" cx="1156" cy="986" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="245" data-sec="15" cx="1156" cy="960" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="246" data-sec="15" cx="1156" cy="934" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="247" data-sec="15" cx="1156" cy="907" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="248" data-sec="15" cx="1156" cy="878" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="249" data-sec="15" cx="1156" cy="850" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="250" data-sec="15" cx="1156" cy="822" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="251" data-sec="15" cx="1156" cy="796" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="252" data-sec="15" cx="1157" cy="767" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="253" data-sec="15" cx="1157" cy="741" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="254" data-sec="15" cx="1158" cy="695" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="255" data-sec="15" cx="1158" cy="650" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="256" data-sec="15" cx="1159" cy="604" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="257" data-sec="15" cx="1156" cy="617" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="258" data-sec="15" cx="1152" cy="635" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="259" data-sec="15" cx="1148" cy="653" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="260" data-sec="15" cx="1145" cy="665" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="261" data-sec="15" cx="1143" cy="677" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="262" data-sec="15" cx="1140" cy="691" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="263" data-sec="15" cx="1136" cy="704" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="264" data-sec="15" cx="1134" cy="716" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="265" data-sec="15" cx="1130" cy="734" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="266" data-sec="15" cx="1125" cy="753" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="267" data-sec="15" cx="1122" cy="770" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="268" data-sec="15" cx="1119" cy="783" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="269" data-sec="15" cx="1116" cy="795" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="270" data-sec="15" cx="1116" cy="822" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="271" data-sec="15" cx="1116" cy="860" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="272" data-sec="15" cx="1115" cy="918" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="273" data-sec="15" cx="1114" cy="975" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="274" data-sec="15" cx="1114" cy="1018" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="275" data-sec="15" cx="1113" cy="1061" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="276" data-sec="15" cx="1112" cy="1100" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="277" data-sec="15" cx="1112" cy="1143" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="278" data-sec="15" cx="1111" cy="1181" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="279" data-sec="15" cx="1104" cy="1081" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="280" data-sec="15" cx="1104" cy="1102" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="281" data-sec="15" cx="1104" cy="1129" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="282" data-sec="15" cx="1104" cy="1157" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="283" data-sec="15" cx="1104" cy="1185" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="284" data-sec="15" cx="1104" cy="1211" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="285" data-sec="15" cx="1104" cy="1238" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="286" data-sec="15" cx="1104" cy="1268" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="287" data-sec="15" cx="1104" cy="1294" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="288" data-sec="15" cx="1104" cy="1314" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="289" data-sec="15" cx="1104" cy="1330" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="290" data-sec="15" cx="1104" cy="1245" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="291" data-sec="15" cx="1107" cy="1406" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="292" data-sec="15" cx="1108" cy="1434" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="293" data-sec="15" cx="1109" cy="1452" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="294" data-sec="15" cx="1060" cy="1423" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="295" data-sec="15" cx="1058" cy="1404" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="296" data-sec="15" cx="1073" cy="1249" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="297" data-sec="15" cx="1073" cy="1234" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="298" data-sec="15" cx="1073" cy="1220" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="299" data-sec="15" cx="1073" cy="1207" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="300" data-sec="15" cx="1073" cy="1194" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="301" data-sec="15" cx="1073" cy="1179" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="302" data-sec="15" cx="1073" cy="1166" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="303" data-sec="15" cx="1073" cy="1153" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="304" data-sec="15" cx="1073" cy="1138" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="305" data-sec="15" cx="1073" cy="1124" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="306" data-sec="15" cx="1073" cy="1110" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="307" data-sec="15" cx="1073" cy="1096" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="308" data-sec="15" cx="1064" cy="1040" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="309" data-sec="15" cx="1064" cy="1013" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="310" data-sec="15" cx="1062" cy="986" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="311" data-sec="15" cx="1058" cy="965" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="312" data-sec="15" cx="1053" cy="936" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="313" data-sec="15" cx="1048" cy="908" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="314" data-sec="15" cx="1044" cy="889" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="315" data-sec="15" cx="1040" cy="868" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="316" data-sec="15" cx="1037" cy="849" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="317" data-sec="15" cx="1033" cy="830" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="318" data-sec="15" cx="1030" cy="811" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="319" data-sec="15" cx="1026" cy="792" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="320" data-sec="15" cx="1068" cy="712" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="321" data-sec="15" cx="1069" cy="683" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="322" data-sec="15" cx="1070" cy="654" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="323" data-sec="15" cx="1070" cy="634" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="324" data-sec="15" cx="1050" cy="658" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="325" data-sec="15" cx="1028" cy="686" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="326" data-sec="15" cx="1028" cy="711" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="327" data-sec="15" cx="1028" cy="732" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="328" data-sec="15" cx="1028" cy="765" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="329" data-sec="15" cx="1027" cy="795" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="330" data-sec="15" cx="1027" cy="820" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="331" data-sec="15" cx="1027" cy="848" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="332" data-sec="15" cx="1026" cy="874" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="333" data-sec="15" cx="1026" cy="902" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="334" data-sec="15" cx="1026" cy="929" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="335" data-sec="15" cx="1024" cy="958" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="336" data-sec="15" cx="1024" cy="984" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="337" data-sec="15" cx="1023" cy="1012" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="338" data-sec="15" cx="1022" cy="1038" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="339" data-sec="15" cx="1022" cy="1073" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="340" data-sec="15" cx="1024" cy="1101" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="341" data-sec="15" cx="1022" cy="1128" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="342" data-sec="15" cx="1022" cy="1152" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="343" data-sec="15" cx="1021" cy="1182" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="344" data-sec="15" cx="1021" cy="1210" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="345" data-sec="15" cx="1021" cy="1237" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="346" data-sec="15" cx="1020" cy="1264" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="347" data-sec="15" cx="1020" cy="1291" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="348" data-sec="15" cx="1020" cy="1322" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="349" data-sec="15" cx="1019" cy="1349" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="350" data-sec="15" cx="1019" cy="1376" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="351" data-sec="15" cx="1019" cy="1397" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="352" data-sec="15" cx="996" cy="1373" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="353" data-sec="15" cx="970" cy="1347" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="354" data-sec="15" cx="970" cy="1321" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="355" data-sec="15" cx="970" cy="1294" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="356" data-sec="15" cx="970" cy="1266" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="357" data-sec="15" cx="970" cy="1239" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="358" data-sec="15" cx="970" cy="1212" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="359" data-sec="15" cx="970" cy="1184" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="360" data-sec="15" cx="970" cy="1156" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="361" data-sec="15" cx="971" cy="1119" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="362" data-sec="15" cx="972" cy="1082" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="363" data-sec="15" cx="972" cy="1058" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="364" data-sec="15" cx="973" cy="1030" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="365" data-sec="15" cx="973" cy="1005" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="366" data-sec="15" cx="974" cy="981" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="367" data-sec="15" cx="974" cy="956" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="368" data-sec="15" cx="975" cy="931" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="369" data-sec="15" cx="976" cy="902" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="370" data-sec="15" cx="961" cy="909" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="371" data-sec="15" cx="946" cy="917" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="372" data-sec="15" cx="936" cy="922" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="373" data-sec="15" cx="924" cy="945" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="374" data-sec="15" cx="924" cy="953" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="375" data-sec="15" cx="926" cy="937" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="376" data-sec="15" cx="927" cy="923" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="377" data-sec="15" cx="929" cy="903" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="378" data-sec="15" cx="932" cy="880" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="379" data-sec="15" cx="933" cy="861" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="380" data-sec="15" cx="935" cy="846" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="381" data-sec="15" cx="935" cy="872" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="382" data-sec="15" cx="934" cy="902" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="383" data-sec="15" cx="934" cy="930" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="384" data-sec="15" cx="952" cy="1112" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="385" data-sec="15" cx="970" cy="1294" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="386" data-sec="15" cx="933" cy="1010" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="387" data-sec="15" cx="933" cy="1041" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="388" data-sec="15" cx="932" cy="1069" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="389" data-sec="15" cx="932" cy="1100" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="390" data-sec="15" cx="931" cy="1127" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="391" data-sec="15" cx="931" cy="1151" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="392" data-sec="15" cx="930" cy="1182" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="393" data-sec="15" cx="930" cy="1210" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="394" data-sec="15" cx="930" cy="1155" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="395" data-sec="15" cx="930" cy="1265" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="396" data-sec="15" cx="930" cy="1294" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="397" data-sec="15" cx="928" cy="1320" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="398" data-sec="15" cx="930" cy="1340" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="399" data-sec="15" cx="921" cy="1303" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="400" data-sec="15" cx="914" cy="1279" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="401" data-sec="15" cx="907" cy="1252" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="402" data-sec="15" cx="901" cy="1227" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="403" data-sec="15" cx="895" cy="1203" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="404" data-sec="15" cx="888" cy="1178" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="405" data-sec="15" cx="882" cy="1154" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="406" data-sec="15" cx="882" cy="1126" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="407" data-sec="15" cx="882" cy="1100" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="408" data-sec="15" cx="882" cy="1062" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="409" data-sec="15" cx="882" cy="1037" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="410" data-sec="15" cx="887" cy="1023" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="411" data-sec="15" cx="892" cy="1008" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="412" data-sec="15" cx="898" cy="992" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="413" data-sec="15" cx="903" cy="978" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="414" data-sec="15" cx="907" cy="964" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="415" data-sec="15" cx="899" cy="973" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="416" data-sec="15" cx="893" cy="980" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="417" data-sec="15" cx="887" cy="986" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="418" data-sec="15" cx="883" cy="991" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="419" data-sec="15" cx="877" cy="997" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="420" data-sec="15" cx="873" cy="1003" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="421" data-sec="15" cx="865" cy="1011" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="422" data-sec="15" cx="858" cy="1019" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="423" data-sec="15" cx="853" cy="1025" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="424" data-sec="15" cx="848" cy="1031" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="425" data-sec="15" cx="843" cy="1036" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="426" data-sec="15" cx="842" cy="1071" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="427" data-sec="15" cx="841" cy="1100" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="428" data-sec="15" cx="843" cy="1126" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="429" data-sec="15" cx="842" cy="1156" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="430" data-sec="15" cx="841" cy="1182" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="431" data-sec="15" cx="841" cy="1182" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="432" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="433" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="434" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="435" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="436" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="437" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="438" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="439" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="440" data-sec="15" cx="882" cy="1037" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="441" data-sec="15" cx="882" cy="1037" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="442" data-sec="15" cx="882" cy="1037" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="443" data-sec="15" cx="882" cy="1037" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="444" data-sec="15" cx="882" cy="1037" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="445" data-sec="15" cx="935" cy="846" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="446" data-sec="15" cx="935" cy="846" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="447" data-sec="15" cx="935" cy="846" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="448" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="449" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="450" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="451" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="452" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="453" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="454" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="455" data-sec="15" cx="840" cy="1262" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="456" data-sec="15" cx="882" cy="1037" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="457" data-sec="15" cx="882" cy="1037" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="458" data-sec="15" cx="935" cy="846" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="459" data-sec="15" cx="843" cy="1036" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="460" data-sec="15" cx="843" cy="1036" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="461" data-sec="15" cx="843" cy="1036" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="462" data-sec="15" cx="843" cy="1036" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="463" data-sec="15" cx="843" cy="1036" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="464" data-sec="15" cx="843" cy="1036" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="465" data-sec="15" cx="843" cy="1036" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="466" data-sec="15" cx="843" cy="1036" r="15" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="2" data-sec="16" cx="192" cy="155" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="3" data-sec="16" cx="648" cy="149" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="9" data-sec="16" cx="786" cy="630" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="12" data-sec="16" cx="799" cy="388" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="16" data-sec="16" cx="502" cy="171" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="18" data-sec="16" cx="632" cy="177" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="19" data-sec="16" cx="398" cy="596" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="22" data-sec="16" cx="178" cy="239" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="27" data-sec="16" cx="148" cy="308" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="34" data-sec="16" cx="274" cy="614" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="44" data-sec="16" cx="503" cy="124" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="77" data-sec="16" cx="692" cy="796" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="86" data-sec="16" cx="833" cy="666" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="88" data-sec="16" cx="836" cy="603" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="90" data-sec="16" cx="838" cy="552" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="113" data-sec="16" cx="798" cy="415" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="116" data-sec="16" cx="794" cy="496" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="117" data-sec="16" cx="792" cy="522" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="118" data-sec="16" cx="791" cy="550" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="122" data-sec="16" cx="786" cy="664" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="123" data-sec="16" cx="784" cy="692" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="127" data-sec="16" cx="772" cy="798" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="130" data-sec="16" cx="744" cy="802" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="132" data-sec="16" cx="744" cy="744" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="133" data-sec="16" cx="744" cy="717" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="134" data-sec="16" cx="746" cy="690" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="135" data-sec="16" cx="748" cy="662" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="136" data-sec="16" cx="750" cy="636" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="137" data-sec="16" cx="748" cy="602" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="138" data-sec="16" cx="750" cy="576" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="139" data-sec="16" cx="751" cy="549" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="140" data-sec="16" cx="752" cy="522" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="141" data-sec="16" cx="754" cy="494" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="142" data-sec="16" cx="755" cy="467" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="143" data-sec="16" cx="756" cy="440" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="144" data-sec="16" cx="758" cy="414" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="145" data-sec="16" cx="758" cy="386" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="148" data-sec="16" cx="764" cy="297" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="150" data-sec="16" cx="766" cy="244" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="157" data-sec="16" cx="718" cy="241" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="158" data-sec="16" cx="717" cy="269" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="159" data-sec="16" cx="716" cy="296" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="162" data-sec="16" cx="711" cy="384" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="164" data-sec="16" cx="710" cy="438" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="165" data-sec="16" cx="710" cy="465" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="166" data-sec="16" cx="709" cy="492" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="167" data-sec="16" cx="708" cy="519" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="168" data-sec="16" cx="708" cy="546" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="169" data-sec="16" cx="708" cy="573" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="170" data-sec="16" cx="707" cy="600" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="172" data-sec="16" cx="698" cy="660" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="173" data-sec="16" cx="697" cy="687" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="174" data-sec="16" cx="696" cy="715" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="175" data-sec="16" cx="695" cy="741" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="184" data-sec="16" cx="648" cy="848" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="185" data-sec="16" cx="650" cy="821" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="186" data-sec="16" cx="651" cy="794" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="187" data-sec="16" cx="653" cy="767" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="188" data-sec="16" cx="654" cy="739" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="189" data-sec="16" cx="656" cy="712" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="190" data-sec="16" cx="658" cy="685" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="191" data-sec="16" cx="659" cy="659" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="192" data-sec="16" cx="660" cy="633" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="193" data-sec="16" cx="660" cy="597" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="194" data-sec="16" cx="660" cy="573" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="195" data-sec="16" cx="660" cy="549" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="196" data-sec="16" cx="660" cy="525" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="197" data-sec="16" cx="660" cy="501" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="198" data-sec="16" cx="666" cy="464" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="199" data-sec="16" cx="666" cy="436" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="200" data-sec="16" cx="668" cy="409" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="201" data-sec="16" cx="671" cy="383" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="202" data-sec="16" cx="673" cy="356" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="203" data-sec="16" cx="673" cy="325" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="204" data-sec="16" cx="674" cy="294" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="205" data-sec="16" cx="676" cy="266" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="206" data-sec="16" cx="676" cy="240" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="208" data-sec="16" cx="675" cy="186" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="212" data-sec="16" cx="630" cy="211" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="213" data-sec="16" cx="628" cy="239" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="214" data-sec="16" cx="626" cy="265" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="219" data-sec="16" cx="620" cy="406" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="220" data-sec="16" cx="619" cy="434" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="226" data-sec="16" cx="612" cy="598" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="227" data-sec="16" cx="612" cy="632" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="228" data-sec="16" cx="612" cy="656" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="229" data-sec="16" cx="610" cy="684" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="230" data-sec="16" cx="608" cy="712" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="231" data-sec="16" cx="606" cy="739" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="232" data-sec="16" cx="606" cy="766" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="233" data-sec="16" cx="605" cy="792" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="234" data-sec="16" cx="604" cy="820" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="235" data-sec="16" cx="603" cy="846" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="236" data-sec="16" cx="600" cy="871" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="244" data-sec="16" cx="563" cy="908" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="247" data-sec="16" cx="566" cy="818" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="248" data-sec="16" cx="568" cy="791" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="249" data-sec="16" cx="569" cy="764" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="250" data-sec="16" cx="570" cy="738" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="251" data-sec="16" cx="571" cy="710" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="274" data-sec="16" cx="543" cy="208" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="275" data-sec="16" cx="541" cy="234" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="276" data-sec="16" cx="540" cy="260" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="277" data-sec="16" cx="538" cy="288" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="280" data-sec="16" cx="534" cy="376" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="282" data-sec="16" cx="532" cy="430" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="283" data-sec="16" cx="532" cy="458" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="284" data-sec="16" cx="530" cy="484" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="285" data-sec="16" cx="530" cy="511" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="287" data-sec="16" cx="525" cy="566" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="289" data-sec="16" cx="522" cy="628" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="290" data-sec="16" cx="522" cy="654" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="291" data-sec="16" cx="521" cy="682" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="292" data-sec="16" cx="520" cy="708" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="293" data-sec="16" cx="520" cy="736" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="294" data-sec="16" cx="520" cy="762" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="295" data-sec="16" cx="517" cy="790" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="296" data-sec="16" cx="516" cy="818" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="298" data-sec="16" cx="516" cy="867" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="306" data-sec="16" cx="475" cy="814" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="307" data-sec="16" cx="478" cy="786" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="308" data-sec="16" cx="478" cy="760" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="310" data-sec="16" cx="480" cy="707" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="312" data-sec="16" cx="483" cy="652" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="313" data-sec="16" cx="484" cy="626" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="319" data-sec="16" cx="490" cy="456" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="322" data-sec="16" cx="494" cy="374" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="323" data-sec="16" cx="496" cy="349" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="324" data-sec="16" cx="497" cy="312" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="325" data-sec="16" cx="497" cy="287" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="326" data-sec="16" cx="500" cy="260" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="327" data-sec="16" cx="500" cy="233" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="328" data-sec="16" cx="502" cy="206" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="329" data-sec="16" cx="505" cy="182" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="334" data-sec="16" cx="456" cy="230" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="335" data-sec="16" cx="456" cy="257" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="336" data-sec="16" cx="454" cy="284" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="338" data-sec="16" cx="448" cy="348" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="339" data-sec="16" cx="450" cy="372" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="340" data-sec="16" cx="448" cy="398" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="342" data-sec="16" cx="446" cy="454" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="343" data-sec="16" cx="445" cy="481" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="346" data-sec="16" cx="441" cy="563" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="349" data-sec="16" cx="434" cy="648" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="350" data-sec="16" cx="431" cy="675" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="351" data-sec="16" cx="430" cy="702" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="353" data-sec="16" cx="970" cy="1347" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="354" data-sec="16" cx="970" cy="1321" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="356" data-sec="16" cx="970" cy="1266" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="357" data-sec="16" cx="970" cy="1239" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="358" data-sec="16" cx="971" cy="1210" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="359" data-sec="16" cx="970" cy="1184" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="362" data-sec="16" cx="394" cy="672" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="363" data-sec="16" cx="395" cy="647" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="366" data-sec="16" cx="399" cy="562" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="368" data-sec="16" cx="401" cy="506" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="369" data-sec="16" cx="402" cy="480" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="370" data-sec="16" cx="404" cy="454" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="371" data-sec="16" cx="404" cy="426" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="372" data-sec="16" cx="406" cy="398" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="373" data-sec="16" cx="408" cy="372" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="376" data-sec="16" cx="411" cy="284" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="377" data-sec="16" cx="412" cy="257" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="378" data-sec="16" cx="414" cy="229" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="379" data-sec="16" cx="418" cy="203" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="383" data-sec="16" cx="365" cy="228" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="384" data-sec="16" cx="364" cy="254" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="385" data-sec="16" cx="362" cy="281" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="386" data-sec="16" cx="932" cy="1073" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="387" data-sec="16" cx="357" cy="344" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="388" data-sec="16" cx="358" cy="369" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="389" data-sec="16" cx="356" cy="396" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="390" data-sec="16" cx="356" cy="423" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="391" data-sec="16" cx="354" cy="452" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="392" data-sec="16" cx="354" cy="478" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="393" data-sec="16" cx="354" cy="506" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="394" data-sec="16" cx="352" cy="533" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="395" data-sec="16" cx="930" cy="1265" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="396" data-sec="16" cx="930" cy="1294" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="397" data-sec="16" cx="348" cy="620" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="398" data-sec="16" cx="350" cy="645" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="399" data-sec="16" cx="886" cy="1311" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="400" data-sec="16" cx="338" cy="702" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="403" data-sec="16" cx="308" cy="642" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="405" data-sec="16" cx="882" cy="1154" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="406" data-sec="16" cx="310" cy="558" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="407" data-sec="16" cx="310" cy="531" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="408" data-sec="16" cx="883" cy="1072" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="409" data-sec="16" cx="313" cy="476" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="410" data-sec="16" cx="314" cy="450" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="412" data-sec="16" cx="316" cy="396" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="413" data-sec="16" cx="320" cy="368" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="416" data-sec="16" cx="322" cy="280" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="417" data-sec="16" cx="324" cy="253" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="420" data-sec="16" cx="278" cy="220" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="421" data-sec="16" cx="277" cy="252" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="422" data-sec="16" cx="276" cy="278" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="423" data-sec="16" cx="274" cy="306" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="424" data-sec="16" cx="271" cy="340" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="425" data-sec="16" cx="270" cy="366" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="426" data-sec="16" cx="842" cy="1071" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="427" data-sec="16" cx="268" cy="420" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="428" data-sec="16" cx="267" cy="448" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="429" data-sec="16" cx="268" cy="472" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="430" data-sec="16" cx="841" cy="1182" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="431" data-sec="16" cx="265" cy="529" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="433" data-sec="16" cx="264" cy="580" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="437" data-sec="16" cx="789" cy="1180" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="438" data-sec="16" cx="790" cy="1152" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="439" data-sec="16" cx="790" cy="1124" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="445" data-sec="16" cx="240" cy="250" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="446" data-sec="16" cx="241" cy="224" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="450" data-sec="16" cx="791" cy="1098" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="452" data-sec="16" cx="750" cy="1070" r="17" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="465" data-sec="16" cx="657" cy="1094" r="17" fill="none" stroke="none" style="cursor:pointer"/>`;

var _lvScale=1, _lvBT=null, _lvAL=null;

function openLotView(sec,lotNo){
  if(_lvBT){clearInterval(_lvBT);_lvBT=null;}
  _lvAL=null; _lvHide();
  document.getElementById('lotViewTitle').textContent=(sec&&lotNo)?('Section '+sec+' - Lot '+lotNo):'Section 15 & 16';
  document.getElementById('lotViewOverlay').style.display='flex';

  // SVG 초기화
  var g=document.getElementById('lv-lots');
  if(!g.dataset.ok){
    g.innerHTML=LV_SVG; g.dataset.ok='1';
    g.addEventListener('click',function(e){
      var el=e.target.closest('[data-lot]');
      if(!el)return;
      _lvShow(el.dataset.sec,el.dataset.lot);
      if(typeof showToast==='function')showToast('Section '+el.dataset.sec+' Lot '+el.dataset.lot);
    });
  }

  // 드래그
  var body=document.getElementById('lotViewBody');
  if(body._lv)body._lv();
  var drag=false,sx,sy,sl,st;
  var d=function(e){drag=true;sx=e.pageX;sy=e.pageY;sl=body.scrollLeft;st=body.scrollTop;body.style.cursor='grabbing';};
  var u=function(){drag=false;body.style.cursor='grab';};
  var m=function(e){if(!drag)return;body.scrollLeft=sl-(e.pageX-sx);body.scrollTop=st-(e.pageY-sy);};
  body.addEventListener('mousedown',d);body.addEventListener('mouseleave',u);
  body.addEventListener('mouseup',u);body.addEventListener('mousemove',m);
  body._lv=function(){body.removeEventListener('mousedown',d);body.removeEventListener('mouseleave',u);body.removeEventListener('mouseup',u);body.removeEventListener('mousemove',m);};

  // 터치
  body.addEventListener('touchstart',function(e){if(e.touches.length===1){sx=e.touches[0].clientX;sy=e.touches[0].clientY;sl=body.scrollLeft;st=body.scrollTop;}},{passive:true});
  body.addEventListener('touchmove',function(e){if(e.touches.length===1){body.scrollLeft=sl-(e.touches[0].clientX-sx);body.scrollTop=st-(e.touches[0].clientY-sy);}},{passive:true});

  // 마우스 휠 줌
  if(!body._wheelOk){
    body._wheelOk=true;
    body.addEventListener('wheel',function(e){
      e.preventDefault();
      var f=e.deltaY<0?1.15:0.87;
      var rect=body.getBoundingClientRect();
      var mx=(e.clientX-rect.left+body.scrollLeft)/_lvScale;
      var my=(e.clientY-rect.top +body.scrollTop )/_lvScale;
      _lvApply(Math.min(Math.max(_lvScale*f,0.3),8));
      body.scrollLeft=mx*_lvScale-(e.clientX-rect.left);
      body.scrollTop =my*_lvScale-(e.clientY-rect.top);
    },{passive:false});
  }

  setTimeout(function(){
    var bw=body.clientWidth,bh=body.clientHeight;
    var fit=Math.min(bw/LV_WRAP_W,bh/LV_WRAP_H,1);
    _lvApply(fit);
    body.scrollLeft=Math.max(0,(LV_WRAP_W*_lvScale-bw)/2);
    body.scrollTop =Math.max(0,(LV_WRAP_H*_lvScale-bh)/2);
    if(sec&&lotNo){_lvShow(sec,lotNo);_lvScroll(sec,lotNo);}
  },150);
}

function _lvApply(s){
  _lvScale=s;
  var inner=document.getElementById('lotViewInner');
  inner.style.transformOrigin='top left';
  inner.style.transform='scale('+s+')';
  document.getElementById('lotViewImg').style.width=LV_IMG_W+'px';
  document.getElementById('lotViewImg').style.height=LV_IMG_H+'px';
  var svg=document.getElementById('lv-overlay');
  if(svg){svg.setAttribute('width',LV_IMG_W);svg.setAttribute('height',LV_IMG_H);}
  // lotViewRotate는 scale과 무관하게 rotate(-15deg) 유지
  var rot=document.getElementById('lotViewRotate');
  if(rot){rot.style.transform='rotate(-15deg)';rot.style.transformOrigin='center center';}
}

function _lvP(sec,lot){return String(sec)==='15'?LV_S15[String(lot)]:LV_S16[String(lot)];}

function _lvShow(sec,lot){
  _lvHide(); _lvAL={sec:String(sec),lot:String(lot)};
  var p=_lvP(sec,lot); if(!p)return;
  var hi=document.getElementById('lv-hi-circ');
  hi.setAttribute('cx',p.x);hi.setAttribute('cy',p.y);hi.setAttribute('r','44');
  hi.style.display='';
  var vis=true; hi.style.opacity='1';
  _lvBT=setInterval(function(){vis=!vis;hi.style.opacity=vis?'1':'0';},500);
}

function _lvHide(){
  if(_lvBT){clearInterval(_lvBT);_lvBT=null;}
  var hi=document.getElementById('lv-hi-circ');
  if(hi){hi.style.display='none';hi.style.opacity='1';}
  var hr=document.getElementById('lv-hi-rect');
  if(hr)hr.style.display='none';
  _lvAL=null;
}

function _lvScroll(sec,lot){
  var p=_lvP(sec,lot); if(!p)return;
  var body=document.getElementById('lotViewBody'),s=_lvScale;
  body.scrollLeft=Math.max(0,p.x*s-body.clientWidth/2);
  body.scrollTop =Math.max(0,p.y*s-body.clientHeight/2);
}

function closeLotView(){document.getElementById('lotViewOverlay').style.display='none';_lvHide();}

function lvZoom(f){
  var body=document.getElementById('lotViewBody'),px,py;
  if(_lvAL){var p=_lvP(_lvAL.sec,_lvAL.lot);if(p){px=p.x;py=p.y;}}
  if(!px){px=(body.scrollLeft+body.clientWidth/2)/_lvScale;py=(body.scrollTop+body.clientHeight/2)/_lvScale;}
  _lvApply(Math.min(Math.max(_lvScale*f,0.3),8));
  body.scrollLeft=px*_lvScale-body.clientWidth/2;
  body.scrollTop =py*_lvScale-body.clientHeight/2;
}

function lvReset(){
  var body=document.getElementById('lotViewBody');
  _lvApply(Math.min(body.clientWidth/LV_WRAP_W,body.clientHeight/LV_WRAP_H,1));
  body.scrollLeft=Math.max(0,(LV_WRAP_W*_lvScale-body.clientWidth)/2);
  body.scrollTop =Math.max(0,(LV_WRAP_H*_lvScale-body.clientHeight)/2);
}
