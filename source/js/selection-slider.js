function initSelectionSlider(sliderElement) {
  const swiperElement = sliderElement.querySelector('.swiper');
  const prevButtonElement = sliderElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderElement.querySelector('.slider-arrows__button--next');

  new Swiper(swiperElement, { // eslint-disable-line
    slidesPerView: 'auto',
    // loop: true,
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

export { initSelectionSlider };
