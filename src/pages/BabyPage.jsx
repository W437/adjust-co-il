import { useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { setPageSEO } from '../utils/seo';
import { babyMeta } from '../seo/meta';
import { fill, PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from '../utils/format';
import { CLINICS } from '../utils/clinics';
import { BABY_IMAGES, BABY_VISIT_MINUTES } from '../utils/baby';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SectionLink from '../components/SectionLink';
import { CalendarIcon, ChatIcon, PhoneIcon, PinIcon } from '../components/icons';
import '../components/home/Faq.css';
import '../components/home/FirstVisit.css';
import './BabyPage.css';

const STEP_COLORS = ['#1f9e97', '#2b72b8', '#5361c9'];

function Img({ slot, alt, eager = false, sizes }) {
  const { src, srcSet, width, height } = BABY_IMAGES[slot];
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? undefined : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
    />
  );
}

export default function BabyPage() {
  const { t, lang } = useTranslation();
  const wa = whatsappUrl(t('baby.waMessage'));
  const steps = t('baby.visit.steps');
  const faq = t('baby.faq.items');

  useEffect(() => {
    setPageSEO({
      title: babyMeta(lang).title,
      description: babyMeta(lang).description,
      path: '/baby',
      type: 'website',
      lang,
    });
  }, [lang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const waButton = (
    <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">
      <ChatIcon />{t('baby.wa')}
    </a>
  );

  return (
    <>
      <Nav />
      <main className="baby">
        <section className="baby-hero">
          <div className="wrap">
            <div className="baby-hero-copy">
              <span className="label">{t('baby.eyebrow')}</span>
              <h1>{t('baby.h1')}</h1>
              <p className="baby-lede">{t('baby.lede')}</p>
              <div className="baby-actions">
                {waButton}
                <SectionLink hash="contact-form" className="btn btn-ghost"><CalendarIcon />{t('baby.book')}</SectionLink>
              </div>
            </div>
            <figure className="baby-hero-img">
              <Img slot="hero" alt={t('baby.heroAlt')} eager sizes="(max-width: 1248px) 100vw, 1200px" />
            </figure>
          </div>
        </section>

        <section className="block" id="who">
          <div className="wrap baby-two">
            <div className="rv">
              <h2>{t('baby.who.h')}</h2>
              <p className="baby-body">{t('baby.who.p')}</p>
            </div>
            <div className="rv rv-2">
              <h2>{t('baby.why.h')}</h2>
              <p className="baby-body">{t('baby.why.p')}</p>
            </div>
          </div>
        </section>

        <section className="block alt" id="visit">
          <div className="wrap visit">
            <div>
              <div className="head rv"><h2>{t('baby.visit.h')}</h2></div>
              <ol className="steps">
                {steps.map((s, i) => (
                  <li key={s.h} className={`rv${i ? ` rv-${i + 1}` : ''}`}>
                    <span className="step-n" style={{ background: STEP_COLORS[i] }}>{i + 1}</span>
                    <div><h3>{s.h}</h3><p>{s.p}</p></div>
                  </li>
                ))}
              </ol>
              <p className="baby-note rv">{t('baby.visit.note')}</p>
            </div>
            <figure className="baby-photo rv">
              <Img slot="visit" alt={t('baby.visit.alt')} sizes="(max-width: 880px) 100vw, 480px" />
            </figure>
          </div>
        </section>

        <section className="block" id="about-baby">
          <div className="wrap baby-about">
            <figure className="baby-portrait rv">
              <Img slot="about" alt={t('baby.about.alt')} sizes="(max-width: 880px) 60vw, 320px" />
            </figure>
            <div className="rv rv-2">
              <h2>{t('baby.about.h')}</h2>
              <p className="baby-name">{t('baby.about.name')}</p>
              <p className="baby-body">{t('baby.about.p')}</p>
            </div>
          </div>
        </section>

        <section className="block alt" id="baby-faq">
          <div className="wrap faq">
            <div className="head rv"><h2>{t('baby.faq.h')}</h2></div>
            <div className="rv rv-2">
              {faq.map((it, i) => (
                <details className="faq-item" key={it.q} open={i === 0}>
                  <summary>{it.q}</summary>
                  <div className="faq-a">
                    <p>
                      {it.a}
                      {it.a2 && BABY_VISIT_MINUTES ? ` ${fill(t('baby.faq.durationSentence'), { min: BABY_VISIT_MINUTES })}` : ''}
                      {it.a2 ? ` ${it.a2}` : ''}
                    </p>
                    {it.link && <div><a className="btn btn-ghost" href={wa} target="_blank" rel="noopener noreferrer"><ChatIcon />{t('baby.wa')}</a></div>}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="block" id="baby-clinics">
          <div className="wrap">
            <div className="head rv"><h2>{t('baby.loc.h')}</h2></div>
            <div className="baby-locs">
              {CLINICS.map((c, i) => (
                <article className={`baby-loc rv${i ? ' rv-2' : ''}`} key={c.id}>
                  <div className="baby-loc-img">
                    <Img slot={c.id} alt={t(`baby.loc.${c.id}Alt`)} sizes="(max-width: 760px) 100vw, 560px" />
                  </div>
                  <div className="baby-loc-body">
                    <h3>{t(`baby.loc.${c.id}`)}</h3>
                    <address><PinIcon /><span>{t(`baby.loc.${c.id}Addr`)}</span></address>
                    <div className="baby-loc-actions">
                      <a className="btn btn-waze" href={c.waze} target="_blank" rel="noopener noreferrer">
                        <img src="/assets/waze-badge.png" alt="" width="24" height="24" />{t('baby.loc.waze')}
                      </a>
                      <a className="btn btn-ghost" href={PHONE_TEL}><PhoneIcon /><span dir="ltr">{PHONE_DISPLAY}</span></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="hours-note rv">{t('baby.loc.note')}</p>
          </div>
        </section>

        <section className="block alt" id="baby-cta">
          <div className="wrap baby-cta rv">
            <h2>{t('baby.cta.h')}</h2>
            <p>{t('baby.cta.p')}</p>
            <div className="baby-actions">
              {waButton}
              <SectionLink hash="contact-form" className="btn btn-ghost"><CalendarIcon />{t('baby.book')}</SectionLink>
            </div>
          </div>
        </section>

        <p className="wrap baby-disclaimer">{t('baby.disclaimer')}</p>
      </main>
      <Footer waMessage={t('baby.waMessage')} babyBar />
    </>
  );
}
