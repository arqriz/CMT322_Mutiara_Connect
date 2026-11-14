// Homepage only: switch the page between English, Bahasa Malaysia and Chinese.
// Each English text on the page is looked up in this table. Station codes, station
// names and road names stay as they are, because they are proper names.
(function () {
  var T = {
    // header and nav
    'Skip to main content': ['Langkau ke kandungan utama', '跳到主要内容'],
    'Penang LRT Mutiara Line · Community Portal': ['LRT Laluan Mutiara Pulau Pinang · Portal Komuniti', '槟城轻快铁珍珠线 · 社区门户'],
    'Log In / Register': ['Log Masuk / Daftar', '登录 / 注册'],
    'Menu': ['Menu', '菜单'],
    'Home': ['Utama', '首页'],
    'Closures & Detours': ['Penutupan & Lencongan', '封路与绕道'],
    'Works Schedule': ['Jadual Kerja', '施工时间表'],
    'Business Access': ['Akses Perniagaan', '商家通道'],
    'Report a Concern': ['Buat Aduan', '提交投诉'],
    'My Reports': ['Aduan Saya', '我的投诉'],

    // banner and tonight
    "Know what's closed before you leave home": ['Ketahui jalan yang ditutup sebelum anda keluar rumah', '出门前，先了解哪些路段封闭'],
    'Road closures, night works and access to shops along the Mutiara Line, posted by the teams building it.':
      ['Penutupan jalan, kerja malam dan akses ke kedai di sepanjang Laluan Mutiara, dikemas kini oleh pasukan yang membinanya.', '珍珠线沿线的封路、夜间施工和商店通道信息，由施工团队发布。'],
    'See closures and detours': ['Lihat penutupan dan lencongan', '查看封路与绕道'],
    'Report a concern': ['Buat aduan', '提交投诉'],
    'Image: MRT Corp': ['Imej: MRT Corp', '图片：MRT Corp'],
    'Tonight, 10.00 pm to 5.00 am': ['Malam ini, 10.00 malam hingga 5.00 pagi', '今晚 晚上10点至凌晨5点'],
    'Jalan Sultan Azlan Shah is partly closed between Sunny Point junction and the USM field for tree felling. Use Jalan Tun Dr Awang instead.':
      ['Jalan Sultan Azlan Shah ditutup sebahagian antara simpang Sunny Point dan padang USM untuk kerja menebang pokok. Sila guna Jalan Tun Dr Awang.', 'Jalan Sultan Azlan Shah 在 Sunny Point 路口至 USM 球场之间因砍树部分封闭。请改用 Jalan Tun Dr Awang。'],
    'View the detour': ['Lihat lencongan', '查看绕道'],

    // works along the line
    'Works along the line': ['Kerja di sepanjang laluan', '沿线施工'],
    "29.5 km from Silicon Island to KOMTAR and Penang Sentral. Choose a station to see what's happening near it.":
      ['29.5 km dari Silicon Island ke KOMTAR dan Penang Sentral. Pilih stesen untuk melihat kerja berhampiran.', '从 Silicon Island 到 KOMTAR 和 Penang Sentral，全长29.5公里。选择车站，查看附近的施工情况。'],
    'Open the full map': ['Buka peta penuh', '打开完整地图'],
    'Mutiara Line alignment': ['Jajaran Laluan Mutiara', '珍珠线路线图'],
    'Source: MRT Corp, via Gamuda': ['Sumber: MRT Corp, melalui Gamuda', '来源：MRT Corp，经 Gamuda'],
    'No works this week': ['Tiada kerja minggu ini', '本周无施工'],
    'Works near this station': ['Kerja berhampiran stesen ini', '此站附近有施工'],
    'No works': ['Tiada kerja', '无施工'],
    '1 notice': ['1 notis', '1则通告'],
    '2 notices': ['2 notis', '2则通告'],

    // traffic announcements
    'Traffic announcements': ['Pengumuman trafik', '交通公告'],
    'Every notice shows its dates and working hours so you can plan your trip.':
      ['Setiap notis menunjukkan tarikh dan waktu kerja supaya anda boleh merancang perjalanan.', '每则通告都列出日期和施工时间，方便您规划行程。'],
    'See the works schedule': ['Lihat jadual kerja', '查看施工时间表'],
    'Road': ['Jalan', '道路'],
    'All roads': ['Semua jalan', '所有道路'],
    'Lim Chong Eu Expressway': ['Lebuhraya Lim Chong Eu', '林苍佑高速公路'],
    'Nov': ['Nov', '11月'],
    'Partial road closure': ['Penutupan jalan separa', '部分封路'],
    'Lane closure': ['Penutupan lorong', '车道封闭'],
    'Pedestrian diversion': ['Lencongan pejalan kaki', '行人改道'],
    'Dates': ['Tarikh', '日期'],
    'Hours': ['Waktu', '时间'],
    'Work': ['Kerja', '工程'],
    'Details': ['Butiran', '详情'],
    'Night closures on Jalan Sultan Azlan Shah, Sunny Point junction to USM field':
      ['Penutupan waktu malam di Jalan Sultan Azlan Shah, simpang Sunny Point ke padang USM', 'Jalan Sultan Azlan Shah 夜间封路（Sunny Point 路口至 USM 球场）'],
    'Short-term night lane closure on Jalan Sultan Azlan Shah near Gelugor':
      ['Penutupan lorong waktu malam jangka pendek di Jalan Sultan Azlan Shah berhampiran Gelugor', 'Gelugor 附近 Jalan Sultan Azlan Shah 短期夜间车道封闭'],
    'Daytime lane closures on Jalan Tengah, between the Jalan Tengah apartments and Bayan Baru fire station':
      ['Penutupan lorong waktu siang di Jalan Tengah, antara pangsapuri Jalan Tengah dan balai bomba Bayan Baru', 'Jalan Tengah 白天车道封闭（Jalan Tengah 公寓至 Bayan Baru 消防局）'],
    'Night closures in stages between the Jalan Tengah apartments and the Snake Temple':
      ['Penutupan waktu malam secara berperingkat antara pangsapuri Jalan Tengah dan Tokong Ular', 'Jalan Tengah 公寓至蛇庙分段夜间封路'],
    'Footpath moved to the opposite side of Jalan Tun Dr Awang near Bukit Jambul':
      ['Laluan pejalan kaki dipindahkan ke seberang Jalan Tun Dr Awang berhampiran Bukit Jambul', 'Bukit Jambul 附近 Jalan Tun Dr Awang 人行道移至对面'],
    'Left lane closed on Lim Chong Eu Expressway, northbound near Penang Waterfront':
      ['Lorong kiri ditutup di Lebuhraya Lim Chong Eu, arah utara berhampiran Penang Waterfront', '林苍佑高速公路北行 Penang Waterfront 附近左车道封闭'],
    '13 Nov 2026 to 31 Jan 2027': ['13 Nov 2026 hingga 31 Jan 2027', '2026年11月13日至2027年1月31日'],
    '16 to 20 Nov 2026': ['16 hingga 20 Nov 2026', '2026年11月16日至20日'],
    '9 Nov 2026 to 31 Jan 2027': ['9 Nov 2026 hingga 31 Jan 2027', '2026年11月9日至2027年1月31日'],
    '2 Nov to 18 Dec 2026': ['2 Nov hingga 18 Dis 2026', '2026年11月2日至12月18日'],
    '1 Nov to 30 Dec 2026': ['1 Nov hingga 30 Dis 2026', '2026年11月1日至12月30日'],
    '10.00 pm to 5.00 am': ['10.00 malam hingga 5.00 pagi', '晚上10点至凌晨5点'],
    '9.00 am to 5.00 pm': ['9.00 pagi hingga 5.00 petang', '上午9点至下午5点'],
    '11.00 pm to 5.00 am': ['11.00 malam hingga 5.00 pagi', '晚上11点至凌晨5点'],
    'All day': ['Sepanjang hari', '全天'],
    'Tree felling': ['Menebang pokok', '砍伐树木'],
    'Tree cutting': ['Memotong pokok', '修剪树木'],
    'Road widening and drain diversion': ['Pelebaran jalan dan lencongan longkang', '道路扩宽与排水沟改道'],
    'Early utility works': ['Kerja utiliti awal', '前期管线工程'],
    'Pier foundation works': ['Kerja asas tiang', '桥墩地基工程'],
    'Utility relocation': ['Pemindahan utiliti', '管线迁移'],
    'No current notices on this road.': ['Tiada notis semasa untuk jalan ini.', '此道路目前没有通告。'],

    // tasks
    'Something affecting you?': ['Ada sesuatu yang menjejaskan anda?', '有事情影响到您吗？'],
    'Noise at night, dust, a blocked entrance or an unsafe walkway. Tell us where it is and we send it to the team responsible.':
      ['Bising waktu malam, habuk, pintu masuk terhalang atau laluan pejalan kaki tidak selamat. Beritahu kami lokasinya dan kami hantar kepada pasukan yang bertanggungjawab.', '夜间噪音、灰尘、入口被挡或人行道不安全？告诉我们地点，我们会转交负责的团队。'],
    'Received': ['Diterima', '已接收'],
    'Forwarded': ['Dimajukan', '已转交'],
    'In action': ['Dalam tindakan', '处理中'],
    'Resolved': ['Selesai', '已解决'],
    'Track a report': ['Jejak aduan', '追踪投诉'],
    'Use the ticket ID you got when you sent your report.': ['Guna ID tiket yang anda terima semasa menghantar aduan.', '请使用提交投诉时获得的票号。'],
    'Ticket ID': ['ID tiket', '票号'],
    'Track': ['Jejak', '追踪'],
    'Business access': ['Akses perniagaan', '商家通道'],
    'Check whether customers and deliveries can still reach shops on your road, and where the temporary entrances are.':
      ['Semak sama ada pelanggan dan penghantaran masih boleh sampai ke kedai di jalan anda, dan lokasi pintu masuk sementara.', '查看顾客和送货能否到达您路上的商店，以及临时入口的位置。'],
    'Check business access': ['Semak akses perniagaan', '查看商家通道'],

    // alerts and footer
    'Get works alerts for your area': ['Dapatkan makluman kerja untuk kawasan anda', '订阅您所在地区的施工提醒'],
    'We email you when a closure or night work is planned near your station.':
      ['Kami akan e-mel anda apabila penutupan atau kerja malam dirancang berhampiran stesen anda.', '当您附近的车站计划封路或夜间施工时，我们会发邮件通知您。'],
    'Nearest station': ['Stesen terdekat', '最近的车站'],
    'Email': ['E-mel', '电子邮件'],
    'Subscribe': ['Langgan', '订阅'],
    'Mutiara Connect · 24-hour project hotline 1-800-00-0000': ['Mutiara Connect · Talian projek 24 jam 1-800-00-0000', 'Mutiara Connect · 24小时项目热线 1-800-00-0000'],
    'Authority portal': ['Portal pihak berkuasa', '主管部门入口'],
    'Admin dashboard': ['Papan pemuka pentadbir', '管理后台'],
    'Prototype with sample data. Images: MRT Corp and Gamuda.': ['Prototaip dengan data contoh. Imej: MRT Corp dan Gamuda.', '原型，使用示例数据。图片：MRT Corp 与 Gamuda。'],

    // attributes
    'Larger text': ['Teks lebih besar', '放大文字'],
    'Language': ['Bahasa', '语言'],
    '5 active closures': ['5 penutupan aktif', '5处封路进行中'],
    "Tonight's closure": ['Penutupan malam ini', '今晚封路'],
    "Artist's impression of a Mutiara Line train on the elevated track beside the Penang coast":
      ['Lakaran artis kereta api Laluan Mutiara di landasan bertingkat di tepi pantai Pulau Pinang', '珍珠线列车行驶在槟城海岸高架轨道上的效果图'],
    'Map of the Mutiara Line alignment from PSR-A in the south to KOMTAR and Penang Sentral in the north':
      ['Peta jajaran Laluan Mutiara dari PSR-A di selatan ke KOMTAR dan Penang Sentral di utara', '珍珠线路线图，南起 PSR-A，北至 KOMTAR 和 Penang Sentral'],
    'e.g. MC-2026-04817': ['cth. MC-2026-04817', '例如 MC-2026-04817'],
    'e.g. aisyah@email.com': ['cth. aisyah@email.com', '例如 aisyah@email.com'],
    'Mutiara Connect | Penang LRT Mutiara Line community portal': ['Mutiara Connect | Portal komuniti LRT Laluan Mutiara Pulau Pinang', 'Mutiara Connect | 槟城轻快铁珍珠线社区门户']
  };
  var LANG = { EN: { idx: -1, code: 'en' }, BM: { idx: 0, code: 'ms' }, '中文': { idx: 1, code: 'zh-Hans' } };
  var ATTRS = ['placeholder', 'aria-label', 'alt'];
  var current = -1;

  function tr(en) { return current < 0 || !T[en] ? en : T[en][current]; }

  // "Showing 6 notices" comes from the road filter, so it is translated by pattern
  function count(text) {
    var m = /^Showing (\d+) notices?$/.exec(text);
    if (!m) return null;
    return current === 0 ? 'Menunjukkan ' + m[1] + ' notis' : current === 1 ? '显示 ' + m[1] + ' 则通告' : text;
  }

  // Remember the English text the first time we see each node, then always translate from it
  function textNodes() {
    var list = [], w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) {
      if (n.parentElement.closest('script, style')) continue;
      if (n.enText === undefined) n.enText = n.textContent;
      list.push(n);
    }
    return list;
  }

  function apply() {
    textNodes().forEach(function (n) {
      var en = n.enText, key = en.replace(/\s+/g, ' ').trim();
      if (!key) return;
      var out = count(key) || tr(key);
      n.textContent = en.replace(key, out);
    });
    document.querySelectorAll('[placeholder], [aria-label], img[alt]').forEach(function (el) {
      ATTRS.forEach(function (a) {
        if (!el.hasAttribute(a)) return;
        var key = 'data-en-' + a;
        if (!el.hasAttribute(key)) el.setAttribute(key, el.getAttribute(a));
        el.setAttribute(a, tr(el.getAttribute(key)));
      });
    });
    if (!document.enTitle) document.enTitle = document.title;
    document.title = tr(document.enTitle);
  }

  function setLang(label) {
    var l = LANG[label];
    if (!l) return;
    current = l.idx;
    document.documentElement.lang = l.code;
    document.querySelectorAll('.lang-switch button').forEach(function (b) { b.setAttribute('aria-pressed', b.textContent === label ? 'true' : 'false'); });
    apply();
    try { localStorage.setItem('mc-home-lang', label); } catch (e) { /* storage blocked: language resets on reload */ }
  }

  document.querySelectorAll('.lang-switch button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.textContent); });
  });

  // When the road filter rewrites its count, the new text is English: translate it again
  var fc = document.getElementById('filter-count');
  if (fc) {
    new MutationObserver(function () {
      var n = fc.firstChild;
      if (!n || n.translating) return;
      n.enText = n.textContent;
      n.translating = true; n.textContent = count(n.enText) || n.enText; n.translating = false;
    }).observe(fc, { childList: true });
  }

  var saved = null;
  try { saved = localStorage.getItem('mc-home-lang'); } catch (e) { /* ignore */ }
  if (saved && saved !== 'EN') setLang(saved);
})();
