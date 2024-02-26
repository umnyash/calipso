import { throttle } from './util.js';

function initStickyCartInfo(buttonsWrapperElement) {
  const box = document.querySelector('.page__inner');

  const onBoxScroll = () => {
    const isPageScrolledDown = box.scrollHeight - box.scrollTop === box.clientHeight;

    if (!isPageScrolledDown) {
      buttonsWrapperElement.classList.add('cart-form__info--sticked');
    } else {
      buttonsWrapperElement.classList.remove('cart-form__info--sticked');
    }
  };

  box.addEventListener('scroll', throttle(onBoxScroll, 100));
  window.addEventListener('resize', throttle(onBoxScroll, 100));
  onBoxScroll();
}

export { initStickyCartInfo };
