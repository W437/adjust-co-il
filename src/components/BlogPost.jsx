import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import { setPageSEO } from '../utils/seo';
import { fill, PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from '../utils/format';
import { getPostBySlug, posts } from '../blog';
import Nav from './Nav';
import Footer from './Footer';
import SectionLink from './SectionLink';
import { PostCard, BlogBookingBand } from './BlogList';
import { ArrowIcon, CalendarIcon, ChatIcon, PhoneIcon, SpineDots } from './icons';
import './BlogPost.css';

const headingId = (i) => `h-${i}`;

function ContentRenderer({ content }) {
  return content.map((block, i) => {
    switch (block.type) {
      case 'heading':
        return <h2 key={i} id={headingId(i)}>{block.text}</h2>;
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

function BookingCard() {
  const { t } = useTranslation();
  return (
    <div className="bp-book">
      <SpineDots className="bp-book-dots" />
      <h2>{t('pages.blog.askTitle')}</h2>
      <p>{t('pages.blog.askText')}</p>
      <div className="bp-book-actions">
        <SectionLink hash="contact-form" className="btn btn-primary"><CalendarIcon />{t('blog.bookCtaButton')}</SectionLink>
        <a className="btn btn-ghost" href={PHONE_TEL}><PhoneIcon /><span dir="ltr">{PHONE_DISPLAY}</span></a>
        <a className="btn btn-ghost" href={whatsappUrl(t('ui.waMessage'))} target="_blank" rel="noopener noreferrer"><ChatIcon />{t('ui.whatsapp')}</a>
      </div>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const { lang, t, localizePath } = useTranslation();
  const post = getPostBySlug(slug);
  const localized = post ? (post[lang] || post.en) : null;
  const blogPath = localizePath('/blog');
  const [activeHeading, setActiveHeading] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (localized && post) {
      setPageSEO({
        title: `${localized.title} | ${t('siteTitle')}`,
        description: localized.metaDescription,
        path: `/blog/${post.slug}`,
        image: post.image,
        type: 'article',
        lang,
      });
    }
  }, [localized, post, t, lang]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const heads = document.querySelectorAll('.bp-body h2[id]');
    if (!heads.length) return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveHeading(e.target.id); });
    }, { rootMargin: '-15% 0px -75% 0px' });
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [slug, lang]);

  if (!post) {
    return (
      <>
        <Nav />
        <main className="bp-missing wrap">
          <span className="label">404</span>
          <h1>{t('pages.blog.notFound')}</h1>
          <p>{t('pages.blog.notFoundSub')}</p>
          <Link to={blogPath} className="btn btn-primary">{t('blog.backToBlog')}<ArrowIcon /></Link>
        </main>
        <Footer />
      </>
    );
  }

  const otherPosts = posts.filter((p) => p.slug !== slug).slice(0, 3);
  const toc = localized.content
    .map((block, i) => (block.type === 'heading' ? { id: headingId(i), text: block.text } : null))
    .filter(Boolean);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: localized.title,
    description: localized.metaDescription,
    image: `https://adjust.co.il${post.image}`,
    author: {
      '@type': 'Person',
      name: 'Dr. Victor Duani',
      url: 'https://adjust.co.il',
    },
    datePublished: post.date,
    dateModified: post.reviewed || post.updated || post.date,
    publisher: {
      '@type': 'Organization',
      name: 'adjust · Dr. Victor Duani Chiropractic',
      url: 'https://adjust.co.il',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://adjust.co.il${lang === 'en' ? '/en' : ''}/blog/${post.slug}`,
    },
    inLanguage: lang === 'he' ? 'he-IL' : 'en-US',
  };

  return (
    <>
      <Nav />
      <div className="bp-progress" aria-hidden="true" />
      <main className="bp">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <article>
          <header className="wrap bp-head">
            <Link to={blogPath} className="bp-back">
              <ArrowIcon />{t('blog.backToBlog')}
            </Link>
            <span className="label">{post.readTime} {t('blog.readTime')}</span>
            <h1>{localized.title}</h1>
            <p className="bp-lede">{localized.excerpt}</p>
            <p className="bp-meta">
              {/* Set `reviewed: 'YYYY-MM-DD'` on a post only after Dr. Duani has reviewed it. */}
              {post.reviewed && <>{t('pages.blog.reviewed')} · </>}
              {fill(t('pages.blog.updated'), { d: new Intl.DateTimeFormat(lang === 'he' ? 'he-IL' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.reviewed || post.updated || post.date)) })}
            </p>
          </header>

          <figure className="wrap bp-hero">
            <div className="bp-hero-frame">
              <img src={post.image} alt={localized.title} fetchPriority="high" decoding="async" />
            </div>
          </figure>

          <div className="wrap bp-layout">
            <div className="bp-body">
              {localized.summary && (
                <div className="bp-summary">
                  <h2 className="label">{t('pages.blog.summary')}</h2>
                  <ul>{localized.summary.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              )}
              <ContentRenderer content={localized.content} />
              {localized.sources?.length > 0 && (
                <section className="bp-sources">
                  <h2>{t('pages.blog.sources')}</h2>
                  <ol>
                    {localized.sources.map((s) => (
                      <li key={s.url || s.title}>{s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a> : s.title}</li>
                    ))}
                  </ol>
                </section>
              )}
            </div>

            <aside className="bp-aside">
              <div className="bp-aside-in">
                {toc.length > 1 && (
                  <nav className="bp-toc" aria-labelledby="bp-toc-title">
                    <h2 id="bp-toc-title" className="label">{t('pages.blog.toc')}</h2>
                    <ol>
                      {toc.map((h) => (
                        <li key={h.id}>
                          <a href={`#${h.id}`} aria-current={activeHeading === h.id ? 'true' : undefined}>{h.text}</a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
                <BookingCard />
              </div>
            </aside>
          </div>
        </article>

        {otherPosts.length > 0 && (
          <section className="wrap bp-related" aria-labelledby="bp-related-title">
            <div className="bp-related-head">
              <h2 id="bp-related-title">{t('blog.relatedPosts')}</h2>
              <Link to={blogPath} className="more">{t('pages.blog.all')}<ArrowIcon /></Link>
            </div>
            <div className="bp-related-grid">
              {otherPosts.map((p, i) => <PostCard key={p.slug} post={p} index={i} as="h3" />)}
            </div>
          </section>
        )}

        <BlogBookingBand />
      </main>
      <Footer />
    </>
  );
}
