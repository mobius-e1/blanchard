// connection scripts

// simplebar

let dropdownBtns = document.querySelectorAll('.header__dropdown-btn');
let dropdownItems = Array.from(dropdownBtns).map((btn) => {
    return [btn, btn.nextElementSibling];
});

dropdownItems.forEach(([btn, content]) => {

    content.setAttribute('inert', '');

    btn.addEventListener('click', function () {

        btn.classList.toggle('header__dropdown-btn--active');
        btn.classList.toggle('header__upper-wrapper-scroll');
        btn.setAttribute('aria-expanded', !JSON.parse(btn.getAttribute('aria-expanded')));
        content.classList.toggle('header__dropdown-content-wrapper--active');
        content.toggleAttribute('inert')

    });
});

document.addEventListener('click', function (event) {

    dropdownItems.forEach(([btn, content]) => {

        if (!(event.composedPath().includes(btn) || event.composedPath().includes(content))) {

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



// swiper-introduction

let introductionSwiper = new Swiper('.introduction__swiper', {
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



// swiper-gallery

document.addEventListener('DOMContentLoaded', function () {

    let focusable = document.querySelectorAll('[tabindex="0"]');

    focusable.forEach((e) => {
        e.addEventListener('keydown', function (k) {
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

            1920: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 50,
                allowTouchMove: false,
            },

            1366: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 34,
                allowTouchMove: false,
            },

            1024: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 34,
                allowTouchMove: false,
            },

            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 38,
                allowTouchMove: true,
            },


            414: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 30,
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

    let countSwiperPages = function (swiper, pageDisplayClass = false) {

        let count = function () {

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


    let galleryModalWindow = document.querySelector('.gallery__modal');
    let galleryModalBtns = document.querySelectorAll('.gallery__modal-btn');

    function getActiveModalItem() {
        return document.querySelector('.gallery__modal-item--active');
    }

    gallerySwiper.slides.forEach((slide) => {
        slide.addEventListener('click', function () {

            galleryModalWindow.classList.add('gallery__modal--active');

            document.body.classList.add('stop-scroll');

            let targetModalItem = document.querySelector(`[data-swiper-modal="${slide.getAttribute('data-swiper-slide')}"]`);
            targetModalItem.classList.add('gallery__modal-item--active');

        });
    });

    galleryModalBtns.forEach((btn) => {

        btn.addEventListener('click', function () {

            galleryModalWindow.classList.remove('gallery__modal--active');

            document.body.classList.remove('stop-scroll');

            getActiveModalItem().classList.remove('gallery__modal-item--active');

        });
    });

    galleryModalWindow.addEventListener('click', function (event) {

        let activeItem = getActiveModalItem();

        if (activeItem && !event.composedPath().includes(activeItem)) {

            galleryModalWindow.classList.remove('gallery__modal--active');

            document.body.classList.remove('stop-scroll');

            activeItem.classList.remove('gallery__modal-item--active');

        }

    })

});



// choices

const gellerySelect = document.querySelector('.filter-form__select');
const galleryChoices = new Choices(gellerySelect, {
    searchEnabled: false,
    position: 'bottom',
    itemSelectText: '',
});

const choicesList = document.querySelector('.choices__list[role="listbox"]');

let hideSelected = function () {
    let currentValue = galleryChoices.getValue('value');

    choicesList.childNodes.forEach(e => {
        e.removeAttribute('hidden');

        if (e.getAttribute('data-value') === currentValue) {
            e.setAttribute('hidden', 'true');
            e.removeAttribute('data-choice-selectable', '');
        };
    });
};

hideSelected();

gellerySelect.addEventListener('change', () => {
    hideSelected();
});



// accordion

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

(function () {
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
    e.addEventListener('click', function (btn) {

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



// tippy

tippy(document.querySelectorAll('.projects-descr-tooltip'), {
    trigger: 'click',
    onTrigger(instance, event) {
        instance.reference.classList.add('projects-descr-tooltip--active');
    },
    onHide(instance) {
        instance.reference.classList.remove('projects-descr-tooltip--active');
    },
    content: (reference) => reference.getAttribute('data-tooltip-content'),
})



// start

setTimeout(function () {
    document.body.classList.add('body-visible');
}, 0);



// scroll

const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 300,
    framesCount = 100;

anchors.forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault();

        let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

        let scroller = setInterval(function () {
            let scrollBy = coordY / framesCount;

            if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                window.scrollBy(0, scrollBy);
            } else {
                window.scrollTo(0, coordY);
                clearInterval(scroller);
            }
        }, animationTime / framesCount);
    });
});




// burger

let burgerBtn = document.querySelector('.header__burger');
let burgerMenu = document.querySelector('.header__upper-wrapper');
let burgerMenuLinks = document.querySelectorAll('.header__upper-wrapper a');
let breaker = -1;

burgerBtn.addEventListener('click', function () {

    document.body.classList.toggle('stop-scroll');

    burgerBtn.classList.toggle('header__burger--active');
    burgerBtn.setAttribute('aria-expanded', !JSON.parse(this.getAttribute('aria-expanded')));

    burgerMenu.classList.toggle('header__upper-wrapper--active');

    if (breaker) {

        document.querySelector('.header__search-upper-open').addEventListener('focus', function () {
            document.querySelector('.header__burger--active').focus();
        })

        breaker++;

    }

})

burgerMenuLinks.forEach((e) => {
    e.addEventListener('click', function () {

        document.body.classList.remove('stop-scroll');

        burgerBtn.classList.remove('header__burger--active');
        burgerBtn.setAttribute('aria-expanded', 'false')

        burgerMenu.classList.remove('header__upper-wrapper--active');

    });
});



// search

let searchOpenBtn = document.querySelector('.header__search-upper-open');
let searchCloseBtn = document.querySelector('.header__search-upper-close');
let searchContainer = document.querySelector('.header__search-upper');
let searchInput = document.querySelector('.header__search-upper input');
let searchForm = document.querySelector('.header__search-upper-form');

searchOpenBtn.addEventListener('click', function () {
    searchContainer.classList.add('header__search-upper--active');
    searchInput.focus();
});

searchCloseBtn.addEventListener('click', function () {
    searchContainer.classList.remove('header__search-upper--active');
})

document.addEventListener('click', function (event) {
    if (!(event.composedPath().includes(searchForm) || event.composedPath().includes(searchOpenBtn))) {
        searchContainer.classList.remove('header__search-upper--active');
    }
})



// swiper-events

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

        1920: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50,
            allowTouchMove: false,
        },

        1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 27,
            allowTouchMove: false,
        },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 34,
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
