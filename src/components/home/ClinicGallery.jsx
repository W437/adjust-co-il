import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { ArrowIcon, CloseIcon } from '../icons';
import './ClinicGallery.css';

// Slide order matches home.visit.gallery.slides. `pos` is the object-position used by the cropped carousel frame.
const SLIDES = [
  { src: '/assets/tuval-room.webp', width: 1400, height: 1050, pos: '50% 50%' },
  { src: '/assets/clinic/ra-desk-corner.webp', width: 1344, height: 1536, pos: '50% 40%' },
  { src: '/assets/clinic/tu-green-square.webp', width: 1536, height: 1536, pos: '50% 50%' },
  { src: '/assets/clinic/ra-table-swing.webp', width: 864, height: 1536, pos: '50% 55%' },
  { src: '/assets/clinic/tu-green-wide2.webp', width: 1600, height: 768, pos: '75% 50%' },
  { src: '/assets/clinic/white-room.webp', width: 1152, height: 1536, pos: '50% 45%' },
];

export default function ClinicGallery() {
  const { t } = useTranslation();
  const slides = t('home.visit.gallery.slides');
  const last = SLIDES.length - 1;
  const [active, setActive] = useState(0);
  const [warm, setWarm] = useState(false);
  const [open, setOpen] = useState(null);
  const root = useRef(null);
  const track = useRef(null);
  const dialog = useRef(null);

  // Scroll the track by the measured distance to a slide: never scrolls the page, and is direction-agnostic (RTL).
  const go = useCallback((i, behavior = 'smooth') => {
    const el = track.current;
    const slide = el?.children[i];
    if (!slide) return;
    el.scrollTo({ left: el.scrollLeft + slide.getBoundingClientRect().left - el.getBoundingClientRect().left, behavior });
  }, []);

  // Track which slide is in view while swiping or scrolling.
  useEffect(() => {
    const el = track.current;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Array.prototype.indexOf.call(el.children, e.target)); }),
      { root: el, threshold: 0.6 },
    );
    Array.from(el.children).forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  // Fetch the off-screen slides shortly before the carousel scrolls into view, so swiping never shows a blank frame.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setWarm(true); io.disconnect(); } }, { rootMargin: '600px' });
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (open !== null && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [open]);

  const step = (dir) => go(Math.min(last, Math.max(0, active + dir)));
  const closeViewer = () => { if (open !== null) go(open, 'auto'); setOpen(null); };
  const stepViewer = (dir) => setOpen((o) => (o + dir + SLIDES.length) % SLIDES.length);
  const onViewerKey = (e) => {
    const dir = getComputedStyle(e.currentTarget).direction === 'rtl' ? -1 : 1;
    if (e.key === 'ArrowRight') stepViewer(dir);
    else if (e.key === 'ArrowLeft') stepViewer(-dir);
  };

  return (
    <figure className="gallery rv" ref={root} role="group" aria-roledescription="carousel" aria-label={t('home.visit.gallery.label')}>
      <div className="gal-stage">
        <ul className="gal-track" ref={track}>
          {SLIDES.map((s, i) => (
            <li key={s.src} aria-label={`${i + 1} / ${SLIDES.length}`}>
              <button type="button" className="gal-open" onClick={() => setOpen(i)} aria-label={`${t('home.visit.gallery.open')}: ${slides[i].cap}`}>
                <img
                  src={s.src}
                  alt={slides[i].alt}
                  width={s.width}
                  height={s.height}
                  style={{ objectPosition: s.pos }}
                  loading={i === 0 || !warm ? 'lazy' : 'eager'}
                  decoding="async"
                  draggable="false"
                />
              </button>
            </li>
          ))}
        </ul>
        <button type="button" className="gal-nav gal-prev" onClick={() => step(-1)} disabled={active === 0} aria-label={t('home.visit.gallery.prev')}><ArrowIcon /></button>
        <button type="button" className="gal-nav gal-next" onClick={() => step(1)} disabled={active === last} aria-label={t('home.visit.gallery.next')}><ArrowIcon /></button>
      </div>
      <div className="gal-foot">
        <figcaption aria-live="polite">{slides[active].cap}</figcaption>
        <div className="gal-dots">
          {SLIDES.map((s, i) => (
            <button type="button" key={s.src} className={i === active ? 'on' : undefined} onClick={() => go(i)} aria-label={`${t('home.visit.gallery.goto')} ${i + 1}`} aria-current={i === active} />
          ))}
        </div>
      </div>

      {open !== null && (
        <dialog
          className="gal-viewer"
          ref={dialog}
          aria-label={slides[open].cap}
          onClose={closeViewer}
          onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
          onKeyDown={onViewerKey}
        >
          <img src={SLIDES[open].src} alt={slides[open].alt} width={SLIDES[open].width} height={SLIDES[open].height} />
          <p>{slides[open].cap}<span className="gal-count" dir="ltr">{open + 1} / {SLIDES.length}</span></p>
          <button type="button" className="gal-nav gal-prev" onClick={() => stepViewer(-1)} aria-label={t('home.visit.gallery.prev')}><ArrowIcon /></button>
          <button type="button" className="gal-nav gal-next" onClick={() => stepViewer(1)} aria-label={t('home.visit.gallery.next')}><ArrowIcon /></button>
          <button type="button" className="gal-close" onClick={() => dialog.current.close()} aria-label={t('home.visit.gallery.close')}><CloseIcon /></button>
        </dialog>
      )}
    </figure>
  );
}
