import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import { ArrowIcon } from '../icons';
import './BabyTeaser.css';

export default function BabyTeaser() {
  const { t, localizePath } = useTranslation();

  return (
    <section className="block baby-teaser" id="babies">
      <div className="wrap">
        <div className="teaser rv">
          <img src="/assets/clinic/white-room.webp" alt={t('home.baby.alt')} width="1152" height="1536" loading="lazy" decoding="async" />
          <div className="teaser-copy">
            <span className="label">{t('home.baby.label')}</span>
            <h2>{t('home.baby.h2')}</h2>
            <p>{t('home.baby.p')}</p>
            <Link className="btn btn-primary" to={localizePath('/baby')}>{t('home.baby.cta')}<ArrowIcon /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
