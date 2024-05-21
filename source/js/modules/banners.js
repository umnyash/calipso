/* * * * * * * * * * * * * * * * * * * * * * * *
 * banners.js
 */
function initBanners(bannersElement) {
  const sliderElement = bannersElement.querySelector('.banners__slider');
  const thumbnailsSliderElement = bannersElement.querySelector('.banners__thumbnails-slider');
  const thumbnailElements = thumbnailsSliderElement.querySelectorAll('.banners__thumbnail');

  const thumbnailsSwiper = new Swiper(thumbnailsSliderElement, {
    spaceBetween: 5,
    slidesPerView: 'auto',
    watchSlidesProgress: true,
  });

  const bannersSwiper = new Swiper(sliderElement, {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },
    thumbs: {
      swiper: thumbnailsSwiper,
      slideThumbActiveClass: 'banners__thumbnails-item--active',
    },
  });

  bannersSwiper.on('autoplayTimeLeft', (_s, _time, progress) => {
    thumbnailElements.forEach((thumbnailElement) => {
      thumbnailElement.style.setProperty('--thumbnail-progress', 1 - progress);
    });
  })
}
/* * * * * * * * * * * * * * * * * * * * * * * */
