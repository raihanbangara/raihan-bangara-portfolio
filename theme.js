(function () {
  var KEY = 'rb-theme';
  var root = document.documentElement;
  function apply(t) { root.setAttribute('data-theme', t); }
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  apply(saved === 'dark' || saved === 'light' ? saved : (mq && mq.matches ? 'dark' : 'light'));

  function mount() {
    if (document.getElementById('rb-theme-toggle')) return;
    var b = document.createElement('button');
    b.id = 'rb-theme-toggle';
    b.type = 'button';
    b.style.cssText = 'position:fixed;right:20px;bottom:20px;z-index:9999;cursor:pointer;' +
      'font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;' +
      'padding:11px 16px;border-radius:999px;border:1px solid var(--border);background:var(--card);' +
      'color:var(--m2);line-height:1;transition:color .15s,border-color .15s';
    function label() {
      b.textContent = root.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark';
    }
    label();
    b.addEventListener('mouseenter', function () { b.style.color = 'var(--ink)'; b.style.borderColor = 'var(--accent)'; });
    b.addEventListener('mouseleave', function () { b.style.color = 'var(--m2)'; b.style.borderColor = 'var(--border)'; });
    b.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label();
    });
    document.body.appendChild(b);
    if (mq && mq.addEventListener) {
      mq.addEventListener('change', function (e) {
        var stored = null;
        try { stored = localStorage.getItem(KEY); } catch (err) {}
        if (stored === 'dark' || stored === 'light') return;
        apply(e.matches ? 'dark' : 'light');
        label();
      });
    }
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
