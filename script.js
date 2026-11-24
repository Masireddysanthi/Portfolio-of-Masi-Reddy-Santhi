document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    }));
  }

  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(item => item.classList.toggle('active', item === button));
      document.querySelectorAll('.project-card[data-category]').forEach(card => {
        const categories = (card.dataset.category || '').split(/\s+/);
        card.hidden = filter !== 'all' && !categories.includes(filter);
      });
    });
  });

  document.querySelectorAll('.project-arrow').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.project-card');
      const open = card.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Hide project details' : 'Show project details');
    });
  });

  document.querySelectorAll('.detail-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.detail-item');
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  const topButton = document.querySelector('.back-to-top');
  const updateTopButton = () => topButton?.classList.toggle('visible', window.scrollY > 450);
  window.addEventListener('scroll', updateTopButton, { passive: true });
  updateTopButton();
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  if ('IntersectionObserver' in window) {
    const links = document.querySelectorAll('.main-nav a');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }), { rootMargin: '-35% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }
});
