/* Lot View — Circle 하이라이트 */
const LV_IMG_W=1600, LV_IMG_H=1304;
const LV_S15={"1":{x:1543,y:535},"2":{x:1543,y:518},"3":{x:1521,y:500},"4":{x:1521,y:518},"5":{x:1521,y:536},"6":{x:1521,y:554},"7":{x:1521,y:554},"8":{x:1521,y:554},"9":{x:1521,y:554},"10":{x:1521,y:554},"11":{x:1521,y:554},"12":{x:1521,y:554},"13":{x:1521,y:554},"14":{x:1521,y:554},"15":{x:1521,y:554},"16":{x:1521,y:554},"17":{x:1521,y:554},"18":{x:1521,y:554},"19":{x:1521,y:554},"20":{x:1360,y:516},"21":{x:1360,y:516},"22":{x:1360,y:516},"23":{x:1360,y:516},"24":{x:1320,y:498},"25":{x:1320,y:498},"26":{x:1320,y:498},"27":{x:1320,y:516},"28":{x:1320,y:534},"29":{x:1320,y:534},"30":{x:1387,y:341},"31":{x:1387,y:341},"32":{x:1387,y:341},"33":{x:1387,y:341},"34":{x:1387,y:341},"35":{x:1387,y:341},"36":{x:1387,y:341},"37":{x:1387,y:341},"38":{x:1387,y:341},"39":{x:1387,y:341},"40":{x:1326,y:562},"41":{x:1261,y:524},"42":{x:1387,y:341},"43":{x:1387,y:359},"44":{x:1387,y:376},"45":{x:1387,y:393},"46":{x:1387,y:411},"47":{x:1380,y:448},"48":{x:1375,y:473},"49":{x:1370,y:501},"50":{x:1365,y:525},"51":{x:1360,y:553},"52":{x:1360,y:571},"53":{x:1360,y:589},"54":{x:1352,y:584},"55":{x:1347,y:581},"56":{x:1342,y:577},"57":{x:1336,y:574},"58":{x:1331,y:571},"59":{x:1326,y:567},"60":{x:1318,y:563},"61":{x:1310,y:558},"62":{x:1305,y:554},"63":{x:1300,y:551},"64":{x:1294,y:548},"65":{x:1289,y:545},"66":{x:1284,y:541},"67":{x:1278,y:538},"68":{x:1273,y:535},"69":{x:1266,y:530},"70":{x:1278,y:537},"71":{x:1270,y:549},"72":{x:1267,y:566},"73":{x:1278,y:571},"74":{x:1278,y:571},"75":{x:1278,y:571},"76":{x:1278,y:571},"77":{x:1278,y:571},"78":{x:1278,y:571},"79":{x:1278,y:571},"80":{x:1278,y:571},"81":{x:1278,y:571},"82":{x:1278,y:571},"83":{x:1278,y:571},"84":{x:1278,y:571},"85":{x:1278,y:571},"86":{x:1278,y:571},"87":{x:1278,y:571},"88":{x:1278,y:571},"89":{x:1278,y:571},"90":{x:1278,y:571},"91":{x:1278,y:571},"92":{x:1278,y:571},"93":{x:1278,y:571},"94":{x:1278,y:571},"95":{x:1278,y:571},"96":{x:1278,y:571},"97":{x:1278,y:571},"98":{x:1278,y:553},"99":{x:1283,y:555},"100":{x:1291,y:557},"101":{x:1298,y:560},"102":{x:1303,y:561},"103":{x:1308,y:563},"104":{x:1313,y:565},"105":{x:1317,y:567},"106":{x:1322,y:568},"107":{x:1327,y:570},"108":{x:1332,y:572},"109":{x:1340,y:574},"110":{x:1347,y:577},"111":{x:1352,y:578},"112":{x:1356,y:580},"113":{x:1362,y:582},"114":{x:1367,y:584},"115":{x:1372,y:585},"116":{x:1374,y:574},"117":{x:1374,y:554},"118":{x:1346,y:556},"119":{x:1322,y:558},"120":{x:1301,y:560},"121":{x:1277,y:563},"122":{x:1256,y:565},"123":{x:1224,y:568},"124":{x:1192,y:571},"125":{x:1192,y:589},"126":{x:1192,y:607},"127":{x:1402,y:544},"128":{x:1387,y:341},"129":{x:1387,y:341},"130":{x:1387,y:341},"131":{x:1387,y:341},"132":{x:1387,y:341},"133":{x:1387,y:341},"134":{x:1387,y:341},"135":{x:1387,y:341},"136":{x:1387,y:341},"137":{x:1387,y:341},"138":{x:1387,y:341},"139":{x:1387,y:341},"140":{x:1387,y:341},"141":{x:1320,y:534},"142":{x:1320,y:516},"143":{x:1320,y:498},"144":{x:1320,y:498},"145":{x:1320,y:498},"146":{x:1360,y:516},"147":{x:1360,y:516},"148":{x:1360,y:516},"149":{x:1360,y:516},"150":{x:1360,y:516},"151":{x:1360,y:516},"152":{x:1360,y:516},"153":{x:1320,y:498},"154":{x:1320,y:498},"155":{x:1320,y:498},"156":{x:1320,y:516},"157":{x:1320,y:534},"158":{x:1192,y:498},"159":{x:1192,y:498},"160":{x:1192,y:498},"161":{x:1192,y:498},"162":{x:1192,y:498},"163":{x:1192,y:498},"164":{x:1192,y:498},"165":{x:1192,y:498},"166":{x:1192,y:498},"167":{x:1192,y:498},"168":{x:1192,y:498},"169":{x:1192,y:498},"170":{x:1192,y:498},"171":{x:1192,y:498},"172":{x:1192,y:498},"173":{x:1192,y:498},"174":{x:1192,y:516},"175":{x:1192,y:534},"176":{x:1215,y:524},"177":{x:1241,y:513},"178":{x:1276,y:498},"179":{x:1311,y:483},"180":{x:1334,y:473},"181":{x:1360,y:462},"182":{x:1333,y:447},"183":{x:1306,y:432},"184":{x:1280,y:417},"185":{x:1253,y:402},"186":{x:1222,y:386},"187":{x:1182,y:363},"188":{x:1142,y:341},"189":{x:1142,y:359},"190":{x:1142,y:377},"191":{x:1142,y:395},"192":{x:1189,y:417},"193":{x:1230,y:437},"194":{x:1293,y:466},"195":{x:1360,y:498},"196":{x:1360,y:516},"197":{x:1352,y:513},"198":{x:1344,y:509},"199":{x:1336,y:505},"200":{x:1329,y:502},"201":{x:1320,y:498},"202":{x:1320,y:516},"203":{x:1320,y:534},"204":{x:1322,y:531},"205":{x:1323,y:529},"206":{x:1324,y:527},"207":{x:1326,y:526},"208":{x:1327,y:524},"209":{x:1328,y:522},"210":{x:1329,y:521},"211":{x:1330,y:519},"212":{x:1331,y:518},"213":{x:1332,y:516},"214":{x:1333,y:514},"215":{x:1334,y:513},"216":{x:1335,y:511},"217":{x:1337,y:510},"218":{x:1338,y:508},"219":{x:1339,y:506},"220":{x:1340,y:504},"221":{x:1342,y:502},"222":{x:1343,y:500},"223":{x:1344,y:498},"224":{x:1346,y:496},"225":{x:1347,y:495},"226":{x:1348,y:493},"227":{x:1340,y:489},"228":{x:1192,y:498},"229":{x:1192,y:498},"230":{x:1192,y:498},"231":{x:1192,y:498},"232":{x:1192,y:498},"233":{x:1192,y:498},"234":{x:1192,y:498},"235":{x:1192,y:498},"236":{x:1192,y:498},"237":{x:1192,y:498},"238":{x:1192,y:498},"239":{x:1192,y:498},"240":{x:1192,y:498},"241":{x:1192,y:498},"242":{x:1192,y:498},"243":{x:1278,y:516},"244":{x:1278,y:516},"245":{x:1278,y:516},"246":{x:1278,y:516},"247":{x:1278,y:516},"248":{x:1278,y:516},"249":{x:1278,y:516},"250":{x:1278,y:498},"251":{x:1278,y:480},"252":{x:1278,y:462},"253":{x:1278,y:444},"254":{x:1260,y:437},"255":{x:1243,y:429},"256":{x:1225,y:422},"257":{x:1205,y:413},"258":{x:1179,y:402},"259":{x:1152,y:391},"260":{x:1152,y:409},"261":{x:1152,y:427},"262":{x:1172,y:432},"263":{x:1192,y:437},"264":{x:1209,y:442},"265":{x:1236,y:449},"266":{x:1265,y:456},"267":{x:1289,y:462},"268":{x:1306,y:467},"269":{x:1304,y:468},"270":{x:1303,y:470},"271":{x:1302,y:472},"272":{x:1301,y:474},"273":{x:1299,y:477},"274":{x:1298,y:478},"275":{x:1297,y:480},"276":{x:1295,y:482},"277":{x:1294,y:484},"278":{x:1293,y:485},"279":{x:1292,y:486},"280":{x:1291,y:488},"281":{x:1290,y:490},"282":{x:1289,y:491},"283":{x:1288,y:493},"284":{x:1287,y:495},"285":{x:1286,y:496},"286":{x:1284,y:498},"287":{x:1283,y:500},"288":{x:1282,y:501},"289":{x:1282,y:487},"290":{x:1288,y:475},"291":{x:1295,y:478},"292":{x:1303,y:482},"293":{x:1312,y:485},"294":{x:1320,y:498},"295":{x:1301,y:483},"296":{x:1308,y:487},"297":{x:1317,y:490},"298":{x:1324,y:494},"299":{x:1278,y:516},"300":{x:1278,y:516},"301":{x:1278,y:516},"302":{x:1278,y:516},"303":{x:1278,y:516},"304":{x:1278,y:516},"305":{x:1278,y:516},"306":{x:1278,y:516},"307":{x:1278,y:516},"308":{x:1278,y:516},"309":{x:1278,y:516},"310":{x:1278,y:516},"311":{x:1278,y:516},"312":{x:1278,y:516},"313":{x:1278,y:498},"314":{x:1278,y:480},"315":{x:1278,y:462},"316":{x:1278,y:444},"317":{x:1278,y:444},"318":{x:1278,y:444},"319":{x:1278,y:444},"320":{x:1226,y:465},"321":{x:1226,y:443},"322":{x:1226,y:417},"323":{x:1210,y:409},"324":{x:1193,y:402},"325":{x:1173,y:393},"326":{x:1153,y:385},"327":{x:1135,y:377},"328":{x:1134,y:402},"329":{x:1161,y:410},"330":{x:1186,y:417},"331":{x:1205,y:422},"332":{x:1223,y:426},"333":{x:1243,y:431},"334":{x:1246,y:434},"335":{x:1244,y:436},"336":{x:1243,y:438},"337":{x:1241,y:440},"338":{x:1240,y:442},"339":{x:1239,y:444},"340":{x:1238,y:445},"341":{x:1237,y:447},"342":{x:1236,y:448},"343":{x:1235,y:450},"344":{x:1234,y:452},"345":{x:1233,y:453},"346":{x:1232,y:455},"347":{x:1230,y:456},"348":{x:1229,y:458},"349":{x:1229,y:445},"350":{x:1233,y:438},"351":{x:1278,y:516},"352":{x:1278,y:516},"353":{x:1278,y:516},"354":{x:1278,y:516},"355":{x:1278,y:516},"356":{x:1278,y:516},"357":{x:1278,y:516},"358":{x:1278,y:516},"359":{x:1278,y:516},"360":{x:1278,y:516},"361":{x:1278,y:516},"362":{x:1278,y:498},"363":{x:1278,y:480},"364":{x:1278,y:462},"365":{x:1278,y:444},"366":{x:1278,y:444},"367":{x:1278,y:444},"368":{x:1278,y:444},"369":{x:1152,y:391},"370":{x:1152,y:391},"371":{x:1152,y:391},"372":{x:1152,y:409},"373":{x:1152,y:427},"374":{x:1152,y:427},"375":{x:1152,y:427},"376":{x:1177,y:418},"377":{x:1177,y:393},"378":{x:1152,y:378},"379":{x:1128,y:368},"380":{x:1116,y:371},"381":{x:1125,y:383},"382":{x:1144,y:388},"383":{x:1162,y:393},"384":{x:1189,y:399},"385":{x:1189,y:402},"386":{x:1188,y:404},"387":{x:1187,y:406},"388":{x:1186,y:407},"389":{x:1184,y:409},"390":{x:1183,y:411},"391":{x:1182,y:412},"392":{x:1181,y:414},"393":{x:1180,y:415},"394":{x:1179,y:417},"395":{x:1179,y:403},"396":{x:1187,y:406},"397":{x:1278,y:516},"398":{x:1278,y:516},"399":{x:1278,y:498},"400":{x:1278,y:480},"401":{x:1278,y:462},"402":{x:1278,y:444},"403":{x:1278,y:444},"404":{x:1278,y:444},"405":{x:1278,y:444},"406":{x:1152,y:391},"407":{x:1152,y:391},"408":{x:1152,y:391},"409":{x:1152,y:409},"410":{x:1152,y:427},"411":{x:1152,y:427},"412":{x:1152,y:427},"413":{x:1152,y:427},"414":{x:1082,y:337},"415":{x:1157,y:401},"416":{x:1157,y:378},"417":{x:1137,y:370},"418":{x:1119,y:362},"419":{x:1109,y:368},"420":{x:1123,y:375},"421":{x:1149,y:382},"422":{x:1168,y:388},"423":{x:1166,y:389},"424":{x:1165,y:391},"425":{x:1164,y:393},"426":{x:1163,y:394},"427":{x:1162,y:396},"428":{x:1161,y:397},"429":{x:1160,y:399},"430":{x:1159,y:398},"431":{x:1163,y:391},"432":{x:1278,y:444},"433":{x:1082,y:337},"434":{x:1082,y:337},"435":{x:1082,y:337},"436":{x:1082,y:337},"437":{x:1082,y:337},"438":{x:1082,y:337},"439":{x:1082,y:337},"440":{x:1082,y:337},"441":{x:1082,y:337},"442":{x:1082,y:337},"443":{x:1082,y:337},"444":{x:1082,y:337},"445":{x:1082,y:337},"446":{x:1082,y:337},"447":{x:1082,y:337},"448":{x:1082,y:337},"449":{x:1082,y:337},"450":{x:1082,y:337},"451":{x:1082,y:337},"452":{x:1082,y:337},"453":{x:1082,y:337},"454":{x:1082,y:337},"455":{x:1082,y:337},"456":{x:1082,y:337},"457":{x:1082,y:337},"458":{x:1082,y:337},"459":{x:1082,y:337},"460":{x:1082,y:337},"461":{x:1082,y:337},"462":{x:1082,y:337},"463":{x:1082,y:337},"464":{x:1082,y:337},"465":{x:1082,y:337},"466":{x:1082,y:337}};
const LV_S16={"1":{x:781,y:236},"11":{x:784,y:253},"12":{x:758,y:246},"32":{x:751,y:244},"35":{x:735,y:208},"139":{x:378,y:672},"140":{x:409,y:680},"141":{x:441,y:689},"142":{x:473,y:697},"143":{x:504,y:706},"144":{x:536,y:714},"150":{x:656,y:187},"165":{x:590,y:512},"166":{x:559,y:503},"167":{x:527,y:495},"168":{x:495,y:486},"169":{x:464,y:478},"170":{x:432,y:469},"186":{x:273,y:209},"187":{x:296,y:216},"188":{x:328,y:224},"189":{x:360,y:233},"190":{x:391,y:241},"191":{x:423,y:250},"192":{x:455,y:258},"193":{x:486,y:267},"194":{x:518,y:275},"195":{x:550,y:284},"196":{x:581,y:292},"197":{x:613,y:301},"198":{x:645,y:309},"199":{x:668,y:316},"200":{x:692,y:322},"201":{x:724,y:330},"202":{x:756,y:339},"203":{x:787,y:347},"204":{x:819,y:356},"205":{x:851,y:364},"206":{x:874,y:371},"230":{x:374,y:20},"231":{x:351,y:13},"232":{x:327,y:7}};
const LV_SVG=`<circle data-lot="1" data-sec="15" cx="1543" cy="535" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="2" data-sec="15" cx="1543" cy="518" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="3" data-sec="15" cx="1521" cy="500" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="4" data-sec="15" cx="1521" cy="518" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="5" data-sec="15" cx="1521" cy="536" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="6" data-sec="15" cx="1521" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="7" data-sec="15" cx="1521" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="8" data-sec="15" cx="1521" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="9" data-sec="15" cx="1521" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="10" data-sec="15" cx="1521" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="11" data-sec="15" cx="1521" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="12" data-sec="15" cx="1521" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="13" data-sec="15" cx="1521" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="14" data-sec="15" cx="1521" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="15" data-sec="15" cx="1521" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="16" data-sec="15" cx="1521" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="17" data-sec="15" cx="1521" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="18" data-sec="15" cx="1521" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="19" data-sec="15" cx="1521" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="20" data-sec="15" cx="1360" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="21" data-sec="15" cx="1360" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="22" data-sec="15" cx="1360" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="23" data-sec="15" cx="1360" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="24" data-sec="15" cx="1320" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="25" data-sec="15" cx="1320" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="26" data-sec="15" cx="1320" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="27" data-sec="15" cx="1320" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="28" data-sec="15" cx="1320" cy="534" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="29" data-sec="15" cx="1320" cy="534" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="30" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="31" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="32" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="33" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="34" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="35" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="36" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="37" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="38" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="39" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="40" data-sec="15" cx="1326" cy="562" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="41" data-sec="15" cx="1261" cy="524" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="42" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="43" data-sec="15" cx="1387" cy="359" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="44" data-sec="15" cx="1387" cy="376" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="45" data-sec="15" cx="1387" cy="393" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="46" data-sec="15" cx="1387" cy="411" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="47" data-sec="15" cx="1380" cy="448" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="48" data-sec="15" cx="1375" cy="473" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="49" data-sec="15" cx="1370" cy="501" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="50" data-sec="15" cx="1365" cy="525" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="51" data-sec="15" cx="1360" cy="553" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="52" data-sec="15" cx="1360" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="53" data-sec="15" cx="1360" cy="589" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="54" data-sec="15" cx="1352" cy="584" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="55" data-sec="15" cx="1347" cy="581" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="56" data-sec="15" cx="1342" cy="577" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="57" data-sec="15" cx="1336" cy="574" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="58" data-sec="15" cx="1331" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="59" data-sec="15" cx="1326" cy="567" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="60" data-sec="15" cx="1318" cy="563" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="61" data-sec="15" cx="1310" cy="558" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="62" data-sec="15" cx="1305" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="63" data-sec="15" cx="1300" cy="551" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="64" data-sec="15" cx="1294" cy="548" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="65" data-sec="15" cx="1289" cy="545" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="66" data-sec="15" cx="1284" cy="541" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="67" data-sec="15" cx="1278" cy="538" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="68" data-sec="15" cx="1273" cy="535" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="69" data-sec="15" cx="1266" cy="530" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="70" data-sec="15" cx="1278" cy="537" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="71" data-sec="15" cx="1270" cy="549" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="72" data-sec="15" cx="1267" cy="566" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="73" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="74" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="75" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="76" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="77" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="78" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="79" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="80" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="81" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="82" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="83" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="84" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="85" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="86" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="87" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="88" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="89" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="90" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="91" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="92" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="93" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="94" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="95" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="96" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="97" data-sec="15" cx="1278" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="98" data-sec="15" cx="1278" cy="553" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="99" data-sec="15" cx="1283" cy="555" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="100" data-sec="15" cx="1291" cy="557" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="101" data-sec="15" cx="1298" cy="560" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="102" data-sec="15" cx="1303" cy="561" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="103" data-sec="15" cx="1308" cy="563" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="104" data-sec="15" cx="1313" cy="565" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="105" data-sec="15" cx="1317" cy="567" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="106" data-sec="15" cx="1322" cy="568" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="107" data-sec="15" cx="1327" cy="570" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="108" data-sec="15" cx="1332" cy="572" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="109" data-sec="15" cx="1340" cy="574" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="110" data-sec="15" cx="1347" cy="577" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="111" data-sec="15" cx="1352" cy="578" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="112" data-sec="15" cx="1356" cy="580" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="113" data-sec="15" cx="1362" cy="582" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="114" data-sec="15" cx="1367" cy="584" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="115" data-sec="15" cx="1372" cy="585" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="116" data-sec="15" cx="1374" cy="574" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="117" data-sec="15" cx="1374" cy="554" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="118" data-sec="15" cx="1346" cy="556" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="119" data-sec="15" cx="1322" cy="558" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="120" data-sec="15" cx="1301" cy="560" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="121" data-sec="15" cx="1277" cy="563" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="122" data-sec="15" cx="1256" cy="565" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="123" data-sec="15" cx="1224" cy="568" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="124" data-sec="15" cx="1192" cy="571" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="125" data-sec="15" cx="1192" cy="589" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="126" data-sec="15" cx="1192" cy="607" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="127" data-sec="15" cx="1402" cy="544" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="128" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="129" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="130" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="131" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="132" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="133" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="134" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="135" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="136" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="137" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="138" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="139" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="140" data-sec="15" cx="1387" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="141" data-sec="15" cx="1320" cy="534" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="142" data-sec="15" cx="1320" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="143" data-sec="15" cx="1320" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="144" data-sec="15" cx="1320" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="145" data-sec="15" cx="1320" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="146" data-sec="15" cx="1360" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="147" data-sec="15" cx="1360" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="148" data-sec="15" cx="1360" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="149" data-sec="15" cx="1360" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="150" data-sec="15" cx="1360" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="151" data-sec="15" cx="1360" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="152" data-sec="15" cx="1360" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="153" data-sec="15" cx="1320" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="154" data-sec="15" cx="1320" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="155" data-sec="15" cx="1320" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="156" data-sec="15" cx="1320" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="157" data-sec="15" cx="1320" cy="534" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="158" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="159" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="160" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="161" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="162" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="163" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="164" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="165" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="166" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="167" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="168" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="169" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="170" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="171" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="172" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="173" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="174" data-sec="15" cx="1192" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="175" data-sec="15" cx="1192" cy="534" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="176" data-sec="15" cx="1215" cy="524" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="177" data-sec="15" cx="1241" cy="513" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="178" data-sec="15" cx="1276" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="179" data-sec="15" cx="1311" cy="483" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="180" data-sec="15" cx="1334" cy="473" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="181" data-sec="15" cx="1360" cy="462" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="182" data-sec="15" cx="1333" cy="447" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="183" data-sec="15" cx="1306" cy="432" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="184" data-sec="15" cx="1280" cy="417" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="185" data-sec="15" cx="1253" cy="402" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="186" data-sec="15" cx="1222" cy="386" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="187" data-sec="15" cx="1182" cy="363" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="188" data-sec="15" cx="1142" cy="341" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="189" data-sec="15" cx="1142" cy="359" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="190" data-sec="15" cx="1142" cy="377" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="191" data-sec="15" cx="1142" cy="395" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="192" data-sec="15" cx="1189" cy="417" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="193" data-sec="15" cx="1230" cy="437" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="194" data-sec="15" cx="1293" cy="466" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="195" data-sec="15" cx="1360" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="196" data-sec="15" cx="1360" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="197" data-sec="15" cx="1352" cy="513" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="198" data-sec="15" cx="1344" cy="509" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="199" data-sec="15" cx="1336" cy="505" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="200" data-sec="15" cx="1329" cy="502" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="201" data-sec="15" cx="1320" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="202" data-sec="15" cx="1320" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="203" data-sec="15" cx="1320" cy="534" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="204" data-sec="15" cx="1322" cy="531" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="205" data-sec="15" cx="1323" cy="529" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="206" data-sec="15" cx="1324" cy="527" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="207" data-sec="15" cx="1326" cy="526" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="208" data-sec="15" cx="1327" cy="524" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="209" data-sec="15" cx="1328" cy="522" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="210" data-sec="15" cx="1329" cy="521" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="211" data-sec="15" cx="1330" cy="519" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="212" data-sec="15" cx="1331" cy="518" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="213" data-sec="15" cx="1332" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="214" data-sec="15" cx="1333" cy="514" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="215" data-sec="15" cx="1334" cy="513" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="216" data-sec="15" cx="1335" cy="511" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="217" data-sec="15" cx="1337" cy="510" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="218" data-sec="15" cx="1338" cy="508" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="219" data-sec="15" cx="1339" cy="506" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="220" data-sec="15" cx="1340" cy="504" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="221" data-sec="15" cx="1342" cy="502" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="222" data-sec="15" cx="1343" cy="500" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="223" data-sec="15" cx="1344" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="224" data-sec="15" cx="1346" cy="496" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="225" data-sec="15" cx="1347" cy="495" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="226" data-sec="15" cx="1348" cy="493" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="227" data-sec="15" cx="1340" cy="489" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="228" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="229" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="230" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="231" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="232" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="233" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="234" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="235" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="236" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="237" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="238" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="239" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="240" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="241" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="242" data-sec="15" cx="1192" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="243" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="244" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="245" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="246" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="247" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="248" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="249" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="250" data-sec="15" cx="1278" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="251" data-sec="15" cx="1278" cy="480" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="252" data-sec="15" cx="1278" cy="462" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="253" data-sec="15" cx="1278" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="254" data-sec="15" cx="1260" cy="437" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="255" data-sec="15" cx="1243" cy="429" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="256" data-sec="15" cx="1225" cy="422" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="257" data-sec="15" cx="1205" cy="413" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="258" data-sec="15" cx="1179" cy="402" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="259" data-sec="15" cx="1152" cy="391" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="260" data-sec="15" cx="1152" cy="409" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="261" data-sec="15" cx="1152" cy="427" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="262" data-sec="15" cx="1172" cy="432" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="263" data-sec="15" cx="1192" cy="437" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="264" data-sec="15" cx="1209" cy="442" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="265" data-sec="15" cx="1236" cy="449" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="266" data-sec="15" cx="1265" cy="456" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="267" data-sec="15" cx="1289" cy="462" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="268" data-sec="15" cx="1306" cy="467" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="269" data-sec="15" cx="1304" cy="468" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="270" data-sec="15" cx="1303" cy="470" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="271" data-sec="15" cx="1302" cy="472" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="272" data-sec="15" cx="1301" cy="474" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="273" data-sec="15" cx="1299" cy="477" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="274" data-sec="15" cx="1298" cy="478" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="275" data-sec="15" cx="1297" cy="480" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="276" data-sec="15" cx="1295" cy="482" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="277" data-sec="15" cx="1294" cy="484" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="278" data-sec="15" cx="1293" cy="485" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="279" data-sec="15" cx="1292" cy="486" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="280" data-sec="15" cx="1291" cy="488" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="281" data-sec="15" cx="1290" cy="490" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="282" data-sec="15" cx="1289" cy="491" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="283" data-sec="15" cx="1288" cy="493" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="284" data-sec="15" cx="1287" cy="495" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="285" data-sec="15" cx="1286" cy="496" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="286" data-sec="15" cx="1284" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="287" data-sec="15" cx="1283" cy="500" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="288" data-sec="15" cx="1282" cy="501" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="289" data-sec="15" cx="1282" cy="487" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="290" data-sec="15" cx="1288" cy="475" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="291" data-sec="15" cx="1295" cy="478" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="292" data-sec="15" cx="1303" cy="482" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="293" data-sec="15" cx="1312" cy="485" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="294" data-sec="15" cx="1320" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="295" data-sec="15" cx="1301" cy="483" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="296" data-sec="15" cx="1308" cy="487" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="297" data-sec="15" cx="1317" cy="490" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="298" data-sec="15" cx="1324" cy="494" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="299" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="300" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="301" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="302" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="303" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="304" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="305" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="306" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="307" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="308" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="309" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="310" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="311" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="312" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="313" data-sec="15" cx="1278" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="314" data-sec="15" cx="1278" cy="480" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="315" data-sec="15" cx="1278" cy="462" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="316" data-sec="15" cx="1278" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="317" data-sec="15" cx="1278" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="318" data-sec="15" cx="1278" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="319" data-sec="15" cx="1278" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="320" data-sec="15" cx="1226" cy="465" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="321" data-sec="15" cx="1226" cy="443" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="322" data-sec="15" cx="1226" cy="417" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="323" data-sec="15" cx="1210" cy="409" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="324" data-sec="15" cx="1193" cy="402" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="325" data-sec="15" cx="1173" cy="393" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="326" data-sec="15" cx="1153" cy="385" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="327" data-sec="15" cx="1135" cy="377" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="328" data-sec="15" cx="1134" cy="402" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="329" data-sec="15" cx="1161" cy="410" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="330" data-sec="15" cx="1186" cy="417" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="331" data-sec="15" cx="1205" cy="422" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="332" data-sec="15" cx="1223" cy="426" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="333" data-sec="15" cx="1243" cy="431" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="334" data-sec="15" cx="1246" cy="434" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="335" data-sec="15" cx="1244" cy="436" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="336" data-sec="15" cx="1243" cy="438" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="337" data-sec="15" cx="1241" cy="440" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="338" data-sec="15" cx="1240" cy="442" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="339" data-sec="15" cx="1239" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="340" data-sec="15" cx="1238" cy="445" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="341" data-sec="15" cx="1237" cy="447" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="342" data-sec="15" cx="1236" cy="448" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="343" data-sec="15" cx="1235" cy="450" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="344" data-sec="15" cx="1234" cy="452" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="345" data-sec="15" cx="1233" cy="453" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="346" data-sec="15" cx="1232" cy="455" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="347" data-sec="15" cx="1230" cy="456" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="348" data-sec="15" cx="1229" cy="458" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="349" data-sec="15" cx="1229" cy="445" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="350" data-sec="15" cx="1233" cy="438" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="351" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="352" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="353" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="354" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="355" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="356" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="357" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="358" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="359" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="360" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="361" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="362" data-sec="15" cx="1278" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="363" data-sec="15" cx="1278" cy="480" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="364" data-sec="15" cx="1278" cy="462" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="365" data-sec="15" cx="1278" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="366" data-sec="15" cx="1278" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="367" data-sec="15" cx="1278" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="368" data-sec="15" cx="1278" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="369" data-sec="15" cx="1152" cy="391" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="370" data-sec="15" cx="1152" cy="391" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="371" data-sec="15" cx="1152" cy="391" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="372" data-sec="15" cx="1152" cy="409" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="373" data-sec="15" cx="1152" cy="427" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="374" data-sec="15" cx="1152" cy="427" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="375" data-sec="15" cx="1152" cy="427" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="376" data-sec="15" cx="1177" cy="418" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="377" data-sec="15" cx="1177" cy="393" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="378" data-sec="15" cx="1152" cy="378" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="379" data-sec="15" cx="1128" cy="368" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="380" data-sec="15" cx="1116" cy="371" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="381" data-sec="15" cx="1125" cy="383" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="382" data-sec="15" cx="1144" cy="388" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="383" data-sec="15" cx="1162" cy="393" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="384" data-sec="15" cx="1189" cy="399" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="385" data-sec="15" cx="1189" cy="402" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="386" data-sec="15" cx="1188" cy="404" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="387" data-sec="15" cx="1187" cy="406" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="388" data-sec="15" cx="1186" cy="407" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="389" data-sec="15" cx="1184" cy="409" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="390" data-sec="15" cx="1183" cy="411" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="391" data-sec="15" cx="1182" cy="412" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="392" data-sec="15" cx="1181" cy="414" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="393" data-sec="15" cx="1180" cy="415" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="394" data-sec="15" cx="1179" cy="417" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="395" data-sec="15" cx="1179" cy="403" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="396" data-sec="15" cx="1187" cy="406" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="397" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="398" data-sec="15" cx="1278" cy="516" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="399" data-sec="15" cx="1278" cy="498" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="400" data-sec="15" cx="1278" cy="480" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="401" data-sec="15" cx="1278" cy="462" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="402" data-sec="15" cx="1278" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="403" data-sec="15" cx="1278" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="404" data-sec="15" cx="1278" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="405" data-sec="15" cx="1278" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="406" data-sec="15" cx="1152" cy="391" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="407" data-sec="15" cx="1152" cy="391" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="408" data-sec="15" cx="1152" cy="391" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="409" data-sec="15" cx="1152" cy="409" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="410" data-sec="15" cx="1152" cy="427" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="411" data-sec="15" cx="1152" cy="427" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="412" data-sec="15" cx="1152" cy="427" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="413" data-sec="15" cx="1152" cy="427" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="414" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="415" data-sec="15" cx="1157" cy="401" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="416" data-sec="15" cx="1157" cy="378" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="417" data-sec="15" cx="1137" cy="370" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="418" data-sec="15" cx="1119" cy="362" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="419" data-sec="15" cx="1109" cy="368" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="420" data-sec="15" cx="1123" cy="375" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="421" data-sec="15" cx="1149" cy="382" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="422" data-sec="15" cx="1168" cy="388" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="423" data-sec="15" cx="1166" cy="389" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="424" data-sec="15" cx="1165" cy="391" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="425" data-sec="15" cx="1164" cy="393" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="426" data-sec="15" cx="1163" cy="394" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="427" data-sec="15" cx="1162" cy="396" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="428" data-sec="15" cx="1161" cy="397" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="429" data-sec="15" cx="1160" cy="399" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="430" data-sec="15" cx="1159" cy="398" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="431" data-sec="15" cx="1163" cy="391" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="432" data-sec="15" cx="1278" cy="444" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="433" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="434" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="435" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="436" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="437" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="438" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="439" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="440" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="441" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="442" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="443" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="444" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="445" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="446" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="447" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="448" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="449" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="450" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="451" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="452" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="453" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="454" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="455" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="456" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="457" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="458" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="459" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="460" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="461" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="462" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="463" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="464" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="465" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="466" data-sec="15" cx="1082" cy="337" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="1" data-sec="16" cx="781" cy="236" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="11" data-sec="16" cx="784" cy="253" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="12" data-sec="16" cx="758" cy="246" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="32" data-sec="16" cx="751" cy="244" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="35" data-sec="16" cx="735" cy="208" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="139" data-sec="16" cx="378" cy="672" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="140" data-sec="16" cx="409" cy="680" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="141" data-sec="16" cx="441" cy="689" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="142" data-sec="16" cx="473" cy="697" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="143" data-sec="16" cx="504" cy="706" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="144" data-sec="16" cx="536" cy="714" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="150" data-sec="16" cx="656" cy="187" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="165" data-sec="16" cx="590" cy="512" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="166" data-sec="16" cx="559" cy="503" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="167" data-sec="16" cx="527" cy="495" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="168" data-sec="16" cx="495" cy="486" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="169" data-sec="16" cx="464" cy="478" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="170" data-sec="16" cx="432" cy="469" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="186" data-sec="16" cx="273" cy="209" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="187" data-sec="16" cx="296" cy="216" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="188" data-sec="16" cx="328" cy="224" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="189" data-sec="16" cx="360" cy="233" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="190" data-sec="16" cx="391" cy="241" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="191" data-sec="16" cx="423" cy="250" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="192" data-sec="16" cx="455" cy="258" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="193" data-sec="16" cx="486" cy="267" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="194" data-sec="16" cx="518" cy="275" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="195" data-sec="16" cx="550" cy="284" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="196" data-sec="16" cx="581" cy="292" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="197" data-sec="16" cx="613" cy="301" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="198" data-sec="16" cx="645" cy="309" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="199" data-sec="16" cx="668" cy="316" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="200" data-sec="16" cx="692" cy="322" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="201" data-sec="16" cx="724" cy="330" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="202" data-sec="16" cx="756" cy="339" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="203" data-sec="16" cx="787" cy="347" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="204" data-sec="16" cx="819" cy="356" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="205" data-sec="16" cx="851" cy="364" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="206" data-sec="16" cx="874" cy="371" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="230" data-sec="16" cx="374" cy="20" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="231" data-sec="16" cx="351" cy="13" r="14" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="232" data-sec="16" cx="327" cy="7" r="14" fill="none" stroke="none" style="cursor:pointer"/>`;

var _lvScale=1,_lvBlinkTimer=null,_lvActiveLot=null;

function openLotView(sec,lotNo){
  if(_lvBlinkTimer){clearInterval(_lvBlinkTimer);_lvBlinkTimer=null;}
  _lvActiveLot=null; _lvHide();
  var title=(sec&&lotNo)?('Section '+sec+' - Lot '+lotNo):'Section 15 & 16';
  document.getElementById('lotViewTitle').textContent=title;
  document.getElementById('lotViewOverlay').style.display='flex';
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
  var body=document.getElementById('lotViewBody');
  if(body._lv)body._lv();
  var drag=false,sx,sy,sl,st;
  var d=function(e){drag=true;sx=e.pageX;sy=e.pageY;sl=body.scrollLeft;st=body.scrollTop;body.style.cursor='grabbing';};
  var u=function(){drag=false;body.style.cursor='grab';};
  var m=function(e){if(!drag)return;body.scrollLeft=sl-(e.pageX-sx);body.scrollTop=st-(e.pageY-sy);};
  body.addEventListener('mousedown',d);body.addEventListener('mouseleave',u);
  body.addEventListener('mouseup',u);body.addEventListener('mousemove',m);
  body._lv=function(){body.removeEventListener('mousedown',d);body.removeEventListener('mouseleave',u);body.removeEventListener('mouseup',u);body.removeEventListener('mousemove',m);};
  body.addEventListener('touchstart',function(e){if(e.touches.length===1){sx=e.touches[0].clientX;sy=e.touches[0].clientY;sl=body.scrollLeft;st=body.scrollTop;}},{passive:true});
  body.addEventListener('touchmove',function(e){if(e.touches.length===1){body.scrollLeft=sl-(e.touches[0].clientX-sx);body.scrollTop=st-(e.touches[0].clientY-sy);}},{passive:true});
  setTimeout(function(){
    var bw=body.clientWidth,bh=body.clientHeight;
    _lvScale=Math.min(bw/LV_IMG_W,bh/LV_IMG_H,1);
    _lvApply(_lvScale);
    body.scrollLeft=Math.max(0,(LV_IMG_W*_lvScale-bw)/2);
    body.scrollTop=Math.max(0,(LV_IMG_H*_lvScale-bh)/2);
    if(sec&&lotNo){_lvShow(sec,lotNo);_lvScroll(sec,lotNo);}
  },150);
}

function _lvApply(s){
  _lvScale=s;
  var inner=document.getElementById('lotViewInner');
  inner.style.transformOrigin='top left';inner.style.transform='scale('+s+')';
  document.getElementById('lotViewImg').style.width=LV_IMG_W+'px';
  document.getElementById('lotViewImg').style.height=LV_IMG_H+'px';
  var svg=document.getElementById('lv-overlay');
  if(svg){svg.setAttribute('width',LV_IMG_W);svg.setAttribute('height',LV_IMG_H);}
}

function _lvGetPos(sec,lot){
  return String(sec)==='15'?LV_S15[String(lot)]:LV_S16[String(lot)];
}

function _lvShow(sec,lot){
  _lvHide();
  _lvActiveLot={sec:String(sec),lot:String(lot)};
  var p=_lvGetPos(sec,lot);
  if(!p)return;
  var hi=document.getElementById('lv-hi-circ');
  hi.setAttribute('cx',p.x);hi.setAttribute('cy',p.y);hi.setAttribute('r','20');
  hi.style.display='';
  var vis=true;hi.style.opacity='1';
  if(_lvBlinkTimer)clearInterval(_lvBlinkTimer);
  _lvBlinkTimer=setInterval(function(){vis=!vis;hi.style.opacity=vis?'1':'0';},500);
}

function _lvHide(){
  if(_lvBlinkTimer){clearInterval(_lvBlinkTimer);_lvBlinkTimer=null;}
  var hi=document.getElementById('lv-hi-circ');
  if(hi){hi.style.display='none';hi.style.opacity='1';}
  var hr=document.getElementById('lv-hi-rect');
  if(hr)hr.style.display='none';
  _lvActiveLot=null;
}

function _lvScroll(sec,lot){
  var p=_lvGetPos(sec,lot);
  if(!p)return;
  var body=document.getElementById('lotViewBody'),s=_lvScale;
  body.scrollLeft=Math.max(0,p.x*s-body.clientWidth/2);
  body.scrollTop=Math.max(0,p.y*s-body.clientHeight/2);
}

function closeLotView(){document.getElementById('lotViewOverlay').style.display='none';_lvHide();}

function lvZoom(f){
  var body=document.getElementById('lotViewBody'),px,py;
  if(_lvActiveLot){var p=_lvGetPos(_lvActiveLot.sec,_lvActiveLot.lot);if(p){px=p.x;py=p.y;}}
  if(!px){px=(body.scrollLeft+body.clientWidth/2)/_lvScale;py=(body.scrollTop+body.clientHeight/2)/_lvScale;}
  _lvApply(Math.min(Math.max(_lvScale*f,0.3),6));
  body.scrollLeft=px*_lvScale-body.clientWidth/2;
  body.scrollTop=py*_lvScale-body.clientHeight/2;
}

function lvReset(){
  var body=document.getElementById('lotViewBody');
  _lvApply(Math.min(body.clientWidth/LV_IMG_W,body.clientHeight/LV_IMG_H,1));
  body.scrollLeft=Math.max(0,(LV_IMG_W*_lvScale-body.clientWidth)/2);
  body.scrollTop=Math.max(0,(LV_IMG_H*_lvScale-body.clientHeight)/2);
}
