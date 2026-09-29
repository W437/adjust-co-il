import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import { setPageSEO } from '../utils/seo';
import { fill, PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from '../utils/format';
import { posts } from '../blog';
import Nav from './Nav';
import Footer from './Footer';
import SectionLink from './SectionLink';
import { ArrowIcon, CalendarIcon, ChatIcon, PhoneIcon, SpineDots } from './icons';
import './BlogList.css';

const STAGGER = ['', ' rv-2', ' rv-3'];

export function PostCard({ post, index = 0, as = 'h2' }) {
  const Heading = as;
  const { lang, t, localizePath } = useTranslation();
  const loc = post[lang] || post.en;
  return (
    <Link to={localizePath(`/blog/${post.slug}`)} className={`post-card rv${STAGGER[index % 3]}`}>
      <div className="post-card-img">
        <img src={post.image} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="post-card-body">
        <span className="post-card-meta">{post.readTime} {t('blog.readTime')}</span>
        <Heading className="post-card-title">{loc.title}</Heading>
        <p className="post-card-excerpt">{loc.excerpt}</p>
        <span className="more">{t('blog.readMore')}<ArrowIcon /></span>
      </div>
    </Link>
  );
}

export function BlogBookingBand() {
  const { t } = useTranslation();
  return (
    <section className="wrap blog-band-wrap" aria-labelledby="blog-band-title">
      <div className="blog-band rv">
        <SpineDots className="blog-band-dots" />
        <div className="blog-band-copy">
          <span className="label">{t('home.book.label')}</span>
          <h2 id="blog-band-title">{t('blog.bookCta')}</h2>
          <p>{t('home.book.p')}</p>
        </div>
        <div className="blog-band-actions">
          <SectionLink hash="contact-form" className="btn btn-primary">
            <CalendarIcon />{t('blog.bookCtaButton')}
          </SectionLink>
          <a className="btn btn-onink" href={PHONE_TEL}>
            <PhoneIcon /><span dir="ltr">{PHONE_DISPLAY}</span>
          </a>
          <a className="btn btn-onink" href={whatsappUrl(t('ui.waMessage'))} target="_blank" rel="noopener noreferrer">
            <ChatIcon />{t('ui.whatsapp')}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function BlogList() {
  const { lang, t, localizePath } = useTranslation();

  useEffect(() => {
    setPageSEO({
      title: `${t('blog.title')} | ${t('siteTitle')}`,
      description: t('blog.subtitle'),
      path: '/blog',
      type: 'website',
      lang,
    });
    window.scrollTo(0, 0);
  }, [t, lang]);

  const [featured, ...rest] = posts;
  const f = featured[lang] || featured.en;

  return (
    <>
      <Nav />
      <main className="blog-list">
        <header className="wrap blog-list-head">
          <span className="label">{t('pages.blog.eyebrow')}</span>
          <h1>{t('pages.blog.h1')}</h1>
          <p>{t('blog.subtitle')}</p>
          <span className="blog-list-count">{fill(t('pages.blog.count'), { n: posts.length })}</span>
        </header>

        <section className="wrap" aria-label={t('pages.blog.latest')}>
          <Link to={localizePath(`/blog/${featured.slug}`)} className="post-featured rv">
            <div className="post-featured-img">
              <img src={featured.image} alt="" fetchPriority="high" decoding="async" />
            </div>
            <div className="post-featured-body">
              <span className="label">{t('pages.blog.latest')}</span>
              <h2>{f.title}</h2>
              <p>{f.excerpt}</p>
              <div className="post-featured-foot">
                <span className="post-card-meta">{featured.readTime} {t('blog.readTime')}</span>
                <span className="more">{t('blog.readMore')}<ArrowIcon /></span>
              </div>
            </div>
          </Link>
        </section>

        <section className="wrap blog-grid-wrap" aria-label={t('blog.title')}>
          <div className="post-grid">
            {rest.map((post, i) => <PostCard key={post.slug} post={post} index={i} />)}
          </div>
        </section>

        <BlogBookingBand />
      </main>
      <Footer />
    </>
  );
}
