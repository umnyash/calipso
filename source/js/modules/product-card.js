/* * * * * * * * * * * * * * * * * * * * * * * *
 * product-card.js
 */
function initProductCard(productCardElement) {
  const sliderElement = productCardElement.querySelector('.product-card__slider');
  const paginationElement = sliderElement.querySelector('.product-card__slider-pagination');

  new Swiper(sliderElement, {
    pagination: {
      el: paginationElement,
      bulletClass: 'product-card__slider-pagination-button',
      bulletActiveClass: 'product-card__slider-pagination-button--current',
      renderBullet: getPaginationButtonCreator(),
    },
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
