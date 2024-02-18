function initNavigationShortcuts(navigationShortcutsElement) {
  const swiperElement = navigationShortcutsElement.querySelector('.swiper');

  new Swiper(swiperElement, { // eslint-disable-line
    slidesPerView: 'auto',
    spaceBetween: 10,
  });
}

export { initNavigationShortcuts };
