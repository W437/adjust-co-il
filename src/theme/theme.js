const STORAGE_KEY = 'adjust-theme';

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export function isDarkTheme() {
  const t = document.documentElement.getAttribute('data-theme');
  if (t === 'dark') return true;
  if (t === 'light') return false;
  return !!window.matchMedia?.('(prefers-color-scheme: dark)').matches;
}

function applyTheme(next) {
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage blocked */ }
}

export function toggleTheme(origin) {
  const next = isDarkTheme() ? 'light' : 'dark';
  const root = document.documentElement;
  if (!document.startViewTransition || prefersReducedMotion() || !origin) {
    applyTheme(next);
    return;
  }
  const r = origin.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  root.classList.add('vt-theme');
  const vt = document.startViewTransition(() => applyTheme(next));
  vt.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(.65, 0, .35, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    })
    .catch(() => {});
  vt.finished.finally(() => root.classList.remove('vt-theme'));
}
