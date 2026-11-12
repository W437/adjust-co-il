import { lazy } from 'react';
import HomePage from './pages/HomePage';

// Everything except the home page is its own chunk, so the blog posts
// (about 500 KB of text) are not downloaded to show the home page.
const loaders = {
  BlogList: () => import('./components/BlogList'),
  BlogPost: () => import('./components/BlogPost'),
  ServicePage: () => import('./components/ServicePage'),
  LegalPage: () => import('./pages/LegalPage'),
  BabyPage: () => import('./pages/BabyPage'),
  NotFound: () => import('./pages/NotFound'),
};

export const pages = {
  HomePage,
  ...Object.fromEntries(Object.entries(loaders).map(([k, load]) => [k, lazy(load)])),
};

// Start loading the chunk for the current URL before the first render, so the
// prerendered HTML stays on screen until the real page is ready (no blank flash).
export function preloadRoute(pathname) {
  const path = pathname.replace(/^\/en(?=\/|$)/, '').replace(/\/+$/, '') || '/';
  if (path === '/') return Promise.resolve();
  let key = 'NotFound';
  if (path === '/blog') key = 'BlogList';
  else if (/^\/blog\/[^/]+$/.test(path)) key = 'BlogPost';
  else if (/^\/services\/[^/]+$/.test(path)) key = 'ServicePage';
  else if (path === '/baby') key = 'BabyPage';
  else if (path === '/privacy' || path === '/accessibility') key = 'LegalPage';
  return loaders[key]();
}
