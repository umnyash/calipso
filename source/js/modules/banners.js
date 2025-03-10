/* * * * * * * * * * * * * * * * * * * * * * * *
 * banners.js
 */

function initBanners(bannersElement) {
  const sliderElement = bannersElement.querySelector('.banners__slider');
  const thumbnailsSliderElement = bannersElement.querySelector('.banners__thumbnails-slider');
  const thumbnailsListElement = thumbnailsSliderElement.querySelector('.banners__thumbnails-list');

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
      delay: BANNERS_AUTOPLAY_DELAY,
      disableOnInteraction: false
    },
    thumbs: {
      swiper: thumbnailsSwiper,
      slideThumbActiveClass: 'banners__thumbnails-item--active',
    },
  });

  const laptopWidthMediaQueryList = window.matchMedia(LAPTOP_WIDTH_MEDIA_QUERY);
  let videoElement = null;

  const updateProgressBar = throttle((value) => {
    thumbnailsListElement.style.setProperty('--thumbnail-progress', value);
  }, 25);

  const updateDelayAndPlay = () => {
    const videoDurationMs = videoElement.duration * 1000;
    bannersSwiper.params.autoplay.delay = videoDurationMs;
    videoElement.currentTime = 0;
    videoElement.play().catch(err => console.error(err));
    bannersSwiper.autoplay.start();
  };

  bannersSwiper.on('autoplayTimeLeft', (_s, _time, progress) => {
    updateProgressBar(1 - progress);
  });

  const onBannersSWiperSlideChange = () => {
    bannersSwiper.autoplay.stop();

    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
      videoElement.src = videoElement.src
    }

    if (!laptopWidthMediaQueryList.matches) {
      bannersSwiper.params.autoplay.delay = BANNERS_AUTOPLAY_DELAY;
      bannersSwiper.autoplay.start();
      return;
    }

    const activeSlideElement = bannersSwiper.slides[bannersSwiper.activeIndex];
    videoElement = activeSlideElement.querySelector('video');

    if (videoElement) {
      if (videoElement.readyState >= 1) {
        updateDelayAndPlay();
      } else {
        videoElement.addEventListener('loadedmetadata', updateDelayAndPlay, { once: true });
      }
    } else {
      bannersSwiper.params.autoplay.delay = BANNERS_AUTOPLAY_DELAY;
      bannersSwiper.autoplay.start();
    }
  };

  onBannersSWiperSlideChange();
  bannersSwiper.on('slideChange', onBannersSWiperSlideChange);
  laptopWidthMediaQueryList.addEventListener('change', onBannersSWiperSlideChange);
}
/* * * * * * * * * * * * * * * * * * * * * * * */
