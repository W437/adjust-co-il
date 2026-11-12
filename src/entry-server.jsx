import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
import * as pages from './pages-eager.js';

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App pages={pages} />
    </StaticRouter>,
  );
}
