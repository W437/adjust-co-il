// Copy and data for the two clinic landing pages (/clinics/<slug>/).
// Facts come only from what the site already states: addresses, per-clinic
// hours (src/utils/clinics.js), by-arrangement visits, and the treatments the
// site lists. Tuval is always "near Karmiel", never "in Karmiel".
export const CLINIC_SLUGS = ['tuval', 'ramat-aviv'];

const COMMON_LINKS = {
  he: {
    conditions: [
      ['כאבי גב וסיאטיקה', '/blog/sciatica-relief-without-surgery'],
      ['פריצת דיסק', '/blog/herniated-disc-treatment-chiropractic'],
      ['כאבי צוואר וכאבי ראש', '/blog/neck-pain-tension-headaches'],
      ['צליפת שוט אחרי תאונה', '/blog/whiplash-car-accident-recovery'],
      ['פציעות ספורט', '/blog/sports-injury-recovery'],
      ['יציבה', '/services/posture-improvement'],
    ],
  },
  en: {
    conditions: [
      ['Back pain and sciatica', '/blog/sciatica-relief-without-surgery'],
      ['Herniated disc', '/blog/herniated-disc-treatment-chiropractic'],
      ['Neck pain and headaches', '/blog/neck-pain-tension-headaches'],
      ['Whiplash after an accident', '/blog/whiplash-car-accident-recovery'],
      ['Sports injuries', '/blog/sports-injury-recovery'],
      ['Posture', '/services/posture-improvement'],
    ],
  },
};

export const CLINIC_PAGES = {
  tuval: {
    id: 'tu',
    slug: 'tuval',
    image: { src: '/assets/clinic/tu-green-wide.webp', width: 1600, height: 768 },
    image2: { src: '/assets/clinic/tu-green-square.webp', width: 1536, height: 1536 },
    schema: {
      nodeId: 'https://adjust.co.il/#clinic-tuval',
      address: { addressLocality: 'תובל', addressRegion: 'צפון', addressCountry: 'IL' },
      hours: [
        { days: ['Monday', 'Wednesday'], opens: '08:00', closes: '14:00' },
        { days: ['Monday', 'Wednesday'], opens: '16:00', closes: '20:00' },
        { days: ['Friday'], opens: '07:00', closes: '14:00' },
      ],
    },
    he: {
      crumb: 'הקליניקה בתובל',
      title: 'כירופרקט בצפון: הקליניקה בתובל, ליד כרמיאל',
      description:
        'הקליניקה של ד״ר ויקטור דואני בתובל, ליד כרמיאל: כירופרקטיקה שיקומית לכאבי גב וצוואר, פריצת דיסק וסיאטיקה. שעות קבלה, הגעה ב-Waze וקביעת תור.',
      eyebrow: 'הקליניקה בתובל',
      h1: 'כירופרקט בצפון: הקליניקה בתובל, ליד כרמיאל',
      lede:
        'ד״ר ויקטור דואני מקבל בתובל, ליד כרמיאל, מטופלים עם כאבי גב וצוואר, פריצת דיסק, סיאטיקה ופציעות ספורט. כל הביקורים בתיאום מראש, ובאיזו קליניקה מקבלים בכל יום נתאם איתכם בטלפון.',
      imageAlt: 'חדר הטיפולים בקליניקה בתובל: שולחן עץ עם מחשב נייד, כיסאות, כרית צוואר ורודה על שולחן הטיפולים וקיר ירוק',
      image2Alt: 'פינת העבודה בקליניקה בתובל, עם קיר ירוק, שולחן עץ וכדור פיזיותרפיה',
      addressLine: 'תובל (ליד כרמיאל)',
      getH: 'איך מגיעים',
      getP:
        'הקליניקה נמצאת בתובל, ליד כרמיאל. לניווט אפשר לפתוח את הכתובת ב-Waze, ואם צריך עזרה בדרך אפשר להתקשר אלינו.',
      treatH: 'במה מטפלים בקליניקה',
      treatP:
        'הטיפול משלב אבחון, טיפול ידני והדרכה לתרגול בבית, ומותאם לכל מטופל. לקריאה נוספת על כל נושא:',
      hoursH: 'שעות קבלה בתובל',
      hoursNote: 'כל הביקורים בתיאום מראש בלבד. באיזו קליניקה מקבלים בכל יום נתאם איתכם בטלפון.',
      babyH: 'טיפול בתינוקות',
      babyP: 'ד״ר דואני מטפל גם בתינוקות, בזהירות ועם שיחה פתוחה עם ההורים.',
      babyLink: 'כירופרקטיקה לתינוקות',
      visitH: 'הביקור הראשון',
      visitP:
        'בביקור הראשון מתחילים בשיחה ובבדיקה, ורק אחר כך מחליטים על המשך. מה קורה בפגישה ראשונה וכמה טיפולים צריך בדרך כלל, אפשר לקרוא כאן:',
      visitLinks: [
        ['הביקור הראשון אצל כירופרקט', '/blog/your-first-chiropractic-appointment'],
        ['כמה טיפולי כירופרקטיקה צריך', '/blog/how-many-chiropractic-sessions-needed'],
      ],
      otherH: 'גם ברמת אביב',
      otherP: 'ד״ר דואני מקבל גם בקליניקה ברמת אביב, בצפון תל אביב.',
      otherLink: 'הקליניקה ברמת אביב',
      faqH: 'שאלות נפוצות',
      faq: [
        ['צריך לתאם תור מראש?', 'כן. כל הביקורים בתיאום מראש בלבד, בטלפון או בוואטסאפ.'],
        ['באיזו קליניקה אקבל ביום מסוים?', 'באיזו קליניקה מקבלים בכל יום נתאם איתכם בטלפון, כך שלא תגיעו לקליניקה הלא נכונה.'],
        ['אפשר להגיע מכרמיאל, ממשגב או מהקריות?', 'אפשר. הקליניקה בתובל, ליד כרמיאל, ומי שגר בגליל או בקריות מוזמן לתאם תור בטלפון או בוואטסאפ.'],
      ],
      ctaH: 'לקביעת תור בתובל',
      ctaP: 'כתבו לנו בוואטסאפ או התקשרו, ונתאם יום ושעה.',
    },
    en: {
      crumb: 'Tuval clinic',
      title: 'Chiropractor in the North: Tuval Clinic, near Karmiel',
      description:
        'Dr. Victor Duani’s clinic in Tuval, near Karmiel: rehabilitative chiropractic for back and neck pain, herniated disc and sciatica. Hours, directions and booking.',
      eyebrow: 'Tuval clinic',
      h1: 'Chiropractor in the North: Tuval Clinic, near Karmiel',
      lede:
        'Dr. Victor Duani sees patients in Tuval, near Karmiel, for back and neck pain, herniated disc, sciatica and sports injuries. All visits are by prior arrangement, and we confirm by phone which clinic you will be seen at on each day.',
      imageAlt: 'Treatment room at the Tuval clinic: a wooden desk with a laptop, chairs, a pink neck pillow on the treatment table and a green wall',
      image2Alt: 'The work corner at the Tuval clinic, with a green wall, a wooden desk and a physio ball',
      addressLine: 'Tuval (near Karmiel)',
      getH: 'Getting here',
      getP:
        'The clinic is in Tuval, near Karmiel. Open the address in Waze for directions, and call us if you need help on the way.',
      treatH: 'What we treat',
      treatP:
        'Care combines assessment, hands-on treatment and guidance for exercises at home, and is adapted to each patient. Read more on each topic:',
      hoursH: 'Reception hours in Tuval',
      hoursNote: 'All visits are by prior arrangement only. We’ll confirm by phone which clinic you’ll be seen at on each day.',
      babyH: 'Care for babies',
      babyP: 'Dr. Duani also sees babies, carefully and with an open conversation with the parents.',
      babyLink: 'Chiropractic for babies',
      visitH: 'Your first visit',
      visitP:
        'The first visit starts with a conversation and an examination, and only then do we decide on next steps. What happens at a first appointment, and how many sessions people usually need:',
      visitLinks: [
        ['Your first chiropractic appointment', '/blog/your-first-chiropractic-appointment'],
        ['How many chiropractic sessions do you need?', '/blog/how-many-chiropractic-sessions-needed'],
      ],
      otherH: 'Also in Ramat Aviv',
      otherP: 'Dr. Duani also sees patients at the Ramat Aviv clinic in north Tel Aviv.',
      otherLink: 'Ramat Aviv clinic',
      faqH: 'Frequently asked questions',
      faq: [
        ['Do I need to book in advance?', 'Yes. All visits are by prior arrangement only, by phone or WhatsApp.'],
        ['Which clinic will I be seen at on a given day?', 'We confirm by phone which clinic you will be seen at on each day, so you do not go to the wrong one.'],
        ['Can I come from Karmiel, Misgav or the Krayot?', 'Yes. The clinic is in Tuval, near Karmiel, and anyone in the Galilee or the Krayot is welcome to book by phone or WhatsApp.'],
      ],
      ctaH: 'Book a visit in Tuval',
      ctaP: 'Message us on WhatsApp or call, and we’ll arrange a day and time.',
    },
  },
  'ramat-aviv': {
    id: 'ta',
    slug: 'ramat-aviv',
    image: { src: '/assets/clinic/ra-desk-corner.webp', width: 1344, height: 1536 },
    image2: { src: '/assets/clinic/ra-table-swing.webp', width: 864, height: 1536 },
    schema: {
      nodeId: 'https://adjust.co.il/#clinic-telaviv',
      address: { streetAddress: 'ברודצקי 36', addressLocality: 'תל אביב-יפו', addressCountry: 'IL' },
      geo: { latitude: 32.1007, longitude: 34.7876 },
      hours: [
        { days: ['Sunday'], opens: '14:00', closes: '20:00' },
        { days: ['Tuesday'], opens: '08:00', closes: '14:00' },
      ],
    },
    he: {
      crumb: 'הקליניקה ברמת אביב',
      title: 'כירופרקט ברמת אביב, צפון תל אביב: ברודצקי 36',
      description:
        'הקליניקה של ד״ר ויקטור דואני ברמת אביב, ברודצקי 36 בתל אביב: כירופרקטיקה שיקומית לכאבי גב, סיאטיקה, פריצת דיסק, צוואר ויציבה. שעות קבלה וקביעת תור.',
      eyebrow: 'הקליניקה ברמת אביב',
      h1: 'כירופרקט ברמת אביב, בצפון תל אביב',
      lede:
        'ד״ר ויקטור דואני מקבל ברמת אביב, בברודצקי 36 בתל אביב, מטופלים עם כאבי גב, סיאטיקה, פריצת דיסק, כאבי צוואר ובעיות יציבה. כל הביקורים בתיאום מראש, ובאיזו קליניקה מקבלים בכל יום נתאם איתכם בטלפון.',
      imageAlt: 'חדר הטיפולים בקליניקה ברמת אביב: כרזות אנטומיה, מדפי ספרים, תעודות מסגורות ושולחן טיפולים',
      image2Alt: 'שולחן טיפולים בקליניקה ברמת אביב, עם תעודות מסגורות וערסל יוגה על הקיר',
      addressLine: 'ברודצקי 36, תל אביב',
      getH: 'איך מגיעים',
      getP:
        'הקליניקה נמצאת בברודצקי 36, ברמת אביב. לניווט אפשר לפתוח את הכתובת ב-Waze, ואם צריך עזרה בדרך אפשר להתקשר אלינו.',
      treatH: 'עם מה מגיעים',
      treatP:
        'הטיפול משלב אבחון, טיפול ידני והדרכה לתרגול בבית, ומותאם לכל מטופל. לקריאה נוספת על כל נושא:',
      hoursH: 'שעות קבלה ברמת אביב',
      hoursNote: 'כל הביקורים בתיאום מראש בלבד. באיזו קליניקה מקבלים בכל יום נתאם איתכם בטלפון.',
      babyH: 'טיפול בתינוקות',
      babyP: 'ד״ר דואני מטפל גם בתינוקות, בזהירות ועם שיחה פתוחה עם ההורים.',
      babyLink: 'כירופרקטיקה לתינוקות',
      visitH: 'הביקור הראשון',
      visitP:
        'בביקור הראשון מתחילים בשיחה ובבדיקה, ורק אחר כך מחליטים על המשך. מה קורה בפגישה ראשונה וכמה טיפולים צריך בדרך כלל, אפשר לקרוא כאן:',
      visitLinks: [
        ['הביקור הראשון אצל כירופרקט', '/blog/your-first-chiropractic-appointment'],
        ['כמה טיפולי כירופרקטיקה צריך', '/blog/how-many-chiropractic-sessions-needed'],
      ],
      postureH: 'יציבה בצפון תל אביב',
      postureP: 'מי שעובד שעות מול מסך ומחפש שיפור יציבה בצפון תל אביב, מוזמן לקרוא על',
      postureLink: 'טיפול לשיפור יציבה',
      otherH: 'גם בתובל',
      otherP: 'ד״ר דואני מקבל גם בקליניקה בתובל, ליד כרמיאל.',
      otherLink: 'הקליניקה בתובל',
      faqH: 'שאלות נפוצות',
      faq: [
        ['צריך לתאם תור מראש?', 'כן. כל הביקורים בתיאום מראש בלבד, בטלפון או בוואטסאפ.'],
        ['באיזו קליניקה אקבל ביום מסוים?', 'באיזו קליניקה מקבלים בכל יום נתאם איתכם בטלפון, כך שלא תגיעו לקליניקה הלא נכונה.'],
        ['איפה בדיוק הקליניקה?', 'ברודצקי 36, ברמת אביב, תל אביב. אפשר לפתוח את הכתובת ב-Waze מהכפתור בעמוד.'],
      ],
      ctaH: 'לקביעת תור ברמת אביב',
      ctaP: 'כתבו לנו בוואטסאפ או התקשרו, ונתאם יום ושעה.',
    },
    en: {
      crumb: 'Ramat Aviv clinic',
      title: 'Chiropractor in Ramat Aviv, North Tel Aviv: 36 Brodetsky St',
      description:
        'Dr. Victor Duani’s clinic in Ramat Aviv, 36 Brodetsky St, Tel Aviv: rehabilitative chiropractic for back pain, sciatica, herniated disc, neck and posture. Hours and booking.',
      eyebrow: 'Ramat Aviv clinic',
      h1: 'Chiropractor in Ramat Aviv, North Tel Aviv',
      lede:
        'Dr. Victor Duani sees patients in Ramat Aviv, at 36 Brodetsky St in Tel Aviv, for back pain, sciatica, herniated disc, neck pain and posture. All visits are by prior arrangement, and we confirm by phone which clinic you will be seen at on each day.',
      imageAlt: 'Treatment room at the Ramat Aviv clinic: anatomy posters, bookshelves, framed certificates and a treatment table',
      image2Alt: 'A treatment table at the Ramat Aviv clinic, with framed certificates and a yoga hammock on the wall',
      addressLine: '36 Brodetsky St, Tel Aviv',
      getH: 'Getting here',
      getP:
        'The clinic is at 36 Brodetsky St in Ramat Aviv. Open the address in Waze for directions, and call us if you need help on the way.',
      treatH: 'What people come with',
      treatP:
        'Care combines assessment, hands-on treatment and guidance for exercises at home, and is adapted to each patient. Read more on each topic:',
      hoursH: 'Reception hours in Ramat Aviv',
      hoursNote: 'All visits are by prior arrangement only. We’ll confirm by phone which clinic you’ll be seen at on each day.',
      babyH: 'Care for babies',
      babyP: 'Dr. Duani also sees babies, carefully and with an open conversation with the parents.',
      babyLink: 'Chiropractic for babies',
      visitH: 'Your first visit',
      visitP:
        'The first visit starts with a conversation and an examination, and only then do we decide on next steps. What happens at a first appointment, and how many sessions people usually need:',
      visitLinks: [
        ['Your first chiropractic appointment', '/blog/your-first-chiropractic-appointment'],
        ['How many chiropractic sessions do you need?', '/blog/how-many-chiropractic-sessions-needed'],
      ],
      postureH: 'Posture in north Tel Aviv',
      postureP: 'If you work long hours at a screen and want to improve your posture in north Tel Aviv, read about',
      postureLink: 'posture improvement care',
      otherH: 'Also in Tuval',
      otherP: 'Dr. Duani also sees patients at the Tuval clinic, near Karmiel.',
      otherLink: 'Tuval clinic',
      faqH: 'Frequently asked questions',
      faq: [
        ['Do I need to book in advance?', 'Yes. All visits are by prior arrangement only, by phone or WhatsApp.'],
        ['Which clinic will I be seen at on a given day?', 'We confirm by phone which clinic you will be seen at on each day, so you do not go to the wrong one.'],
        ['Where exactly is the clinic?', '36 Brodetsky St, Ramat Aviv, Tel Aviv. Open the address in Waze with the button on this page.'],
      ],
      ctaH: 'Book a visit in Ramat Aviv',
      ctaP: 'Message us on WhatsApp or call, and we’ll arrange a day and time.',
    },
  },
};

export const CONDITION_LINKS = COMMON_LINKS;

export function clinicMeta(slug, lang) {
  const c = CLINIC_PAGES[slug]?.[lang];
  return c ? { title: `${c.title} | adjust`, description: c.description } : null;
}
