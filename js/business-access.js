// Business Access page (F2 / FR4 to FR6). Sample data.
(function () {
  var P = [
    ['Kedai Runcit Pak Din','Grocery','Jalan Sultan Azlan Shah, Gelugor','S14','open','Front entrance open.','','Deliveries 7 am to 7 pm. No change.','n2'],
    ['Restoran Sri Gelugor','Restaurant','Jalan Sultan Azlan Shah, Gelugor','S14','limited','Frontage partly blocked by hoarding at night.','Use the left side door, 3 m from the main entrance.','Night deliveries paused 10 pm to 5 am.','n1'],
    ['Klinik Kesihatan Universiti','Clinic','Jalan Universiti','S13','open','Open as normal. Ambulance bay kept clear.','','Patients may drop off at the front bay.','n1'],
    ['Kopitiam Bayan Baru','Cafe','Jalan Tengah, Bayan Baru','S07','alt','Front footpath closed in the daytime.','Enter from the back lane next to the fire station.','Deliveries via the back lane before 9 am.','n3'],
    ['Farmasi Sihat','Pharmacy','Jalan Tengah, Bayan Baru','S07','limited','One lane closed. Short parking only.','Park at the Bayan Baru fire station lot and walk 80 m.','Small vans only from 5 pm.','n3'],
    ['Kedai Buku Jambul','Bookshop','Jalan Tun Dr Awang, Bukit Jambul','S09','alt','Usual footpath fenced off.','Cross at the signal, then use the temporary footpath.','Deliveries to the side gate.','n5'],
    ['Warung Kak Ani','Stall','Jalan Tun Dr Awang, Bukit Jambul','S09','open','Open. Stall moved 5 m north.','','Same as before.','n5'],
    ['Bengkel Snake Temple Road','Workshop','Near the Snake Temple','S06','limited','Staged night closures affect evening trade.','Use the service road behind the temple after 10 pm.','Daytime deliveries only.','n4']
  ];
  var R = [
    ['Bukit Jambul crossing','Signal crossing 40 m before the fence, then a level temporary footpath.',['Step-free','Wheelchair width 1.5 m','Signal with beeper'],'closures.html#n5'],
    ['Jalan Tengah service lane','Walk behind the apartments to avoid the closed daytime lane.',['Step-free','Lit at night','Marshal on site'],'closures.html#n3'],
    ['Gelugor to USM footpath','Keep to the park side while night works use the road side.',['Open all day','Handrail at the slope'],'closures.html#n1']
  ];
  var S = {S06:'FIZ North',S07:'Jalan Tengah',S09:'Bukit Jambul',S13:'Jalan Universiti',S14:'Gelugor'};
  var L = {open:'Open',limited:'Limited',alt:'Alternative entrance'}, $ = function (i) { return document.getElementById(i); };
  $('f-station').innerHTML = '<option value="all">All stations</option>' + Object.keys(S).map(function (k) { return '<option value="' + k + '">' + k + ' ' + S[k] + '</option>'; }).join('');
  $('routes').innerHTML = R.map(function (r) { return '<div class="x-route"><h3>' + r[0] + '</h3><p style="margin:0">' + r[1] + '</p><ul>' + r[2].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul><p style="margin:10px 0 0"><a href="' + r[3] + '">See the notice</a></p></div>'; }).join('');
  function render() {
    var q = $('q').value.trim().toLowerCase(), s = $('f-status').value, st = $('f-station').value;
    var r = P.filter(function (p) { return (s === 'all' || p[4] === s) && (st === 'all' || p[3] === st) && (!q || (p[0] + ' ' + p[1] + ' ' + p[2]).toLowerCase().indexOf(q) > -1); });
    $('prem').innerHTML = r.map(function (p) {
      return '<li><span class="x-pill ' + p[4] + '">' + L[p[4]] + '</span><h3>' + p[0] + '</h3><p class="m">' + p[1] + ' · ' + p[2] + ' · ' + p[3] + ' ' + S[p[3]] + '</p><p>' + p[5] + '</p>' +
        (p[6] ? '<p class="ent"><strong>Temporary entrance:</strong> ' + p[6] + '</p>' : '') + '<p class="m">' + p[7] + '</p><p style="margin:0"><a href="closures.html#' + p[8] + '">Notice affecting this shop</a></p></li>'; }).join('');
    $('f-count').textContent = r.length + (r.length === 1 ? ' premises' : ' premises') + ' shown'; $('none').hidden = r.length !== 0;
  }
  ['q','f-status','f-station'].forEach(function (i) { $(i).addEventListener('input', render); });
  render();
})();
