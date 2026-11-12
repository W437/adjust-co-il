import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import { setPageSEO } from '../utils/seo';
import { clinicMeta, CLINIC_PAGES, CONDITION_LINKS } from '../clinics/pages';
import { CLINICS, DAY_KEYS } from '../utils/clinics';
import { PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from '../utils/format';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SectionLink from '../components/SectionLink';
import NotFound from './NotFound';
import { CalendarIcon, ChatIcon, PhoneIcon, PinIcon } from '../components/icons';
import '../components/home/Faq.css';
import './ClinicPage.css';

export default function ClinicPage() {
  const { slug } = useParams();
  const { t, lang, localizePath } = useTranslation();
  const page = CLINIC_PAGES[slug];

  useEffect(() => {
    if (!page) return;
    const m = clinicMeta(slug, lang);
    setPageSEO({ title: m.title, description: m.description, path: `/clinics/${slug}`, image: page.image.src, type: 'website', lang });
  }, [page, slug, lang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!page) return <NotFound />;

  const c = page[lang] || page.he;
  const clinic = CLINICS.find((x) => x.id === page.id);
  const otherSlug = slug === 'tuval' ? 'ramat-aviv' : 'tuval';
  const wa = whatsappUrl(t('ui.waMessage'));
  const base = `https://adjust.co.il${lang === 'en' ? '/en' : ''}`;
  const name = lang === 'he'
    ? `adjust · ד״ר ויקטור דואני, כירופרקט${slug === 'tuval' ? ' (תובל)' : ''}`
    : `adjust · Dr. Victor Duani, Chiropractor${slug === 'tuval' ? ' (Tuval)' : ''}`;

  // Clinic node for this page; the same @id is defined on the home page.
  const node = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': page.schema.nodeId,
    name,
    description: c.description,
    url: `${base}/clinics/${slug}/`,
    telephone: '+972-53-276-7776',
    image: `https://adjust.co.il${page.image.src}`,
    address: { '@type': 'PostalAddress', ...page.schema.address },
    ...(page.schema.geo ? { geo: { '@type': 'GeoCoordinates', ...page.schema.geo } } : {}),
    openingHoursSpecification: page.schema.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.length === 1 ? h.days[0] : h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    branchOf: { '@id': 'https://adjust.co.il/#organization' },
    employee: { '@id': 'https://adjust.co.il/#person' },
  };

  return (
    <>
      <Nav />
      <main className="clinic">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }} />
        <section className="clinic-hero">
          <div className="wrap">
            <div className="clinic-hero-copy">
              <span className="label">{c.eyebrow}</span>
              <h1>{c.h1}</h1>
              <p className="clinic-lede">{c.lede}</p>
              <div className="clinic-actions">
                <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer"><ChatIcon />{t('ui.whatsapp')}</a>
                <a className="btn btn-ghost" href={PHONE_TEL}><PhoneIcon /><span dir="ltr">{PHONE_DISPLAY}</span></a>
              </div>
            </div>
            <figure className="clinic-hero-img">
              <img src={page.image.src} alt={c.imageAlt} width={page.image.width} height={page.image.height} decoding="async" />
            </figure>
          </div>
        </section>

        <div className="wrap clinic-body">
          <section>
            <h2>{c.getH}</h2>
            <address className="clinic-addr"><PinIcon /><span>{c.addressLine}</span></address>
            <p>{c.getP}</p>
            <a className="btn btn-waze" href={clinic.waze} target="_blank" rel="noopener noreferrer">
              <img src="/assets/waze-badge.png" alt="" width="24" height="24" />{t('home.loc.waze')}
            </a>
          </section>

          <section>
            <h2>{c.hoursH}</h2>
            <dl className="clinic-hours">
              {clinic.hours.map((h) => (
                <div key={h.day}>
                  <dt>{t(`home.loc.${DAY_KEYS[h.day]}`)}</dt>
                  <dd dir="ltr">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="clinic-note">{c.hoursNote}</p>
          </section>

          <section>
            <h2>{c.treatH}</h2>
            <p>{c.treatP}</p>
            <ul className="clinic-links">
              {CONDITION_LINKS[lang].conditions.map(([label, href]) => (
                <li key={href}><Link to={localizePath(href)}>{label}</Link></li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{c.visitH}</h2>
            <p>{c.visitP}</p>
            <ul className="clinic-links">
              {c.visitLinks.map(([label, href]) => (
                <li key={href}><Link to={localizePath(href)}>{label}</Link></li>
              ))}
            </ul>
          </section>

          {c.postureP && (
            <section>
              <h2>{c.postureH}</h2>
              <p>{c.postureP} <Link to={localizePath('/services/posture-improvement')}>{c.postureLink}</Link>.</p>
            </section>
          )}

          <section>
            <h2>{c.babyH}</h2>
            <p>{c.babyP} <Link to={localizePath('/baby')}>{c.babyLink}</Link>.</p>
          </section>

          <section>
            <h2>{c.otherH}</h2>
            <p>{c.otherP} <Link to={localizePath(`/clinics/${otherSlug}`)}>{c.otherLink}</Link>.</p>
          </section>

          <section className="clinic-faq">
            <h2>{c.faqH}</h2>
            {c.faq.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </section>

          <section className="clinic-cta">
            <h2>{c.ctaH}</h2>
            <p>{c.ctaP}</p>
            <div className="clinic-actions">
              <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer"><ChatIcon />{t('ui.whatsapp')}</a>
              <SectionLink hash="contact-form" className="btn btn-ghost"><CalendarIcon />{t('blog.bookCtaButton')}</SectionLink>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
