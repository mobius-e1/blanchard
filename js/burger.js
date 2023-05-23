  let burgerBtn = document.querySelector('.header__burger');
  let burgerMenu = document.querySelector('.header__upper-wrapper');
  let burgerMenuLinks = document.querySelectorAll('.header__upper-wrapper a');
  let breaker = -1;

  burgerBtn.addEventListener('click', function() {

    document.body.classList.toggle('stop-scroll');

    burgerBtn.classList.toggle('header__burger--active');
    burgerBtn.setAttribute('aria-expanded', !JSON.parse(this.getAttribute('aria-expanded')));

    burgerMenu.classList.toggle('header__upper-wrapper--active');

    if (breaker) {

      document.querySelector('.header__search-upper-open').addEventListener('focus', function() {
        document.querySelector('.header__burger--active').focus();
      })

      breaker++;

    }

  })

  burgerMenuLinks.forEach((e) => {
    e.addEventListener('click', function() {

      document.body.classList.remove('stop-scroll');

      burgerBtn.classList.remove('header__burger--active');
      burgerBtn.setAttribute('aria-expanded', 'false')

      burgerMenu.classList.remove('header__upper-wrapper--active');

    });
  });