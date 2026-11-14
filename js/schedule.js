// Works Schedule page (F1 / FR2, FR3). Sample data.
(function () {
  var E = [
    ['2026-11-13','2027-01-31','Night closures, Jalan Sultan Azlan Shah','10.00 pm to 5.00 am','S13','closure',1,'closures.html#n1'],
    ['2026-11-16','2026-11-20','Night lane closure near Gelugor (tree cutting)','10.00 pm to 5.00 am','S14','lane',1,'closures.html#n2'],
    ['2026-11-09','2027-01-31','Daytime lane closures, Jalan Tengah','9.00 am to 5.00 pm','S07','lane',0,'closures.html#n3'],
    ['2026-11-09','2027-01-31','Staged night closures to the Snake Temple','10.00 pm to 5.00 am','S06','closure',1,'closures.html#n4'],
    ['2026-11-02','2026-12-18','Footpath moved, Jalan Tun Dr Awang','All day','S09','walk',0,'closures.html#n5'],
    ['2026-11-01','2026-12-30','Left lane closed, Lim Chong Eu Expressway','11.00 pm to 5.00 am','S15','lane',1,'closures.html#n6'],
    ['2026-11-23','2026-12-05','Piling works (noisy)','10.00 pm to 4.00 am','S06','plan',1,''],
    ['2026-11-28','2026-11-28','Girder lifting (noisy, one night)','11.00 pm to 5.00 am','S09','plan',1,''],
    ['2026-12-05','2026-12-06','Night road resurfacing, Jalan Universiti','10.00 pm to 5.00 am','S13','plan',1,''],
    ['2026-12-19','2026-12-19','Crane set-up near KOMTAR','10.00 pm to 5.00 am','S20','plan',1,'']
  ].map(function (a, i) { return {s:new Date(a[0] + 'T00:00'),e:new Date(a[1] + 'T00:00'),a:a[0],b:a[1],t:a[2],h:a[3],st:a[4],k:a[5],n:a[6],l:a[7]}; });
  var S = {S06:'FIZ North',S07:'Jalan Tengah',S09:'Bukit Jambul',S13:'Jalan Universiti',S14:'Gelugor',S15:'Penang Waterfront',S20:'KOMTAR'};
  var MN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var $ = function (i) { return document.getElementById(i); }, mi = 0, day = null, TODAY = new Date(2026, 10, 14);
  var opts = '<option value="all">All areas</option>' + Object.keys(S).map(function (k) { return '<option value="' + k + '">' + k + ' ' + S[k] + '</option>'; }).join('');
  $('f-area').innerHTML = opts; $('al-area').innerHTML = opts.replace('<option value="all">All areas</option>', '');
  var fmt = function (d) { return d.getDate() + ' ' + MN[d.getMonth()].slice(0, 3) + ' ' + d.getFullYear(); };
  function ok(ev) { var a = $('f-area').value, fr = $('f-from').value, to = $('f-to').value;
    return (a === 'all' || ev.st === a) && (!$('f-noisy').checked || ev.n) && (!fr || ev.e >= new Date(fr + 'T00:00')) && (!to || ev.s <= new Date(to + 'T00:00')); }
  function on(d) { return E.filter(function (ev) { return ok(ev) && ev.s <= d && ev.e >= d; }); }
  function item(ev) { return '<p style="margin:0 0 8px"><span class="x-tag ' + ev.k + '">' + (ev.n ? 'Night / noisy' : 'Daytime') + '</span> <strong>' + ev.t + '</strong><br><small>' + ev.st + ' ' + S[ev.st] + ' · ' + ev.h + (ev.l ? ' · <a href="' + ev.l + '">Details</a>' : '') + '</small></p>'; }
  function cal() {
    var y = mi < 2 ? 2026 : 2027, m = (10 + mi) % 12, first = new Date(y, m, 1), off = (first.getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
    $('mname').textContent = MN[m] + ' ' + y; $('prev').disabled = mi === 0; $('next').disabled = mi === 2;
    var h = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(function (d) { return '<div class="dow">' + d + '</div>'; }).join('');
    for (var i = 0; i < off; i++) h += '<div class="x-day off" aria-hidden="true"></div>';
    for (var d = 1; d <= days; d++) {
      var dt = new Date(y, m, d), ev = on(dt), c = dt.getTime() === TODAY.getTime();
      h += '<button type="button" class="x-day' + (c ? ' today' : '') + '" data-t="' + dt.getTime() + '" aria-pressed="' + (day === dt.getTime()) + '" aria-label="' + fmt(dt) + ', ' + ev.length + ' works"><b>' + d + '</b>' +
        ev.slice(0, 2).map(function (e) { return '<span class="x-ev ' + e.k + '">' + e.t + '</span>'; }).join('') + (ev.length > 2 ? '<span class="x-more">+' + (ev.length - 2) + ' more</span>' : '') + (ev.length ? '<span class="x-dot"></span>' : '') + '</button>';
    }
    $('cal').innerHTML = h;
    var shown = E.filter(ok).length; $('f-count').textContent = shown + (shown === 1 ? ' work item matches' : ' work items match') + ' your filters';
  }
  function dayList() { var h = $('day-h'), l = $('day-list'); if (!day) { h.textContent = 'Select a day'; l.innerHTML = '<p class="x-sub" style="margin:0">Choose a date above to see what is planned.</p>'; return; }
    var d = new Date(day), ev = on(d); h.textContent = fmt(d); l.innerHTML = ev.length ? ev.map(item).join('') : '<p class="x-sub" style="margin:0">No works planned for this day.</p>'; }
  function list() { var r = E.filter(ok).sort(function (a, b) { return a.s - b.s; });
    $('rows').innerHTML = r.length ? r.map(function (e) { return '<tr><td>' + (e.a === e.b ? fmt(e.s) : fmt(e.s) + ' to ' + fmt(e.e)) + '</td><td>' + e.h + '</td><td><span class="x-tag ' + e.k + '">' + (e.n ? 'Night / noisy' : 'Daytime') + '</span><br>' + e.t + '</td><td>' + e.st + ' ' + S[e.st] + '</td><td>' + (e.l ? '<a href="' + e.l + '">Details</a>' : 'Planned') + '</td></tr>'; }).join('') : '<tr><td colspan="5">No works match your filters.</td></tr>'; }
  function all() { cal(); dayList(); list(); }
  $('cal').addEventListener('click', function (e) { var b = e.target.closest('.x-day[data-t]'); if (b) { day = +b.dataset.t; cal(); dayList(); } });
  $('prev').onclick = function () { if (mi > 0) { mi--; all(); } }; $('next').onclick = function () { if (mi < 2) { mi++; all(); } };
  ['f-area','f-from','f-to','f-noisy'].forEach(function (i) { $(i).addEventListener('change', all); });
  $('f-reset').onclick = function () { $('f-area').value = 'all'; $('f-from').value = $('f-to').value = ''; $('f-noisy').checked = false; all(); };
  function view(c) { $('cal-view').hidden = !c; $('list-view').hidden = c; $('v-cal').setAttribute('aria-pressed', c); $('v-list').setAttribute('aria-pressed', !c); }
  $('v-cal').onclick = function () { view(true); }; $('v-list').onclick = function () { view(false); };
  $('al-form').addEventListener('submit', function (e) { e.preventDefault(); var c = $('al-contact').value.trim(), m = $('al-msg'), ch = document.querySelector('input[name=ch]:checked').value;
    m.textContent = !c ? 'Please enter your ' + (ch === 'email' ? 'email address.' : 'WhatsApp number.') : 'Subscribed. We will send ' + ch + ' alerts for ' + $('al-area').selectedOptions[0].text + '. (Sample only)'; });
  all();
})();
