const catalogAccordion = new Accordion('.catalog__accordion', {
    showMultiple: false,
    beforeOpen: (el) => {
      el.children[1].removeAttribute('inert');
      el.children[1].setAttribute('aria-hidden', 'false');
    },
    beforeClose: (el) => {
      el.children[1].setAttribute('inert', '');
      el.children[1].setAttribute('aria-hidden', 'true');
    },
  });

  (function() {
    let accordionItems = document.querySelectorAll('.catalog__accordion-item');

    accordionItems.forEach((e) => {

      if (!e.classList.contains('is-active')) {
        e.children[1].setAttribute('inert', '');
      };

    });

  })();


  let catalogContentItems = document.querySelectorAll('.catalog__content');
  let catalogempty = document.querySelector('.catalog-empty');
  let catalogBtns = document.querySelectorAll('.catalog__accordion-list-item-btn');


  catalogBtns.forEach((e) => {
    e.addEventListener('click', function(btn) {

      catalogBtns.forEach((elem) => {
        elem.classList.remove('catalog__accordion-list-item-btn--active');
      });
      btn.currentTarget.classList.add('catalog__accordion-list-item-btn--active');

      catalogContentItems.forEach((item) => {
        item.classList.remove('catalog__content--active');
      });

      let catalogTargetContent = document.querySelector(`[data-catalog-content="${e.textContent}"]`);

      if (catalogTargetContent) {
        catalogTargetContent.classList.add('catalog__content--active');
      } else {
        catalogempty.classList.add('catalog__content--active');
      };

      if (window.screen.width <= 647) {
        (catalogTargetContent || catalogempty).scrollIntoView();
      }

    });
  });