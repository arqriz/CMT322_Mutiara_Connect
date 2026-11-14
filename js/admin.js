// Mutiara Connect – Admin Dashboard (F5: FR13 to FR15).
// Part A prototype: sample data in the browser, nothing is saved to a server.

(function () {
  var S = Staff;
  var F = function (id) { return document.getElementById(id); };

  var ADMINS = {
    complaints: { initials: 'NA', name: 'Nurul Aina', role: 'Complaint Manager · Platform administration', tabs: ['review', 'dashboard'] },
    content:    { initials: 'HR', name: 'Hafiz Rahman', role: 'Content Manager · Platform administration', tabs: ['accounts', 'content'] }
  };
  var AUTH_NAMES = { contractor: 'Contractor', police: 'State Police', state: 'State Government' };
  var CATEGORIES = ['Noise', 'Dust', 'Blocked access', 'Road damage', 'Traffic', 'Safety', 'Business impact', 'Signage', 'Other'];
  // Suggested authority for each category (the manager can change it).
  var ROUTE = { 'Noise': 'contractor', 'Dust': 'contractor', 'Blocked access': 'contractor', 'Road damage': 'contractor', 'Safety': 'contractor', 'Traffic': 'police', 'Business impact': 'state', 'Signage': 'state', 'Other': 'state' };
  var TARGET_HOURS = 72;

  // ---------- Sample complaints (same tickets as the Authority Portal) ----------
  // hours = time from forwarding to the authority's first official response.
  var complaints = [
    { id: 'MC-2026-04846', cat: 'Dust', text: 'Thick dust on cars parked along the service road every evening.', road: 'Lim Chong Eu Expressway', station: 'S15', received: '2026-11-13', status: 'Received' },
    { id: 'MC-2026-04845', cat: 'Business impact', text: 'Night closure means our food stall has no customers after 10 pm.', road: 'Jalan Sultan Azlan Shah', station: 'S13', received: '2026-11-13', status: 'Received' },
    { id: 'MC-2026-04844', cat: 'Traffic', text: 'Detour sign points into a one-way road near USM main gate.', road: 'Jalan Sultan Azlan Shah', station: 'S13', received: '2026-11-12', status: 'Received' },
    { id: 'MC-2026-04843', cat: 'Blocked access', text: 'Bus stop moved but no shelter or sign at the new spot.', road: 'Jalan Tun Dr Awang', station: 'S09', received: '2026-11-12', status: 'Received' },
    { id: 'MC-2026-04842', cat: 'Noise', text: 'Generator running all night beside the flats at Sunny Point.', road: 'Jalan Sultan Azlan Shah', station: 'S14', received: '2026-11-11', status: 'Received' },
    { id: 'MC-2026-04840', cat: 'Business impact', text: 'Customers cannot park near our row of shops since the lane closure.', road: 'Jalan Tengah', station: 'S07', received: '2026-11-12', status: 'Forwarded', to: 'state', forwarded: '2026-11-13' },
    { id: 'MC-2026-04835', cat: 'Blocked access', text: 'New hoarding blocks the side entrance to the clinic.', road: 'Jalan Tun Dr Awang', station: 'S09', received: '2026-11-11', status: 'Forwarded', to: 'contractor', forwarded: '2026-11-12' },
    { id: 'MC-2026-04829', cat: 'Traffic', text: 'No traffic marshal at Sunny Point junction during the evening peak.', road: 'Jalan Sultan Azlan Shah', station: 'S14', received: '2026-11-10', status: 'Forwarded', to: 'police', forwarded: '2026-11-11' },
    { id: 'MC-2026-04822', cat: 'Dust', text: 'Dust from the site covers our shop fronts every afternoon.', road: 'Jalan Tengah', station: 'S07', received: '2026-11-10', status: 'Forwarded', to: 'contractor', forwarded: '2026-11-10' },
    { id: 'MC-2026-04790', cat: 'Road damage', text: 'Potholes on the left lane after last week\'s night works.', road: 'Lim Chong Eu Expressway', station: 'S15', received: '2026-11-02', status: 'Forwarded', to: 'contractor', forwarded: '2026-11-03' },
    { id: 'MC-2026-04817', cat: 'Noise', text: 'Piling noise continues after midnight near Sunny Point.', road: 'Jalan Sultan Azlan Shah', station: 'S14', received: '2026-11-08', status: 'In action', to: 'contractor', forwarded: '2026-11-09', hours: 30 },
    { id: 'MC-2026-04811', cat: 'Signage', text: 'Detour signs are only in English.', road: 'Jalan Sultan Azlan Shah', station: 'S06', received: '2026-11-07', status: 'In action', to: 'state', forwarded: '2026-11-07', hours: 52 },
    { id: 'MC-2026-04803', cat: 'Traffic', text: 'Cars parked along the detour road make it a single lane.', road: 'Jalan Universiti', station: 'S13', received: '2026-11-05', status: 'In action', to: 'police', forwarded: '2026-11-06', hours: 26 },
    { id: 'MC-2026-04770', cat: 'Traffic', text: 'Temporary traffic light stuck on red.', road: 'Jalan Tengah', station: 'S07', received: '2026-10-30', status: 'Resolved', to: 'police', forwarded: '2026-10-30', hours: 2 },
    { id: 'MC-2026-04761', cat: 'Safety', text: 'Temporary walkway has a loose steel plate.', road: 'Jalan Sultan Azlan Shah', station: 'S13', received: '2026-10-27', status: 'Resolved', to: 'contractor', forwarded: '2026-10-27', hours: 27 },
    { id: 'MC-2026-04744', cat: 'Noise', text: 'Concrete mixer trucks queueing with engines on at 2 am.', road: 'Jalan Tengah', station: 'S07', received: '2026-10-20', status: 'Resolved', to: 'contractor', forwarded: '2026-10-21', hours: 96 },
    { id: 'MC-2026-04731', cat: 'Business impact', text: 'Request for signage showing our shops are still open.', road: 'Jalan Tun Dr Awang', station: 'S09', received: '2026-10-15', status: 'Resolved', to: 'state', forwarded: '2026-10-16', hours: 80 }
  ];

  // ---------- Sample accounts and content ----------
  var requests = [
    { name: 'Farid Osman', org: 'Mutiara Line Contractor, Package 3', email: 'farid.osman@example.com', role: 'Contractor', date: '2026-11-12' },
    { name: 'Insp. Lee Wei Han', org: 'Penang Traffic Police, Barat Daya', email: 'lee.weihan@example.com', role: 'State Police', date: '2026-11-11' },
    { name: 'Kavitha Raj', org: 'MBPP Engineering Department', email: 'kavitha.raj@example.com', role: 'State Government', date: '2026-11-10' }
  ];
  var users = [
    { name: 'Aisyah Rahim', email: 'aisyah.r@example.com', role: 'Reporter', last: '2026-11-13', status: 'Active' },
    { name: 'Chong Boon Keat', email: 'chong.bk@example.com', role: 'Business Owner', last: '2026-11-12', status: 'Active' },
    { name: 'Tan Kok Leong', email: 'tan.kl@example.com', role: 'Reporter', last: '2026-11-09', status: 'Active' },
    { name: 'Spam Account 77', email: 'win.prize77@example.com', role: 'Reporter', last: '2026-11-04', status: 'Suspended' },
    { name: 'Site Team, Package 2', email: 'site.p2@example.com', role: 'Contractor', last: '2026-11-13', status: 'Active' },
    { name: 'Penang Traffic Police', email: 'traffic.tl@example.com', role: 'State Police', last: '2026-11-13', status: 'Active' },
    { name: 'Penang State Government', email: 'infra.psg@example.com', role: 'State Government', last: '2026-11-12', status: 'Active' },
    { name: 'Nurul Aina', email: 'nurul.a@example.com', role: 'Complaint Manager', last: '2026-11-13', status: 'Active' },
    { name: 'Hafiz Rahman', email: 'hafiz.r@example.com', role: 'Content Manager', last: '2026-11-13', status: 'Active' }
  ];
  var ROLE_GROUPS = { 'Regular User': ['Browser', 'Reporter', 'Business Owner'], 'Authority': ['Contractor', 'State Police', 'State Government'], 'Administrator': ['Complaint Manager', 'Content Manager'] };
  function typeOf(role) { for (var g in ROLE_GROUPS) if (ROLE_GROUPS[g].indexOf(role) !== -1) return g; return ''; }

  var content = [
    { title: 'Heavy vehicle checks on the detour route, 20 to 30 Nov', body: 'Police checkpoints for lorries over 7.5 tonnes on Jalan Universiti from 10.00 pm to 2.00 am.', type: 'closure', by: 'State Police', date: '2026-11-13', status: 'Pending review' },
    { title: 'Bored piling at Gelugor from 1 Dec', body: 'Piling works between 8.00 am and 11.00 pm beside the Gelugor station site. Noise barriers in place.', type: 'lane', by: 'Contractor', date: '2026-11-13', status: 'Pending review' },
    { title: 'Night closures on Jalan Sultan Azlan Shah, Sunny Point junction to USM field', body: 'Partial road closure for tree felling, 10.00 pm to 5.00 am, until 31 Jan 2027. Use Jalan Tun Dr Awang.', type: 'closure', by: 'Contractor', date: '2026-11-12', status: 'Published' },
    { title: 'Temporary parking for Jalan Tengah shops at the Bayan Baru market lot', body: 'Free parking for customers of Jalan Tengah shops during the lane closure.', type: 'business', by: 'State Government', date: '2026-11-12', status: 'Published' },
    { title: 'Footpath moved to the opposite side of Jalan Tun Dr Awang near Bukit Jambul', body: 'Cross at the signalised crossing beside the petrol station.', type: 'walk', by: 'Contractor', date: '2026-11-02', status: 'Published' },
    { title: 'Left lane closed on Lim Chong Eu Expressway, northbound near Penang Waterfront', body: 'Utility relocation, 11.00 pm to 5.00 am until 30 Dec 2026.', type: 'lane', by: 'Contractor', date: '2026-11-01', status: 'Published' },
    { title: 'Weekend closure of Jalan Bayan Lepas slip road (ended)', body: 'Closure ended on 3 Nov 2026.', type: 'closure', by: 'State Police', date: '2026-10-31', status: 'Removed' }
  ];
  var TAGS = { closure: ['tag-closure', 'Road closure'], lane: ['tag-lane', 'Lane closure'], walk: ['tag-walk', 'Pedestrian diversion'], business: ['tag-business', 'Business access'] };
  var STATE_PILL = { 'Active': 'pill-resolved', 'Published': 'pill-resolved', 'Pending review': 'pill-action', 'Suspended': 'pill-suspended', 'Removed': 'pill-suspended' };
  function statePill(s) { return '<span class="pill ' + STATE_PILL[s] + '">' + s + '</span>'; }

  var role = 'complaints';

  // ---------- Header bar + stats ----------
  var ICONS = {
    inbox: '<path d="M4 5h16v11H9l-5 4z"/><path d="M12 8v3M12 13.5h.01"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    late: '<path d="M12 3 2 20h20z"/><path d="M12 9.5v4.5"/><path d="M12 17h.01"/>',
    done: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    user: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M17 11h5M19.5 8.5v5"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',
    doc: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>'
  };
  function tile(icon, tone, num, label) {
    return '<div class="stat"><span class="stat-icon' + (tone ? ' is-' + tone : '') + '" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICONS[icon] + '</svg></span>' +
      '<div><span class="stat-num">' + num + '</span><span class="stat-label">' + label + '</span></div></div>';
  }
  function isOverdue(c) { return c.status === 'Forwarded' && S.daysSince(c.forwarded) > 3; }
  function avgHours(list) {
    var h = list.filter(function (c) { return c.hours != null; });
    return h.length ? Math.round(h.reduce(function (a, c) { return a + c.hours; }, 0) / h.length) : null;
  }
  function renderStats() {
    var html;
    if (role === 'complaints') {
      var n = function (st) { return complaints.filter(function (c) { return c.status === st; }).length; };
      html = tile('inbox', 'orange', n('Received'), 'New, waiting to be forwarded') +
        tile('late', 'amber', complaints.filter(isOverdue).length, 'Overdue at an authority') +
        tile('clock', '', avgHours(complaints) + ' h', 'Average first response') +
        tile('done', 'green', n('Resolved') + ' of ' + complaints.length, 'Resolved');
      F('tab-review-count').textContent = n('Received');
    } else {
      html = tile('user', 'orange', requests.length, 'Accounts waiting for approval') +
        tile('users', '', users.filter(function (u) { return u.status === 'Active'; }).length, 'Active users') +
        tile('doc', 'amber', content.filter(function (c) { return c.status === 'Pending review'; }).length, 'Posts waiting for review') +
        tile('done', 'green', content.filter(function (c) { return c.status === 'Published'; }).length, 'Published notices');
      F('tab-accounts-count').textContent = requests.length;
    }
    F('stats').innerHTML = html;
  }

  // ---------- FR13: review, categorise, forward ----------
  function renderReview() {
    var status = F('r-status').value, q = F('r-search').value.trim().toLowerCase();
    var rows = complaints.filter(function (c) {
      return (status === 'all' || c.status === status) && (!q || (c.id + ' ' + c.text + ' ' + c.road + ' ' + c.cat).toLowerCase().indexOf(q) !== -1);
    });
    F('review-rows').innerHTML = rows.length ? rows.map(function (c) {
      var i = complaints.indexOf(c), isNew = c.status === 'Received';
      var cat = isNew
        ? '<label class="visually-hidden" for="cat-' + i + '">Category for ' + c.id + '</label><select class="inline-select" id="cat-' + i + '" data-cat="' + i + '">' +
            CATEGORIES.map(function (k) { return '<option' + (k === c.cat ? ' selected' : '') + '>' + k + '</option>'; }).join('') + '</select>'
        : S.esc(c.cat);
      var auth = isNew
        ? '<div class="forward-cell"><label class="visually-hidden" for="to-' + i + '">Forward ' + c.id + ' to</label><select id="to-' + i + '">' +
            Object.keys(AUTH_NAMES).map(function (k) { return '<option value="' + k + '"' + (k === ROUTE[c.cat] ? ' selected' : '') + '>' + AUTH_NAMES[k] + '</option>'; }).join('') +
            '</select><button class="btn btn-sm btn-primary" type="button" data-forward="' + i + '">Forward</button></div>'
        : AUTH_NAMES[c.to] + '<span class="sub">' + (isOverdue(c) ? '<span class="due-late">Overdue, forwarded ' + S.fmtDate(c.forwarded) + '</span>' : 'Forwarded ' + S.fmtDate(c.forwarded)) + '</span>';
      return '<tr>' +
        '<td class="id">' + c.id + '</td>' +
        '<td>' + S.esc(c.text) + '<span class="sub">' + S.esc(c.road) + ' · ' + c.station + ' ' + S.esc(S.stationName(c.station)) + '</span></td>' +
        '<td>' + cat + '</td>' +
        '<td class="nowrap">' + S.fmtDate(c.received) + '</td>' +
        '<td>' + S.pill(c.status) + '</td>' +
        '<td class="actions">' + auth + '</td>' +
      '</tr>';
    }).join('') : '<tr class="empty-row"><td colspan="6">' + (status === 'Received' ? 'All new complaints have been forwarded.' : 'No complaints match this filter.') + '</td></tr>';
  }
  F('review-rows').addEventListener('change', function (e) {
    var sel = e.target.closest('[data-cat]');
    if (!sel) return;
    var i = +sel.getAttribute('data-cat');
    complaints[i].cat = sel.value;
    F('to-' + i).value = ROUTE[sel.value];   // update the suggested authority
  });
  F('review-rows').addEventListener('click', function (e) {
    var b = e.target.closest('[data-forward]');
    if (!b) return;
    var c = complaints[+b.getAttribute('data-forward')];
    c.to = F('to-' + b.getAttribute('data-forward')).value;
    c.status = 'Forwarded';
    c.forwarded = '2026-11-13';
    renderReview(); renderStats(); renderDashboard();
    S.toast(c.id + ' forwarded to ' + AUTH_NAMES[c.to] + '. They have 3 days to respond.');
  });
  F('r-status').addEventListener('change', renderReview);
  F('r-search').addEventListener('input', renderReview);

  // ---------- FR14: response dashboard ----------
  function bar(label, value, max, text, late) {
    return '<li class="bar-row"><strong>' + label + '</strong>' +
      '<div class="bar-track" role="img" aria-label="' + label + ': ' + text + '"><span class="bar-fill' + (late ? ' is-late' : '') + '" style="width:' + Math.max(2, value / max * 100) + '%"></span>' +
      (late != null && max ? '<span class="bar-target" style="left:' + (TARGET_HOURS / max * 100) + '%"></span>' : '') + '</div>' +
      '<span class="bar-value">' + text + '</span></li>';
  }
  function renderDashboard() {
    var keys = Object.keys(AUTH_NAMES);
    var stats = keys.map(function (k) {
      var list = complaints.filter(function (c) { return c.to === k; });
      return { k: k, list: list, avg: avgHours(list) };
    });
    var max = Math.max(TARGET_HOURS * 1.4, Math.max.apply(null, stats.map(function (s) { return s.avg || 0; })));
    F('response-bars').innerHTML = stats.map(function (s) {
      return s.avg == null ? bar(AUTH_NAMES[s.k], 0, max, 'No replies', false) : bar(AUTH_NAMES[s.k], s.avg, max, s.avg + ' h', s.avg > TARGET_HOURS);
    }).join('');
    F('authority-rows').innerHTML = stats.map(function (s) {
      var n = function (st) { return s.list.filter(function (c) { return c.status === st; }).length; };
      var late = s.list.filter(isOverdue).length;
      return '<tr><td><strong>' + AUTH_NAMES[s.k] + '</strong></td><td>' + s.list.length + '</td><td>' + n('Forwarded') + '</td><td>' + (late ? '<span class="due-late">' + late + '</span>' : '0') + '</td><td>' + n('Resolved') + '</td></tr>';
    }).join('');
    var counts = CATEGORIES.map(function (k) { return [k, complaints.filter(function (c) { return c.cat === k; }).length]; })
      .filter(function (x) { return x[1]; }).sort(function (a, b) { return b[1] - a[1]; });
    var top = counts.length ? counts[0][1] : 1;
    F('category-bars').innerHTML = counts.map(function (x) { return bar(x[0], x[1], top, String(x[1]), null); }).join('');
  }

  // ---------- FR15: accounts and roles ----------
  function roleSelect(u, i) {
    return '<label class="visually-hidden" for="role-' + i + '">Role for ' + S.esc(u.name) + '</label><select class="inline-select" id="role-' + i + '" data-role="' + i + '">' +
      Object.keys(ROLE_GROUPS).map(function (g) {
        return '<optgroup label="' + g + '">' + ROLE_GROUPS[g].map(function (r) { return '<option' + (r === u.role ? ' selected' : '') + '>' + r + '</option>'; }).join('') + '</optgroup>';
      }).join('') + '</select>';
  }
  function renderAccounts() {
    F('request-rows').innerHTML = requests.length ? requests.map(function (r, i) {
      return '<tr><td><strong>' + S.esc(r.name) + '</strong><span class="sub">' + S.esc(r.email) + '</span></td><td>' + S.esc(r.org) + '</td><td>' + r.role + '<span class="sub">Authority</span></td><td>' + S.fmtDate(r.date) + '</td>' +
        '<td class="actions"><button class="btn btn-sm btn-primary" type="button" data-approve="' + i + '">Approve</button><button class="btn btn-sm btn-outline" type="button" data-reject="' + i + '">Reject</button></td></tr>';
    }).join('') : '<tr class="empty-row"><td colspan="5">No account requests waiting.</td></tr>';

    var type = F('u-type').value, q = F('u-search').value.trim().toLowerCase();
    var list = users.filter(function (u) { return (type === 'all' || typeOf(u.role) === type) && (!q || (u.name + ' ' + u.email).toLowerCase().indexOf(q) !== -1); });
    F('user-rows').innerHTML = list.length ? list.map(function (u) {
      var i = users.indexOf(u), on = u.status === 'Active';
      return '<tr><td><strong>' + S.esc(u.name) + '</strong><span class="sub">' + S.esc(u.email) + '</span></td><td>' + roleSelect(u, i) + '<span class="sub">' + typeOf(u.role) + '</span></td><td>' + S.fmtDate(u.last) + '</td><td>' + statePill(u.status) + '</td>' +
        '<td class="actions"><button class="btn btn-sm btn-outline" type="button" data-toggle="' + i + '">' + (on ? 'Suspend' : 'Reactivate') + '</button></td></tr>';
    }).join('') : '<tr class="empty-row"><td colspan="5">No users match.</td></tr>';
  }
  F('request-rows').addEventListener('click', function (e) {
    var a = e.target.closest('[data-approve]'), r = e.target.closest('[data-reject]');
    if (a) {
      var req = requests.splice(+a.getAttribute('data-approve'), 1)[0];
      users.unshift({ name: req.name, email: req.email, role: req.role, last: '2026-11-13', status: 'Active' });
      S.toast(req.name + ' approved as ' + req.role + '. A log-in email has been sent.');
    }
    if (r) {
      var rej = requests.splice(+r.getAttribute('data-reject'), 1)[0];
      S.toast('Request from ' + rej.name + ' rejected.');
    }
    if (a || r) { renderAccounts(); renderStats(); }
  });
  F('user-rows').addEventListener('change', function (e) {
    var sel = e.target.closest('[data-role]');
    if (!sel) return;
    var u = users[+sel.getAttribute('data-role')];
    u.role = sel.value;
    renderAccounts();
    S.toast(u.name + ' is now ' + u.role + '.');
  });
  F('user-rows').addEventListener('click', function (e) {
    var b = e.target.closest('[data-toggle]');
    if (!b) return;
    var u = users[+b.getAttribute('data-toggle')];
    u.status = u.status === 'Active' ? 'Suspended' : 'Active';
    renderAccounts(); renderStats();
    S.toast(u.name + (u.status === 'Active' ? ' reactivated.' : ' suspended and logged out.'));
  });
  F('u-type').addEventListener('change', renderAccounts);
  F('u-search').addEventListener('input', renderAccounts);

  // ---------- FR15: published content ----------
  function renderContent() {
    var st = F('p-status').value;
    var list = content.filter(function (c) { return st === 'all' || c.status === st; });
    F('content-rows').innerHTML = list.length ? list.map(function (c) {
      var i = content.indexOf(c), t = TAGS[c.type], btns = '';
      if (c.status === 'Pending review') btns = '<button class="btn btn-sm btn-primary" type="button" data-approve-post="' + i + '">Approve</button>';
      if (c.status !== 'Removed') btns += '<button class="btn btn-sm btn-outline" type="button" data-edit="' + i + '">Edit</button><button class="btn btn-sm btn-outline" type="button" data-remove="' + i + '">Remove</button>';
      else btns = '<button class="btn btn-sm btn-outline" type="button" data-restore="' + i + '">Restore</button>';
      return '<tr><td><span class="tag ' + t[0] + '">' + t[1] + '</span><br><strong>' + S.esc(c.title) + '</strong><span class="sub">' + S.esc(c.body) + '</span></td>' +
        '<td>' + c.by + '</td><td>' + S.fmtDate(c.date) + '</td><td>' + statePill(c.status) + '</td><td class="actions">' + btns + '</td></tr>';
    }).join('') : '<tr class="empty-row"><td colspan="5">Nothing here.</td></tr>';
  }
  var editing = null, dlg = F('edit-dialog');
  F('content-rows').addEventListener('click', function (e) {
    var t = e.target.closest('button');
    if (!t) return;
    var get = function (attr) { return content[+t.getAttribute(attr)]; };
    if (t.hasAttribute('data-approve-post')) { var a = get('data-approve-post'); a.status = 'Published'; S.toast('Approved. "' + a.title + '" is now public.'); }
    if (t.hasAttribute('data-remove')) { var r = get('data-remove'); r.status = 'Removed'; S.toast('Removed from the public site. You can restore it later.'); }
    if (t.hasAttribute('data-restore')) { var s = get('data-restore'); s.status = 'Published'; S.toast('Restored to the public site.'); }
    if (t.hasAttribute('data-edit')) {
      editing = get('data-edit');
      F('ed-sub').textContent = 'Posted by ' + editing.by + ' on ' + S.fmtDate(editing.date);
      F('ed-head').value = editing.title; F('ed-body').value = editing.body; F('ed-note').value = '';
      F('ed-head-field').classList.remove('has-error'); F('ed-error').hidden = true;
      dlg.showModal();
      return;
    }
    renderContent(); renderStats();
  });
  F('edit-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var head = F('ed-head').value.trim();
    if (!head) { F('ed-head-field').classList.add('has-error'); F('ed-error').hidden = false; F('ed-head').focus(); return; }
    editing.title = head; editing.body = F('ed-body').value.trim(); editing.status = 'Published';
    dlg.close();
    renderContent(); renderStats();
    S.toast('Changes saved and published.' + (F('ed-note').value.trim() ? ' Note sent to ' + editing.by + '.' : ''));
  });
  F('p-status').addEventListener('change', renderContent);

  // ---------- Switch administrator role ----------
  function renderRole() {
    var a = ADMINS[role];
    F('who-initials').textContent = a.initials; F('who-name').textContent = a.name; F('who-role').textContent = a.role;
    ['review', 'dashboard', 'accounts', 'content'].forEach(function (t) { F('tab-' + t).hidden = a.tabs.indexOf(t) === -1; });
    F('tab-' + a.tabs[0]).click();
    renderStats();
  }
  F('role').addEventListener('change', function (e) { role = e.target.value; renderRole(); });

  S.initTabs(F('admin-tabs'));
  renderReview(); renderDashboard(); renderAccounts(); renderContent();
  renderRole();
})();
