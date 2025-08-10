// script.js - save alongside index.html
// Minimal JS: nav toggle, theme toggle (persisted), basic form validation, fill year.

(() => {
  // DOM refs
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  const themeToggle = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');

  // Set current year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav open/close
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('open');
  });

  // Close nav when clicking a link (mobile)
  primaryNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && primaryNav.classList.contains('open')) {
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Theme handling: try localStorage, fallback to prefers-color-scheme
  const stored = localStorage.getItem('theme'); // 'dark' or 'light'
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      root.removeAttribute('data-theme');
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  if (stored) {
    applyTheme(stored);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  // Basic contact form handling (no network)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Simple client-side validation
    if (!name || !email || !message) {
      formMsg.textContent = 'Please fill all fields before submitting.';
      formMsg.style.color = '';
      return;
    }
    // rudimentary email check
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      formMsg.textContent = 'Please enter a valid email address.';
      return;
    }

    // Simulate success
    formMsg.textContent = 'Thanks! Your message was received (demo only).';
    form.reset();
  });
})();
