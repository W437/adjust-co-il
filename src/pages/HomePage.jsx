import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import { setPageSEO } from '../utils/seo';
import { homeMeta } from '../seo/meta';
import Nav from '../components/Nav';
import Hero from '../components/home/Hero';
import Credentials from '../components/home/Credentials';
import ConditionFinder from '../components/home/ConditionFinder';
import Techniques from '../components/home/Techniques';
import Journey from '../components/home/Journey';
import FirstVisit from '../components/home/FirstVisit';
import Sessions from '../components/home/Sessions';
import Reviews from '../components/home/Reviews';
import Faq from '../components/home/Faq';
import Locations from '../components/home/Locations';
// import Shop from '../components/Shop'; // hidden for now
import Booking from '../components/home/Booking';
import Footer from '../components/Footer';

export default function HomePage() {
  const { t, lang } = useTranslation();
  const { hash } = useLocation();

  useEffect(() => {
    setPageSEO({
      title: homeMeta(lang).title,
      description: homeMeta(lang).description,
      path: '/',
      type: 'website',
      lang,
    });
  }, [t, lang]);

  useEffect(() => {
    if (!hash) return undefined;
    const id = decodeURIComponent(hash.slice(1));
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Credentials />
        <ConditionFinder />
        <Techniques />
        <Journey />
        <FirstVisit />
        <Sessions />
        <Reviews />
        <Faq />
        <Locations />
        {/* <Shop /> */}
        <Booking />
      </main>
      <Footer />
    </>
  );
}
