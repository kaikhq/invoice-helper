interface Env {
  ASSETS: { fetch(request: Request | string): Promise<Response> };
}

const NOT_FOUND_BODY = `# 404 Not Found

This page does not exist. invoice.teachify.tw is a single-page tool at
https://invoice.teachify.tw/ — see https://invoice.teachify.tw/llms.txt for what it
does, or https://invoice.teachify.tw/sitemap.xml for every page.
`;

function prefersMarkdown(request: Request): boolean {
  return (request.headers.get('Accept') ?? '').includes('text/markdown');
}

export default {
  // Static assets are served before this runs, except for "/" (run_worker_first
  // in wrangler.jsonc), so anything else reaching here is an unknown path.
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/') {
      const response = prefersMarkdown(request)
        ? new Response((await env.ASSETS.fetch(new URL('/index.md', url).toString())).body, {
            headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
          })
        : new Response((await env.ASSETS.fetch(request)).body, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          });
      response.headers.set('Vary', 'Accept');
      response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
      response.headers.set('Link', '</llms.txt>; rel="describedby"; type="text/plain"');
      return response;
    }

    return new Response(NOT_FOUND_BODY, {
      status: 404,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
  },
};
