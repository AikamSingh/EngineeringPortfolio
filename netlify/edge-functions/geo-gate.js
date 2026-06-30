/**
 * Geofence edge function — US/CA visitors see the full portfolio;
 * all others see a minimal landing page.
 * Runs on Netlify's CDN before the response is served.
 */

const ALLOWED = new Set(['US', 'CA']);

const RESTRICTED_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfolio — Aikam</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100dvh; display: flex; align-items: center; justify-content: center;
      background: #0f1117; color: #e2e8f0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      padding: 24px; text-align: center;
    }
    .card {
      max-width: 480px;
      background: #1a1d27; border: 1px solid #2d3148;
      border-radius: 16px; padding: 48px 40px;
    }
    .initial {
      width: 72px; height: 72px; border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      display: flex; align-items: center; justify-content: center;
      font-size: 2rem; font-weight: 700; margin: 0 auto 24px;
      color: #fff;
    }
    h1 { font-size: 1.5rem; margin-bottom: 12px; }
    p  { color: #94a3b8; line-height: 1.7; margin-bottom: 0; }
    .notice {
      margin-top: 24px; padding: 16px;
      background: rgba(99,102,241,.1); border-radius: 8px;
      font-size: .875rem; color: #a5b4fc;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="initial">A</div>
    <h1>Hi, I'm Aikam</h1>
    <p>I'm a Computer Engineering student interested in embedded systems and hardware design.</p>
    <div class="notice">
      Thank you for visiting. This portfolio is currently available only to visitors in the United States and Canada.
    </div>
  </div>
</body>
</html>`;

export default async (request, context) => {
  const country = context.geo?.country?.code ?? '';

  if (ALLOWED.has(country)) {
    return; // pass through — serve the full portfolio
  }

  // Unknown country (e.g. local dev where geo is absent) — pass through
  // so the site works in development. Remove the next two lines to enforce
  // the gate even when country is unknown.
  if (!country) {
    return;
  }

  return new Response(RESTRICTED_HTML, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
};

export const config = { path: '/*' };
