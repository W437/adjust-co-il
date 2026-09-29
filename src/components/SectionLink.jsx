import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';

export default function SectionLink({ hash, children, ...rest }) {
  const { basePath, localizePath } = useTranslation();
  if (basePath === '/') return <a href={`#${hash}`} {...rest}>{children}</a>;
  return <Link to={`${localizePath('/')}#${hash}`} {...rest}>{children}</Link>;
}
