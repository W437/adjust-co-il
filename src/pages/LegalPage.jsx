import { useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { setPageSEO } from '../utils/seo';
import { fill, PHONE_DISPLAY, EMAIL } from '../utils/format';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './LegalPage.css';

const PATHS = { privacy: '/privacy', a11y: '/accessibility' };

export default function LegalPage({ page }) {
  const { t, lang } = useTranslation();
  const sections = t(`pages.${page}.sections`);

  useEffect(() => {
    setPageSEO({
      title: `${t(`pages.${page}.title`)} | adjust`,
      description: t(`pages.${page}.desc`),
      path: PATHS[page],
      type: 'website',
      lang,
    });
  }, [t, lang, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      <Nav />
      <main className="legal wrap">
        <h1>{t(`pages.${page}.title`)}</h1>
        <p className="legal-updated">{t(`pages.${page}.updated`)}</p>
        {sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            <p>{fill(s.p, { phone: PHONE_DISPLAY, email: EMAIL })}</p>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
