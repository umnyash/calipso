/* * * * * * * * * * * * * * * * * * * * * * * *
 * premium-brands-slider.js
 */
function initPremiumBrandsSlider(sliderElement) {
  const swiperElement = sliderElement.querySelector('.swiper');
  const prevButtonElement = sliderElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderElement.querySelector('.slider-arrows__button--next');

  new Swiper(swiperElement, {
    slidesPerView: 'auto',
    loop: true,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
    },
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
