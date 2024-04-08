/* * * * * * * * * * * * * * * * * * * * * * * *
 * selection-slider.js
 */
function initSelectionSlider(sliderElement) {
  const swiperElement = sliderElement.querySelector('.swiper');
  const prevButtonElement = sliderElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderElement.querySelector('.slider-arrows__button--next');

  new Swiper(swiperElement, {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
    },
    breakpoints: {
      1346: {
        spaceBetween: 30
      },
      1900: {
        spaceBetween: 40
      },
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
