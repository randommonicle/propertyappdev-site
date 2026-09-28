// Mobile navigation toggle
const navToggle = document.querySelector('.nav__toggle');
const navLinks  = document.querySelector('.nav__links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
    });
  });
}

// Footer year
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll reveal
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const revealEls = document.querySelectorAll(
    '.project-card, .about__bio, .about__skills, .contact__intro, .contact-form, .section-header'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
}

// Screenshot lightbox (mouse + keyboard)
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
let   lightboxTrigger = null; // element that opened the lightbox — focus returns here on close

function openLightbox(img) {
  lightboxTrigger = img;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  // Move focus into the dialog so keyboard users can dismiss it
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
  // Restore focus to the image that opened the lightbox
  if (lightboxTrigger) {
    lightboxTrigger.focus();
    lightboxTrigger = null;
  }
}

document.querySelectorAll('.screenshot-img').forEach(img => {
  // tabindex and role="button" are set directly in the HTML so they apply
  // without JS. Click + Enter/Space handlers attach here.
  img.addEventListener('click', () => openLightbox(img));
  img.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(img);
    }
  });
});

if (lightbox && lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
}

// Active nav link on scroll
const sections   = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav__link');

if (sections.length && navLinkEls.length) {
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinkEls.forEach(link => {
            link.classList.toggle(
              'is-active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => sectionObserver.observe(s));
}

// Show contact-form success banner when redirected back with ?success=true
if (new URLSearchParams(window.location.search).get('success') === 'true') {
  const successEl = document.getElementById('form-success');
  if (successEl) {
    successEl.hidden = false;
    // Scroll the contact section into view so the user actually sees the confirmation
    document.getElementById('contact')?.scrollIntoView({ behavior: 'auto', block: 'start' });
    // Clean the URL so a refresh doesn't re-show the banner
    history.replaceState(null, '', window.location.pathname + window.location.hash);
  }
}
