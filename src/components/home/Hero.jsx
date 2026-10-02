import { useEffect, useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { prefersReducedMotion } from '../../theme/theme';
import { PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from '../../utils/format';
import SectionLink from '../SectionLink';
import { CalendarIcon, ChatIcon, PhoneIcon, SpineDots } from '../icons';
import './Hero.css';

export default function Hero() {
  const { t } = useTranslation();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setSettled(true), prefersReducedMotion() ? 0 : 750);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>{t('home.hero.h1')} <em>{t('home.hero.h1Em')}</em></h1>
          <p className="hero-lede">{t('home.hero.lede')}</p>
          <p className="hero-motto">{t('home.hero.motto')}</p>
          <div className="hero-actions">
            <SectionLink hash="contact-form" className="btn btn-primary"><CalendarIcon />{t('ui.bookConsult')}</SectionLink>
            <a className="btn btn-ghost" href={whatsappUrl(t('ui.waMessage'))} target="_blank" rel="noopener noreferrer"><ChatIcon />{t('ui.whatsapp')}</a>
            <a className="btn btn-ghost" href={PHONE_TEL}><PhoneIcon /><span dir="ltr">{PHONE_DISPLAY}</span></a>
          </div>
          <div className="proof">
            <div><b><span className="stars" aria-hidden="true">★★★★★</span>4.9</b><span>{t('home.hero.proofReviews')}</span></div>
            <div><b>{t('home.hero.proofLicensed')}</b><span>{t('home.hero.proofMoh')}</span></div>
            <div><b>{t('home.hero.proofSheba')}</b><span>{t('home.hero.proofFormerly')}</span></div>
          </div>
        </div>

        <figure className={`portrait${settled ? '' : ' pre'}`}>
          <img src="/assets/dr-victor-v2.webp" alt={t('home.hero.alt')} width="839" height="1080" fetchPriority="high" decoding="async" />
          <SpineDots className="dots" />
          <figcaption>
            <strong>{t('home.hero.name')}</strong>
            <span>{t('home.hero.cred')}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
