function initBanners(bannersElement) {
  const sliderElement = bannersElement.querySelector('.banners__slider');
  const thumbnailsSliderElement = bannersElement.querySelector('.banners__thumbnails-slider');

  const thumbnailsSwiper = new Swiper(thumbnailsSliderElement, { // eslint-disable-line
    spaceBetween: 5,
    slidesPerView: 'auto',
    watchSlidesProgress: true,
  });

  const bannersSwiper = new Swiper(sliderElement, { // eslint-disable-line
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    thumbs: {
      swiper: thumbnailsSwiper,
      slideThumbActiveClass: 'banners__thumbnails-item--active',
    }
  });
}

export { initBanners };
