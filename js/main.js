(function () {
  const LANG_KEY = 'newnet-lang';
  let lang = localStorage.getItem(LANG_KEY) || 'zh';
  let countersDone = false;

  const langSwitch = document.getElementById('langSwitch');

  function applyLang() {
    const dict = I18N[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    langSwitch.textContent = lang === 'zh' ? 'EN' : '中文';
    if (countersDone) setCountersFinal();
  }

  function targetValue(el) {
    return parseInt((lang === 'en' && el.dataset.countEn) ? el.dataset.countEn : el.dataset.count, 10);
  }

  function setCountersFinal() {
    document.querySelectorAll('[data-count]').forEach(el => {
      el.textContent = targetValue(el);
    });
  }

  function animateCounters() {
    if (countersDone) return;
    countersDone = true;
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = targetValue(el);
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  langSwitch.addEventListener('click', () => {
    lang = lang === 'zh' ? 'en' : 'zh';
    localStorage.setItem(LANG_KEY, lang);
    applyLang();
  });

  // Header style on scroll
  const header = document.getElementById('siteHeader');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('open');
  }));

  // Reveal on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.closest('.stats')) animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Certificate lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      lightboxImg.src = card.querySelector('img').src;
      lightbox.classList.add('open');
    });
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  applyLang();
})();
