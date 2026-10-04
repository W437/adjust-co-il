import { useTranslation } from '../../i18n/LanguageContext';
import { PHONE_TEL, israelDay } from '../../utils/format';
import { PhoneIcon, PinIcon } from '../icons';
import './Locations.css';

// Reception hours per clinic, as given by the client. Days: 0 = Sunday.
const CLINICS = [
  {
    id: 'ta', img: '/assets/loc-telaviv.webp', waze: 'https://www.waze.com/ul?ll=32.10796593277039,34.79845703185863&navigate=yes', address: 'contact.centerAddress',
    hours: [
      { day: 0, time: '14:00–20:00' },
      { day: 2, time: '08:00–14:00' },
    ],
  },
  {
    id: 'tu', img: '/assets/loc-tuval.webp', waze: 'https://www.waze.com/ul?ll=32.92684384968411,35.2425406270441&navigate=yes', address: 'contact.northAddress',
    hours: [
      { day: 1, time: '08:00–14:00, 16:00–20:00' },
      { day: 3, time: '08:00–14:00, 16:00–20:00' },
      { day: 5, time: '07:00–14:00' },
    ],
  },
];

const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export default function Locations() {
  const { t } = useTranslation();
  const today = israelDay();

  return (
    <section className="block alt" id="clinics">
      <div className="wrap">
        <div className="head rv">
          <span className="label">{t('home.loc.label')}</span>
          <h2>{t('home.loc.h2')}</h2>
          <p>{t('home.loc.p')}</p>
        </div>
        <div className="locs">
          {CLINICS.map((c, i) => (
            <article className={`loc rv${i ? ' rv-2' : ''}`} key={c.id}>
              <div className="loc-img">
                <img className="drift" src={c.img} alt={t(`home.loc.${c.id}Alt`)} width="1200" height="800" loading="lazy" decoding="async" />
                <span className="pin"><PinIcon />{t(`home.loc.${c.id}Pin`)}</span>
                <h3 className="loc-name">{t(`home.loc.${c.id}`)}</h3>
              </div>
              <div className="loc-body">
                <address>
                  <PinIcon />
                  <span>{t(c.address)}<small>{t(`home.loc.${c.id}Sub`)}</small></span>
                </address>
                <dl className="loc-hours" aria-label={t('home.loc.hours')}>
                  {c.hours.map((h) => (
                    <div key={h.day} className={h.day === today ? 'today' : undefined}>
                      <dt>{t(`home.loc.${DAY_KEYS[h.day]}`)}</dt>
                      <dd dir="ltr">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <div className="loc-actions">
                  <a className="btn btn-waze" href={c.waze} target="_blank" rel="noopener noreferrer">
                    <img src="/assets/waze-badge.png" alt="" width="24" height="24" />{t('home.loc.waze')}
                  </a>
                  <a className="btn btn-ghost" href={PHONE_TEL}><PhoneIcon />{t('home.loc.call')}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="hours-note rv">{t('home.loc.hoursNote')}</p>
      </div>
    </section>
  );
}
