function initFilterSlider(sliderElement) {
  // const swiperElement = sliderElement.querySelector('.swiper');

  new Swiper(sliderElement, { // eslint-disable-line
    slidesPerView: 'auto',
    spaceBetween: 10,
    breakpoints: {
      1346: {
        spaceBetween: 20
      },
    }
  });
}

export { initFilterSlider };
