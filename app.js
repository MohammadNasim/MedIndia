(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- sticky-nav border on scroll ----
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- mobile drawer ----
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('drawer');
  toggle.addEventListener('click', () => {
    const open = drawer.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
  });
  drawer.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      drawer.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    }
  });

  // ---- reveal-on-scroll ----
  if (reduce) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  // ---- count-up on stat numbers when in view ----
  const fmt = (n) => {
    if (n >= 100000) return Math.round(n / 1000) + 'k';
    if (n >= 10000)  return (n / 1000).toFixed(0) + 'k';
    return n.toLocaleString('en-IN');
  };
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (!Number.isFinite(target)) return;
    if (reduce) { el.textContent = fmt(target); return; }
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach(el => countIO.observe(el));

  // ---- accordion: close siblings when one opens ----
  document.querySelectorAll('.faq__list .qa').forEach(qa => {
    qa.addEventListener('toggle', () => {
      if (qa.open) {
        document.querySelectorAll('.faq__list .qa[open]').forEach(o => {
          if (o !== qa) o.open = false;
        });
      }
    });
  });

  // ---- footer year ----
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // ---- subtle hero parallax (desktop only, motion-respecting) ----
  if (!reduce && window.matchMedia('(min-width: 880px) and (pointer: fine)').matches) {
    const photo = document.querySelector('.hero__photo');
    if (photo) {
      const parent = photo.parentElement;
      parent.addEventListener('mousemove', (e) => {
        const r = parent.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 6;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 6;
        photo.style.transform = `rotate(-1.5deg) translate(${x}px, ${y}px)`;
      });
      parent.addEventListener('mouseleave', () => {
        photo.style.transform = '';
      });
    }
  }
})();
