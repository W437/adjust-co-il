import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import { serviceSlugs } from '../../services';
import { ArrowIcon } from '../icons';
import './Techniques.css';

export default function Techniques() {
  const { t, localizePath } = useTranslation();
  const items = t('home.tech.items');

  return (
    <section className="block alt" id="services">
      <div className="wrap">
        <div className="head rv">
          <span className="label">{t('home.tech.label')}</span>
          <h2>{t('home.tech.h2')}</h2>
          <p>{t('home.tech.p')}</p>
        </div>
        <div className="tech">
          {items.map((it, i) => (
            <Link key={serviceSlugs[i]} to={localizePath(`/services/${serviceSlugs[i]}`)} className={`tech-row rv${i % 2 ? ' rv-2' : ''}`}>
              <div className="tech-th"><img src={`/assets/s-${i + 1}-v2.webp`} alt="" loading="lazy" decoding="async" /></div>
              <div className="tech-txt">
                <h3>{it.h}</h3>
                <p>{it.p}</p>
                <span className="more">{t('ui.learnMore')}<ArrowIcon /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
