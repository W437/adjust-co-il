import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { whatsappUrl } from '../utils/format';
import { CloseIcon } from './icons';
import './Shop.css';

const productImages = [
  '/assets/shop/cervical-pillow.svg',
  '/assets/shop/lumbar-cushion.svg',
  '/assets/shop/posture-corrector.svg',
  '/assets/shop/foam-roller.svg',
  '/assets/shop/resistance-bands.svg',
  '/assets/shop/massage-ball.svg',
  '/assets/shop/gel-pack.svg',
  '/assets/shop/kinesiology-tape.svg',
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="shop-wa-icon" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

function orderUrl(item, lang) {
  return whatsappUrl(lang === 'he' ? `היי, אשמח להזמין ${item.name}` : `Hi, I'd like to order ${item.name}`);
}

function Price({ currency, value }) {
  return <span className="shop-price" dir="ltr">{currency}{value}</span>;
}

function ShopModal({ item, image, lang, currency, orderLabel, closeLabel, onClose }) {
  const closeRef = useRef(null);
  const [closing, setClosing] = useState(false);

  const requestClose = useCallback(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { onClose(); return; }
    setClosing(true);
    setTimeout(onClose, 220);
  }, [onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') requestClose();
  }, [requestClose]);

  useEffect(() => {
    const previous = document.activeElement;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      previous?.focus?.();
    };
  }, [handleKeyDown]);

  return (
    <div className={`shop-backdrop${closing ? ' closing' : ''}`} onClick={requestClose}>
      <div
        className="shop-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shop-modal-title"
      >
        <button ref={closeRef} type="button" className="shop-modal-close" onClick={requestClose} aria-label={closeLabel}>
          <CloseIcon />
        </button>
        <div className="shop-modal-plate">
          <img src={image} alt="" decoding="async" />
        </div>
        <div className="shop-modal-body">
          <Price currency={currency} value={item.price} />
          <h3 id="shop-modal-title">{item.name}</h3>
          <p className="shop-modal-desc">{item.desc}</p>
          <p className="shop-modal-details">{item.details}</p>
          <a href={orderUrl(item, lang)} target="_blank" rel="noopener noreferrer" className="btn btn-primary shop-order">
            <WhatsAppIcon />
            {orderLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

function ShopCard({ item, image, lang, currency, orderLabel, delay, onOpenModal }) {
  return (
    <article className={`shop-card rv${delay ? ` rv-${delay}` : ''}`}>
      <div className="shop-plate">
        <img src={image} alt="" loading="lazy" decoding="async" />
        <Price currency={currency} value={item.price} />
      </div>
      <div className="shop-card-body">
        <h3>
          <button type="button" className="shop-card-open" onClick={onOpenModal} aria-haspopup="dialog">
            {item.name}
          </button>
        </h3>
        <p>{item.desc}</p>
      </div>
      <div className="shop-card-foot">
        <a href={orderUrl(item, lang)} target="_blank" rel="noopener noreferrer" className="shop-wa">
          <WhatsAppIcon />
          {orderLabel}
        </a>
      </div>
    </article>
  );
}

export default function Shop() {
  const { lang, t } = useTranslation();
  const items = t('shop.items');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const closeModal = useCallback(() => setSelectedProduct(null), []);

  return (
    <section className="block shop" id="shop">
      <div className="wrap">
        <div className="head rv">
          <span className="label">{t('shop.eyebrow')}</span>
          <h2>{t('shop.heading')}</h2>
          <p>{t('shop.sub')}</p>
        </div>

        <div className="shop-grid">
          {Array.isArray(items) && items.map((item, i) => (
            <ShopCard
              key={i}
              item={item}
              image={productImages[i]}
              lang={lang}
              currency={t('shop.currency')}
              orderLabel={t('shop.orderButton')}
              delay={i % 4 === 0 ? 0 : Math.min(i % 4 + 1, 3)}
              onOpenModal={() => setSelectedProduct(i)}
            />
          ))}
        </div>
      </div>

      {selectedProduct !== null && (
        <ShopModal
          item={items[selectedProduct]}
          image={productImages[selectedProduct]}
          lang={lang}
          currency={t('shop.currency')}
          orderLabel={t('shop.orderButton')}
          closeLabel={t('shop.closeModal')}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
