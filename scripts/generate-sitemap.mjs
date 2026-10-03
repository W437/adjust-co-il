import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { pageUrls } from '../src/seo/meta.js';

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

// lastmod reflects real content changes (last commit touching src/), not the
// build date, so Google can trust it.
function lastCommitDate() {
  try {
    return execSync('git log -1 --format=%cs -- src', { cwd: root }).toString().trim();
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function urlEntry({ loc, lastmod, heHref, enHref }) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="he" href="${heHref}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enHref}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${heHref}" />
  </url>`;
}

async function main() {
  const posts = await loadPosts();
  const services = await loadServices();
  const siteDate = lastCommitDate();

  const entries = [];
  const pair = (basePath, lastmod) => {
    const { he, en } = pageUrls(basePath);
    for (const loc of [he, en]) entries.push(urlEntry({ loc, lastmod, heHref: he, enHref: en }));
  };

  pair('/', siteDate);
  pair('/blog', siteDate);
  for (const post of posts) pair(`/blog/${post.slug}`, post.updated || post.date);
  for (const svc of services) pair(`/services/${svc.slug}`, siteDate);

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
