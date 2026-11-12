import { StrictMode, Suspense } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { pages, preloadRoute } from './pages-lazy.js'

// The HTML is prerendered for crawlers and first paint; hydrate it so the
// browser keeps the painted elements instead of rebuilding them. The route's
// chunk is loaded first so hydration can match the prerendered markup.
preloadRoute(window.location.pathname)
  .catch(() => {})
  .then(() => {
    hydrateRoot(
      document.getElementById('root'),
      <StrictMode>
        <BrowserRouter>
          <Suspense fallback={null}>
            <App pages={pages} />
          </Suspense>
        </BrowserRouter>
      </StrictMode>,
      { onRecoverableError: (e) => console.error('[hydration]', e?.message || e) },
    )
  })
