/* * * * * * * * * * * * * * * * * * * * * * * *
 * product-header-sticky-form-buttons.js
 */
function initProductHeaderStickyFormButtons(buttonsWrapperElement) {
  const box = document.querySelector('.page__inner');

  const onBoxScroll = () => {
    const isPageScrolledDown = box.scrollHeight - box.scrollTop === box.clientHeight;

    if (!isPageScrolledDown) {
      buttonsWrapperElement.classList.add('product-header__form-buttons--sticked');
    } else {
      buttonsWrapperElement.classList.remove('product-header__form-buttons--sticked');
    }
  };

  box.addEventListener('scroll', throttle(onBoxScroll, 100));
  window.addEventListener('resize', throttle(onBoxScroll, 100));
  onBoxScroll();
}
/* * * * * * * * * * * * * * * * * * * * * * * */
