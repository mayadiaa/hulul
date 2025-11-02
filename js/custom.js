(function () {
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    // ===== Helpers =====
    const $  = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));
    const on = (el, evt, handler, opts) => el && el.addEventListener(evt, handler, opts);


    on(document, 'click', function (e) {
      const btn = e.target.closest('#toggleMore');
      if (!btn) return;

      const expanded = btn.getAttribute('aria-expanded') === 'true';
      $$('.extra-service').forEach(card => {
       
        card.toggleAttribute('hidden', expanded);
      });

      btn.textContent = expanded ? 'See more ->' : 'See less';
      btn.setAttribute('aria-expanded', String(!expanded));
    }, { passive: true });

   
    if (!document.querySelector('style[data-hidden-polyfill]')) {
      const s = document.createElement('style');
      s.dataset.hiddenPolyfill = 'true';
      s.textContent = '[hidden]{display:none!important}';
      document.head.appendChild(s);
    }

  
    const switcher = $('#switcher');
    const startBtn = $('#startBtn');
    const introPane = $('#introPane');
    const formPane  = $('#formPane');
    const backBtn   = $('#backBtn');
    const reqForm   = $('#reqForm');
    const moveLeft  = $('#moveLeft');
    const moveRight = $('#moveRight');

    function showForm() {
      if (switcher) switcher.classList.add('show-form');
      if (introPane) introPane.style.display = 'none';
      if (formPane)  formPane.style.display  = 'block';
    }
    function showIntro() {
      if (switcher) switcher.classList.remove('show-form');
      if (formPane)  formPane.style.display  = 'none';
      if (introPane) introPane.style.display = 'block';
    }

    on(startBtn, 'click', showForm);
    on(backBtn,  'click', showIntro);

    on(moveLeft, 'click', () => {
      if (!reqForm) return;
      reqForm.classList.remove('to-right');
      reqForm.classList.add('to-left');
      setTimeout(() => reqForm.classList.remove('to-left'), 420);
    });

    on(moveRight, 'click', () => {
      if (!reqForm) return;
      reqForm.classList.remove('to-left');
      reqForm.classList.add('to-right');
      setTimeout(() => reqForm.classList.remove('to-right'), 420);
    });
  });
})();
