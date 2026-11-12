import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { pages, preloadRoute } from './pages-lazy.js'

// The HTML is prerendered for crawlers and first paint; render fresh on the
// client (no hydration) so the interactive tree is always built from scratch.
// The route's chunk is loaded first so the prerendered page is never blanked.
preloadRoute(window.location.pathname)
  .catch(() => {})
  .then(() => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <BrowserRouter>
          <Suspense fallback={null}>
            <App pages={pages} />
          </Suspense>
        </BrowserRouter>
      </StrictMode>,
    )
  })
