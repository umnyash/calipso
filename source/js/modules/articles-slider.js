/* * * * * * * * * * * * * * * * * * * * * * * *
 * articles-slider.js
 */
function initArticlesSlider(articlesSliderElement) {
  const swiperElement = articlesSliderElement.querySelector('.articles__slider');
  const prevButtonElement = articlesSliderElement.querySelector('.articles__slider-arrows .slider-arrows__button--prev');
  const nextButtonElement = articlesSliderElement.querySelector('.articles__slider-arrows .slider-arrows__button--next');

  new Swiper(swiperElement, {
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
}
/* * * * * * * * * * * * * * * * * * * * * * * */
