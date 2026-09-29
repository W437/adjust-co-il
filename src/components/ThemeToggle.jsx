import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { isDarkTheme, toggleTheme } from '../theme/theme';
import { SunIcon, MoonIcon } from './icons';

export default function ThemeToggle() {
  const { t } = useTranslation();
  const btnRef = useRef(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setDark(isDarkTheme());
    sync();
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    mq?.addEventListener?.('change', sync);
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => { mq?.removeEventListener?.('change', sync); mo.disconnect(); };
  }, []);

  const label = dark ? t('ui.toLight') : t('ui.toDark');

  return (
    <button
      ref={btnRef}
      type="button"
      className="icon-toggle theme-toggle"
      data-next={dark ? 'light' : 'dark'}
      aria-label={label}
      title={label}
      onClick={() => toggleTheme(btnRef.current)}
    >
      <SunIcon className="sun" />
      <MoonIcon className="moon" />
    </button>
  );
}
