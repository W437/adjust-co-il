import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import { ArrowIcon } from '../icons';
import './ConditionFinder.css';

const META = [
  { img: '/assets/back-pain.webp', post: 'sciatica-relief-without-surgery', mins: 8 },
  { img: '/assets/head-pain.webp', post: 'neck-pain-tension-headaches', mins: 7 },
  { img: '/assets/s-1-v2.webp', post: 'herniated-disc-treatment-chiropractic', mins: 9 },
  { img: '/assets/wrist-pain.webp', post: 'sports-injury-recovery', mins: 7 },
  { img: '/assets/s-6-v2.webp', post: 'posture-digital-age', mins: 6 },
];

export default function ConditionFinder() {
  const { t, lang, localizePath } = useTranslation();
  const [current, setCurrent] = useState(0);
  const tabRefs = useRef([]);
  const items = t('home.cond.items');
  const item = items[current];
  const meta = META[current];
  const open = lang === 'he' ? '״' : '“';
  const close = lang === 'he' ? '״' : '”';

  const onKeyDown = (e, i) => {
    const fwd = ['ArrowDown', lang === 'he' ? 'ArrowLeft' : 'ArrowRight'];
    const back = ['ArrowUp', lang === 'he' ? 'ArrowRight' : 'ArrowLeft'];
    const d = fwd.includes(e.key) ? 1 : back.includes(e.key) ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + items.length) % items.length;
    setCurrent(n);
    tabRefs.current[n]?.focus();
  };

  return (
    <section className="block" id="conditions">
      <div className="wrap">
        <div className="head rv">
          <span className="label">{t('home.cond.label')}</span>
          <h2>{t('home.cond.h2')}</h2>
        </div>
        <div className="finder">
          <div role="tablist" aria-label={t('home.cond.label')} className="finder-tabs">
            {items.map((c, i) => (
              <button
                key={c.key}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`cond-tab-${i}`}
                aria-controls="cond-panel"
                aria-selected={i === current}
                tabIndex={i === current ? 0 : -1}
                onClick={() => setCurrent(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                {c.key}
              </button>
            ))}
          </div>

          <div className="cond-panel rv" role="tabpanel" id="cond-panel" aria-labelledby={`cond-tab-${current}`}>
            <div className="cond-swap" key={`${lang}-${current}`}>
              <div className="plate"><img src={meta.img} alt="" /></div>
              <div className="cond-body">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="combo">
                  <span>{t('home.cond.combo')}</span>
                  {item.tech.map((x) => <b key={x}>{x}</b>)}
                </div>
                <blockquote>
                  <span className="label">{t('home.cond.patient')}</span>
                  <p>{open}{item.q}{close}</p>
                  <cite>{item.who}</cite>
                </blockquote>
                <Link className="more" to={localizePath(`/blog/${meta.post}`)}>
                  <span>{item.read} · {meta.mins} {t('ui.minRead')}</span><ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
