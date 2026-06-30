// ── Theme ──────────────────────────────────────────────────────
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');

const saved = localStorage.getItem('theme') || 'dark';
root.dataset.theme = saved;
updateThemeIcon(saved);

themeBtn.addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

// ── Cursor glow (pointer: fine only) ──────────────────────────
if (window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let raf;
  document.addEventListener('mousemove', e => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      glow.style.setProperty('--cx', e.clientX + 'px');
      glow.style.setProperty('--cy', e.clientY + 'px');
    });
  });
}

// ── Mobile nav ─────────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Active nav link on scroll ──────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── Scroll fade-in ─────────────────────────────────────────────
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ── Stagger project cards & skill category blocks ──────────────
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

document.querySelectorAll('.skill-cat-block').forEach((el, i) => {
  el.style.transitionDelay = `${i * 70}ms`;
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

// ── Contact form — AJAX submit to Netlify Forms ────────────────
(function () {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.className = 'form-status';
    status.textContent = '';

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });

      if (!res.ok) throw new Error('Network error');

      form.reset();
      status.textContent = "Sent — I'll get back to you soon.";
      status.className = 'form-status form-status--ok visible';
    } catch {
      status.textContent = 'Something went wrong. Please try again.';
      status.className = 'form-status form-status--err visible';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message →';
    }
  });
}());
