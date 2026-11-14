// Closures & Detours page (F1 / FR1). Sample data, ids n1 to n6 match the homepage links.
(function () {
  var N = [
    {id:'n1',t:'closure',road:'sultan-azlan-shah',rn:'Jalan Sultan Azlan Shah',title:'Night closures on Jalan Sultan Azlan Shah, Sunny Point junction to USM field',d:'13 Nov 2026 to 31 Jan 2027',h:'10.00 pm to 5.00 am',w:'Tree felling',st:['S13','S14'],p:[441,362],imp:'One carriageway closed each night. Expect 10 to 15 minutes extra on the approach to USM.',det:['Turn left at Sunny Point junction onto Jalan Tun Dr Awang.','Continue to the USM Main Gate roundabout.','Rejoin Jalan Sultan Azlan Shah after the USM field.']},
    {id:'n2',t:'lane',road:'sultan-azlan-shah',rn:'Jalan Sultan Azlan Shah',title:'Short-term night lane closure on Jalan Sultan Azlan Shah near Gelugor',d:'16 to 20 Nov 2026',h:'10.00 pm to 5.00 am',w:'Tree cutting',st:['S14'],p:[440,318],imp:'Left lane closed. Traffic marshals guide vehicles past the work zone.',det:['Keep right and follow the cones past the work zone.','No turn-offs are blocked. Slow to 30 km/h.']},
    {id:'n3',t:'lane',road:'jalan-tengah',rn:'Jalan Tengah',title:'Daytime lane closures on Jalan Tengah, between the Jalan Tengah apartments and Bayan Baru fire station',d:'9 Nov 2026 to 31 Jan 2027',h:'9.00 am to 5.00 pm',w:'Road widening and drain diversion',st:['S07'],p:[290,619],imp:'One lane in each direction closed. Delays at school hours.',det:['Use Lebuh Bukit Kecil as the alternative route to Bayan Baru.','Return to Jalan Tengah at the fire station junction.']},
    {id:'n4',t:'closure',road:'sultan-azlan-shah',rn:'Jalan Sultan Azlan Shah',title:'Night closures in stages between the Jalan Tengah apartments and the Snake Temple',d:'9 Nov 2026 to 31 Jan 2027',h:'10.00 pm to 5.00 am',w:'Early utility works',st:['S06'],p:[312,656],imp:'Closed in short stages. Each stage is posted two days ahead.',det:['Follow signs onto the service road behind the Snake Temple.','Return to the main road after the closed stage.']},
    {id:'n5',t:'walk',road:'tun-dr-awang',rn:'Jalan Tun Dr Awang',title:'Footpath moved to the opposite side of Jalan Tun Dr Awang near Bukit Jambul',d:'2 Nov to 18 Dec 2026',h:'All day',w:'Pier foundation works',st:['S09'],p:[318,545],imp:'The usual footpath is fenced off. A signed crossing with a signal leads to the temporary footpath.',det:['Use the signalised crossing 40 m before the fence.','Walk on the temporary footpath, about 1.5 m wide and level.','Cross back at the second signal to return to the original path.']},
    {id:'n6',t:'lane',road:'lim-chong-eu',rn:'Lim Chong Eu Expressway',title:'Left lane closed on Lim Chong Eu Expressway, northbound near Penang Waterfront',d:'1 Nov to 30 Dec 2026',h:'11.00 pm to 5.00 am',w:'Utility relocation',st:['S15'],p:[498,281],imp:'Northbound left lane closed overnight. Two lanes stay open.',det:['Keep to the middle and right lanes.','Exit at Penang Waterfront if you need local roads.']}];
  var TN = {closure:'Partial road closure',lane:'Lane closure',walk:'Pedestrian diversion'};
  var S = {S06:'FIZ North',S07:'Jalan Tengah',S09:'Bukit Jambul',S13:'Jalan Universiti',S14:'Gelugor',S15:'Penang Waterfront'};
  var f = {type:'all',road:'all',station:'all'}, sel = null, $ = function (i) { return document.getElementById(i); };
  var chips = $('type-chips'), road = $('f-road'), stn = $('f-station');
  [['all','All types']].concat(Object.keys(TN).map(function (k) { return [k, TN[k]]; })).forEach(function (c) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'x-chip'; b.textContent = c[1]; b.dataset.v = c[0];
    b.setAttribute('aria-pressed', c[0] === 'all'); chips.appendChild(b);
  });
  road.innerHTML = '<option value="all">All roads</option>' + Object.keys(N.reduce(function (o, n) { o[n.road] = n.rn; return o; }, {})).map(function (k) { return '<option value="' + k + '">' + N.filter(function (n) { return n.road === k; })[0].rn + '</option>'; }).join('');
  stn.innerHTML = '<option value="all">All stations</option>' + Object.keys(S).map(function (k) { return '<option value="' + k + '">' + k + ' ' + S[k] + '</option>'; }).join('');
  // details (rendered once; filtered with the list)
  $('details').innerHTML = N.map(function (n) {
    return '<article class="x-card x-detail" id="' + n.id + '"><span class="x-tag ' + n.t + '">' + TN[n.t] + '</span><h3>' + n.title + '</h3>' +
      '<dl class="x-dl"><div><dt>Dates</dt><dd>' + n.d + '</dd></div><div><dt>Hours</dt><dd>' + n.h + '</dd></div><div><dt>Work</dt><dd>' + n.w + '</dd></div><div><dt>Near</dt><dd>' + n.st.map(function (s) { return s + ' ' + S[s]; }).join(', ') + '</dd></div></dl>' +
      '<p><strong>What it means for you:</strong> ' + n.imp + '</p><div class="x-detour"><h4>Detour</h4><ol>' + n.det.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol></div>' +
      '<p style="margin:14px 0 0"><a class="btn btn-outline btn-sm" href="business-access.html">Check shop access</a> <a class="btn btn-outline btn-sm" href="report.html">Report a concern</a></p></article>';
  }).join('');
  var map = $('map');
  N.forEach(function (n, i) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'x-pin ' + n.t; b.id = 'pin-' + n.id; b.textContent = i + 1;
    b.style.left = (n.p[0] / 9) + '%'; b.style.top = (n.p[1] / 9.54) + '%'; b.setAttribute('aria-label', 'Notice ' + (i + 1) + ': ' + n.title);
    b.addEventListener('click', function () { choose(n.id, true); }); map.appendChild(b);
  });
  function match(n) { return (f.type === 'all' || n.t === f.type) && (f.road === 'all' || n.road === f.road) && (f.station === 'all' || n.st.indexOf(f.station) > -1); }
  function render() {
    var shown = 0;
    $('list').innerHTML = N.map(function (n, i) {
      return match(n) ? (shown++, '<li><button type="button" class="x-item ' + n.t + '" data-id="' + n.id + '"' + (sel === n.id ? ' aria-current="true"' : '') + '><span class="x-tag ' + n.t + '">' + (i + 1) + '. ' + TN[n.t] + '</span><strong>' + n.title + '</strong><small>' + n.d + ' · ' + n.h + '</small></button></li>') : '';
    }).join('');
    N.forEach(function (n) { var p = $('pin-' + n.id), m = match(n); p.hidden = !m; p.setAttribute('aria-pressed', sel === n.id); var d = $(n.id); d.hidden = !m; });
    $('f-count').textContent = 'Showing ' + shown + (shown === 1 ? ' notice' : ' notices'); $('none').hidden = shown !== 0;
  }
  function choose(id, scroll) { sel = id; render(); if (scroll) { var d = $(id); if (d && !d.hidden) { d.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth'}); history.replaceState(null, '', '#' + id); } } }
  $('list').addEventListener('click', function (e) { var b = e.target.closest('.x-item'); if (b) choose(b.dataset.id, true); });
  chips.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; f.type = b.dataset.v; chips.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); render(); });
  road.addEventListener('change', function () { f.road = road.value; render(); });
  stn.addEventListener('change', function () { f.station = stn.value; render(); });
  $('f-reset').addEventListener('click', function () { f = {type:'all',road:'all',station:'all'}; road.value = stn.value = 'all'; chips.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.v === 'all'); }); render(); });
  // deep links from the homepage: ?station=S14 and #n3
  var q = /station=([A-Z]\d\d)/.exec(location.search); if (q && S[q[1]]) { f.station = stn.value = q[1]; }
  if (/^#n\d$/.test(location.hash)) sel = location.hash.slice(1);
  render();
})();
