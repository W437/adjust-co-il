import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import SectionLink from './SectionLink';
import { MenuIcon, CloseIcon, CalendarIcon } from './icons';
import './Nav.css';

const SECTIONS = [
  { hash: 'conditions', key: 'nav2.conditions' },
  { hash: 'services', key: 'nav2.treatments' },
  { hash: 'about', key: 'nav2.about' },
  { hash: 'testimonials', key: 'nav2.reviews' },
  { hash: 'clinics', key: 'nav2.clinics' },
];

export default function Nav() {
  const { t, basePath, localizePath } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const isHome = basePath === '/';
  const onBlog = basePath.startsWith('/blog');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isHome || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    SECTIONS.forEach(({ hash }) => {
      const el = document.getElementById(hash);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);
  const homePath = localizePath('/');

  const links = (
    <>
      {SECTIONS.map(({ hash, key }) => (
        <SectionLink key={hash} hash={hash} onClick={close} aria-current={isHome && active === hash ? 'true' : undefined}>
          {t(key)}
        </SectionLink>
      ))}
      <Link to={localizePath('/blog')} onClick={close} aria-current={onBlog ? 'page' : undefined}>{t('nav2.blog')}</Link>
    </>
  );

  return (
    <header className={`top${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}>
      <div className="wrap top-in">
        <Link to={homePath} className="top-logo" aria-label="adjust" onClick={close}>
          <img className="logo-light" src="/assets/adjust-new.webp" alt="" width="600" height="256" fetchPriority="high" decoding="async" />
          <img className="logo-dark" src="/assets/adjust-new-white.webp" alt="" width="600" height="256" decoding="async" />
        </Link>

        <nav className="top-nav" aria-label="Main">{links}</nav>

        <div className="top-actions">
          <LanguageToggle />
          <ThemeToggle />
          <SectionLink hash="contact-form" className="btn btn-primary top-book" onClick={close}>
            {t('ui.bookVisit')}
          </SectionLink>
          <button
            type="button"
            className="icon-toggle menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('ui.closeMenu') : t('ui.menu')}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className="menu" id="mobile-menu" hidden={!open}>
        <nav className="wrap menu-in" aria-label="Mobile">
          {links}
          <SectionLink hash="contact-form" className="btn btn-primary" onClick={close}>
            <CalendarIcon />{t('ui.bookConsult')}
          </SectionLink>
        </nav>
      </div>
    </header>
  );
}
