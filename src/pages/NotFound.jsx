import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { SpineDots, ArrowIcon } from '../components/icons';
import './NotFound.css';

export default function NotFound() {
  const { t, localizePath } = useTranslation();

  useEffect(() => {
    document.title = `404 | ${t('siteTitle')}`;
    let robots = document.head.querySelector('meta[name="robots"]');
    const previous = robots?.getAttribute('content');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex');
    return () => { if (previous) robots.setAttribute('content', previous); };
  }, [t]);

  return (
    <>
      <Nav />
      <main className="nf wrap">
        <SpineDots className="nf-dots" />
        <span className="label">404</span>
        <h1>{t('pages.notFound.h1')}</h1>
        <p>{t('pages.notFound.p')}</p>
        <div className="nf-actions">
          <Link className="btn btn-primary" to={localizePath('/')}>{t('pages.notFound.home')}</Link>
          <Link className="btn btn-ghost" to={localizePath('/blog')}>{t('nav2.blog')}<ArrowIcon /></Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
