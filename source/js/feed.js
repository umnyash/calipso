function initFeed(feedElement) {
  const swiperElement = feedElement.querySelector('.swiper');
  const prevButtonElement = feedElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = feedElement.querySelector('.slider-arrows__button--next');

  new Swiper(swiperElement, { // eslint-disable-line
    slidesPerView: 'auto',
    spaceBetween: 10,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
    },
    breakpoints: {
      1900: {
        spaceBetween: 16,
      },
    }
  });
}

export { initFeed };
