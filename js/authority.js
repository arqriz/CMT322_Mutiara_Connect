// Mutiara Connect – Authority Portal (F4: FR10 to FR12).
// Part A prototype: sample data in the browser, nothing is saved to a server.

(function () {
  var S = Staff;

  // ---------- Who is signed in (switch with "View as") ----------
  var AUTHORITIES = {
    contractor: { initials: 'CT', name: 'Mutiara Line Contractor', role: 'Contractor · Site team, Gelugor to Bukit Jambul' },
    police:     { initials: 'SP', name: 'Penang Traffic Police',   role: 'State Police · Traffic branch, Timur Laut district' },
    state:      { initials: 'SG', name: 'Penang State Government', role: 'State Government · Infrastructure and Transport' }
  };

  // ---------- Sample data ----------
  var complaints = [
    { id: 'MC-2026-04790', to: 'contractor', concern: 'Damaged road', text: 'Potholes on the left lane after last week\'s night works. Two motorcycles nearly fell.', road: 'Lim Chong Eu Expressway', station: 'S15', reporter: 'Tan K. L.', received: '2026-11-02', forwarded: '2026-11-03', status: 'Forwarded',
      history: [['2 Nov 2026, 8.15 pm', 'Report received'], ['3 Nov 2026, 9.05 am', 'Forwarded to Contractor by Admin (Nurul A.)']] },
    { id: 'MC-2026-04822', to: 'contractor', concern: 'Dust', text: 'Dust from the site covers our shop fronts every afternoon. Please water the road more often.', road: 'Jalan Tengah', station: 'S07', reporter: 'Lim S. Y.', received: '2026-11-10', forwarded: '2026-11-10', status: 'Forwarded',
      history: [['10 Nov 2026, 10.20 am', 'Report received'], ['10 Nov 2026, 2.40 pm', 'Forwarded to Contractor by Admin (Nurul A.)']] },
    { id: 'MC-2026-04835', to: 'contractor', concern: 'Blocked entrance', text: 'New hoarding blocks the side entrance to the clinic. Wheelchair users cannot get in.', road: 'Jalan Tun Dr Awang', station: 'S09', reporter: 'Muthu S.', received: '2026-11-11', forwarded: '2026-11-12', status: 'Forwarded',
      history: [['11 Nov 2026, 4.55 pm', 'Report received'], ['12 Nov 2026, 9.30 am', 'Forwarded to Contractor by Admin (Hafiz R.)']] },
    { id: 'MC-2026-04817', to: 'contractor', concern: 'Noise at night', text: 'Piling noise continues after midnight near Sunny Point. Children cannot sleep.', road: 'Jalan Sultan Azlan Shah', station: 'S14', reporter: 'Aisyah R.', received: '2026-11-08', forwarded: '2026-11-09', status: 'In action',
      history: [['8 Nov 2026, 11.42 pm', 'Report received'], ['9 Nov 2026, 9.10 am', 'Forwarded to Contractor by Admin (Nurul A.)'], ['10 Nov 2026, 3.00 pm', 'Contractor: Noisy works will stop at 11.00 pm from 11 Nov. Noise barriers being installed.']] },
    { id: 'MC-2026-04761', to: 'contractor', concern: 'Unsafe walkway', text: 'Temporary walkway has a loose steel plate.', road: 'Jalan Sultan Azlan Shah', station: 'S13', reporter: 'Goh P. H.', received: '2026-10-27', forwarded: '2026-10-27', status: 'Resolved',
      history: [['27 Oct 2026, 7.30 am', 'Report received'], ['27 Oct 2026, 10.00 am', 'Forwarded to Contractor by Admin (Hafiz R.)'], ['28 Oct 2026, 1.15 pm', 'Contractor: Steel plate fixed and checked. Thank you for reporting.']] },

    { id: 'MC-2026-04829', to: 'police', concern: 'Traffic congestion', text: 'No traffic marshal at Sunny Point junction during the evening peak. Queue goes back to the bridge.', road: 'Jalan Sultan Azlan Shah', station: 'S14', reporter: 'Wong C. M.', received: '2026-11-10', forwarded: '2026-11-11', status: 'Forwarded',
      history: [['10 Nov 2026, 6.40 pm', 'Report received'], ['11 Nov 2026, 9.00 am', 'Forwarded to State Police by Admin (Nurul A.)']] },
    { id: 'MC-2026-04803', to: 'police', concern: 'Illegal parking', text: 'Cars parked along the detour road make it a single lane.', road: 'Jalan Universiti', station: 'S13', reporter: 'Siti Z.', received: '2026-11-05', forwarded: '2026-11-06', status: 'In action',
      history: [['5 Nov 2026, 8.10 am', 'Report received'], ['6 Nov 2026, 9.20 am', 'Forwarded to State Police by Admin (Hafiz R.)'], ['7 Nov 2026, 11.00 am', 'State Police: Daily patrols added from 8 Nov.']] },
    { id: 'MC-2026-04770', to: 'police', concern: 'Traffic light fault', text: 'Temporary traffic light stuck on red.', road: 'Jalan Tengah', station: 'S07', reporter: 'Ravi K.', received: '2026-10-30', forwarded: '2026-10-30', status: 'Resolved',
      history: [['30 Oct 2026, 7.50 am', 'Report received'], ['30 Oct 2026, 8.30 am', 'Forwarded to State Police by Admin (Nurul A.)'], ['30 Oct 2026, 10.45 am', 'State Police: Officer sent to direct traffic, light repaired.']] },

    { id: 'MC-2026-04840', to: 'state', concern: 'Business impact', text: 'Customers cannot park near our row of shops since the lane closure. Is there any support for affected businesses?', road: 'Jalan Tengah', station: 'S07', reporter: 'Chong B. K.', received: '2026-11-12', forwarded: '2026-11-13', status: 'Forwarded',
      history: [['12 Nov 2026, 5.05 pm', 'Report received'], ['13 Nov 2026, 9.15 am', 'Forwarded to State Government by Admin (Nurul A.)']] },
    { id: 'MC-2026-04811', to: 'state', concern: 'Detour signage', text: 'Detour signs are only in English. Older residents are confused.', road: 'Jalan Sultan Azlan Shah', station: 'S06', reporter: 'Halim M.', received: '2026-11-07', forwarded: '2026-11-07', status: 'In action',
      history: [['7 Nov 2026, 9.00 am', 'Report received'], ['7 Nov 2026, 11.30 am', 'Forwarded to State Government by Admin (Hafiz R.)'], ['9 Nov 2026, 4.00 pm', 'State Government: Bilingual signs approved, to be installed by 20 Nov.']] }
  ];

  var notices = [
    { id: 'n1', by: 'contractor', type: 'closure', title: 'Night closures on Jalan Sultan Azlan Shah, Sunny Point junction to USM field', start: '2026-11-13', end: '2027-01-31', hours: '10.00 pm to 5.00 am', work: 'Tree felling', station: 'S13', detour: 'Use Jalan Tun Dr Awang instead.' },
    { id: 'n2', by: 'contractor', type: 'lane', title: 'Short-term night lane closure on Jalan Sultan Azlan Shah near Gelugor', start: '2026-11-16', end: '2026-11-20', hours: '10.00 pm to 5.00 am', work: 'Tree cutting', station: 'S14', detour: '' },
    { id: 'n3', by: 'contractor', type: 'lane', title: 'Daytime lane closures on Jalan Tengah, between the Jalan Tengah apartments and Bayan Baru fire station', start: '2026-11-09', end: '2027-01-31', hours: '9.00 am to 5.00 pm', work: 'Road widening and drain diversion', station: 'S07', detour: '' },
    { id: 'n5', by: 'contractor', type: 'walk', title: 'Footpath moved to the opposite side of Jalan Tun Dr Awang near Bukit Jambul', start: '2026-11-02', end: '2026-12-18', hours: 'All day', work: 'Pier foundation works', station: 'S09', detour: 'Cross at the signalised crossing beside the petrol station.' },
    { id: 'n7', by: 'police', type: 'closure', title: 'Right turn into Jalan Gelugor closed during evening peak', start: '2026-11-11', end: '2026-12-31', hours: '5.00 pm to 8.00 pm', work: 'Traffic management for night works', station: 'S14', detour: 'Turn right at the next junction and use Jalan Bukit Gambir.' },
    { id: 'n4', by: 'state', type: 'business', title: 'Temporary parking for Jalan Tengah shops at the Bayan Baru market lot', start: '2026-11-15', end: '2027-01-31', hours: 'All day', work: 'Business access support', station: 'S07', detour: '' }
  ];

  var works = [
    { by: 'contractor', activity: 'Tree felling', station: 'S13', start: '2026-11-13', end: '2027-01-31', hours: '10.00 pm to 5.00 am', status: 'Ongoing' },
    { by: 'contractor', activity: 'Pier foundation works', station: 'S09', start: '2026-11-02', end: '2026-12-18', hours: '8.00 am to 7.00 pm', status: 'Ongoing' },
    { by: 'contractor', activity: 'Drain diversion', station: 'S07', start: '2026-11-09', end: '2027-01-31', hours: '9.00 am to 5.00 pm', status: 'Ongoing' },
    { by: 'contractor', activity: 'Bored piling', station: 'S14', start: '2026-12-01', end: '2027-02-28', hours: '8.00 am to 11.00 pm', status: 'Planned' },
    { by: 'contractor', activity: 'Site clearance', station: 'S06', start: '2026-10-01', end: '2026-10-31', hours: '8.00 am to 6.00 pm', status: 'Completed' },
    { by: 'police', activity: 'Traffic marshals at Sunny Point junction', station: 'S14', start: '2026-11-11', end: '2026-12-31', hours: '5.00 pm to 8.00 pm', status: 'Ongoing' },
    { by: 'police', activity: 'Heavy vehicle checks on the detour route', station: 'S13', start: '2026-11-20', end: '2026-11-30', hours: '10.00 pm to 2.00 am', status: 'Planned' },
    { by: 'state', activity: 'Public engagement session, Gelugor', station: 'S14', start: '2026-11-22', end: '2026-11-22', hours: '10.00 am to 1.00 pm', status: 'Planned' },
    { by: 'state', activity: 'Bilingual detour signs installation', station: 'S06', start: '2026-11-14', end: '2026-11-20', hours: '9.00 am to 5.00 pm', status: 'Ongoing' }
  ];

  var role = 'contractor';
  var mine = function (list, key) { return list.filter(function (x) { return x[key] === role; }); };

  // ---------- Header bar + stats ----------
  function renderWho() {
    var a = AUTHORITIES[role];
    document.getElementById('who-initials').textContent = a.initials;
    document.getElementById('who-name').textContent = a.name;
    document.getElementById('who-role').textContent = a.role;
  }
  function renderStats() {
    var c = mine(complaints, 'to');
    var count = function (st) { return c.filter(function (x) { return x.status === st; }).length; };
    document.getElementById('st-new').textContent = count('Forwarded');
    document.getElementById('st-action').textContent = count('In action');
    document.getElementById('st-resolved').textContent = count('Resolved');
    document.getElementById('tab-count').textContent = count('Forwarded');
    document.getElementById('st-notices').textContent = mine(notices, 'by').filter(function (n) { return !n.ended; }).length;
  }

  // ---------- FR12: complaints ----------
  var REPLY_DAYS = 3;
  function dueText(c) {
    if (c.status !== 'Forwarded') return '<span class="sub">Replied</span>';
    var left = REPLY_DAYS - S.daysSince(c.forwarded);
    if (left < 0) return '<span class="due-late">Overdue ' + (-left) + (left === -1 ? ' day' : ' days') + '</span>';
    if (left === 0) return '<span class="due-soon">Due today</span>';
    return 'In ' + left + (left === 1 ? ' day' : ' days');
  }
  function renderComplaints() {
    var status = document.getElementById('c-status').value;
    var q = document.getElementById('c-search').value.trim().toLowerCase();
    var rows = mine(complaints, 'to').filter(function (c) {
      var okStatus = status === 'all' || (status === 'open' ? c.status !== 'Resolved' : c.status === status);
      var okText = !q || (c.id + ' ' + c.concern + ' ' + c.road).toLowerCase().indexOf(q) !== -1;
      return okStatus && okText;
    });
    // Waiting first, then oldest forwarded first.
    rows.sort(function (a, b) { return (a.status === 'Forwarded' ? 0 : 1) - (b.status === 'Forwarded' ? 0 : 1) || a.forwarded.localeCompare(b.forwarded); });
    document.getElementById('complaint-rows').innerHTML = rows.length ? rows.map(function (c) {
      return '<tr>' +
        '<td class="id">' + c.id + '</td>' +
        '<td>' + S.esc(c.concern) + '<span class="sub">Reported by ' + S.esc(c.reporter) + '</span></td>' +
        '<td>' + S.esc(c.road) + '<span class="sub">' + c.station + ' ' + S.esc(S.stationName(c.station)) + '</span></td>' +
        '<td class="nowrap">' + S.fmtDate(c.forwarded) + '</td>' +
        '<td>' + dueText(c) + '</td>' +
        '<td>' + S.pill(c.status) + '</td>' +
        '<td class="actions"><button class="btn btn-sm ' + (c.status === 'Resolved' ? 'btn-outline' : 'btn-primary') + '" type="button" data-open="' + c.id + '">' + (c.status === 'Resolved' ? 'View' : 'View &amp; respond') + '</button></td>' +
      '</tr>';
    }).join('') : '<tr class="empty-row"><td colspan="7">No complaints match this filter.</td></tr>';
  }

  var dialog = document.getElementById('respond-dialog');
  var current = null;
  function openComplaint(id) {
    current = complaints.filter(function (c) { return c.id === id; })[0];
    if (!current) return;
    var done = current.status === 'Resolved';
    document.getElementById('rd-title').textContent = (done ? 'Complaint ' : 'Official response to ') + current.id;
    document.getElementById('rd-sub').textContent = current.concern + ' · ' + current.road;
    document.getElementById('rd-steps').innerHTML = S.steps(current.status);
    document.getElementById('rd-details').innerHTML =
      '<dt>Concern</dt><dd>' + S.esc(current.concern) + '</dd>' +
      '<dt>Location</dt><dd>' + S.esc(current.road) + '</dd>' +
      '<dt>Nearest station</dt><dd>' + S.stationChip(current.station) + '</dd>' +
      '<dt>Reported</dt><dd>' + S.fmtDate(current.received) + ' by ' + S.esc(current.reporter) + '</dd>' +
      '<dt>Forwarded</dt><dd>' + S.fmtDate(current.forwarded) + '</dd>';
    document.getElementById('rd-text').textContent = '“' + current.text + '”';
    document.getElementById('rd-history').innerHTML = current.history.slice().reverse().map(function (h) {
      return '<li><time>' + h[0] + '</time>' + S.esc(h[1]) + '</li>';
    }).join('');
    // Resolved complaints are read-only.
    document.getElementById('rd-status').closest('.field').hidden = done;
    document.getElementById('rd-reply-field').hidden = done;
    dialog.querySelector('[value="save"]').hidden = done;
    document.getElementById('rd-status').value = current.status === 'In action' ? 'Resolved' : 'In action';
    document.getElementById('rd-reply').value = '';
    setReplyError(false);
    dialog.showModal();
  }
  function setReplyError(on) {
    document.getElementById('rd-reply-field').classList.toggle('has-error', on);
    document.getElementById('rd-error').hidden = !on;
  }
  document.getElementById('complaint-rows').addEventListener('click', function (e) {
    var b = e.target.closest('[data-open]');
    if (b) openComplaint(b.getAttribute('data-open'));
  });
  document.getElementById('respond-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var reply = document.getElementById('rd-reply').value.trim();
    if (!reply) { setReplyError(true); document.getElementById('rd-reply').focus(); return; }
    var status = document.getElementById('rd-status').value;
    current.status = status;
    current.history.push([S.stamp(), AUTHORITIES[role].name.replace(/^Penang |^Mutiara Line /, '') + ': ' + reply]);
    dialog.close();
    renderComplaints(); renderStats();
    S.toast(current.id + ' updated to ' + status + '. The reporter can now read your official response.');
  });
  document.getElementById('c-status').addEventListener('change', renderComplaints);
  document.getElementById('c-search').addEventListener('input', renderComplaints);

  // ---------- FR10: closures and road conditions ----------
  var TAGS = { closure: ['tag-closure', 'Partial road closure'], lane: ['tag-lane', 'Lane closure'], walk: ['tag-walk', 'Pedestrian diversion'], business: ['tag-business', 'Business access change'] };
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function renderNotices() {
    var list = mine(notices, 'by');
    document.getElementById('notice-list').innerHTML = list.length ? list.map(function (n) {
      var d = new Date(n.start + 'T00:00:00'), t = TAGS[n.type];
      return '<li class="notice' + (n.ended ? ' is-ended' : '') + '">' +
        '<div class="date-block" aria-hidden="true"><span class="d">' + d.getDate() + '</span><span class="m">' + MON[d.getMonth()] + '</span><span class="y">' + d.getFullYear() + '</span></div>' +
        '<div><span class="tag ' + t[0] + '">' + t[1] + '</span>' + (n.ended ? ' <span class="pill pill-received">Lifted</span>' : '') +
          '<h3>' + S.esc(n.title) + '</h3>' +
          '<dl class="notice-meta"><div><dt>Dates</dt><dd>' + S.fmtDate(n.start) + ' to ' + S.fmtDate(n.end) + '</dd></div><div><dt>Hours</dt><dd>' + S.esc(n.hours) + '</dd></div><div><dt>Work</dt><dd>' + S.esc(n.work) + '</dd></div></dl>' +
          (n.detour ? '<p class="notice-meta"><span><strong>Detour:</strong> ' + S.esc(n.detour) + '</span></p>' : '') +
          '<div class="notice-places">' + S.stationChip(n.station) + '</div></div>' +
        '<div class="notice-actions">' + (n.ended ? '' :
          '<button class="btn btn-sm btn-outline" type="button" data-edit="' + n.id + '">Edit</button>' +
          '<button class="btn btn-sm btn-outline" type="button" data-end="' + n.id + '">Lift now</button>') + '</div>' +
      '</li>';
    }).join('') : '<li class="notice"><p class="filter-count">You have not posted any notices yet.</p></li>';
  }
  var nf = document.getElementById('notice-form');
  var F = function (id) { return document.getElementById(id); };
  function resetNoticeForm() {
    nf.reset(); F('n-id').value = ''; F('n-station').value = 'S14';
    F('notice-form-title').textContent = CLOSURE_TEXT[role][2];
    F('notice-submit').textContent = 'Publish notice';
    F('notice-cancel').hidden = true; F('notice-error').hidden = true;
    nf.querySelectorAll('.field').forEach(function (f) { f.classList.remove('has-error'); });
  }
  document.getElementById('notice-list').addEventListener('click', function (e) {
    var edit = e.target.closest('[data-edit]'), end = e.target.closest('[data-end]');
    if (edit) {
      var n = notices.filter(function (x) { return x.id === edit.getAttribute('data-edit'); })[0];
      F('n-id').value = n.id; F('n-type').value = n.type; F('n-title').value = n.title; F('n-start').value = n.start; F('n-end').value = n.end;
      F('n-hours').value = n.hours; F('n-station').value = n.station; F('n-work').value = n.work; F('n-detour').value = n.detour;
      F('notice-form-title').textContent = 'Update notice';
      F('notice-submit').textContent = 'Save changes';
      F('notice-cancel').hidden = false;
      F('n-title').focus();
    }
    if (end) {
      var m = notices.filter(function (x) { return x.id === end.getAttribute('data-end'); })[0];
      m.ended = true;
      renderNotices(); renderStats();
      S.toast('Lifted. The notice is no longer shown as active to the public.');
    }
  });
  F('notice-cancel').addEventListener('click', resetNoticeForm);
  nf.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = false;
    ['n-title', 'n-start', 'n-end', 'n-hours', 'n-work'].forEach(function (id) {
      var empty = !F(id).value.trim();
      F(id).closest('.field').classList.toggle('has-error', empty);
      if (empty) bad = true;
    });
    if (!bad && F('n-end').value < F('n-start').value) { F('n-end').closest('.field').classList.add('has-error'); bad = true; }
    F('notice-error').hidden = !bad;
    if (bad) return;
    var data = { type: F('n-type').value, title: F('n-title').value.trim(), start: F('n-start').value, end: F('n-end').value, hours: F('n-hours').value.trim(), station: F('n-station').value, work: F('n-work').value.trim(), detour: F('n-detour').value.trim() };
    var id = F('n-id').value;
    if (id) {
      var n = notices.filter(function (x) { return x.id === id; })[0];
      for (var k in data) n[k] = data[k];
      S.toast('Notice updated on Closures & Detours.');
    } else {
      data.id = 'n' + Date.now(); data.by = role;
      notices.unshift(data);
      S.toast('Notice published to Closures & Detours and the homepage.');
    }
    resetNoticeForm(); renderNotices(); renderStats();
  });

  // ---------- FR11: works schedule ----------
  var WORK_PILL = { Planned: 'pill-planned', Ongoing: 'pill-action', Completed: 'pill-resolved' };
  function renderWorks() {
    var list = mine(works, 'by');
    document.getElementById('schedule-rows').innerHTML = list.map(function (w) {
      var i = works.indexOf(w);
      return '<tr>' +
        '<td><strong>' + S.esc(w.activity) + '</strong><span class="sub">' + w.station + ' ' + S.esc(S.stationName(w.station)) + '</span></td>' +
        '<td>' + S.fmtDate(w.start) + (w.end !== w.start ? '<span class="sub">to ' + S.fmtDate(w.end) + '</span>' : '') + '</td>' +
        '<td>' + S.esc(w.hours) + '</td>' +
        '<td><label class="visually-hidden" for="ws-' + i + '">Status of ' + S.esc(w.activity) + '</label>' +
          '<select id="ws-' + i + '" class="inline-select" data-work="' + i + '">' +
          ['Planned', 'Ongoing', 'Completed'].map(function (s) { return '<option' + (s === w.status ? ' selected' : '') + '>' + s + '</option>'; }).join('') +
          '</select> <span class="pill ' + WORK_PILL[w.status] + '">' + w.status + '</span></td>' +
      '</tr>';
    }).join('');
  }
  document.getElementById('schedule-rows').addEventListener('change', function (e) {
    var sel = e.target.closest('[data-work]');
    if (!sel) return;
    var w = works[+sel.getAttribute('data-work')];
    w.status = sel.value;
    renderWorks();
    S.toast('"' + w.activity + '" is now ' + w.status + '.');
  });
  var sf = document.getElementById('schedule-form');
  sf.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = false;
    ['w-activity', 'w-start', 'w-end', 'w-hours'].forEach(function (id) {
      var empty = !F(id).value.trim();
      F(id).closest('.field').classList.toggle('has-error', empty);
      if (empty) bad = true;
    });
    if (!bad && F('w-end').value < F('w-start').value) { F('w-end').closest('.field').classList.add('has-error'); bad = true; }
    F('schedule-error').hidden = !bad;
    if (bad) return;
    works.unshift({ by: role, activity: F('w-activity').value.trim(), station: F('w-station').value, start: F('w-start').value, end: F('w-end').value, hours: F('w-hours').value.trim(), status: F('w-status').value });
    sf.reset(); F('w-station').value = 'S14';
    renderWorks();
    S.toast('Work added to the public Works Schedule.');
  });

  // ---------- Switch authority ----------
  // Each authority only sees the tools its requirements give it:
  // Contractor FR10 (road conditions, works schedule), State Police FR11 (closures and diversions),
  // State Government FR12 (complaints). Every authority can answer complaints assigned to it.
  var TABS = { contractor: ['complaints', 'closures', 'schedule'], police: ['complaints', 'closures'], state: ['complaints'] };
  var CLOSURE_TEXT = {
    contractor: ['Road conditions', 'Your road condition notices', 'Post a road condition update'],
    police: ['Closures & diversions', 'Your closures and diversions', 'Create a closure or diversion'],
    state: ['Closures', 'Your notices', 'Post a notice']
  };
  function renderTabs() {
    var allowed = TABS[role];
    ['complaints', 'closures', 'schedule'].forEach(function (t) { document.getElementById('tab-' + t).hidden = allowed.indexOf(t) === -1; });
    var txt = CLOSURE_TEXT[role];
    document.getElementById('tab-closures-label').textContent = txt[0];
    document.getElementById('closures-heading').textContent = txt[1];
    document.getElementById('notice-form-title').textContent = txt[2];
    document.getElementById('tab-complaints').click();
  }
  function renderAll() { renderWho(); resetNoticeForm(); renderTabs(); renderStats(); renderComplaints(); renderNotices(); renderWorks(); }
  document.getElementById('role').addEventListener('change', function (e) { role = e.target.value; renderAll(); });

  S.initTabs(document.getElementById('work-tabs'));
  renderAll();
})();
