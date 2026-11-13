// Mutiara Connect – shared script for every page.

// 1. Highlight the current page in the main nav.
//    Each page sets <body data-page="..."> to match a data-nav value.
(function markCurrentPage() {
  var page = document.body.getAttribute('data-page');
  var link = document.querySelector('.main-nav a[data-nav="' + page + '"]');
  if (link) link.setAttribute('aria-current', 'page');
})();

// 2. Mobile menu toggle.
(function navToggle() {
  var btn = document.querySelector('.nav-toggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Close' : 'Menu';
  });
})();

// 3. Language buttons (visual only in Part A).
document.querySelectorAll('.lang-switch button').forEach(function (b) {
  b.addEventListener('click', function () {
    b.parentElement.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    b.setAttribute('aria-pressed', 'true');
  });
});

// 4. Road filter for notice lists (homepage and closures page).
(function roadFilter() {
  var select = document.getElementById('road-filter');
  var list = document.getElementById('notice-list');
  if (!select || !list) return;
  var count = document.getElementById('filter-count');
  var empty = document.getElementById('no-results');
  select.addEventListener('change', function () {
    var shown = 0;
    list.querySelectorAll('.notice').forEach(function (n) {
      var match = select.value === 'all' || n.getAttribute('data-road') === select.value;
      n.hidden = !match;
      if (match) shown++;
    });
    if (count) count.textContent = 'Showing ' + shown + (shown === 1 ? ' notice' : ' notices');
    if (empty) empty.hidden = shown !== 0;
  });
})();

// 5. A+ button: larger text across the page.
(function textSize() {
  var btn = document.querySelector('.text-size');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var on = document.documentElement.classList.toggle('large-text');
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
})();
