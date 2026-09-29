import { useTranslation } from '../i18n/LanguageContext';
import { prefersReducedMotion } from '../theme/theme';
import './LanguageToggle.css';

export default function LanguageToggle({ className = '' }) {
  const { lang, switchLanguage } = useTranslation();

  const onClick = () => {
    const root = document.documentElement;
    if (!document.startViewTransition || prefersReducedMotion()) {
      switchLanguage();
      return;
    }
    root.classList.add('vt-lang');
    const vt = document.startViewTransition(() => switchLanguage());
    vt.finished.finally(() => root.classList.remove('vt-lang'));
  };

  return (
    <button
      type="button"
      className={`lang-toggle ${className}`}
      onClick={onClick}
      lang={lang === 'he' ? 'en' : 'he'}
      aria-label={lang === 'he' ? 'Switch to English' : 'החלפה לעברית'}
    >
      {lang === 'he' ? 'English' : 'עברית'}
    </button>
  );
}
