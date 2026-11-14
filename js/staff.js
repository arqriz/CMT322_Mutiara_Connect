// Mutiara Connect – helpers shared by the staff pages
// (authority.html and admin.html). Load after main.js.
// Part A prototype: all data is sample data held in the browser.

var Staff = (function () {
  // Escape text before putting it into innerHTML.
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Status pill. Statuses are always Received, Forwarded, In action, Resolved.
  var PILL = { 'Received': 'pill-received', 'Forwarded': 'pill-forwarded', 'In action': 'pill-action', 'Resolved': 'pill-resolved' };
  function pill(status) {
    return '<span class="pill ' + (PILL[status] || 'pill-received') + '">' + esc(status) + '</span>';
  }

  // Four-step progress bar used in the complaint dialog.
  var STEPS = ['Received', 'Forwarded', 'In action', 'Resolved'];
  function steps(status) {
    var at = STEPS.indexOf(status);
    return '<ol class="status-steps">' + STEPS.map(function (s, i) {
      var cls = i < at ? 'done' : (i === at ? (status === 'Resolved' ? 'done' : 'current') : '');
      return '<li class="' + cls + '"' + (i === at ? ' aria-current="step"' : '') + '>' + s + '</li>';
    }).join('') + '</ol>';
  }

  // Dates: "13 Nov 2026"
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmtDate(iso) {
    if (!iso) return '';
    var d = new Date(iso + 'T00:00:00');
    return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  }
  // Prototype "today" so the sample data always reads the same.
  var TODAY = new Date('2026-11-13T00:00:00');
  function daysSince(iso) {
    return Math.round((TODAY - new Date(iso + 'T00:00:00')) / 86400000);
  }
  function stamp() {
    var now = new Date();
    var h = now.getHours(), m = String(now.getMinutes()).padStart(2, '0');
    return '13 Nov 2026, ' + ((h % 12) || 12) + '.' + m + ' ' + (h < 12 ? 'am' : 'pm');
  }

  // Tabs: <div role="tablist"> with .tab buttons controlling .tab-panel sections.
  function initTabs(root) {
    var tabs = root.querySelectorAll('[role="tab"]');
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
        if (next === null) return;
        var target = tabs[(next + tabs.length) % tabs.length];
        target.focus(); select(target);
      });
    });
    select(root.querySelector('[aria-selected="true"]') || tabs[0]);
  }

  // Small confirmation message at the bottom of the screen.
  var toastTimer;
  function toast(msg) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.querySelector('span').textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 3500);
  }

  // Mutiara Line stations, south to north. Fills every <select class="station-select">.
  var STATIONS = [['A01','PSR-A (Silicon Island)'],['S02','Permatang Damar Laut'],['S03','Penang International Airport'],['S04','Sungai Tiram'],['S05','FIZ South'],['S06','FIZ North'],['S07','Jalan Tengah'],['S08','SPICE'],['S09','Bukit Jambul'],['S10','Sungai Nibong'],['S11','Sungai Dua'],['S12','Batu Uban'],['S13','Jalan Universiti'],['S14','Gelugor'],['S15','Penang Waterfront'],['S16','East Jelutong'],['S17','Sungai Pinang'],['S18','Bandar Sri Pinang'],['S19','Macallum'],['S20','KOMTAR'],['S31','Penang Sentral']];
  function stationName(code) {
    for (var i = 0; i < STATIONS.length; i++) if (STATIONS[i][0] === code) return STATIONS[i][1];
    return '';
  }
  function stationChip(code) {
    return '<a class="station" href="closures.html?station=' + code + '"><b>' + code + '</b><span>' + esc(stationName(code)) + '</span></a>';
  }
  document.querySelectorAll('select.station-select').forEach(function (sel) {
    sel.innerHTML = STATIONS.map(function (s) { return '<option value="' + s[0] + '">' + s[0] + ' ' + s[1] + '</option>'; }).join('');
    sel.value = 'S14';
  });

  // Close buttons inside any <dialog>.
  document.querySelectorAll('dialog [data-close]').forEach(function (b) {
    b.addEventListener('click', function () { b.closest('dialog').close(); });
  });

  return { stationName: stationName, stationChip: stationChip, esc: esc, pill: pill, steps: steps, fmtDate: fmtDate, daysSince: daysSince, stamp: stamp, initTabs: initTabs, toast: toast };
})();
