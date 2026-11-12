import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';

// `pages` supplies the route components: eager imports for prerendering
// (src/pages-eager.js) or lazy chunks for the browser (src/pages-lazy.js).
export default function App({ pages }) {
  const { HomePage, BlogList, BlogPost, ServicePage, LegalPage, BabyPage, ClinicPage, NotFound } = pages;
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/baby" element={<BabyPage />} />
        <Route path="/clinics/:slug" element={<ClinicPage />} />
        <Route path="/privacy" element={<LegalPage page="privacy" />} />
        <Route path="/accessibility" element={<LegalPage page="a11y" />} />

        <Route path="/en" element={<HomePage />} />
        <Route path="/en/" element={<HomePage />} />
        <Route path="/en/blog" element={<BlogList />} />
        <Route path="/en/blog/:slug" element={<BlogPost />} />
        <Route path="/en/services/:slug" element={<ServicePage />} />
        <Route path="/en/baby" element={<BabyPage />} />
        <Route path="/en/clinics/:slug" element={<ClinicPage />} />
        <Route path="/en/privacy" element={<LegalPage page="privacy" />} />
        <Route path="/en/accessibility" element={<LegalPage page="a11y" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageProvider>
  );
}
