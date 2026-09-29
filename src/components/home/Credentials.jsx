import { useTranslation } from '../../i18n/LanguageContext';
import './Credentials.css';

export default function Credentials() {
  const { t } = useTranslation();
  const creds = t('home.creds');

  return (
    <div className="creds">
      <ul className="wrap creds-in">
        {creds.map((c) => (
          <li key={c.t} className="cred"><span>{c.t}</span><small>{c.s}</small></li>
        ))}
      </ul>
    </div>
  );
}
