// My Reports: the signed-in user's reports, search by ticket ID, status and official response.
(function () {
  var STEPS = ['received', 'forwarded', 'action', 'resolved'];
  // Sample reports by Nur Aisyah, plus any reports sent from this browser
  var reports = savedReports().concat(COMPLAINTS.filter(function (c) { return c.by === 'Aisyah R.'; }));

  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }

  document.getElementById('total').textContent = reports.length + (reports.length === 1 ? ' report' : ' reports');
  document.getElementById('rows').innerHTML = reports.map(function (r) {
    return '<tr><td><a class="ticket-link" href="#detail" data-id="' + r.id + '">' + r.id + '</a></td><td>' + esc(r.text) + '</td>' +
      '<td>' + stationName(r.station) + '</td><td><span class="pill pill-' + r.status + '">' + STATUS_LABEL[r.status] + '</span></td>' +
      '<td>' + r.updated + '</td><td><button class="btn btn-outline btn-sm" type="button" data-id="' + r.id + '">View</button></td></tr>';
  }).join('');

  function find(id) {
    id = id.trim().toUpperCase();
    return reports.concat(COMPLAINTS).filter(function (r) { return r.id === id; })[0];
  }

  function show(r) {
    document.getElementById('detail').hidden = false;
    document.getElementById('d-id').textContent = r.id;
    document.getElementById('d-meta').textContent = r.concern + ' · ' + stationName(r.station) + (r.road ? ' · ' + r.road : '');
    var pill = document.getElementById('d-pill');
    pill.className = 'pill pill-' + r.status; pill.textContent = STATUS_LABEL[r.status];
    document.getElementById('d-text').textContent = r.text;
    var reached = STEPS.indexOf(r.status);
    document.getElementById('d-steps').innerHTML = STEPS.map(function (s, i) {
      var when = (r.history || []).filter(function (h) { return h[0] === STATUS_LABEL[s]; })[0];
      return '<li class="' + (i < reached ? 'done' : i === reached ? (s === 'resolved' ? 'done' : 'current') : '') + '">' + STATUS_LABEL[s] + (when ? '<small>' + when[1] + '</small>' : '') + '</li>';
    }).join('');
    document.getElementById('d-response').innerHTML = r.response
      ? '<h4>Official response</h4><p style="margin:0">' + esc(r.response) + '</p>'
      : '<h4>Official response</h4><p style="margin:0">No response yet. The responsible authority replies within 3 days of the report being forwarded.</p>';
    document.getElementById('detail').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.getElementById('rows').addEventListener('click', function (e) {
    var b = e.target.closest('[data-id]'); if (!b) return;
    e.preventDefault();
    show(find(b.getAttribute('data-id')));
  });

  document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = document.getElementById('ticket').value;
    var err = document.getElementById('search-err');
    if (!/^MC-\d{4}-\d{5}$/i.test(v.trim())) { err.textContent = 'Ticket IDs look like MC-2026-04817.'; err.hidden = false; return; }
    var r = find(v);
    if (!r) { err.textContent = 'No report found with ticket ID ' + v.trim().toUpperCase() + '. Check the ID in your confirmation.'; err.hidden = false; return; }
    err.hidden = true;
    show(r);
  });

  var t = new URLSearchParams(location.search).get('ticket');
  if (t && find(t)) { document.getElementById('ticket').value = t; show(find(t)); }
})();
