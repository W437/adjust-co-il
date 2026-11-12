import { StrictMode, Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
import * as pages from './pages-eager.js';

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Suspense fallback={null}>
          <App pages={pages} />
        </Suspense>
      </StaticRouter>
    </StrictMode>,
  );
}
