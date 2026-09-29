import { useTranslation } from '../i18n/LanguageContext';
import SectionLink from './SectionLink';
import { PhoneIcon, ChatIcon, CalendarIcon } from './icons';
import { PHONE_TEL, whatsappUrl } from '../utils/format';
import './MobileBottomBar.css';

export default function MobileBottomBar() {
  const { t } = useTranslation();

  return (
    <div className="mbar">
      <a className="btn btn-ghost" href={PHONE_TEL}><PhoneIcon />{t('ui.call')}</a>
      <a className="btn btn-ghost" href={whatsappUrl(t('ui.waMessage'))} target="_blank" rel="noopener noreferrer"><ChatIcon />{t('ui.whatsapp')}</a>
      <SectionLink hash="contact-form" className="btn btn-primary"><CalendarIcon />{t('ui.book')}</SectionLink>
    </div>
  );
}
