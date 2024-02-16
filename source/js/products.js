function initProducts(productsElement) {
  const swiperElement = productsElement.querySelector('.swiper');
  const prevButtonElement = productsElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = productsElement.querySelector('.slider-arrows__button--next');

  new Swiper(swiperElement, { // eslint-disable-line
    slidesPerView: 'auto',
    spaceBetween: 15,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
    },
    breakpoints: {
      768: {
        spaceBetween: 20,
      },
      1346: {
        spaceBetween: 30,
      },
      1900: {
        spaceBetween: 40,
      },
    }
  });
}

export { initProducts };
