import { useTranslation } from '../../i18n/LanguageContext';
import './Journey.css';

export default function Journey() {
  const { t } = useTranslation();
  const israel = t('home.story.israel');

  return (
    <section className="block" id="about">
      <div className="wrap">
        <div className="head rv">
          <span className="label">{t('home.story.label')}</span>
          <h2>{t('home.story.h2')}</h2>
          <p>{t('home.story.p')}</p>
        </div>
        <div className="journey">
          <article className="pc rv" style={{ '--c': '#2aa3a8' }}>
            <div className="pc-img">
              <img className="drift" src="/assets/story-mumbai.webp" alt={t('home.story.mumbai.alt')} width="880" height="1100" loading="lazy" decoding="async" />
              <span className="pc-year">2004</span>
            </div>
            <div className="pc-meta"><i /><span>{t('home.story.mumbai.place')}</span></div>
            <p>{t('home.story.mumbai.text')}</p>
          </article>
          <article className="pc rv rv-2" style={{ '--c': '#2b72b8' }}>
            <div className="pc-img">
              <img className="drift" src="/assets/story-durban.webp" alt={t('home.story.durban.alt')} width="880" height="1100" loading="lazy" decoding="async" />
              <span className="pc-year">2010</span>
            </div>
            <div className="pc-meta"><i /><span>{t('home.story.durban.place')}</span></div>
            <p>{t('home.story.durban.text')}</p>
          </article>
          <article className="pc rv rv-3" style={{ '--c': '#5361c9' }}>
            <div className="pc-img">
              <img className="drift" src="/assets/story-israel.webp" alt={israel.alt} width="880" height="1100" loading="lazy" decoding="async" />
              <span className="pc-year">{israel.year}</span>
            </div>
            <div className="pc-meta"><i /><span>{israel.place}</span></div>
            <ul>{israel.list.map((li) => <li key={li}>{li}</li>)}</ul>
          </article>
        </div>
      </div>
    </section>
  );
}
