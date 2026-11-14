// Log In / Register: tabs, show password, form checks and staff sign-in.
(function () {
  var EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  var staff = false;

  function openTab(which) {
    ['login', 'register'].forEach(function (t) {
      document.getElementById('tab-' + t).setAttribute('aria-selected', t === which ? 'true' : 'false');
      document.getElementById(t + '-panel').hidden = t !== which;
    });
  }
  document.getElementById('tab-login').addEventListener('click', function () { openTab('login'); });
  document.getElementById('tab-register').addEventListener('click', function () { openTab('register'); });

  document.querySelectorAll('[data-show]').forEach(function (b) {
    b.addEventListener('click', function () {
      var input = document.getElementById(b.getAttribute('data-show'));
      var hidden = input.type === 'password';
      input.type = hidden ? 'text' : 'password';
      b.textContent = hidden ? 'Hide' : 'Show';
    });
  });

  function mark(id, bad) { document.getElementById(id).closest('.field').classList.toggle('has-error', bad); }
  function say(el, text, ok) { el.textContent = text; el.className = 'form-msg ' + (ok ? 'ok' : 'err'); el.hidden = false; }

  // Staff log in shows the role choice
  document.getElementById('staff-toggle').addEventListener('click', function () {
    staff = !staff;
    document.getElementById('staff-role-field').hidden = !staff;
    document.getElementById('staff-note').hidden = !staff;
    this.textContent = staff ? 'Back to public log in' : 'Staff log in (Authority and Administrator)';
    document.getElementById('tab-register').disabled = staff;
  });

  document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('login-email').value.trim();
    var pw = document.getElementById('login-pw').value;
    var badEmail = !EMAIL.test(email), badPw = pw.length < 8;
    mark('login-email', badEmail); mark('login-pw', badPw);
    var msg = document.getElementById('login-msg');
    if (badEmail || badPw) { say(msg, badEmail ? 'Enter the email address you registered with.' : 'Your password has at least 8 characters.', false); return; }
    try { localStorage.setItem('mc-user', JSON.stringify({ name: email.split('@')[0], email: email })); } catch (err) { /* ignore */ }
    if (staff) {
      var role = document.getElementById('staff-role').value;
      say(msg, 'Signed in. Opening your portal…', true);
      setTimeout(function () { location.href = role === 'admin' ? 'admin.html' : 'authority.html?role=' + role; }, 600);
    } else {
      say(msg, 'Signed in. Opening My Reports…', true);
      setTimeout(function () { location.href = 'track.html'; }, 600);
    }
  });

  document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('reg-name').value.trim();
    var email = document.getElementById('reg-email').value.trim();
    var pw = document.getElementById('reg-pw').value;
    var pw2 = document.getElementById('reg-pw2').value;
    var problems = [];
    mark('reg-name', name.length < 3); if (name.length < 3) problems.push('your full name');
    mark('reg-email', !EMAIL.test(email)); if (!EMAIL.test(email)) problems.push('a valid email address');
    mark('reg-pw', pw.length < 8); if (pw.length < 8) problems.push('a password of at least 8 characters');
    mark('reg-pw2', pw2 !== pw || !pw2); if (pw2 !== pw || !pw2) problems.push('the same password twice');
    if (!document.getElementById('reg-agree').checked) problems.push('your agreement to the data notice');
    var msg = document.getElementById('reg-msg');
    if (problems.length) { say(msg, 'Add ' + problems.join(', ') + '.', false); return; }
    try { localStorage.setItem('mc-user', JSON.stringify({ name: name, email: email })); } catch (err) { /* ignore */ }
    this.reset();
    msg.hidden = true;
    openTab('login');
    document.getElementById('login-email').value = email;
    say(document.getElementById('login-msg'), 'Account created for ' + name + '. Log in to report a concern.', true);
    document.getElementById('login-pw').focus();
  });
})();
