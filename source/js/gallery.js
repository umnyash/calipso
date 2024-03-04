function initGallery(productGalleryElement) {
  const sliderElement = productGalleryElement.querySelector('.gallery__slider-wrapper');
  const prevButtonElement = productGalleryElement.querySelector('.gallery__slider .slider-arrows__button--prev');
  const nextButtonElement = productGalleryElement.querySelector('.gallery__slider .slider-arrows__button--next');

  const thumbnailsSliderElement = productGalleryElement.querySelector('.gallery__thumbnails-slider-wrapper');
  const thumbnailsSliderPrevButtonElement = productGalleryElement.querySelector('.gallery__thumbnails-slider .slider-arrows__button--prev');
  const thumbnailsSliderNextButtonElement = productGalleryElement.querySelector('.gallery__thumbnails-slider .slider-arrows__button--next');

  const thumbnailsSwiper = new Swiper(thumbnailsSliderElement, { // eslint-disable-line
    spaceBetween: 10,
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    navigation: {
      prevEl: thumbnailsSliderPrevButtonElement,
      nextEl: thumbnailsSliderNextButtonElement,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
      1346: {
        spaceBetween: 20,
      }
    }
  });

  new Swiper(sliderElement, { // eslint-disable-line
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
    },
    thumbs: {
      swiper: thumbnailsSwiper,
      slideThumbActiveClass: 'gallery__thumbnails-slider-item--active',
    }
  });
}

export { initGallery };
