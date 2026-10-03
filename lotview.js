/* Lot View — Circle 하이라이트 */
const LV_IMG_W=1600, LV_IMG_H=1304;
const LV_S15={"1":{x:1435,y:628},"2":{x:1435,y:656},"3":{x:1392,y:628},"4":{x:1392,y:656},"5":{x:1392,y:685},"6":{x:1392,y:713},"7":{x:1392,y:741},"8":{x:1392,y:770},"9":{x:1392,y:798},"10":{x:1392,y:826},"11":{x:1392,y:854},"12":{x:1392,y:882},"13":{x:1392,y:910},"14":{x:1392,y:938},"15":{x:1392,y:964},"16":{x:1435,y:798},"17":{x:1435,y:826},"18":{x:1435,y:854},"19":{x:1435,y:882},"20":{x:1435,y:910},"21":{x:1435,y:938},"22":{x:1435,y:964},"23":{x:1225,y:1064},"24":{x:1225,y:1038},"25":{x:1225,y:1012},"26":{x:1225,y:985},"27":{x:1225,y:959},"28":{x:1239,y:923},"29":{x:1262,y:865},"30":{x:1283,y:811},"31":{x:1297,y:776},"32":{x:1311,y:740},"33":{x:1325,y:704},"34":{x:1341,y:664},"35":{x:1355,y:628},"36":{x:1355,y:656},"37":{x:1355,y:685},"38":{x:1355,y:713},"39":{x:1355,y:741},"40":{x:1355,y:770},"41":{x:1355,y:798},"42":{x:1355,y:826},"43":{x:1355,y:854},"44":{x:1355,y:882},"45":{x:1355,y:910},"46":{x:1355,y:938},"47":{x:1355,y:964},"48":{x:1292,y:950},"49":{x:1292,y:976},"50":{x:1301,y:812},"51":{x:1312,y:628},"52":{x:1312,y:656},"53":{x:1312,y:685},"54":{x:1312,y:713},"55":{x:1312,y:741},"56":{x:1312,y:770},"57":{x:1312,y:798},"58":{x:1312,y:826},"59":{x:1312,y:854},"60":{x:1312,y:882},"61":{x:1312,y:910},"62":{x:1312,y:938},"63":{x:1312,y:964},"64":{x:1303,y:885},"65":{x:1293,y:806},"66":{x:1284,y:728},"67":{x:1274,y:639},"68":{x:1274,y:658},"69":{x:1274,y:676},"70":{x:1285,y:768},"71":{x:1294,y:837},"72":{x:1302,y:898},"73":{x:1310,y:959},"74":{x:1310,y:985},"75":{x:1310,y:1012},"76":{x:1310,y:1038},"77":{x:1310,y:1064},"78":{x:1310,y:1090},"79":{x:1182,y:1143},"80":{x:1182,y:1116},"81":{x:1182,y:1090},"82":{x:1182,y:1064},"83":{x:1182,y:1038},"84":{x:1182,y:1012},"85":{x:1272,y:964},"86":{x:1272,y:938},"87":{x:1272,y:910},"88":{x:1272,y:882},"89":{x:1272,y:854},"90":{x:1272,y:826},"91":{x:1272,y:798},"92":{x:1272,y:770},"93":{x:1272,y:741},"94":{x:1272,y:713},"95":{x:1272,y:685},"96":{x:1272,y:656},"97":{x:1272,y:628},"98":{x:1276,y:638},"99":{x:1280,y:649},"100":{x:1285,y:663},"101":{x:1285,y:638},"102":{x:1285,y:613},"103":{x:1240,y:536},"104":{x:1240,y:504},"105":{x:1240,y:472},"106":{x:1240,y:440},"107":{x:1240,y:409},"108":{x:1240,y:378},"109":{x:1240,y:345},"110":{x:1240,y:316},"111":{x:1244,y:688},"112":{x:1244,y:663},"113":{x:1244,y:638},"114":{x:1244,y:613},"115":{x:1244,y:588},"116":{x:1244,y:563},"117":{x:1244,y:538},"118":{x:1244,y:513},"119":{x:1242,y:536},"120":{x:1240,y:556},"121":{x:1237,y:578},"122":{x:1235,y:598},"123":{x:1232,y:628},"124":{x:1232,y:656},"125":{x:1232,y:685},"126":{x:1232,y:713},"127":{x:1232,y:741},"128":{x:1232,y:770},"129":{x:1232,y:798},"130":{x:1232,y:826},"131":{x:1232,y:854},"132":{x:1232,y:882},"133":{x:1232,y:910},"134":{x:1232,y:938},"135":{x:1234,y:940},"136":{x:1235,y:942},"137":{x:1237,y:944},"138":{x:1239,y:946},"139":{x:1240,y:948},"140":{x:1243,y:952},"141":{x:1243,y:984},"142":{x:1243,y:1009},"143":{x:1243,y:1035},"144":{x:1359,y:993},"145":{x:1435,y:941},"146":{x:1435,y:916},"147":{x:1435,y:964},"148":{x:1435,y:938},"149":{x:1435,y:910},"150":{x:1370,y:821},"151":{x:1326,y:892},"152":{x:1277,y:973},"153":{x:1233,y:1044},"154":{x:1189,y:1116},"155":{x:1140,y:1196},"156":{x:1140,y:1169},"157":{x:1140,y:1143},"158":{x:1140,y:1116},"159":{x:1140,y:1090},"160":{x:1140,y:1064},"161":{x:1140,y:1038},"162":{x:1140,y:1012},"163":{x:1140,y:985},"164":{x:1140,y:959},"165":{x:1192,y:965},"166":{x:1192,y:928},"167":{x:1192,y:883},"168":{x:1192,y:833},"169":{x:1192,y:792},"170":{x:1192,y:759},"171":{x:1192,y:726},"172":{x:1192,y:693},"173":{x:1192,y:656},"174":{x:1192,y:628},"175":{x:1192,y:685},"176":{x:1192,y:713},"177":{x:1192,y:741},"178":{x:1192,y:770},"179":{x:1192,y:798},"180":{x:1192,y:826},"181":{x:1192,y:854},"182":{x:1192,y:882},"183":{x:1192,y:910},"184":{x:1192,y:938},"185":{x:1194,y:894},"186":{x:1195,y:845},"187":{x:1198,y:780},"188":{x:1200,y:714},"189":{x:1200,y:689},"190":{x:1200,y:664},"191":{x:1200,y:638},"192":{x:1200,y:613},"193":{x:1200,y:588},"194":{x:1200,y:563},"195":{x:1200,y:538},"196":{x:1200,y:513},"197":{x:1188,y:536},"198":{x:1175,y:561},"199":{x:1164,y:583},"200":{x:1152,y:606},"201":{x:1152,y:628},"202":{x:1152,y:656},"203":{x:1152,y:685},"204":{x:1152,y:713},"205":{x:1152,y:741},"206":{x:1152,y:770},"207":{x:1152,y:798},"208":{x:1152,y:826},"209":{x:1152,y:854},"210":{x:1152,y:882},"211":{x:1152,y:910},"212":{x:1152,y:938},"213":{x:1152,y:964},"214":{x:1154,y:934},"215":{x:1155,y:910},"216":{x:1156,y:883},"217":{x:1158,y:853},"218":{x:1159,y:826},"219":{x:1161,y:795},"220":{x:1163,y:765},"221":{x:1165,y:724},"222":{x:1167,y:684},"223":{x:1169,y:657},"224":{x:1170,y:626},"225":{x:1172,y:599},"226":{x:1173,y:572},"227":{x:1183,y:558},"228":{x:1140,y:1064},"229":{x:1140,y:1038},"230":{x:1123,y:1007},"231":{x:1140,y:1038},"232":{x:1115,y:1001},"233":{x:1098,y:959},"234":{x:1098,y:959},"235":{x:1098,y:959},"236":{x:1098,y:985},"237":{x:1098,y:1012},"238":{x:1098,y:1038},"239":{x:1098,y:1064},"240":{x:1110,y:964},"241":{x:1110,y:938},"242":{x:1110,y:910},"243":{x:1110,y:882},"244":{x:1110,y:854},"245":{x:1110,y:826},"246":{x:1110,y:798},"247":{x:1110,y:770},"248":{x:1110,y:741},"249":{x:1110,y:713},"250":{x:1110,y:685},"251":{x:1110,y:656},"252":{x:1110,y:628},"253":{x:1110,y:606},"254":{x:1160,y:614},"255":{x:1160,y:589},"256":{x:1160,y:565},"257":{x:1153,y:602},"258":{x:1143,y:650},"259":{x:1133,y:699},"260":{x:1127,y:732},"261":{x:1120,y:764},"262":{x:1120,y:739},"263":{x:1120,y:712},"264":{x:1120,y:686},"265":{x:1120,y:661},"266":{x:1120,y:635},"267":{x:1120,y:610},"268":{x:1068,y:606},"269":{x:1068,y:628},"270":{x:1068,y:656},"271":{x:1068,y:685},"272":{x:1068,y:713},"273":{x:1068,y:741},"274":{x:1068,y:770},"275":{x:1068,y:798},"276":{x:1068,y:826},"277":{x:1068,y:854},"278":{x:1068,y:882},"279":{x:1068,y:910},"280":{x:1068,y:938},"281":{x:1068,y:964},"282":{x:1064,y:963},"283":{x:1060,y:962},"284":{x:1056,y:960},"285":{x:1052,y:959},"286":{x:1052,y:985},"287":{x:1052,y:1012},"288":{x:1052,y:1038},"289":{x:1052,y:1064},"290":{x:1052,y:1090},"291":{x:1052,y:1116},"292":{x:1052,y:1143},"293":{x:1052,y:1169},"294":{x:1052,y:1196},"295":{x:1052,y:1222},"296":{x:1063,y:1149},"297":{x:1075,y:1067},"298":{x:1086,y:1010},"299":{x:1005,y:1169},"300":{x:1043,y:1089},"301":{x:1043,y:1114},"302":{x:1005,y:1169},"303":{x:1034,y:1118},"304":{x:1035,y:1134},"305":{x:1038,y:1087},"306":{x:1038,y:1097},"307":{x:1038,y:1106},"308":{x:1038,y:1115},"309":{x:1038,y:1087},"310":{x:1042,y:1039},"311":{x:1047,y:984},"312":{x:1053,y:911},"313":{x:1059,y:838},"314":{x:1063,y:789},"315":{x:1068,y:735},"316":{x:1072,y:686},"317":{x:1072,y:661},"318":{x:1072,y:636},"319":{x:1072,y:612},"320":{x:1072,y:586},"321":{x:1072,y:560},"322":{x:1072,y:534},"323":{x:1072,y:508},"324":{x:1045,y:532},"325":{x:1016,y:558},"326":{x:986,y:585},"327":{x:959,y:609},"328":{x:1024,y:628},"329":{x:1024,y:656},"330":{x:1024,y:685},"331":{x:1024,y:713},"332":{x:1024,y:741},"333":{x:1024,y:770},"334":{x:1024,y:798},"335":{x:1024,y:826},"336":{x:1024,y:854},"337":{x:1024,y:882},"338":{x:1024,y:910},"339":{x:1024,y:938},"340":{x:1024,y:964},"341":{x:1024,y:992},"342":{x:1018,y:982},"343":{x:1011,y:970},"344":{x:1005,y:959},"345":{x:1005,y:985},"346":{x:1005,y:1012},"347":{x:1005,y:1038},"348":{x:1005,y:1064},"349":{x:1005,y:1116},"350":{x:1005,y:1143},"351":{x:1005,y:1169},"352":{x:1005,y:1196},"353":{x:1005,y:1222},"354":{x:1005,y:1248},"355":{x:1008,y:1196},"356":{x:1010,y:1144},"357":{x:1005,y:1248},"358":{x:979,y:1140},"359":{x:979,y:1163},"360":{x:979,y:1149},"361":{x:981,y:1077},"362":{x:982,y:1004},"363":{x:982,y:956},"364":{x:983,y:902},"365":{x:984,y:854},"366":{x:984,y:882},"367":{x:984,y:910},"368":{x:984,y:938},"369":{x:984,y:964},"370":{x:984,y:628},"371":{x:984,y:656},"372":{x:984,y:685},"373":{x:984,y:713},"374":{x:984,y:741},"375":{x:984,y:770},"376":{x:984,y:798},"377":{x:984,y:826},"378":{x:968,y:748},"379":{x:955,y:682},"380":{x:944,y:628},"381":{x:944,y:656},"382":{x:944,y:685},"383":{x:944,y:713},"384":{x:944,y:741},"385":{x:944,y:770},"386":{x:944,y:798},"387":{x:944,y:826},"388":{x:944,y:854},"389":{x:944,y:882},"390":{x:949,y:908},"391":{x:953,y:930},"392":{x:959,y:959},"393":{x:959,y:985},"394":{x:959,y:1012},"395":{x:959,y:1038},"396":{x:959,y:1064},"397":{x:959,y:1090},"398":{x:959,y:1116},"399":{x:959,y:1143},"400":{x:959,y:1169},"401":{x:959,y:1196},"402":{x:956,y:1171},"403":{x:953,y:1145},"404":{x:950,y:1120},"405":{x:948,y:1094},"406":{x:944,y:1066},"407":{x:940,y:1028},"408":{x:936,y:990},"409":{x:933,y:964},"410":{x:930,y:939},"411":{x:927,y:910},"412":{x:924,y:882},"413":{x:921,y:856},"414":{x:917,y:818},"415":{x:912,y:777},"416":{x:908,y:742},"417":{x:908,y:712},"418":{x:908,y:770},"419":{x:908,y:800},"420":{x:908,y:828},"421":{x:908,y:855},"422":{x:908,y:882},"423":{x:908,y:910},"424":{x:908,y:938},"425":{x:908,y:964},"426":{x:908,y:992},"427":{x:921,y:976},"428":{x:933,y:962},"429":{x:948,y:945},"430":{x:961,y:929},"431":{x:975,y:913},"432":{x:959,y:1196},"433":{x:959,y:1196},"434":{x:959,y:1196},"435":{x:959,y:1196},"436":{x:959,y:1196},"437":{x:984,y:656},"438":{x:984,y:685},"439":{x:984,y:713},"440":{x:908,y:742},"441":{x:908,y:742},"442":{x:908,y:742},"443":{x:908,y:742},"444":{x:908,y:742},"445":{x:1024,y:572},"446":{x:1024,y:597},"447":{x:1021,y:577},"448":{x:959,y:1196},"449":{x:959,y:1196},"450":{x:908,y:742},"451":{x:908,y:742},"452":{x:908,y:742},"453":{x:908,y:742},"454":{x:908,y:742},"455":{x:908,y:742},"456":{x:908,y:742},"457":{x:1055,y:311},"458":{x:1055,y:311},"459":{x:1055,y:311},"460":{x:1055,y:311},"461":{x:1055,y:311},"462":{x:1055,y:311},"463":{x:1055,y:311},"464":{x:1055,y:311},"465":{x:1055,y:311},"466":{x:1055,y:311}};
const LV_S16={"1":{x:781,y:236},"11":{x:784,y:253},"12":{x:758,y:246},"32":{x:751,y:244},"35":{x:735,y:208},"139":{x:378,y:672},"140":{x:409,y:680},"141":{x:441,y:689},"142":{x:473,y:697},"143":{x:504,y:706},"144":{x:536,y:714},"150":{x:656,y:187},"165":{x:590,y:512},"166":{x:559,y:503},"167":{x:527,y:495},"168":{x:495,y:486},"169":{x:464,y:478},"170":{x:432,y:469},"186":{x:273,y:209},"187":{x:296,y:216},"188":{x:328,y:224},"189":{x:360,y:233},"190":{x:391,y:241},"191":{x:423,y:250},"192":{x:455,y:258},"193":{x:486,y:267},"194":{x:518,y:275},"195":{x:550,y:284},"196":{x:581,y:292},"197":{x:613,y:301},"198":{x:645,y:309},"199":{x:668,y:316},"200":{x:692,y:322},"201":{x:724,y:330},"202":{x:756,y:339},"203":{x:787,y:347},"204":{x:819,y:356},"205":{x:851,y:364},"206":{x:874,y:371},"230":{x:374,y:20},"231":{x:351,y:13},"232":{x:327,y:7}};
const LV_SVG=`<circle data-lot="1" data-sec="15" cx="1435" cy="628" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="2" data-sec="15" cx="1435" cy="656" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="3" data-sec="15" cx="1392" cy="628" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="4" data-sec="15" cx="1392" cy="656" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="5" data-sec="15" cx="1392" cy="685" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="6" data-sec="15" cx="1392" cy="713" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="7" data-sec="15" cx="1392" cy="741" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="8" data-sec="15" cx="1392" cy="770" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="9" data-sec="15" cx="1392" cy="798" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="10" data-sec="15" cx="1392" cy="826" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="11" data-sec="15" cx="1392" cy="854" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="12" data-sec="15" cx="1392" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="13" data-sec="15" cx="1392" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="14" data-sec="15" cx="1392" cy="938" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="15" data-sec="15" cx="1392" cy="964" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="16" data-sec="15" cx="1435" cy="798" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="17" data-sec="15" cx="1435" cy="826" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="18" data-sec="15" cx="1435" cy="854" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="19" data-sec="15" cx="1435" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="20" data-sec="15" cx="1435" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="21" data-sec="15" cx="1435" cy="938" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="22" data-sec="15" cx="1435" cy="964" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="23" data-sec="15" cx="1225" cy="1064" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="24" data-sec="15" cx="1225" cy="1038" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="25" data-sec="15" cx="1225" cy="1012" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="26" data-sec="15" cx="1225" cy="985" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="27" data-sec="15" cx="1225" cy="959" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="28" data-sec="15" cx="1239" cy="923" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="29" data-sec="15" cx="1262" cy="865" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="30" data-sec="15" cx="1283" cy="811" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="31" data-sec="15" cx="1297" cy="776" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="32" data-sec="15" cx="1311" cy="740" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="33" data-sec="15" cx="1325" cy="704" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="34" data-sec="15" cx="1341" cy="664" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="35" data-sec="15" cx="1355" cy="628" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="36" data-sec="15" cx="1355" cy="656" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="37" data-sec="15" cx="1355" cy="685" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="38" data-sec="15" cx="1355" cy="713" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="39" data-sec="15" cx="1355" cy="741" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="40" data-sec="15" cx="1355" cy="770" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="41" data-sec="15" cx="1355" cy="798" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="42" data-sec="15" cx="1355" cy="826" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="43" data-sec="15" cx="1355" cy="854" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="44" data-sec="15" cx="1355" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="45" data-sec="15" cx="1355" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="46" data-sec="15" cx="1355" cy="938" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="47" data-sec="15" cx="1355" cy="964" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="48" data-sec="15" cx="1292" cy="950" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="49" data-sec="15" cx="1292" cy="976" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="50" data-sec="15" cx="1301" cy="812" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="51" data-sec="15" cx="1312" cy="628" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="52" data-sec="15" cx="1312" cy="656" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="53" data-sec="15" cx="1312" cy="685" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="54" data-sec="15" cx="1312" cy="713" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="55" data-sec="15" cx="1312" cy="741" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="56" data-sec="15" cx="1312" cy="770" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="57" data-sec="15" cx="1312" cy="798" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="58" data-sec="15" cx="1312" cy="826" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="59" data-sec="15" cx="1312" cy="854" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="60" data-sec="15" cx="1312" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="61" data-sec="15" cx="1312" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="62" data-sec="15" cx="1312" cy="938" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="63" data-sec="15" cx="1312" cy="964" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="64" data-sec="15" cx="1303" cy="885" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="65" data-sec="15" cx="1293" cy="806" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="66" data-sec="15" cx="1284" cy="728" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="67" data-sec="15" cx="1274" cy="639" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="68" data-sec="15" cx="1274" cy="658" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="69" data-sec="15" cx="1274" cy="676" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="70" data-sec="15" cx="1285" cy="768" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="71" data-sec="15" cx="1294" cy="837" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="72" data-sec="15" cx="1302" cy="898" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="73" data-sec="15" cx="1310" cy="959" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="74" data-sec="15" cx="1310" cy="985" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="75" data-sec="15" cx="1310" cy="1012" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="76" data-sec="15" cx="1310" cy="1038" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="77" data-sec="15" cx="1310" cy="1064" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="78" data-sec="15" cx="1310" cy="1090" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="79" data-sec="15" cx="1182" cy="1143" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="80" data-sec="15" cx="1182" cy="1116" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="81" data-sec="15" cx="1182" cy="1090" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="82" data-sec="15" cx="1182" cy="1064" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="83" data-sec="15" cx="1182" cy="1038" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="84" data-sec="15" cx="1182" cy="1012" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="85" data-sec="15" cx="1272" cy="964" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="86" data-sec="15" cx="1272" cy="938" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="87" data-sec="15" cx="1272" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="88" data-sec="15" cx="1272" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="89" data-sec="15" cx="1272" cy="854" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="90" data-sec="15" cx="1272" cy="826" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="91" data-sec="15" cx="1272" cy="798" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="92" data-sec="15" cx="1272" cy="770" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="93" data-sec="15" cx="1272" cy="741" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="94" data-sec="15" cx="1272" cy="713" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="95" data-sec="15" cx="1272" cy="685" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="96" data-sec="15" cx="1272" cy="656" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="97" data-sec="15" cx="1272" cy="628" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="98" data-sec="15" cx="1276" cy="638" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="99" data-sec="15" cx="1280" cy="649" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="100" data-sec="15" cx="1285" cy="663" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="101" data-sec="15" cx="1285" cy="638" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="102" data-sec="15" cx="1285" cy="613" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="103" data-sec="15" cx="1240" cy="536" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="104" data-sec="15" cx="1240" cy="504" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="105" data-sec="15" cx="1240" cy="472" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="106" data-sec="15" cx="1240" cy="440" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="107" data-sec="15" cx="1240" cy="409" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="108" data-sec="15" cx="1240" cy="378" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="109" data-sec="15" cx="1240" cy="345" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="110" data-sec="15" cx="1240" cy="316" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="111" data-sec="15" cx="1244" cy="688" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="112" data-sec="15" cx="1244" cy="663" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="113" data-sec="15" cx="1244" cy="638" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="114" data-sec="15" cx="1244" cy="613" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="115" data-sec="15" cx="1244" cy="588" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="116" data-sec="15" cx="1244" cy="563" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="117" data-sec="15" cx="1244" cy="538" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="118" data-sec="15" cx="1244" cy="513" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="119" data-sec="15" cx="1242" cy="536" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="120" data-sec="15" cx="1240" cy="556" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="121" data-sec="15" cx="1237" cy="578" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="122" data-sec="15" cx="1235" cy="598" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="123" data-sec="15" cx="1232" cy="628" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="124" data-sec="15" cx="1232" cy="656" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="125" data-sec="15" cx="1232" cy="685" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="126" data-sec="15" cx="1232" cy="713" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="127" data-sec="15" cx="1232" cy="741" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="128" data-sec="15" cx="1232" cy="770" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="129" data-sec="15" cx="1232" cy="798" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="130" data-sec="15" cx="1232" cy="826" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="131" data-sec="15" cx="1232" cy="854" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="132" data-sec="15" cx="1232" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="133" data-sec="15" cx="1232" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="134" data-sec="15" cx="1232" cy="938" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="135" data-sec="15" cx="1234" cy="940" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="136" data-sec="15" cx="1235" cy="942" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="137" data-sec="15" cx="1237" cy="944" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="138" data-sec="15" cx="1239" cy="946" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="139" data-sec="15" cx="1240" cy="948" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="140" data-sec="15" cx="1243" cy="952" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="141" data-sec="15" cx="1243" cy="984" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="142" data-sec="15" cx="1243" cy="1009" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="143" data-sec="15" cx="1243" cy="1035" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="144" data-sec="15" cx="1359" cy="993" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="145" data-sec="15" cx="1435" cy="941" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="146" data-sec="15" cx="1435" cy="916" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="147" data-sec="15" cx="1435" cy="964" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="148" data-sec="15" cx="1435" cy="938" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="149" data-sec="15" cx="1435" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="150" data-sec="15" cx="1370" cy="821" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="151" data-sec="15" cx="1326" cy="892" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="152" data-sec="15" cx="1277" cy="973" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="153" data-sec="15" cx="1233" cy="1044" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="154" data-sec="15" cx="1189" cy="1116" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="155" data-sec="15" cx="1140" cy="1196" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="156" data-sec="15" cx="1140" cy="1169" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="157" data-sec="15" cx="1140" cy="1143" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="158" data-sec="15" cx="1140" cy="1116" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="159" data-sec="15" cx="1140" cy="1090" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="160" data-sec="15" cx="1140" cy="1064" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="161" data-sec="15" cx="1140" cy="1038" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="162" data-sec="15" cx="1140" cy="1012" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="163" data-sec="15" cx="1140" cy="985" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="164" data-sec="15" cx="1140" cy="959" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="165" data-sec="15" cx="1192" cy="965" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="166" data-sec="15" cx="1192" cy="928" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="167" data-sec="15" cx="1192" cy="883" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="168" data-sec="15" cx="1192" cy="833" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="169" data-sec="15" cx="1192" cy="792" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="170" data-sec="15" cx="1192" cy="759" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="171" data-sec="15" cx="1192" cy="726" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="172" data-sec="15" cx="1192" cy="693" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="173" data-sec="15" cx="1192" cy="656" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="174" data-sec="15" cx="1192" cy="628" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="175" data-sec="15" cx="1192" cy="685" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="176" data-sec="15" cx="1192" cy="713" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="177" data-sec="15" cx="1192" cy="741" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="178" data-sec="15" cx="1192" cy="770" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="179" data-sec="15" cx="1192" cy="798" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="180" data-sec="15" cx="1192" cy="826" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="181" data-sec="15" cx="1192" cy="854" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="182" data-sec="15" cx="1192" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="183" data-sec="15" cx="1192" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="184" data-sec="15" cx="1192" cy="938" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="185" data-sec="15" cx="1194" cy="894" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="186" data-sec="15" cx="1195" cy="845" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="187" data-sec="15" cx="1198" cy="780" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="188" data-sec="15" cx="1200" cy="714" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="189" data-sec="15" cx="1200" cy="689" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="190" data-sec="15" cx="1200" cy="664" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="191" data-sec="15" cx="1200" cy="638" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="192" data-sec="15" cx="1200" cy="613" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="193" data-sec="15" cx="1200" cy="588" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="194" data-sec="15" cx="1200" cy="563" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="195" data-sec="15" cx="1200" cy="538" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="196" data-sec="15" cx="1200" cy="513" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="197" data-sec="15" cx="1188" cy="536" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="198" data-sec="15" cx="1175" cy="561" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="199" data-sec="15" cx="1164" cy="583" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="200" data-sec="15" cx="1152" cy="606" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="201" data-sec="15" cx="1152" cy="628" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="202" data-sec="15" cx="1152" cy="656" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="203" data-sec="15" cx="1152" cy="685" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="204" data-sec="15" cx="1152" cy="713" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="205" data-sec="15" cx="1152" cy="741" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="206" data-sec="15" cx="1152" cy="770" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="207" data-sec="15" cx="1152" cy="798" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="208" data-sec="15" cx="1152" cy="826" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="209" data-sec="15" cx="1152" cy="854" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="210" data-sec="15" cx="1152" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="211" data-sec="15" cx="1152" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="212" data-sec="15" cx="1152" cy="938" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="213" data-sec="15" cx="1152" cy="964" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="214" data-sec="15" cx="1154" cy="934" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="215" data-sec="15" cx="1155" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="216" data-sec="15" cx="1156" cy="883" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="217" data-sec="15" cx="1158" cy="853" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="218" data-sec="15" cx="1159" cy="826" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="219" data-sec="15" cx="1161" cy="795" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="220" data-sec="15" cx="1163" cy="765" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="221" data-sec="15" cx="1165" cy="724" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="222" data-sec="15" cx="1167" cy="684" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="223" data-sec="15" cx="1169" cy="657" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="224" data-sec="15" cx="1170" cy="626" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="225" data-sec="15" cx="1172" cy="599" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="226" data-sec="15" cx="1173" cy="572" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="227" data-sec="15" cx="1183" cy="558" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="228" data-sec="15" cx="1140" cy="1064" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="229" data-sec="15" cx="1140" cy="1038" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="230" data-sec="15" cx="1123" cy="1007" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="231" data-sec="15" cx="1140" cy="1038" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="232" data-sec="15" cx="1115" cy="1001" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="233" data-sec="15" cx="1098" cy="959" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="234" data-sec="15" cx="1098" cy="959" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="235" data-sec="15" cx="1098" cy="959" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="236" data-sec="15" cx="1098" cy="985" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="237" data-sec="15" cx="1098" cy="1012" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="238" data-sec="15" cx="1098" cy="1038" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="239" data-sec="15" cx="1098" cy="1064" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="240" data-sec="15" cx="1110" cy="964" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="241" data-sec="15" cx="1110" cy="938" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="242" data-sec="15" cx="1110" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="243" data-sec="15" cx="1110" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="244" data-sec="15" cx="1110" cy="854" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="245" data-sec="15" cx="1110" cy="826" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="246" data-sec="15" cx="1110" cy="798" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="247" data-sec="15" cx="1110" cy="770" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="248" data-sec="15" cx="1110" cy="741" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="249" data-sec="15" cx="1110" cy="713" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="250" data-sec="15" cx="1110" cy="685" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="251" data-sec="15" cx="1110" cy="656" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="252" data-sec="15" cx="1110" cy="628" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="253" data-sec="15" cx="1110" cy="606" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="254" data-sec="15" cx="1160" cy="614" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="255" data-sec="15" cx="1160" cy="589" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="256" data-sec="15" cx="1160" cy="565" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="257" data-sec="15" cx="1153" cy="602" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="258" data-sec="15" cx="1143" cy="650" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="259" data-sec="15" cx="1133" cy="699" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="260" data-sec="15" cx="1127" cy="732" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="261" data-sec="15" cx="1120" cy="764" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="262" data-sec="15" cx="1120" cy="739" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="263" data-sec="15" cx="1120" cy="712" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="264" data-sec="15" cx="1120" cy="686" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="265" data-sec="15" cx="1120" cy="661" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="266" data-sec="15" cx="1120" cy="635" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="267" data-sec="15" cx="1120" cy="610" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="268" data-sec="15" cx="1068" cy="606" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="269" data-sec="15" cx="1068" cy="628" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="270" data-sec="15" cx="1068" cy="656" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="271" data-sec="15" cx="1068" cy="685" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="272" data-sec="15" cx="1068" cy="713" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="273" data-sec="15" cx="1068" cy="741" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="274" data-sec="15" cx="1068" cy="770" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="275" data-sec="15" cx="1068" cy="798" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="276" data-sec="15" cx="1068" cy="826" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="277" data-sec="15" cx="1068" cy="854" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="278" data-sec="15" cx="1068" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="279" data-sec="15" cx="1068" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="280" data-sec="15" cx="1068" cy="938" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="281" data-sec="15" cx="1068" cy="964" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="282" data-sec="15" cx="1064" cy="963" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="283" data-sec="15" cx="1060" cy="962" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="284" data-sec="15" cx="1056" cy="960" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="285" data-sec="15" cx="1052" cy="959" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="286" data-sec="15" cx="1052" cy="985" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="287" data-sec="15" cx="1052" cy="1012" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="288" data-sec="15" cx="1052" cy="1038" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="289" data-sec="15" cx="1052" cy="1064" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="290" data-sec="15" cx="1052" cy="1090" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="291" data-sec="15" cx="1052" cy="1116" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="292" data-sec="15" cx="1052" cy="1143" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="293" data-sec="15" cx="1052" cy="1169" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="294" data-sec="15" cx="1052" cy="1196" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="295" data-sec="15" cx="1052" cy="1222" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="296" data-sec="15" cx="1063" cy="1149" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="297" data-sec="15" cx="1075" cy="1067" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="298" data-sec="15" cx="1086" cy="1010" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="299" data-sec="15" cx="1005" cy="1169" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="300" data-sec="15" cx="1043" cy="1089" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="301" data-sec="15" cx="1043" cy="1114" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="302" data-sec="15" cx="1005" cy="1169" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="303" data-sec="15" cx="1034" cy="1118" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="304" data-sec="15" cx="1035" cy="1134" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="305" data-sec="15" cx="1038" cy="1087" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="306" data-sec="15" cx="1038" cy="1097" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="307" data-sec="15" cx="1038" cy="1106" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="308" data-sec="15" cx="1038" cy="1115" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="309" data-sec="15" cx="1038" cy="1087" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="310" data-sec="15" cx="1042" cy="1039" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="311" data-sec="15" cx="1047" cy="984" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="312" data-sec="15" cx="1053" cy="911" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="313" data-sec="15" cx="1059" cy="838" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="314" data-sec="15" cx="1063" cy="789" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="315" data-sec="15" cx="1068" cy="735" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="316" data-sec="15" cx="1072" cy="686" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="317" data-sec="15" cx="1072" cy="661" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="318" data-sec="15" cx="1072" cy="636" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="319" data-sec="15" cx="1072" cy="612" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="320" data-sec="15" cx="1072" cy="586" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="321" data-sec="15" cx="1072" cy="560" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="322" data-sec="15" cx="1072" cy="534" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="323" data-sec="15" cx="1072" cy="508" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="324" data-sec="15" cx="1045" cy="532" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="325" data-sec="15" cx="1016" cy="558" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="326" data-sec="15" cx="986" cy="585" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="327" data-sec="15" cx="959" cy="609" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="328" data-sec="15" cx="1024" cy="628" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="329" data-sec="15" cx="1024" cy="656" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="330" data-sec="15" cx="1024" cy="685" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="331" data-sec="15" cx="1024" cy="713" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="332" data-sec="15" cx="1024" cy="741" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="333" data-sec="15" cx="1024" cy="770" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="334" data-sec="15" cx="1024" cy="798" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="335" data-sec="15" cx="1024" cy="826" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="336" data-sec="15" cx="1024" cy="854" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="337" data-sec="15" cx="1024" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="338" data-sec="15" cx="1024" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="339" data-sec="15" cx="1024" cy="938" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="340" data-sec="15" cx="1024" cy="964" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="341" data-sec="15" cx="1024" cy="992" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="342" data-sec="15" cx="1018" cy="982" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="343" data-sec="15" cx="1011" cy="970" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="344" data-sec="15" cx="1005" cy="959" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="345" data-sec="15" cx="1005" cy="985" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="346" data-sec="15" cx="1005" cy="1012" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="347" data-sec="15" cx="1005" cy="1038" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="348" data-sec="15" cx="1005" cy="1064" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="349" data-sec="15" cx="1005" cy="1116" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="350" data-sec="15" cx="1005" cy="1143" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="351" data-sec="15" cx="1005" cy="1169" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="352" data-sec="15" cx="1005" cy="1196" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="353" data-sec="15" cx="1005" cy="1222" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="354" data-sec="15" cx="1005" cy="1248" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="355" data-sec="15" cx="1008" cy="1196" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="356" data-sec="15" cx="1010" cy="1144" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="357" data-sec="15" cx="1005" cy="1248" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="358" data-sec="15" cx="979" cy="1140" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="359" data-sec="15" cx="979" cy="1163" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="360" data-sec="15" cx="979" cy="1149" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="361" data-sec="15" cx="981" cy="1077" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="362" data-sec="15" cx="982" cy="1004" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="363" data-sec="15" cx="982" cy="956" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="364" data-sec="15" cx="983" cy="902" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="365" data-sec="15" cx="984" cy="854" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="366" data-sec="15" cx="984" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="367" data-sec="15" cx="984" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="368" data-sec="15" cx="984" cy="938" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="369" data-sec="15" cx="984" cy="964" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="370" data-sec="15" cx="984" cy="628" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="371" data-sec="15" cx="984" cy="656" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="372" data-sec="15" cx="984" cy="685" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="373" data-sec="15" cx="984" cy="713" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="374" data-sec="15" cx="984" cy="741" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="375" data-sec="15" cx="984" cy="770" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="376" data-sec="15" cx="984" cy="798" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="377" data-sec="15" cx="984" cy="826" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="378" data-sec="15" cx="968" cy="748" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="379" data-sec="15" cx="955" cy="682" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="380" data-sec="15" cx="944" cy="628" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="381" data-sec="15" cx="944" cy="656" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="382" data-sec="15" cx="944" cy="685" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="383" data-sec="15" cx="944" cy="713" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="384" data-sec="15" cx="944" cy="741" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="385" data-sec="15" cx="944" cy="770" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="386" data-sec="15" cx="944" cy="798" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="387" data-sec="15" cx="944" cy="826" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="388" data-sec="15" cx="944" cy="854" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="389" data-sec="15" cx="944" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="390" data-sec="15" cx="949" cy="908" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="391" data-sec="15" cx="953" cy="930" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="392" data-sec="15" cx="959" cy="959" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="393" data-sec="15" cx="959" cy="985" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="394" data-sec="15" cx="959" cy="1012" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="395" data-sec="15" cx="959" cy="1038" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="396" data-sec="15" cx="959" cy="1064" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="397" data-sec="15" cx="959" cy="1090" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="398" data-sec="15" cx="959" cy="1116" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="399" data-sec="15" cx="959" cy="1143" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="400" data-sec="15" cx="959" cy="1169" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="401" data-sec="15" cx="959" cy="1196" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="402" data-sec="15" cx="956" cy="1171" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="403" data-sec="15" cx="953" cy="1145" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="404" data-sec="15" cx="950" cy="1120" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="405" data-sec="15" cx="948" cy="1094" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="406" data-sec="15" cx="944" cy="1066" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="407" data-sec="15" cx="940" cy="1028" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="408" data-sec="15" cx="936" cy="990" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="409" data-sec="15" cx="933" cy="964" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="410" data-sec="15" cx="930" cy="939" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="411" data-sec="15" cx="927" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="412" data-sec="15" cx="924" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="413" data-sec="15" cx="921" cy="856" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="414" data-sec="15" cx="917" cy="818" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="415" data-sec="15" cx="912" cy="777" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="416" data-sec="15" cx="908" cy="742" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="417" data-sec="15" cx="908" cy="712" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="418" data-sec="15" cx="908" cy="770" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="419" data-sec="15" cx="908" cy="800" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="420" data-sec="15" cx="908" cy="828" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="421" data-sec="15" cx="908" cy="855" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="422" data-sec="15" cx="908" cy="882" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="423" data-sec="15" cx="908" cy="910" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="424" data-sec="15" cx="908" cy="938" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="425" data-sec="15" cx="908" cy="964" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="426" data-sec="15" cx="908" cy="992" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="427" data-sec="15" cx="921" cy="976" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="428" data-sec="15" cx="933" cy="962" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="429" data-sec="15" cx="948" cy="945" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="430" data-sec="15" cx="961" cy="929" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="431" data-sec="15" cx="975" cy="913" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="432" data-sec="15" cx="959" cy="1196" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="433" data-sec="15" cx="959" cy="1196" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="434" data-sec="15" cx="959" cy="1196" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="435" data-sec="15" cx="959" cy="1196" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="436" data-sec="15" cx="959" cy="1196" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="437" data-sec="15" cx="984" cy="656" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="438" data-sec="15" cx="984" cy="685" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="439" data-sec="15" cx="984" cy="713" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="440" data-sec="15" cx="908" cy="742" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="441" data-sec="15" cx="908" cy="742" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="442" data-sec="15" cx="908" cy="742" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="443" data-sec="15" cx="908" cy="742" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="444" data-sec="15" cx="908" cy="742" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="445" data-sec="15" cx="1024" cy="572" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="446" data-sec="15" cx="1024" cy="597" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="447" data-sec="15" cx="1021" cy="577" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="448" data-sec="15" cx="959" cy="1196" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="449" data-sec="15" cx="959" cy="1196" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="450" data-sec="15" cx="908" cy="742" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="451" data-sec="15" cx="908" cy="742" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="452" data-sec="15" cx="908" cy="742" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="453" data-sec="15" cx="908" cy="742" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="454" data-sec="15" cx="908" cy="742" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="455" data-sec="15" cx="908" cy="742" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="456" data-sec="15" cx="908" cy="742" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="457" data-sec="15" cx="1055" cy="311" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="458" data-sec="15" cx="1055" cy="311" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="459" data-sec="15" cx="1055" cy="311" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="460" data-sec="15" cx="1055" cy="311" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="461" data-sec="15" cx="1055" cy="311" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="462" data-sec="15" cx="1055" cy="311" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="463" data-sec="15" cx="1055" cy="311" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="464" data-sec="15" cx="1055" cy="311" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="465" data-sec="15" cx="1055" cy="311" r="12" fill="none" stroke="none" style="cursor:pointer"/>
    <circle data-lot="466" data-sec="15" cx="1055" cy="311" r="12" fill="none" stroke="none" style="cursor:pointer"/>
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
