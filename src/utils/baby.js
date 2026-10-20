// Settings for the babies page (/baby). Replace these as the owner sends details.

// Visit length in minutes. Left null until the owner confirms it; the FAQ then omits the sentence.
export const BABY_VISIT_MINUTES = null;

// Photos. Real baby photos go here only after the parents' written approval (owner note 19);
// until then these are faceless clinic-room photos. To swap one, change `src` (and the size).
export const BABY_IMAGES = {
  hero: { src: '/assets/clinic/tu-green-wide.webp', srcSet: '/assets/clinic/tu-green-wide-800.webp 800w, /assets/clinic/tu-green-wide.webp 1600w', width: 1600, height: 768 },
  visit: { src: '/assets/clinic/white-room.webp', width: 1152, height: 1536 },
  about: { src: '/assets/dr-victor-v2.webp', width: 839, height: 1080 },
  ta: { src: '/assets/clinic/ra-desk-corner.webp', width: 1344, height: 1536 },
  tu: { src: '/assets/clinic/tu-table-windows.webp', width: 1600, height: 1200 },
};

// Link for the Instagram bio. The UTM tags let any analytics tool attribute visits to Instagram.
export const BABY_INSTAGRAM_URL = 'https://adjust.co.il/baby/?utm_source=instagram&utm_medium=bio&utm_campaign=baby';
