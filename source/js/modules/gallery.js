/* * * * * * * * * * * * * * * * * * * * * * * *
 * gallery.js
 */
function initGallery(productGalleryElement) {
  const sliderElement = productGalleryElement.querySelector('.gallery__slider-wrapper');
  const prevButtonElement = productGalleryElement.querySelector('.gallery__slider .slider-arrows__button--prev');
  const nextButtonElement = productGalleryElement.querySelector('.gallery__slider .slider-arrows__button--next');

  const thumbnailsSliderElement = productGalleryElement.querySelector('.gallery__thumbnails-slider-wrapper');
  const thumbnailsSliderPrevButtonElement = productGalleryElement.querySelector('.gallery__thumbnails-slider .slider-arrows__button--prev');
  const thumbnailsSliderNextButtonElement = productGalleryElement.querySelector('.gallery__thumbnails-slider .slider-arrows__button--next');

  const videoElements = sliderElement.querySelectorAll('video');

  const thumbnailsSwiper = new Swiper(thumbnailsSliderElement, {
    spaceBetween: 10,
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
      1346: {
        spaceBetween: 20,
      }
    }
  });

  const mainSlider = new Swiper(sliderElement, {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      prevEl: [prevButtonElement, thumbnailsSliderPrevButtonElement],
      nextEl: [nextButtonElement, thumbnailsSliderNextButtonElement],
    },
    thumbs: {
      swiper: thumbnailsSwiper,
      slideThumbActiveClass: 'gallery__thumbnails-slider-item--active',
    },
    on: {
      slideChange: () => {
        videoElements.forEach((video) => video.pause());
      }
    }
  });

  return mainSlider;
}
/* * * * * * * * * * * * * * * * * * * * * * * */
