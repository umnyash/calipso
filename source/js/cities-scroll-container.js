function initCitiesScrollContainer(containerElement) {
  const scrollbarElement = containerElement.querySelector('.cities__scroll-container-scrollbar');

  new Swiper(containerElement, { // eslint-disable-line
    direction: 'vertical',
    slidesPerView: 'auto',
    freeMode: true,
    scrollbar: {
      el: scrollbarElement,
      draggable: true,
    },
    mousewheel: true,
  });
}

export { initCitiesScrollContainer };
