(function () {
  var KEY = 'rb-theme';
  var root = document.documentElement;
  function apply(t) { root.setAttribute('data-theme', t); }
  function storedTheme() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  apply(storedTheme() === 'dark' || storedTheme() === 'light' ? storedTheme() : (mq && mq.matches ? 'dark' : 'light'));

  var toggleBtn = null;
  function updateLabel() {
    if (toggleBtn) toggleBtn.textContent = root.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark';
  }

  // Keep following the OS setting in real time, as long as the user hasn't
  // explicitly overridden it with the toggle button below.
  function onSystemChange(e) {
    var stored = storedTheme();
    if (stored === 'dark' || stored === 'light') return;
    apply(e.matches ? 'dark' : 'light');
    updateLabel();
  }
  if (mq) {
    if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }

  function mount() {
    if (document.getElementById('rb-theme-toggle')) return;
    var b = document.createElement('button');
    toggleBtn = b;
    b.id = 'rb-theme-toggle';
    b.type = 'button';
    b.style.cssText = 'position:fixed;right:20px;bottom:20px;z-index:9999;cursor:pointer;' +
      'font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;' +
      'padding:11px 16px;border-radius:999px;border:1px solid var(--border);background:var(--card);' +
      'color:var(--m2);line-height:1;transition:color .15s,border-color .15s';
    updateLabel();
    b.addEventListener('mouseenter', function () { b.style.color = 'var(--ink)'; b.style.borderColor = 'var(--accent)'; });
    b.addEventListener('mouseleave', function () { b.style.color = 'var(--m2)'; b.style.borderColor = 'var(--border)'; });
    b.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      updateLabel();
    });
    document.body.appendChild(b);
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
