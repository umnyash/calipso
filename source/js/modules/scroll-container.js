/* * * * * * * * * * * * * * * * * * * * * * * *
 * scroll-container.js
 */
function initScrollContainer(containerElement) {
  const scrollbarElement = containerElement.querySelector('.swiper-scrollbar');

  const swiper = new Swiper(containerElement, {
    direction: 'vertical',
    slidesPerView: 'auto',
    freeMode: true,
    autoHeight: true,
    scrollbar: {
      el: scrollbarElement,
      draggable: true,
    },
    mousewheel: true,
  });

  return swiper;
}
/* * * * * * * * * * * * * * * * * * * * * * * */
