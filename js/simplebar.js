// header dropdowns
let dropdownBtns = document.querySelectorAll('.header__dropdown-btn');
let dropdownItems = Array.from(dropdownBtns).map((btn) => {
  return [btn, btn.nextElementSibling];
});

dropdownItems.forEach(([btn, content]) => {

  content.setAttribute('inert', '');

  btn.addEventListener('click', function() {

    btn.classList.toggle('header__dropdown-btn--active');
    btn.classList.toggle('header__upper-wrapper-scroll');
    btn.setAttribute('aria-expanded', !JSON.parse(btn.getAttribute('aria-expanded')));
    content.classList.toggle('header__dropdown-content-wrapper--active');
    content.toggleAttribute('inert')

  });
});

document.addEventListener('click', function(event) {

  dropdownItems.forEach(([btn, content]) => {

    if ( !(event.composedPath().includes(btn) || event.composedPath().includes(content)) ) {

      btn.classList.remove('header__dropdown-btn--active');
      btn.setAttribute('aria-expanded', 'false');
      content.classList.remove('header__dropdown-content-wrapper--active');
      content.setAttribute('inert', '');

    };

  });

});

document.querySelectorAll('.simplebar-content-wrapper').forEach((e) => {
  e.setAttribute('aria-label', 'Прокручиваемый список');
})