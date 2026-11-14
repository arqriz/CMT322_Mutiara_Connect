// Report a Concern: three-step form with checks, review and a ticket ID.
(function () {
  var form = document.getElementById('report-form');
  var desc = document.getElementById('desc');
  var station = document.getElementById('station');
  var photo = document.getElementById('photo');
  var user = { name: 'Nur Aisyah', email: 'aisyah@email.com' };
  try { user = JSON.parse(localStorage.getItem('mc-user')) || user; } catch (e) { /* keep sample user */ }

  STATIONS.forEach(function (s) { station.insertAdjacentHTML('beforeend', '<option value="' + s[0] + '">' + s[0] + ' ' + s[1] + '</option>'); });
  var pre = new URLSearchParams(location.search).get('station');
  if (pre) station.value = pre;

  desc.addEventListener('input', function () { document.getElementById('desc-count').textContent = desc.value.length + ' of 600 characters'; });

  function chosenType() { var r = form.querySelector('input[name="type"]:checked'); return r ? r.value : ''; }
  function field(el, bad, text) {
    var f = el.closest('.field'); f.classList.toggle('has-error', bad);
    var old = f.querySelector('.error-text'); if (old && old.id === '') old.remove();
    if (bad) f.insertAdjacentHTML('beforeend', '<span class="error-text">' + text + '</span>');
    return !bad;
  }
  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }

  function valid(step) {
    if (step === 1) {
      var t = !!chosenType();
      document.getElementById('type-err').hidden = t;
      var d = field(desc, desc.value.trim().length < 20, 'Write at least 20 characters so the team understands the problem.');
      return t && d;
    }
    if (step === 2) {
      var a = field(station, !station.value, 'Choose the nearest station.');
      var b = field(document.getElementById('landmark'), document.getElementById('landmark').value.trim().length < 3, 'Add a road or landmark.');
      return a && b;
    }
    return true;
  }

  function show(step) {
    form.querySelectorAll('.step').forEach(function (s) { s.hidden = +s.getAttribute('data-step') !== step; });
    document.querySelectorAll('#steps li').forEach(function (li, i) {
      li.className = i + 1 < step ? 'done' : i + 1 === step ? 'current' : '';
    });
    if (step === 3) review();
    var h = form.querySelector('.step[data-step="' + step + '"] h2');
    if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
  }

  function review() {
    var rows = [['Type of concern', chosenType()], ['Description', esc(desc.value.trim())], ['Nearest station', stationName(station.value)],
                ['Road or landmark', esc(document.getElementById('landmark').value.trim())],
                ['Photo', photo.files[0] ? esc(photo.files[0].name) : 'No photo added'], ['Reported by', esc(user.name) + ' (' + esc(user.email) + ')']];
    document.getElementById('review').innerHTML = rows.map(function (r) { return '<tr><th scope="row">' + r[0] + '</th><td>' + r[1] + '</td></tr>'; }).join('');
  }

  photo.addEventListener('change', function () {
    var f = photo.files[0], err = document.getElementById('photo-err');
    var bad = f && (!/image\/(jpeg|png)/.test(f.type) || f.size > 5 * 1024 * 1024);
    err.textContent = bad ? 'Choose a JPG or PNG image of 5 MB or less.' : '';
    err.hidden = !bad;
    if (bad) photo.value = '';
    review();
  });

  form.addEventListener('click', function (e) {
    var b = e.target.closest('[data-next]'); if (!b) return;
    var to = +b.getAttribute('data-next');
    var from = +b.closest('.step').getAttribute('data-step');
    if (to > from && !valid(from)) return;
    show(to);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var id = 'MC-2026-0' + (4850 + Math.floor(Math.random() * 140));
    saveReport({ id: id, text: desc.value.trim(), concern: chosenType(), station: station.value, road: document.getElementById('landmark').value.trim(),
                 status: 'received', updated: '14 Nov 2026, just now', history: [['Received', '14 Nov 2026, just now']], response: '' });
    document.getElementById('ticket').textContent = id;
    document.getElementById('track-link').href = 'track.html?ticket=' + id;
    show(4);
  });
})();
