function initPremiumBrandsSlider(sliderElement) {
  const swiperElement = sliderElement.querySelector('.swiper');
  const prevButtonElement = sliderElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderElement.querySelector('.slider-arrows__button--next');

  new Swiper(swiperElement, { // eslint-disable-line
    slidesPerView: 'auto',
    loop: true,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
    },
  });
}

export { initPremiumBrandsSlider };
