import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { fetchCompanyInfo } from './utils/companyUtils';
import { INITIAL_STATE_ID, readInitialState, serializeInitialState } from './utils/initialState';

interface Env {
  ASSETS: { fetch(request: Request | string): Promise<Response> };
}

const NOT_FOUND_BODY = `# 404 Not Found

This page does not exist. invoice.teachify.tw is a single-page tool at
https://invoice.teachify.tw/ — see https://invoice.teachify.tw/llms.txt for what it
does, or https://invoice.teachify.tw/sitemap.xml for every page.
`;

// How long a prefilled 統編 lookup may hold up the page before the client is
// left to finish it.
const LOOKUP_TIMEOUT_MS = 800;

function prefersMarkdown(request: Request): boolean {
  return (request.headers.get('Accept') ?? '').includes('text/markdown');
}

async function lookupBuyer(uniformNumber: string): Promise<string> {
  if (uniformNumber.length !== 8) return '';
  const timeout = new Promise<null>((resolve) => setTimeout(resolve, LOOKUP_TIMEOUT_MS, null));
  return (await Promise.race([fetchCompanyInfo(uniformNumber), timeout])) ?? '';
}

// Renders the app into the built index.html, so the first paint is the real,
// styled page and hydration changes nothing.
async function renderPage(url: URL, env: Env): Promise<Response> {
  const template = await (await env.ASSETS.fetch(new URL('/', url).toString())).text();
  const prefill = readInitialState(url.search);
  const initial = { ...prefill, buyer: await lookupBuyer(prefill.uniformNumber) };
  const html = template
    .replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(createElement(App, { initial }))}</div>`,
    )
    .replace(
      '</body>',
      `<script id="${INITIAL_STATE_ID}" type="application/json">${serializeInitialState(initial)}</script></body>`,
    );
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // The page carries today's date and the query's prefill: never reuse it.
      'Cache-Control': 'no-cache',
    },
  });
}

export default {
  // Static assets are served before this runs, except for "/" (run_worker_first
  // in wrangler.jsonc), so anything else reaching here is an unknown path.
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/') {
      const response = prefersMarkdown(request)
        ? new Response((await env.ASSETS.fetch(new URL('/index.md', url).toString())).body, {
            headers: {
              'Content-Type': 'text/markdown; charset=utf-8',
              'Cache-Control': 'public, max-age=0, must-revalidate',
            },
          })
        : await renderPage(url, env);
      response.headers.set('Vary', 'Accept');
      response.headers.set('Link', '</llms.txt>; rel="describedby"; type="text/plain"');
      return response;
    }

    return new Response(NOT_FOUND_BODY, {
      status: 404,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
  },
};
