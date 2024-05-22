/* * * * * * * * * * * * * * * * * * * * * * * *
 * articles-slider.js
 */
function initArticlesSlider(articlesSliderElement) {
  const swiperElement = articlesSliderElement.querySelector('.articles__slider');
  const prevButtonElement = articlesSliderElement.querySelector('.articles__slider-arrows .slider-arrows__button--prev');
  const nextButtonElement = articlesSliderElement.querySelector('.articles__slider-arrows .slider-arrows__button--next');

  const swiper = new Swiper(swiperElement, {
    slidesPerView: 'auto',
    spaceBetween: 15,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1346: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1900: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    }
  });

  const filterElement = articlesSliderElement.querySelector('.articles__filter');
  const slideElements = articlesSliderElement.querySelectorAll('.articles__slider-item');

  const onFilterChange = (evt) => {
    const tag = evt.target.value;

    slideElements.forEach((slideElement) => {
      slideElement.classList.toggle(
        'articles__slider-item--hidden',
        !(slideElement.dataset.tag === tag || tag === 'all')
      );
    });

    swiper.update();
  }

  filterElement.addEventListener('change', onFilterChange);
}
/* * * * * * * * * * * * * * * * * * * * * * * */
