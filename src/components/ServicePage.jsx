import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import { setPageSEO } from '../utils/seo';
import { getServiceBySlug, services } from '../services';
import { getPostBySlug } from '../blog';
import { PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from '../utils/format';
import Nav from './Nav';
import Footer from './Footer';
import SectionLink from './SectionLink';
import { ArrowIcon, CalendarIcon, ChatIcon, PhoneIcon } from './icons';
import './ServicePage.css';

function ContentRenderer({ content }) {
  let h = -1;
  return content.map((block, i) => {
    switch (block.type) {
      case 'heading':
        h += 1;
        return <h2 key={i} id={`sec-${h}`}>{block.text}</h2>;
      case 'subheading':
        return <h3 key={i}>{block.text}</h3>;
      case 'paragraph':
        return <p key={i} dangerouslySetInnerHTML={{ __html: block.text }} />;
      case 'list':
        return (
          <ul key={i}>
            {block.items.map((item, j) => (
              <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        );
      default:
        return null;
    }
  });
}

export default function ServicePage() {
  const { slug } = useParams();
  const { lang, t, localizePath } = useTranslation();
  const service = getServiceBySlug(slug);
  const localized = service ? (service[lang] || service.en) : null;
  const [activeSec, setActiveSec] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (localized && service) {
      setPageSEO({
        title: `${localized.title} | ${t('siteTitle')}`,
        description: localized.metaDescription,
        path: `/services/${service.slug}`,
        image: service.image,
        lang,
      });
    }
  }, [localized, service, t, lang]);

  useEffect(() => {
    if (!localized || !('IntersectionObserver' in window)) return undefined;
    const heads = document.querySelectorAll('.svc-prose h2[id]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveSec(e.target.id); });
    }, { rootMargin: '-20% 0px -70% 0px' });
    heads.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [localized]);

  if (!service) {
    return (
      <>
        <Nav />
        <main className="svc">
          <div className="wrap svc-missing">
            <span className="label">404</span>
            <h1>{t('pages.service.notFound')}</h1>
            <p>{t('pages.service.notFoundSub')}</p>
            <SectionLink hash="services" className="btn btn-primary">
              {t('servicePage.backToServices')}<ArrowIcon />
            </SectionLink>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const base = `https://adjust.co.il${lang === 'en' ? '/en' : ''}`;
  const currentUrl = `${base}/services/${service.slug}`;
  const imageUrl = `https://adjust.co.il${service.image}`;

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      name: localized.title,
      description: localized.metaDescription,
      url: currentUrl,
      image: imageUrl,
      inLanguage: lang === 'he' ? 'he-IL' : 'en-US',
      provider: { '@type': 'Chiropractor', '@id': 'https://adjust.co.il/#clinic-telaviv' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('servicePage.breadcrumbHome'), item: `${base}/` },
        { '@type': 'ListItem', position: 2, name: t('servicePage.breadcrumbServices'), item: `${base}/#services` },
        { '@type': 'ListItem', position: 3, name: localized.title, item: currentUrl },
      ],
    },
  ];

  const hasFaq = Array.isArray(localized.faq) && localized.faq.length > 0;
  if (hasFaq) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: localized.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  const relatedPosts = (service.relatedPosts || [])
    .map((s) => getPostBySlug(s))
    .filter(Boolean);
  const others = services.filter((s) => s.slug !== service.slug);
  const toc = localized.content.filter((b) => b.type === 'heading');
  const waHref = whatsappUrl(t('ui.waMessage'));

  return (
    <>
      <Nav />
      <main className="svc">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="svc-hero">
          <div className="wrap svc-hero-in">
            <div className="svc-hero-copy">
              <nav className="svc-crumbs" aria-label="Breadcrumb">
                <Link to={localizePath('/')}>{t('servicePage.breadcrumbHome')}</Link>
                <span aria-hidden="true">/</span>
                <SectionLink hash="services">{t('servicePage.breadcrumbServices')}</SectionLink>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{localized.title}</span>
              </nav>
              <span className="label">{t('home.tech.label')}</span>
              <h1>{localized.title}</h1>
              <p className="svc-intro">{localized.intro}</p>
              <div className="svc-actions">
                <SectionLink hash="contact-form" className="btn btn-primary">
                  <CalendarIcon />{t('servicePage.bookCtaButton')}
                </SectionLink>
                <a className="btn btn-ghost" href={waHref} target="_blank" rel="noopener noreferrer">
                  <ChatIcon />{t('ui.whatsapp')}
                </a>
              </div>
            </div>
            <figure className="svc-art">
              <img className="drift" src={service.image} alt={localized.title} fetchPriority="high" decoding="async" />
            </figure>
          </div>
        </section>

        <div className="wrap svc-body">
          {toc.length > 1 && (
            <aside className="svc-toc" aria-label={t('pages.service.onThisPage')}>
              <span className="label">{t('pages.service.onThisPage')}</span>
              <ol>
                {toc.map((b, i) => (
                  <li key={i}>
                    <a href={`#sec-${i}`} aria-current={activeSec === `sec-${i}` ? 'true' : undefined}>{b.text}</a>
                  </li>
                ))}
              </ol>
              <a className="svc-toc-call" href={PHONE_TEL}>
                <PhoneIcon /><span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
            </aside>
          )}
          <article className="svc-prose">
            <ContentRenderer content={localized.content} />
          </article>
        </div>

        {hasFaq && (
          <section className="block alt svc-faq">
            <div className="wrap svc-faq-in">
              <div className="head rv">
                <span className="label">{t('home.faq.label')}</span>
                <h2>{t('servicePage.faqHeading')}</h2>
              </div>
              <div className="svc-faq-list">
                {localized.faq.map((f, i) => (
                  <details key={i} className="svc-qa" open={i === 0}>
                    <summary>{f.q}</summary>
                    <div className="svc-qa-a"><p>{f.a}</p></div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="block svc-related">
            <div className="wrap">
              <div className="head rv">
                <span className="label">{t('nav2.blog')}</span>
                <h2>{t('servicePage.relatedHeading')}</h2>
              </div>
              <div className="svc-related-grid">
                {relatedPosts.map((p, i) => {
                  const loc = p[lang] || p.en;
                  return (
                    <Link to={localizePath(`/blog/${p.slug}`)} className={`svc-post rv${i ? ` rv-${Math.min(i + 1, 3)}` : ''}`} key={p.slug}>
                      <div className="svc-post-img">
                        <img src={p.image} alt="" loading="lazy" decoding="async" />
                      </div>
                      <div className="svc-post-body">
                        <span className="fine">{p.readTime} {t('blog.readTime')}</span>
                        <h3>{loc.title}</h3>
                        <p>{loc.excerpt}</p>
                        <span className="more">{t('blog.readMore')}<ArrowIcon /></span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className={`block svc-others${relatedPosts.length > 0 ? ' alt' : ''}`}>
          <div className="wrap">
            <div className="head rv">
              <span className="label">{t('home.tech.label')}</span>
              <h2>{t('pages.service.otherTreatments')}</h2>
            </div>
            <div className="svc-others-grid">
              {others.map((s) => {
                const loc = s[lang] || s.en;
                return (
                  <Link to={localizePath(`/services/${s.slug}`)} className="svc-other rv" key={s.slug}>
                    <span className="svc-other-img"><img src={s.image} alt="" loading="lazy" decoding="async" /></span>
                    <span className="svc-other-title">{loc.title}</span>
                    <ArrowIcon />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="block svc-book-wrap">
          <div className="wrap">
            <div className="svc-book rv">
              <div className="svc-book-copy">
                <span className="label">{t('home.book.label')}</span>
                <h2>{t('servicePage.bookCta')}</h2>
              </div>
              <div className="svc-book-actions">
                <SectionLink hash="contact-form" className="btn svc-book-primary">
                  <CalendarIcon />{t('servicePage.bookCtaButton')}
                </SectionLink>
                <a className="btn svc-book-ghost" href={PHONE_TEL}>
                  <PhoneIcon /><span dir="ltr">{PHONE_DISPLAY}</span>
                </a>
                <a className="btn svc-book-ghost" href={waHref} target="_blank" rel="noopener noreferrer">
                  <ChatIcon />{t('ui.whatsapp')}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
