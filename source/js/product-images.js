import { DESKTOP_WIDTH_MEDIA_QUERY } from './const.js';
import { getPaginationButtonCreator } from './util.js';

function setSliderMode(slider, params) {
  slider.itself.classList.add(slider.modeClass, 'swiper');
  slider.list.classList.add('swiper-wrapper');
  slider.slides.forEach((row) => row.classList.add('swiper-slide'));

  slider.swiper = new Swiper(slider.itself, params); // eslint-disable-line
}

function setSliderSimpleMode(slider) {
  setSliderMode(slider, {
    pagination: {
      el: slider.pagination,
      bulletClass: 'product-images__slider-pagination-button',
      bulletActiveClass: 'product-images__slider-pagination-button--current',
      renderBullet: getPaginationButtonCreator(),
    },
    grabCursor: true,
  });
}

function resetSliderMode(slider) {
  slider?.swiper?.destroy(true, true);
  slider.itself.classList.remove('swiper');
  slider.list.classList.remove('swiper-wrapper');
  slider.slides.forEach((slide) => {
    slide.removeAttribute('aria-label');
    slide.removeAttribute('role');
    slide.classList.remove('swiper-slide');
  });

  slider.list.removeAttribute('aria-live');
  slider.pagination.innerHTML = '';

  slider.swiper = null;
}

function initProductImages(productImagesElement) {
  const slider = {
    itself: productImagesElement.querySelector('.product-images__slider'),
    list: productImagesElement.querySelector('.product-images__slider-list'),
    slides: productImagesElement.querySelectorAll('.product-images__slider-item'),
    pagination: productImagesElement.querySelector('.product-images__slider-pagination'),
  };

  const desktopWidthMediaQueryList = window.matchMedia(DESKTOP_WIDTH_MEDIA_QUERY);

  const toggleSliderMode = () => {
    if (desktopWidthMediaQueryList.matches) {
      resetSliderMode(slider);
    } else {
      setSliderSimpleMode(slider);
    }
  };

  desktopWidthMediaQueryList.addEventListener('change', () => {
    toggleSliderMode();
  });

  toggleSliderMode();
}

export { initProductImages };
