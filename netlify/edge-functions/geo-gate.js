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
      background: #F2F4F7; color: #141720;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
      padding: 24px; text-align: center;
    }

    .card {
      max-width: 460px; width: 100%;
      background: #FFFFFF;
      border: 1px solid #D2D8E0;
      border-radius: 16px; padding: 48px 40px;
      box-shadow: 0 2px 20px rgba(0,0,0,.08);
    }

    .logo {
      font-size: 1.1rem; font-weight: 700; letter-spacing: -.02em;
      color: #141720; margin-bottom: 32px;
    }
    .logo span { color: #2B6DC9; }

    .avatar {
      width: 72px; height: 72px; border-radius: 50%;
      background: #E5E9EF; border: 2px solid #D2D8E0;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.8rem; font-weight: 700; margin: 0 auto 24px;
      color: #2B6DC9; letter-spacing: -.02em;
    }

    h1 {
      font-size: 1.45rem; font-weight: 700; letter-spacing: -.02em;
      color: #141720; margin-bottom: 12px;
    }

    p { color: #6B7280; line-height: 1.7; font-size: .95rem; }

    .notice {
      margin-top: 24px; padding: 14px 18px;
      background: rgba(43,109,201,.07);
      border: 1px solid rgba(43,109,201,.18);
      border-radius: 10px;
      font-size: .85rem; color: #205CB3; line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">Aikam<span>.</span></div>
    <div class="avatar">A</div>
    <h1>Hi, I'm Aikam</h1>
    <p>Computer Engineering student at the University of Michigan, focused on embedded systems and hardware design.</p>
    <div class="notice">
      This portfolio is currently unavailable. Thank you for stopping by.
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
