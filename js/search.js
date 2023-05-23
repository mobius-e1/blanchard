let searchOpenBtn = document.querySelector('.header__search-upper-open');
let searchCloseBtn = document.querySelector('.header__search-upper-close');
let searchContainer = document.querySelector('.header__search-upper');
let searchInput = document.querySelector('.header__search-upper input');
let searchForm = document.querySelector('.header__search-upper-form');

searchOpenBtn.addEventListener('click', function() {
  searchContainer.classList.add('header__search-upper--active');
  searchInput.focus();
});

searchCloseBtn.addEventListener('click', function() {
  searchContainer.classList.remove('header__search-upper--active');
})

document.addEventListener('click', function(event) {
  if (!(event.composedPath().includes(searchForm) || event.composedPath().includes(searchOpenBtn))) {
    searchContainer.classList.remove('header__search-upper--active');
  }
})