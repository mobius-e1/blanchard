var introductionSwiper = new Swiper('.introduction__swiper', {
  fadeEffect: { crossFade: true },
  virtualTranslate: true,
  autoplay: {
      delay: 5000,
      disableOnInteraction: true,
  },
  speed: 5000, 
  slidersPerView: 1,
  effect: 'fade'
});