import { useTranslation } from '../../i18n/LanguageContext';
import { useClinicStatus } from '../../hooks/useClinicStatus';
import { PHONE_TEL } from '../../utils/format';
import { PhoneIcon, PinIcon } from '../icons';
import './Locations.css';

const CLINICS = [
  { id: 'ta', img: '/assets/loc-telaviv.webp', waze: 'https://www.waze.com/ul?ll=32.10796593277039,34.79845703185863&navigate=yes', address: 'contact.centerAddress' },
  { id: 'tu', img: '/assets/loc-tuval.webp', waze: 'https://www.waze.com/ul?ll=32.92684384968411,35.2425406270441&navigate=yes', address: 'contact.northAddress' },
];

const HOURS = [
  { days: [0, 1, 2, 3, 4], label: 'home.loc.sunThu', time: '08:00 – 19:00' },
  { days: [5], label: 'home.loc.fri', time: '08:00 – 13:00' },
  { days: [6], label: 'home.loc.sat', time: null },
];

export default function Locations() {
  const { t } = useTranslation();
  const status = useClinicStatus();

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
        <div className="hours-strip rv">
          <h3>{t('home.loc.hours')}</h3>
          <dl>
            {HOURS.map((h) => (
              <div key={h.label} className={h.days.includes(status.day) ? 'today' : undefined}>
                <dt>{t(h.label)}</dt>
                <dd dir={h.time ? 'ltr' : undefined}>{h.time || t('home.loc.closed')}</dd>
              </div>
            ))}
          </dl>
          <span className={`status ${status.open ? 'is-open' : 'is-closed'}`}>{status.text}</span>
        </div>
      </div>
    </section>
  );
}
