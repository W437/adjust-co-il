import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import HomePage from './pages/HomePage';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import ServicePage from './components/ServicePage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/services/:slug" element={<ServicePage />} />

          <Route path="/en" element={<HomePage />} />
          <Route path="/en/" element={<HomePage />} />
          <Route path="/en/blog" element={<BlogList />} />
          <Route path="/en/blog/:slug" element={<BlogPost />} />
          <Route path="/en/services/:slug" element={<ServicePage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}
