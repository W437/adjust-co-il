import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import { ArrowIcon } from '../icons';
import './Faq.css';

const POSTS = [
  'how-many-chiropractic-sessions-needed',
  'is-chiropractic-safe-myths',
  'is-chiropractic-safe-myths',
  'is-chiropractic-safe-myths',
  'your-first-chiropractic-appointment',
];

export default function Faq() {
  const { t, localizePath } = useTranslation();
  const items = t('home.faq.items');

  return (
    <section className="block" id="faq">
      <div className="wrap faq">
        <div className="head rv">
          <span className="label">{t('home.faq.label')}</span>
          <h2>{t('home.faq.h2')}</h2>
          <p>{t('home.faq.p')}</p>
        </div>
        <div className="rv rv-2">
          {items.map((it, i) => (
            <details className="faq-item" key={it.q} open={i === 0}>
              <summary>{it.q}</summary>
              <div className="faq-a">
                <p>{it.a}</p>
                <Link className="more" to={localizePath(`/blog/${POSTS[i]}`)}>{t('ui.readArticle')}<ArrowIcon /></Link>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
