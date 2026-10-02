import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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

function buildRouteHtml({ template, lang, dir, title, description, basePath, image, type = 'website', publishedTime }) {
  const heUrl = `${SITE_URL}${basePath === '/' ? '/' : basePath}`;
  const enUrl = `${SITE_URL}/en${basePath === '/' ? '' : basePath}`;
  const currentUrl = lang === 'en' ? enUrl : heUrl;
  const imageUrl = image
    ? image.startsWith('http') ? image : `${SITE_URL}${image}`
    : `${SITE_URL}/assets/adjust-social-img.jpg`;
  const ogLocale = lang === 'en' ? 'en_US' : 'he_IL';
  const ogLocaleAlt = lang === 'en' ? 'he_IL' : 'en_US';

  let out = template;

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

  const routes = [];

  routes.push({
    distPath: '.',
    lang: 'he',
    dir: 'rtl',
    title: he.siteTitle,
    description: he.metaDescription,
    basePath: '/',
  });
  routes.push({
    distPath: 'en',
    lang: 'en',
    dir: 'ltr',
    title: en.siteTitle,
    description: en.metaDescription,
    basePath: '/',
  });

  routes.push({
    distPath: 'blog',
    lang: 'he',
    dir: 'rtl',
    title: `${he.blog.title} | ${he.siteTitle}`,
    description: he.blog.subtitle,
    basePath: '/blog',
  });
  routes.push({
    distPath: 'en/blog',
    lang: 'en',
    dir: 'ltr',
    title: `${en.blog.title} | ${en.siteTitle}`,
    description: en.blog.subtitle,
    basePath: '/blog',
  });

  for (const [slug, key] of [['privacy', 'privacy'], ['accessibility', 'a11y']]) {
    routes.push({
      distPath: slug,
      lang: 'he',
      dir: 'rtl',
      title: `${he.pages[key].title} | ${he.siteTitle}`,
      description: he.pages[key].desc,
      basePath: `/${slug}`,
    });
    routes.push({
      distPath: `en/${slug}`,
      lang: 'en',
      dir: 'ltr',
      title: `${en.pages[key].title} | ${en.siteTitle}`,
      description: en.pages[key].desc,
      basePath: `/${slug}`,
    });
  }

  for (const post of posts) {
    routes.push({
      distPath: `blog/${post.slug}`,
      lang: 'he',
      dir: 'rtl',
      title: `${post.he.title} | ${he.siteTitle}`,
      description: post.he.metaDescription,
      basePath: `/blog/${post.slug}`,
      image: post.image,
      type: 'article',
    });
    routes.push({
      distPath: `en/blog/${post.slug}`,
      lang: 'en',
      dir: 'ltr',
      title: `${post.en.title} | ${en.siteTitle}`,
      description: post.en.metaDescription,
      basePath: `/blog/${post.slug}`,
      image: post.image,
      type: 'article',
    });
  }

  for (const svc of services) {
    routes.push({
      distPath: `services/${svc.slug}`,
      lang: 'he',
      dir: 'rtl',
      title: `${svc.he.title} | ${he.siteTitle}`,
      description: svc.he.metaDescription,
      basePath: `/services/${svc.slug}`,
      image: svc.image,
    });
    routes.push({
      distPath: `en/services/${svc.slug}`,
      lang: 'en',
      dir: 'ltr',
      title: `${svc.en.title} | ${en.siteTitle}`,
      description: svc.en.metaDescription,
      basePath: `/services/${svc.slug}`,
      image: svc.image,
    });
  }

  let count = 0;
  for (const r of routes) {
    const html = buildRouteHtml({ template, ...r });
    writeRoute(r.distPath, html);
    count++;
  }

  console.log(`✓ Prerendered ${count} routes`);
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
