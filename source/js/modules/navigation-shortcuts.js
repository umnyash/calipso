/* * * * * * * * * * * * * * * * * * * * * * * *
 * navigation-shortcuts.js
 */
function initNavigationShortcuts(navigationShortcutsElement) {
  const swiperElement = navigationShortcutsElement.querySelector('.swiper');

  new Swiper(swiperElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
