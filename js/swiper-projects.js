//  swiper-projects
const projectsSwiper = new Swiper('.projects__swiper', {
    speed: 400,
    navigation: {
      nextEl: '.projects__swiper-btn-next',
      prevEl: '.projects__swiper-btn-prev',
    },
    a11y: {
      nextSlideMessage: "Следующая страница",
      prevSlideMessage: "Предыдущая страница",
      slideLabelMessage: "Слайд {{index}} из {{slidesLength}}",
      slideRole: "none",
    },
  breakpoints: {
    1920: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
      allowTouchMove: false,
    },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
        allowTouchMove: false,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50,
        allowTouchMove: true,
      },
      576: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
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

  projectsSwiper.wrapperEl.setAttribute('role', 'group');

  countSwiperPages(projectsSwiper);

  let projectsSlides = document.querySelectorAll('.projects__item');

  projectsSlides.forEach((slide) => {
    focusControl.observe(slide);
  });