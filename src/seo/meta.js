// Single source of truth for <title> / meta description, used at runtime
// (setPageSEO) and at build time (scripts/prerender.mjs). Titles are kept
// under ~60 characters so Google does not truncate them; descriptions under ~160.

export const SITE_URL = 'https://adjust.co.il';
export const BRAND = 'adjust';

// Home copy is the owner-approved wording (i18n siteTitle / metaDescription):
// "Ramat Aviv and Tuval near Karmiel", never implying the clinic is in Karmiel.
export const HOME = {
  he: {
    title: 'ד״ר ויקטור דואני | כירופרקט ברמת אביב ובתובל ליד כרמיאל',
    description:
      'כירופרקטיקה שיקומית לכאבי גב וצוואר עם ד״ר ויקטור דואני: אבחון, טיפול ותוכנית תנועה אישית. קליניקות ברמת אביב (תל אביב) ובתובל ליד כרמיאל.',
  },
  en: {
    title: 'Dr. Victor Duani | Chiropractor in Ramat Aviv and Tuval near Karmiel',
    description:
      'Rehabilitative chiropractic for back and neck pain with Dr. Victor Duani: diagnosis, treatment and a personal movement plan. Clinics in Ramat Aviv (Tel Aviv) and Tuval near Karmiel.',
  },
};

export const BLOG_INDEX = {
  he: {
    title: 'בלוג כירופרקטיקה: מדריכים לכאבי גב וצוואר',
    description:
      'מדריכים מעשיים מאת ד״ר ויקטור דואני: כאבי גב, סיאטיקה, פריצת דיסק, כאבי צוואר וראש, יציבה והריון. מה לצפות, מתי לפנות ומה אפשר לעשות לבד.',
  },
  en: {
    title: 'Chiropractic Blog: Back & Neck Pain Guides',
    description:
      'Practical guides by Dr. Victor Duani: back pain, sciatica, herniated disc, neck pain and headaches, posture and pregnancy. What to expect and when to see someone.',
  },
};

// slug -> per-language { title, description? }. `description` only where the
// post's own metaDescription is too long or misses the main search phrase.
const POSTS = {
  'understanding-back-pain': {
    he: { title: 'כאבי גב כרוניים: גורמים, טיפול ומניעה' },
    en: { title: 'Chronic Back Pain: Causes, Treatment & Prevention' },
  },
  'posture-digital-age': {
    he: { title: 'יציבה ובריאות עמוד השדרה בעידן הדיגיטלי' },
    en: {
      title: 'Posture & Spine Health in the Digital Age',
      description:
        'How tech neck and poor posture affect the spine: ergonomic workspace tips, corrective exercises and chiropractic posture care with Dr. Duani.',
    },
  },
  'sports-injury-recovery': {
    he: { title: 'שיקום מפציעות ספורט: הגישה הכירופרקטית' },
    en: {
      title: 'Sports Injury Recovery: A Chiropractic Approach',
      description:
        'Dr. Victor Duani explains how chiropractic care, dry needling and athletic rehabilitation can support recovery from sports injuries.',
    },
  },
  'sleeping-positions-back-pain': {
    he: { title: 'תנוחות שינה שעוזרות (ומזיקות) לכאבי גב' },
    en: { title: 'Best (and Worst) Sleeping Positions for Back Pain' },
  },
  'yoga-and-chiropractic': {
    he: { title: 'יוגה וכירופרקטיקה: איך משלבים לבריאות הגב' },
    en: { title: 'Yoga and Chiropractic: How They Work Together' },
  },
  'pregnancy-back-pain': {
    he: {
      title: 'כירופרקט בהריון: כאבי גב וטיפול בטוח',
      description:
        'כירופרקט בהריון: איך טיפול עדין יכול להקל על כאבי גב, מפרק SI ואגן, מתי מתאים ומתי כדאי להתייעץ קודם עם הרופא או המיילדת.',
    },
    en: { title: 'Chiropractor in Pregnancy: Back Pain & Safe Care' },
  },
  'what-is-a-chiropractor': {
    he: { title: 'מה זה כירופרקטור? מדריך למטופלים חדשים' },
    en: {
      title: 'What Is a Chiropractor? A Guide for New Patients',
      description:
        'What is a chiropractor? How chiropractic care works, what it treats and who it suits. A first-time patient guide by Dr. Victor Duani.',
    },
  },
  'chiropractor-vs-osteopath-vs-physiotherapist': {
    he: { title: 'כירופרקט, אוסטאופת או פיזיותרפיסט: למי לפנות?' },
    en: {
      title: 'Chiropractor vs Osteopath vs Physiotherapist',
      description:
        'Chiropractor, osteopath or physiotherapist: what is the real difference, and who to see for back pain, a sports injury or chronic pain?',
    },
  },
  'how-to-choose-a-chiropractor': {
    he: { title: 'איך לבחור כירופרקט: 8 שאלות לפני הביקור הראשון' },
    en: {
      title: 'How to Choose a Chiropractor: 8 Questions to Ask',
      description:
        '8 essential questions to ask before your first chiropractic visit. How to spot careful, evidence-based practitioners and avoid quick-fix traps.',
    },
  },
  'is-chiropractic-safe-myths': {
    he: { title: 'האם כירופרקטיקה מסוכנת? 7 מיתוסים ומה הראיות' },
    en: {
      title: 'Is Chiropractic Safe? 7 Common Myths, Checked',
      description:
        'Is chiropractic treatment safe? A practitioner looks at 7 common myths: the cracking sound, stroke risk and long-term effects, with evidence.',
    },
  },
  'your-first-chiropractic-appointment': {
    he: { title: 'הביקור הראשון אצל כירופרקט: מה לצפות' },
    en: {
      title: 'Your First Chiropractic Appointment: What to Expect',
      description:
        'What happens at a first chiropractic appointment? A step-by-step guide to the consultation, examination, first treatment and what to expect after.',
    },
  },
  'sciatica-relief-without-surgery': {
    he: { title: 'סיאטיקה: מה טיפול כירופרקטי יכול ולא יכול לתת' },
    en: { title: 'Sciatica: What Chiropractic Care Can and Can\'t Do' },
  },
  'herniated-disc-treatment-chiropractic': {
    he: {
      title: 'כירופרקט לפריצת דיסק: מה אפשר ומה לא',
      description:
        'כירופרקט לפריצת דיסק: איך נראה טיפול שמרני, שיקום והדרכה, מתי הוא מתאים ומתי צריך הפניה לרופא. מדריך מאת ד״ר ויקטור דואני.',
    },
    en: {
      title: 'Herniated Disc: Can a Chiropractor Help?',
      description:
        'Herniated disc and chiropractic care: what conservative treatment and rehabilitation involve, when it suits and when to be referred. By Dr. Duani.',
    },
  },
  'neck-pain-tension-headaches': {
    he: {
      title: 'כאבים בעורף ובראש: הקשר לעמוד השדרה הצווארי',
      description:
        'כאבים בעורף ובראש קשורים לפעמים לעמוד השדרה הצווארי. מתי הצוואר מעורב, איך נראית בדיקה ומה כירופרקטיקה יכולה להציע. מאת ד״ר ויקטור דואני.',
    },
    en: {
      title: 'Neck Pain and Tension Headaches: The Connection',
      description:
        'Neck pain and tension headaches are sometimes linked through the cervical spine. When the neck may be involved and how chiropractic care helps.',
    },
  },
  'whiplash-car-accident-recovery': {
    he: {
      title: 'צליפת שוט אחרי תאונת דרכים: טיפול והחלמה',
      description:
        'צליפת שוט אחרי תאונת דרכים: מה לעשות בימים הראשונים, טעויות נפוצות, איך נראה טיפול כירופרקטי ומתי מצפים להחלמה. מאת ד״ר ויקטור דואני.',
    },
    en: {
      title: 'Whiplash & Car Accident Recovery Guide',
      description:
        'Whiplash after a car accident: what to do in the first days, common mistakes, what chiropractic treatment involves and when to expect recovery.',
    },
  },
  'how-many-chiropractic-sessions-needed': {
    he: { title: 'כמה טיפולי כירופרקטיקה צריך? תשובה הוגנת' },
    en: {
      title: 'How Many Chiropractic Sessions Do You Need?',
      description:
        'How many chiropractic sessions do you need? An honest, realistic breakdown by condition: back pain, sciatica, disc, neck pain and headaches.',
    },
  },
};

const SERVICES = {
  'classic-chiropractic': {
    he: {
      title: 'כירופרקטיקה קלאסית ברמת אביב ובתובל',
      description:
        'כירופרקטיקה קלאסית עם ד״ר ויקטור דואני: התאמות מדויקות של עמוד השדרה שמטרתן לשפר את תנועת המפרקים ולהקל על כאבי גב וצוואר. קליניקות ברמת אביב ובתובל.',
    },
    en: {
      title: 'Classic Chiropractic in Ramat Aviv & Tuval',
      description:
        'Classic chiropractic with Dr. Victor Duani: precise spinal adjustments aimed at easing joint restriction and back and neck pain. Clinics in Ramat Aviv and Tuval.',
    },
  },
  'dry-needling-ims': {
    he: {
      title: 'דיקור יבש ו-IMS ברמת אביב ובתובל',
      description:
        'דיקור יבש ו-IMS עם ד״ר ויקטור דואני: טיפול ממוקד בנקודות הדק שמשחרר מתח שרירי עמוק וכאב מתמשך. קליניקות ברמת אביב ובתובל.',
    },
    en: {
      title: 'Dry Needling & IMS in Ramat Aviv & Tuval',
      description:
        'Dry needling and IMS with Dr. Victor Duani: targeted trigger-point therapy for deep muscular tension and chronic pain. Clinics in Ramat Aviv and Tuval.',
    },
  },
  'kinesio-neurodynamic-taping': {
    he: {
      title: 'טייפינג קינזיו ונוירודינמי',
      description:
        'טייפינג קינזיו ונוירודינמי עם ד״ר ויקטור דואני: הדבקה אסטרטגית שתומכת בשרירים ומאריכה את הטיפול בין הביקורים. קליניקות ברמת אביב ובתובל.',
    },
    en: {
      title: 'Kinesio & Neurodynamic Taping',
      description:
        'Kinesio and neurodynamic taping with Dr. Victor Duani: strategic taping that supports muscles and extends treatment between visits. Clinics in Ramat Aviv and Tuval.',
    },
  },
  'yoga-based-rehabilitation': {
    he: {
      title: 'שיקום מבוסס יוגה',
      description:
        'שיקום מבוסס יוגה עם ד״ר ויקטור דואני: מתיחות ותרגילים ממוקדים להקלה על כאב, שיפור ניידות ושיקום ארוך טווח של עמוד השדרה. קליניקות ברמת אביב ובתובל.',
    },
    en: {
      title: 'Yoga-Based Rehabilitation',
      description:
        'Yoga-based rehabilitation with Dr. Victor Duani: targeted stretches and exercises for pain relief, mobility and lasting spinal recovery. Clinics in Ramat Aviv and Tuval.',
    },
  },
  'fascia-release': {
    he: {
      title: 'שחרור פסציה (פסיופאשיאלי)',
      description:
        'שחרור פסציה עם ד״ר ויקטור דואני: טיפול ידני שעובד על הידבקויות ועל גמישות הרקמה כדי לשפר תנועה. קליניקות ברמת אביב ובתובל.',
    },
    en: {
      title: 'Fascia Release (Myofascial) Therapy',
      description:
        'Fascia release with Dr. Victor Duani: manual treatment that works on adhesions and tissue elasticity to improve movement. Clinics in Ramat Aviv and Tuval.',
    },
  },
  'posture-improvement': {
    he: {
      title: 'שיפור יציבה ברמת אביב ובתובל',
      description:
        'שיפור יציבה עם ד״ר ויקטור דואני: אבחון יציבה מלא וטיפול מתקן לחוסר איזון מעבודה מול מסך, פציעות והרגלי יום-יום. קליניקות ברמת אביב ובתובל.',
    },
    en: {
      title: 'Posture Improvement in Ramat Aviv & Tuval',
      description:
        'Posture improvement with Dr. Victor Duani: full postural assessment and corrective therapy for desk work, injury and daily habits. Clinics in Ramat Aviv and Tuval.',
    },
  },
};

const withBrand = (title) => `${title} | ${BRAND}`;

export function postMeta(post, lang) {
  const o = POSTS[post.slug]?.[lang] || {};
  const loc = post[lang] || post.en;
  return {
    title: withBrand(o.title || loc.title),
    description: o.description || loc.metaDescription,
  };
}

export function serviceMeta(service, lang) {
  const o = SERVICES[service.slug]?.[lang] || {};
  const loc = service[lang] || service.en;
  return {
    title: withBrand(o.title || loc.title),
    description: o.description || loc.metaDescription,
  };
}

export function homeMeta(lang) {
  return HOME[lang];
}

export function blogIndexMeta(lang) {
  return { title: withBrand(BLOG_INDEX[lang].title), description: BLOG_INDEX[lang].description };
}

// Canonical URL form: the host (Netlify) 301-redirects every non-root path to
// its trailing-slash version, so canonicals, hreflang, sitemap and og:url must
// all use the slash form.
export function pageUrls(basePath) {
  const clean = basePath === '/' || basePath === '' ? '' : `${basePath.replace(/\/+$/, '')}/`;
  return {
    he: `${SITE_URL}${clean || '/'}`,
    en: `${SITE_URL}/en/${clean ? clean.slice(1) : ''}`,
  };
}
