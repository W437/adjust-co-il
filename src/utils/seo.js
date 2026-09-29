const SITE_URL = 'https://adjust.co.il';
const DEFAULT_IMAGE = `${SITE_URL}/assets/adjust-social-img.jpg`;

function setMeta(selector, attr, value) {
  if (value == null) return;
  let el = document.head.querySelector(selector);
  if (!el) {
    const match = selector.match(/\[(name|property)="([^"]+)"\]/);
    if (!match) return;
    const [, matchAttr, key] = match;
    el = document.createElement('meta');
    el.setAttribute(matchAttr, key);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel, href, attrs = {}) {
  if (href == null) return;
  const hreflang = attrs.hreflang;
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeMeta(selector) {
  const el = document.head.querySelector(selector);
  if (el) el.remove();
}

function buildUrls(basePath) {
  const clean = basePath === '/' ? '' : basePath;
  return {
    he: `${SITE_URL}${clean || '/'}`,
    en: `${SITE_URL}/en${clean}`,
  };
}

export function setPageSEO({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  publishedTime,
  lang = 'he',
}) {
  const urls = buildUrls(path);
  const currentUrl = lang === 'en' ? urls.en : urls.he;
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${SITE_URL}${image}`
    : DEFAULT_IMAGE;

  if (title) document.title = title;

  setMeta('meta[name="description"]', 'content', description);

  setLink('canonical', currentUrl);

  setLink('alternate', urls.he, { hreflang: 'he' });
  setLink('alternate', urls.en, { hreflang: 'en' });
  setLink('alternate', urls.he, { hreflang: 'x-default' });

  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', currentUrl);
  setMeta('meta[property="og:image"]', 'content', imageUrl);
  setMeta('meta[property="og:type"]', 'content', type);
  setMeta('meta[property="og:locale"]', 'content', lang === 'he' ? 'he_IL' : 'en_US');
  setMeta(
    'meta[property="og:locale:alternate"]',
    'content',
    lang === 'he' ? 'en_US' : 'he_IL',
  );

  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:image"]', 'content', imageUrl);
  setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');

  if (type === 'article' && publishedTime) {
    setMeta('meta[property="article:published_time"]', 'content', publishedTime);
  } else {
    removeMeta('meta[property="article:published_time"]');
  }
}
