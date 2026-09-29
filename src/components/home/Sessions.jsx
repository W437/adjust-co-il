import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import { ArrowIcon } from '../icons';
import './Sessions.css';

const RANGES = [
  { a: 4, b: 8, c: '#1f9e97' },
  { a: 6, b: 12, c: '#2b72b8' },
  { a: 10, b: 20, c: '#5361c9' },
];
const RHYTHM = [2, 2, 1, 1, 0, 1, 0, 1];
const PHASE_SPANS = [2, 2, 4];
const TICKS = [0, 5, 10, 15, 20];

export default function Sessions() {
  const { t, localizePath } = useTranslation();
  const labels = t('home.sessions.ranges');
  const phases = t('home.sessions.phases');

  return (
    <section className="block" id="sessions">
      <div className="wrap">
        <div className="head rv">
          <span className="label">{t('home.sessions.label')}</span>
          <h2>{t('home.sessions.h2')}</h2>
          <p>{t('home.sessions.p')}</p>
        </div>
        <div className="sessions">
          <div className="ses-card rv">
            <h3>{t('home.sessions.c1')}</h3>
            <div className="ranges">
              {RANGES.map((r, i) => (
                <div className="rrow" key={r.a}>
                  <span className="rl">{labels[i].l}<small>{labels[i].s}</small></span>
                  <div className="track">
                    <div className="bar" style={{ '--a': r.a, '--b': r.b, '--c': r.c }}>{r.a}–{r.b}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="axis" aria-hidden="true">
              <span className="aname">{t('home.sessions.axis')}</span>
              <div className="ticks">{TICKS.map((n) => <span key={n} style={{ '--t': n }}>{n}</span>)}</div>
            </div>
          </div>

          <div className="ses-card rv rv-2">
            <h3>{t('home.sessions.c2')}</h3>
            <div>
              <div className="rhythm" aria-hidden="true">
                {RHYTHM.map((n, k) => (
                  <div className="wk" key={k} style={{ '--k': k }}>
                    <div className="slot">{Array.from({ length: n }, (_, j) => <i key={j} />)}</div>
                    <span>{k + 1}</span>
                  </div>
                ))}
              </div>
              <div className="phases">
                {phases.map((p, i) => <span key={p} style={{ gridColumn: `span ${PHASE_SPANS[i]}` }}>{p}</span>)}
              </div>
            </div>
            <p className="fine">{t('home.sessions.fine')}</p>
            <Link className="more" to={localizePath('/blog/how-many-chiropractic-sessions-needed')}>{t('home.sessions.link')}<ArrowIcon /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
