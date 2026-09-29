import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = join(root, 'dist');
const SITE_URL = 'https://adjust.co.il';

const POST_FILES = [
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

async function loadPosts() {
  const posts = [];
  for (const f of POST_FILES) {
    const mod = await import(join(root, 'src/blog/posts', `${f}.js`));
    posts.push(mod.default);
  }
  return posts;
}

async function loadServices() {
  const mod = await import(join(root, 'src/services/index.js'));
  return mod.services;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function urlEntry({ loc, lastmod, changefreq, priority, heHref, enHref }) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="he" href="${heHref}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enHref}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${heHref}" />
  </url>`;
}

async function main() {
  const posts = await loadPosts();
  const services = await loadServices();
  const buildDate = today();

  const entries = [];

  for (const path of ['/', '/en']) {
    entries.push(
      urlEntry({
        loc: `${SITE_URL}${path}`,
        lastmod: buildDate,
        changefreq: 'weekly',
        priority: '1.0',
        heHref: `${SITE_URL}/`,
        enHref: `${SITE_URL}/en`,
      }),
    );
  }

  for (const path of ['/blog', '/en/blog']) {
    entries.push(
      urlEntry({
        loc: `${SITE_URL}${path}`,
        lastmod: buildDate,
        changefreq: 'weekly',
        priority: '0.8',
        heHref: `${SITE_URL}/blog`,
        enHref: `${SITE_URL}/en/blog`,
      }),
    );
  }

  for (const post of posts) {
    const heUrl = `${SITE_URL}/blog/${post.slug}`;
    const enUrl = `${SITE_URL}/en/blog/${post.slug}`;
    entries.push(
      urlEntry({
        loc: heUrl,
        lastmod: post.date,
        changefreq: 'monthly',
        priority: '0.7',
        heHref: heUrl,
        enHref: enUrl,
      }),
    );
    entries.push(
      urlEntry({
        loc: enUrl,
        lastmod: post.date,
        changefreq: 'monthly',
        priority: '0.7',
        heHref: heUrl,
        enHref: enUrl,
      }),
    );
  }

  for (const svc of services) {
    const heUrl = `${SITE_URL}/services/${svc.slug}`;
    const enUrl = `${SITE_URL}/en/services/${svc.slug}`;
    entries.push(
      urlEntry({
        loc: heUrl,
        lastmod: buildDate,
        changefreq: 'monthly',
        priority: '0.8',
        heHref: heUrl,
        enHref: enUrl,
      }),
    );
    entries.push(
      urlEntry({
        loc: enUrl,
        lastmod: buildDate,
        changefreq: 'monthly',
        priority: '0.8',
        heHref: heUrl,
        enHref: enUrl,
      }),
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

  writeFileSync(join(distDir, 'sitemap.xml'), xml);
  console.log(`✓ Generated sitemap.xml with ${entries.length} URLs`);
}

main().catch((err) => {
  console.error('Sitemap generation failed:', err);
  process.exit(1);
});
