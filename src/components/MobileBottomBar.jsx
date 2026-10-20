import { useTranslation } from '../i18n/LanguageContext';
import SectionLink from './SectionLink';
import { PhoneIcon, ChatIcon, CalendarIcon } from './icons';
import { PHONE_TEL, whatsappUrl } from '../utils/format';
import './MobileBottomBar.css';

// On the babies page the WhatsApp button is the primary one and carries the baby-specific message.
export default function MobileBottomBar({ waMessage, baby = false }) {
  const { t } = useTranslation();
  const wa = (
    <a className={`btn ${baby ? 'btn-primary mbar-wa' : 'btn-ghost'}`} href={whatsappUrl(waMessage || t('ui.waMessage'))} target="_blank" rel="noopener noreferrer"><ChatIcon />{t('ui.whatsapp')}</a>
  );

  return (
    <div className="mbar">
      {baby && wa}
      <a className="btn btn-ghost" href={PHONE_TEL}><PhoneIcon />{t('ui.call')}</a>
      {!baby && wa}
      <SectionLink hash="contact-form" className={`btn ${baby ? 'btn-ghost' : 'btn-primary'}`}><CalendarIcon />{t('ui.book')}</SectionLink>
    </div>
  );
}
