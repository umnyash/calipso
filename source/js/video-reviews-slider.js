function initVideoReiewsSlider(reviewsElement) {
  const swiperElement = reviewsElement.querySelector('.swiper');
  const prevButtonElement = reviewsElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = reviewsElement.querySelector('.slider-arrows__button--next');

  new Swiper(swiperElement, { // eslint-disable-line
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
    },
    watchSlidesProgress: true,
    breakpoints: {
      1346: {
        spaceBetween: 30,
      },
      1900: {
        spaceBetween: 40,
      },
    }
  });
}

export { initVideoReiewsSlider };
