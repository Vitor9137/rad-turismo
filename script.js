/* ============================================================
   RAD Turismo — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. Animações de scroll (reveal) ─────────────────────── */
  document.body.classList.add('js-ready');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ── 2. Contador animado ──────────────────────────────────── */
  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10);
    var suffix = el.dataset.suffix || '';
    var duration = 1800;
    var step = 16;
    var increment = target / (duration / step);
    var current = 0;

    var timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, step);
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(function (el) {
    counterObserver.observe(el);
  });


  /* ── 3. Menu mobile (hamburguer) ──────────────────────────── */
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu   = document.querySelector('[data-menu]');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }


  /* ── 4. Header encolhe ao rolar ───────────────────────────── */
  var header = document.querySelector('[data-header]');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }


  /* ── 5. Formulário de orçamento → WhatsApp ────────────────── */
  var quoteForm = document.querySelector('[data-quote-form]');

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nome        = quoteForm.querySelector('[name="nome"]').value.trim();
      var empresa     = quoteForm.querySelector('[name="empresa"]').value.trim();
      var telefone    = quoteForm.querySelector('[name="telefone"]').value.trim();
      var destino     = quoteForm.querySelector('[name="destino"]').value.trim();
      var data        = quoteForm.querySelector('[name="data"]').value;
      var passageiros = quoteForm.querySelector('[name="passageiros"]').value;

      var linhas = [
        'Olá, gostaria de solicitar um orçamento!',
        '',
        '👤 Nome: ' + nome,
        empresa     ? '🏢 Empresa: ' + empresa         : '',
        '📞 Telefone: ' + telefone,
        '📍 Destino: ' + destino,
        data        ? '📅 Data: ' + data               : '',
        passageiros ? '👥 Passageiros: ' + passageiros : '',
      ].filter(Boolean).join('\n');

      var url = 'https://wa.me/5531992636460?text=' + encodeURIComponent(linhas);
      window.open(url, '_blank');
    });
  }

}); // fim DOMContentLoaded