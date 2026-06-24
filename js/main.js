// ── SCROLL PROGRESS ──
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = pct + '%';
  });
}

// ── NAV SCROLL ──
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ── BURGER MENU ──
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
      spans[1].style.cssText = 'opacity:0';
      spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
  });
}

// ── GSAP ANIMATIONS ──
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero page-load sequence
  const heroWords = document.querySelectorAll('.hero-title .word');
  if (heroWords.length) {
    const tl = gsap.timeline();
    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .to(heroWords, { y: '0%', duration: 0.8, stagger: 0.08, ease: 'power4.out' }, '-=0.2')
      .to('.hero-subtitle', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .to('.hero-cta-group', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
  }

  // Trainer hero page-load
  const tWords = document.querySelectorAll('.trainer-name-hero .t-word');
  if (tWords.length) {
    const tl = gsap.timeline();
    tl.to('.trainer-rank', { opacity: 1, duration: 0.5, ease: 'power2.out' })
      .to(tWords, { y: '0%', duration: 0.9, stagger: 0.06, ease: 'power4.out' }, '-=0.2')
      .to('.trainer-specialty-hero', { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2');
  }

  // Achievement items scroll reveal
  document.querySelectorAll('.achievement-item').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
      delay: i * 0.1,
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Generic reveal
  document.querySelectorAll('.reveal').forEach(el => {
    ScrollTrigger.create({
      trigger: el, start: 'top 88%',
      onEnter: () => el.classList.add('visible')
    });
  });

  // Stats counter
  document.querySelectorAll('.stat-number, .tstat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-target') || el.innerText);
    if (isNaN(target)) return;
    el.innerText = '0';
    ScrollTrigger.create({
      trigger: el, start: 'top 90%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target, duration: 2, ease: 'power2.out',
          onUpdate: function () { el.innerText = Math.round(this.targets()[0].val) + (el.dataset.suffix || ''); }
        });
      }
    });
  });

  // Gallery items reveal
  document.querySelectorAll('.gallery-item').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out',
      delay: (i % 4) * 0.08,
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  // Location info blocks
  document.querySelectorAll('.info-block').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, x: -30, duration: 0.6, ease: 'power3.out',
      delay: i * 0.12,
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Trainer cards stagger
  document.querySelectorAll('.trainer-card, .trainer-page-card').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 40, duration: 0.6, ease: 'power3.out',
      delay: i * 0.1,
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });
});
