import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { pageUrls, postMeta, serviceMeta, homeMeta, blogIndexMeta } from '../src/seo/meta.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = join(root, 'dist');
const indexPath = join(distDir, 'index.html');

const SITE_URL = 'https://adjust.co.il';

const en = JSON.parse(readFileSync(join(root, 'src/i18n/en.json'), 'utf8'));
const he = JSON.parse(readFileSync(join(root, 'src/i18n/he.json'), 'utf8'));

async function loadPosts() {
  const files = [
    'understanding-back-pain',
    'posture-digital-age',
    'sports-injury-recovery',
    'sleeping-positions-back-pain',
    'yoga-and-chiropractic',
    'pregnancy-back-pain',
    'what-is-a-chiropractor',
    'chiropractor-vs-osteopath-vs-physiotherapist',
    'how-to-choose-a-chiropractor',
    'is-chiropractic-safe-myths',
    'your-first-chiropractic-appointment',
    'sciatica-relief-without-surgery',
    'herniated-disc-treatment-chiropractic',
    'neck-pain-tension-headaches',
    'whiplash-car-accident-recovery',
    'how-many-chiropractic-sessions-needed',
  ];
  const posts = [];
  for (const f of files) {
    const mod = await import(join(root, 'src/blog/posts', `${f}.js`));
    posts.push(mod.default);
  }
  return posts;
}

async function loadServices() {
  const mod = await import(join(root, 'src/services/index.js'));
  return mod.services;
}

function htmlEscape(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildRouteHtml({ template, lang, dir, title, description, basePath, image, type = 'website', publishedTime, body = '', crumbs = null }) {
  const { he: heUrl, en: enUrl } = pageUrls(basePath);
  const currentUrl = lang === 'en' ? enUrl : heUrl;
  const imageUrl = image
    ? image.startsWith('http') ? image : `${SITE_URL}${image}`
    : `${SITE_URL}/assets/adjust-social-img.jpg`;
  const ogLocale = lang === 'en' ? 'en_US' : 'he_IL';
  const ogLocaleAlt = lang === 'en' ? 'he_IL' : 'en_US';

  let out = template;

  out = out.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const isHome = basePath === '/';
  if (!isHome) {
    // Clinic / Person schema and the hero image preloads describe the home page only.
    out = out.replace(/\n\s*<link rel="preload" as="image"[^>]*>/g, '');
    out = out.replace(/\n\s*<script type="application\/ld\+json">\s*\{[^]*?<\/script>/g, (m) =>
      /"@type":\s*"(Chiropractor|Person)"/.test(m) ? '' : m);
  }
  if (crumbs) {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
    };
    out = out.replace(/<\/head>/, `    <script type="application/ld+json">${JSON.stringify(ld)}</script>\n  </head>`);
  }

  out = out.replace(/<html\s+[^>]*>/, `<html lang="${lang}" dir="${dir}">`);

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${htmlEscape(title)}</title>`);

  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${htmlEscape(description)}" />`,
  );

  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${currentUrl}" />`,
  );

  out = out.replace(/\n\s*<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/?>/g, '');
  const alternates = `
    <link rel="alternate" hreflang="he" href="${heUrl}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="x-default" href="${heUrl}" />`;
  out = out.replace(
    /(<link\s+rel="canonical"[^>]*>)/,
    `$1${alternates}`,
  );

  const ogReplacements = [
    ['og:title', title],
    ['og:description', description],
    ['og:url', currentUrl],
    ['og:image', imageUrl],
    ['og:type', type],
    ['og:locale', ogLocale],
    ['og:locale:alternate', ogLocaleAlt],
  ];
  for (const [prop, val] of ogReplacements) {
    const re = new RegExp(
      `<meta\\s+property="${prop.replace(/:/g, ':')}"\\s+content="[^"]*"\\s*/?>`,
    );
    out = out.replace(re, `<meta property="${prop}" content="${htmlEscape(val)}" />`);
  }

  const twitterReplacements = [
    ['twitter:title', title],
    ['twitter:description', description],
    ['twitter:image', imageUrl],
  ];
  for (const [name, val] of twitterReplacements) {
    const re = new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*/?>`);
    out = out.replace(re, `<meta name="${name}" content="${htmlEscape(val)}" />`);
  }

  if (type === 'article' && publishedTime) {
    out = out.replace(
      /<\/head>/,
      `    <meta property="article:published_time" content="${publishedTime}" />\n  </head>`,
    );
  }

  return out;
}

function writeRoute(distPath, html) {
  const target = join(distDir, distPath, 'index.html');
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
}

async function main() {
  const template = readFileSync(indexPath, 'utf8');
  const posts = await loadPosts();
  const services = await loadServices();
  const { render } = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href);

  const L = {
    he: { dir: 'rtl', home: 'בית', blog: 'בלוג', i18n: he },
    en: { dir: 'ltr', home: 'Home', blog: 'Blog', i18n: en },
  };

  const routes = [];
  const add = (lang, basePath, meta, extra = {}) => {
    const urls = pageUrls(basePath);
    const url = lang === 'en' ? urls.en : urls.he;
    routes.push({
      distPath: new URL(url).pathname.replace(/^\/|\/$/g, '') || '.',
      urlPath: new URL(url).pathname,
      lang,
      dir: L[lang].dir,
      title: meta.title,
      description: meta.description,
      basePath,
      ...extra,
    });
  };
  const crumbsFor = (lang, basePath, trail) => {
    const home = (lang === 'en' ? pageUrls('/').en : pageUrls('/').he);
    const here = lang === 'en' ? pageUrls(basePath).en : pageUrls(basePath).he;
    return [{ name: L[lang].home, url: home }, ...trail, { name: null, url: here }];
  };

  for (const lang of ['he', 'en']) {
    add(lang, '/', homeMeta(lang));
    add(lang, '/blog', blogIndexMeta(lang), {
      crumbs: crumbsFor(lang, '/blog', []).map((c) => ({ ...c, name: c.name || L[lang].blog })),
    });
    for (const [slug, key] of [['privacy', 'privacy'], ['accessibility', 'a11y']]) {
      add(lang, `/${slug}`, {
        title: `${L[lang].i18n.pages[key].title} | adjust`,
        description: L[lang].i18n.pages[key].desc,
      });
    }
  }

  for (const post of posts) {
    for (const lang of ['he', 'en']) {
      const bp = `/blog/${post.slug}`;
      const blogUrl = lang === 'en' ? pageUrls('/blog').en : pageUrls('/blog').he;
      add(lang, bp, postMeta(post, lang), {
        image: post.image,
        type: 'article',
        publishedTime: post.date,
        crumbs: crumbsFor(lang, bp, [{ name: L[lang].blog, url: blogUrl }]).map((c) => ({
          ...c,
          name: c.name || (post[lang] || post.en).title,
        })),
      });
    }
  }

  for (const svc of services) {
    for (const lang of ['he', 'en']) {
      const bp = `/services/${svc.slug}`;
      add(lang, bp, serviceMeta(svc, lang), {
        image: svc.image,
        crumbs: crumbsFor(lang, bp, []).map((c) => ({ ...c, name: c.name || (svc[lang] || svc.en).title })),
      });
    }
  }

  let count = 0;
  let empty = 0;
  for (const r of routes) {
    const body = render(r.urlPath);
    if (!/<h1[\s>]/.test(body)) { empty++; console.warn(`  ! no <h1> rendered for ${r.urlPath}`); }
    const html = buildRouteHtml({ template, body, ...r });
    writeRoute(r.distPath, html);
    count++;
  }

  console.log(`✓ Prerendered ${count} routes (${empty} without an h1)`);
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
