import { useTranslation } from '../../i18n/LanguageContext';
import ClinicGallery from './ClinicGallery';
import './FirstVisit.css';

const STEP_COLORS = ['#1f9e97', '#2b72b8', '#5361c9'];

export default function FirstVisit() {
  const { t } = useTranslation();
  const steps = t('home.visit.steps');
  const bring = t('home.visit.bring');
  const facts = t('home.visit.facts');

  return (
    <section className="block alt" id="visit">
      <div className="wrap visit">
        <div>
          <div className="head rv">
            <span className="label">{t('home.visit.label')}</span>
            <h2>{t('home.visit.h2')}</h2>
            <p>{t('home.visit.p')}</p>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.h} className={`rv${i ? ` rv-${i + 1}` : ''}`}>
                <span className="step-n" style={{ background: STEP_COLORS[i] }}>{i + 1}</span>
                <div><h3>{s.h}</h3><p>{s.p}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="room">
          <ClinicGallery />
          <div className="bring facts rv">
            <h3>{t('home.visit.factsH')}</h3>
            <ul>{facts.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
          <div className="bring rv">
            <h3>{t('home.visit.bringH')}</h3>
            <ul>{bring.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
