import { createContext, useContext, useLayoutEffect, useCallback, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import en from './en.json';
import he from './he.json';

const translations = { en, he };

const LanguageContext = createContext();

function stripPrefix(pathname) {
  if (pathname === '/en' || pathname === '/en/') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  return pathname;
}

function addPrefix(basePath) {
  if (basePath === '/' || basePath === '') return '/en';
  return `/en${basePath}`;
}

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const lang = location.pathname === '/en' || location.pathname.startsWith('/en/') ? 'en' : 'he';
  const basePath = stripPrefix(location.pathname);

  const pendingSwitch = useRef(null);

  useLayoutEffect(() => {
    const dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
    if (pendingSwitch.current) {
      pendingSwitch.current();
      pendingSwitch.current = null;
    }
  }, [lang]);

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let val = translations[lang];
      for (const k of keys) {
        if (val == null) return key;
        val = val[k];
      }
      return val ?? key;
    },
    [lang],
  );

  const localizePath = useCallback(
    (path) => {
      const clean = path.startsWith('/') ? path : `/${path}`;
      return lang === 'en' ? addPrefix(clean) : clean;
    },
    [lang],
  );

  const toggleLanguage = useCallback(() => {
    const targetPath = lang === 'en' ? basePath : addPrefix(basePath);
    navigate({ pathname: targetPath, hash: location.hash, search: location.search });
  }, [lang, basePath, location.hash, location.search, navigate]);

  const switchLanguage = useCallback(() => {
    return new Promise((resolve) => {
      pendingSwitch.current = resolve;
      setTimeout(resolve, 1000);
      toggleLanguage();
    });
  }, [toggleLanguage]);

  const setLang = useCallback(
    (newLang) => {
      if (newLang === lang) return;
      const targetPath = newLang === 'en' ? addPrefix(basePath) : basePath;
      navigate({ pathname: targetPath, hash: location.hash, search: location.search });
    },
    [lang, basePath, location.hash, location.search, navigate],
  );

  const value = useMemo(
    () => ({ lang, setLang, t, toggleLanguage, switchLanguage, localizePath, basePath }),
    [lang, setLang, t, toggleLanguage, switchLanguage, localizePath, basePath],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
}
