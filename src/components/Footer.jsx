import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import { services } from '../services';
import SectionLink from './SectionLink';
import MobileBottomBar from './MobileBottomBar';
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, whatsappUrl } from '../utils/format';
import './Footer.css';

export default function Footer() {
  const { t, lang, localizePath } = useTranslation();

  return (
    <>
      <footer className="site-footer">
        <div className="wrap footer-top">
          <div className="footer-brand">
            <Link to={localizePath('/')} className="footer-logo" aria-label="adjust">
              <img className="logo-light" src="/assets/adjust-new.webp" alt="" width="600" height="256" loading="lazy" decoding="async" />
              <img className="logo-dark" src="/assets/adjust-new-white.webp" alt="" width="600" height="256" loading="lazy" decoding="async" />
            </Link>
            <p>{t('footer.description')}</p>
            <div className="footer-socials">
              <a href="https://www.facebook.com/adjustdrvictorduanichiropractic/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://www.instagram.com/dr_victorduani_chiro_adjust/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h2>{t('home.footer.explore')}</h2>
            <ul>
              <li><SectionLink hash="conditions">{t('nav2.conditions')}</SectionLink></li>
              <li><SectionLink hash="about">{t('nav2.about')}</SectionLink></li>
              <li><SectionLink hash="testimonials">{t('nav2.reviews')}</SectionLink></li>
              <li><SectionLink hash="faq">{t('home.faq.label')}</SectionLink></li>
              <li><SectionLink hash="clinics">{t('nav2.clinics')}</SectionLink></li>
              <li><Link to={localizePath('/blog')}>{t('nav2.blog')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h2>{t('home.footer.treatments')}</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link to={localizePath(`/services/${s.slug}`)}>{(s[lang] || s.en).title}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h2>{t('home.footer.contact')}</h2>
            <ul>
              <li><a href={PHONE_TEL} dir="ltr">{PHONE_DISPLAY}</a></li>
              <li><a href={whatsappUrl(t('ui.waMessage'))} target="_blank" rel="noopener noreferrer">{t('ui.whatsapp')}</a></li>
              <li><a href={`mailto:${EMAIL}`} dir="ltr">{EMAIL}</a></li>
              <li><SectionLink hash="clinics">{t('contact.centerAddress')}</SectionLink></li>
              <li><SectionLink hash="clinics">{t('contact.northAddress')}</SectionLink></li>
            </ul>
          </div>
        </div>

        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} adjust · {t('hero.doctorName')}. {t('home.footer.rights')}</span>
          <span>built by <a href="https://elalw.com" target="_blank" rel="noopener noreferrer">elalw.com</a></span>
        </div>
      </footer>
      <MobileBottomBar />
    </>
  );
}
