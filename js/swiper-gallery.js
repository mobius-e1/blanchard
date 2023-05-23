
"use strict"
document.addEventListener('DOMContentLoaded', function() {
// global
  let focusable = document.querySelectorAll('[tabindex="0"]');

  focusable.forEach((e) => {
    e.addEventListener('keydown', function(k) {
      if (k.keyCode === 13) {
        this.click();
      }
    });
  });

  let focusControl = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {

        if (!entry.isIntersecting) {
          entry.target.setAttribute('inert', '');
          entry.target.setAttribute('aria-hidden', 'true');
        } else {
          entry.target.removeAttribute('inert');
          entry.target.removeAttribute('aria-hidden');
        }

    });
  });



  

  



  // gallery swiper
  const gallerySwiper = new Swiper('.gallery__swiper', {
    speed: 400,
    navigation: {
      nextEl: '.gallery__swiper-btn-next',
      prevEl: '.gallery__swiper-btn-prev',
    },
    a11y: {
      nextSlideMessage: "Следующая страница",
      prevSlideMessage: "Предыдущая страница",
      slideLabelMessage: "Слайд {{index}} из {{slidesLength}}",
      slideRole: "none",
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
        allowTouchMove: false,
      },
      576: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 38,
        allowTouchMove: true,
      },
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
        allowTouchMove: true,
      },
    },
  });
  gallerySwiper.wrapperEl.setAttribute('role', 'group');

  gallerySwiper.slides.forEach((slide) => {
    focusControl.observe(slide);
  })

  let countSwiperPages = function(swiper, pageDisplayClass = false) {

    let count = function() {

    let currentBP = swiper.currentBreakpoint;
    let slidesPerView = (swiper.originalParams.breakpoints[currentBP]).slidesPerGroup;

    let currentPage = Math.ceil(swiper.activeIndex / slidesPerView + 1);
    let maxPages = Math.ceil(swiper.slides.length / slidesPerView);

    if (pageDisplayClass) document.querySelector(pageDisplayClass).textContent = `${currentPage} / ${maxPages}`;

    swiper.wrapperEl.setAttribute('aria-label', `Страница ${currentPage} из ${maxPages}`);

    }

    count();

    swiper.on('breakpoint', count);
    swiper.on('slideChangeTransitionStart', count);

  };

  countSwiperPages(gallerySwiper, '.gallery__swiper-page');




  
  // gallery modal window
  let galleryModalWindow = document.querySelector('.gallery__modal');
  let galleryModalBtns = document.querySelectorAll('.gallery__modal-btn');

  function getActiveModalItem() {
    return document.querySelector('.gallery__modal-item--active');
  }

  gallerySwiper.slides.forEach((slide) => {
    slide.addEventListener('click', function() {

      galleryModalWindow.classList.add('gallery__modal--active');

      document.body.classList.add('stop-scroll');

      let targetModalItem = document.querySelector(`[data-swiper-modal="${slide.getAttribute('data-swiper-slide')}"]`);
      targetModalItem.classList.add('gallery__modal-item--active');

    });
  });

  galleryModalBtns.forEach((btn) => {

    btn.addEventListener('click', function() {

      galleryModalWindow.classList.remove('gallery__modal--active');

      document.body.classList.remove('stop-scroll');

      getActiveModalItem().classList.remove('gallery__modal-item--active');

    });
  });

  galleryModalWindow.addEventListener('click', function(event) {

    let activeItem = getActiveModalItem();

    if ( activeItem && !event.composedPath().includes(activeItem) ) {

      galleryModalWindow.classList.remove('gallery__modal--active');

      document.body.classList.remove('stop-scroll');

      activeItem.classList.remove('gallery__modal-item--active');

    }

  })


});