import { useMemo, useRef, useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { fill } from '../../utils/format';
import { prefersReducedMotion } from '../../theme/theme';
import en from '../../i18n/en.json';
import './Reviews.css';

const CATS = [
  { id: 'all' },
  { id: 'back', re: /back|radicul|shoulder blade/i },
  { id: 'disc', re: /disc/i },
  { id: 'neck', re: /neck|head|vertigo|jaw/i },
  { id: 'sports', re: /sport|knee|shoulder pain/i },
];
const AVATAR_COLORS = ['#1f9e97', '#2893b3', '#2b72b8', '#4468c6', '#5361c9'];
const PAGE = 9;

function inCat(i, id) {
  if (id === 'all') return true;
  return CATS.find((c) => c.id === id).re.test(en.testimonials.items[i].treatment);
}

function avatarColor(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function Stars({ n, label }) {
  return (
    <span className="stars" aria-label={label}>
      {[1, 2, 3, 4, 5].map((i) => (i <= n ? <span key={i}>★</span> : <s key={i}>★</s>))}
    </span>
  );
}

export default function Reviews() {
  const { t, lang } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [shown, setShown] = useState(PAGE);
  const [batchStart, setBatchStart] = useState(0);
  const [now] = useState(() => Date.now());
  const sectionRef = useRef(null);
  const items = t('testimonials.items');

  const indexes = useMemo(() => items.map((_, i) => i).filter((i) => inCat(i, filter)), [items, filter]);
  const counts = useMemo(() => {
    const out = {};
    CATS.forEach((c) => { out[c.id] = items.filter((_, i) => inCat(i, c.id)).length; });
    return out;
  }, [items]);
  const dist = useMemo(() => {
    const d = [0, 0, 0, 0, 0, 0];
    items.forEach((r) => { d[r.rating || 5] += 1; });
    return d;
  }, [items]);

  const dateFmt = (d) => {
    const [dd, mm, yyyy] = d.split('.').map(Number);
    const dt = new Date(yyyy, mm - 1, dd);
    const recent = now - dt.getTime() < 365 * 864e5;
    try {
      return new Intl.DateTimeFormat(lang === 'he' ? 'he-IL' : 'en-US', recent ? { month: 'long', year: 'numeric' } : { year: 'numeric' }).format(dt);
    } catch {
      return String(yyyy);
    }
  };

  const pick = (id) => {
    if (id === filter) return;
    setFilter(id);
    setShown(PAGE);
    setBatchStart(0);
  };

  const more = () => {
    if (shown >= indexes.length) {
      setShown(PAGE);
      setBatchStart(0);
      sectionRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      return;
    }
    setBatchStart(shown);
    setShown(shown + PAGE);
  };

  const visible = indexes.slice(0, shown);
  const starsLabel = (n) => `${n} ${t('home.reviews.stars')}`;

  return (
    <section className="block alt" id="testimonials" ref={sectionRef}>
      <div className="wrap">
        <div className="head rv">
          <span className="label">{t('home.reviews.label')}</span>
          <h2>{t('home.reviews.h2')}</h2>
        </div>

        <div className="rev-top">
          <div className="score-card rv">
            <div className="score-row">
              <span className="score-num">4.9</span>
              <div>
                <Stars n={5} label={t('home.reviews.ratingAria')} />
                <small>{t('home.reviews.count')}</small>
              </div>
            </div>
            <div className="dist">
              {[5, 4, 3, 2, 1].map((s) => (
                <div className="dist-row" key={s}>
                  <span>{s} ★</span>
                  <span className="dist-bar"><b style={{ '--w': `${((dist[s] / items.length) * 100).toFixed(1)}%` }} /></span>
                  <span>{dist[s]}</span>
                </div>
              ))}
            </div>
          </div>
          <figure className="featured rv rv-2">
            <blockquote><p>{lang === 'he' ? '״' : '“'}{t('home.reviews.featured')}{lang === 'he' ? '״' : '”'}</p></blockquote>
            <figcaption>
              <Stars n={5} label={starsLabel(5)} />
              <span>{t('home.reviews.featuredWho')}</span>
              <span className="tag">{t('home.reviews.featuredTag')}</span>
            </figcaption>
          </figure>
        </div>

        <div className="chips rv" role="group" aria-label={t('home.reviews.filterAria')}>
          {CATS.map((c) => (
            <button key={c.id} type="button" className="chip" aria-pressed={filter === c.id} onClick={() => pick(c.id)}>
              {t(`home.reviews.cats.${c.id}`)}<span>{counts[c.id]}</span>
            </button>
          ))}
        </div>

        <div className="wall" key={`${filter}-${lang}`}>
          {visible.map((i, k) => {
            const r = items[i];
            const general = /^general$/i.test(en.testimonials.items[i].treatment);
            const initial = r.name.replace(/^[^\p{L}]+/u, '').charAt(0).toUpperCase() || '·';
            const delay = k >= batchStart ? k - batchStart : 0;
            return (
              <article className="rcard" key={i} style={{ '--i': delay }}>
                <header>
                  <span className="av" style={{ '--c': avatarColor(en.testimonials.items[i].name) }} aria-hidden="true">{initial}</span>
                  <span className="who-t"><b>{r.name}</b><span>{dateFmt(r.date)}</span></span>
                  <Stars n={r.rating || 5} label={starsLabel(r.rating || 5)} />
                </header>
                <p>{r.quote}</p>
                {!general && <span className="tag">{r.treatment}</span>}
              </article>
            );
          })}
        </div>

        <div className="wall-foot">
          <p className="fine">{fill(t('home.reviews.showing'), { n: visible.length, t: indexes.length })}</p>
          {indexes.length > PAGE && (
            <button type="button" className="btn btn-ghost" onClick={more}>
              {shown < indexes.length ? t('home.reviews.more') : t('home.reviews.less')}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
