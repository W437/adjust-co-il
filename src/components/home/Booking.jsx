import { useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { PHONE_DISPLAY, EMAIL, whatsappUrl } from '../../utils/format';
import { ChatIcon } from '../icons';
import './Booking.css';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export default function Booking() {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle');
  const [copyLabel, setCopyLabel] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append('access_key', WEB3FORMS_KEY);
    data.append('subject', `New booking request from ${data.get('fname')} (adjust.co.il)`);
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const copyPhone = async (e) => {
    const el = e.currentTarget.previousElementSibling;
    const flash = (key) => {
      setCopyLabel(t(key));
      setTimeout(() => setCopyLabel(''), 1500);
    };
    try {
      await navigator.clipboard.writeText(PHONE_DISPLAY);
      flash('home.book.copied');
    } catch {
      const r = document.createRange();
      r.selectNodeContents(el);
      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
      flash('home.book.selected');
    }
  };

  return (
    <section className="block" id="contact">
      <div className="wrap">
        <div className="booking rv">
          <div>
            <span className="label">{t('home.book.label')}</span>
            <h2>{t('home.book.h2')}</h2>
            <p>{t('home.book.p')}</p>
            <div className="contact-lines">
              <div className="phone-line">
                <a href="tel:+972532767776" dir="ltr">{PHONE_DISPLAY}</a>
                <button type="button" className="copy" onClick={copyPhone}>{copyLabel || t('home.book.copy')}</button>
              </div>
              <a className="btn btn-onink" href={whatsappUrl(t('ui.waMessage'))} target="_blank" rel="noopener noreferrer"><ChatIcon />{t('home.book.wa')}</a>
              <a className="mail" href={`mailto:${EMAIL}`} dir="ltr">{EMAIL}</a>
            </div>
          </div>

          <div id="contact-form" className="booking-form-wrap">
            {status === 'success' ? (
              <div className="booking-done" role="status">
                <img src="/assets/dr-victor-thanks-you.webp" alt="" width="120" height="120" loading="lazy" decoding="async" />
                <h3>{t('home.book.thanks')}</h3>
                <p>{t('home.book.thanksSub')}</p>
                <button type="button" className="btn btn-onink" onClick={() => setStatus('idle')}>{t('home.book.again')}</button>
              </div>
            ) : (
              <form className="booking-form" onSubmit={onSubmit}>
                <div className="two">
                  <label htmlFor="fname"><span>{t('home.book.name')}</span>
                    <input id="fname" name="fname" autoComplete="name" placeholder={t('home.book.namePh')} required />
                  </label>
                  <label htmlFor="phone"><span>{t('home.book.phone')}</span>
                    <input id="phone" name="phone" type="tel" dir="ltr" autoComplete="tel" placeholder="05X-XXX-XXXX" required />
                  </label>
                </div>
                <div className="two">
                  <label htmlFor="clinic"><span>{t('home.book.clinic')}</span>
                    <select id="clinic" name="clinic" defaultValue={t('home.loc.ta')}>
                      <option>{t('home.loc.ta')}</option>
                      <option>{t('home.loc.tu')}</option>
                      <option>{t('home.book.either')}</option>
                    </select>
                  </label>
                  <label htmlFor="email"><span>{t('home.book.email')}</span>
                    <input id="email" name="email" type="email" dir="ltr" autoComplete="email" placeholder="your@email.com" />
                  </label>
                </div>
                <label htmlFor="message"><span>{t('home.book.msg')}</span>
                  <textarea id="message" name="message" rows="3" placeholder={t('home.book.msgPh')} />
                </label>
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? t('home.book.sending') : t('home.book.submit')}
                </button>
                {status === 'error' && <p className="booking-error" role="alert">{t('home.book.error')}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
