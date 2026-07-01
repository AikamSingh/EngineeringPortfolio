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

// ── Lightbox ───────────────────────────────────────────────────
const overlay = document.createElement('div');
overlay.className = 'lightbox-overlay';
overlay.setAttribute('role', 'dialog');
overlay.setAttribute('aria-modal', 'true');
overlay.setAttribute('aria-label', 'Image lightbox');

const overlayImg = document.createElement('img');
const closeBtn   = document.createElement('button');
closeBtn.className   = 'lightbox-close';
closeBtn.textContent = '×';
closeBtn.setAttribute('aria-label', 'Close lightbox');

overlay.appendChild(overlayImg);
overlay.appendChild(closeBtn);
document.body.appendChild(overlay);

function openLightbox(src, alt) {
  overlayImg.src = src;
  overlayImg.alt = alt || '';
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function closeLightbox() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.image-block img, .image-row img').forEach(img => {
  img.classList.add('lightbox-trigger');
  img.setAttribute('tabindex', '0');
  img.setAttribute('role', 'button');
  img.setAttribute('aria-label', `Enlarge: ${img.alt || 'image'}`);
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
  img.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(img.src, img.alt); });
});

closeBtn.addEventListener('click', closeLightbox);
overlay.addEventListener('click', e => { if (e.target === overlay) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
