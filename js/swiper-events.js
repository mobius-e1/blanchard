  const eventsSwiper = new Swiper('.events__swiper', {
    speed: 400,
    navigation: {
      nextEl: '.events__swiper-btn-next',
      prevEl: '.events__swiper-btn-prev',
    },
    pagination: {
      el: '.events__swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    a11y: {
      nextSlideMessage: "Следующая страница",
      prevSlideMessage: "Предыдущая страница",
      paginationBulletMessage: "Перейти к странице {{index}}",
      slideLabelMessage: "Слайд {{index}} из {{slidesLength}}",
      slideRole: "none",
    },

    breakpoints: {

      2560: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
        allowTouchMove: false,
      },


      2560: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
        allowTouchMove: false,
      },

      1092: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30,
        allowTouchMove: false,
      },

      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30,
        allowTouchMove: false,
      },
      875: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30,
        allowTouchMove: true,
      },
      647: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 40,
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

  eventsSwiper.wrapperEl.setAttribute('role', 'group');

  countSwiperPages(eventsSwiper);

  let eventsSlides = document.querySelectorAll('.events__item');

  eventsSlides.forEach((slide) => {
    focusControl.observe(slide);
  });