import { throttle } from './util.js';

let reviewTextWrapperElements = null;

function updateReviewsTextWrappersList(listElement) {
  reviewTextWrapperElements = listElement.querySelectorAll('.review__text-wrapper');
}

function setReviewsTextWrappersMode() {
  reviewTextWrapperElements.forEach((textWrapperElement) => {
    const isClipped = textWrapperElement.classList.contains('review__text-wrapper--clipped');
    textWrapperElement.classList.add('review__text-wrapper--clipped');
    const textElement = textWrapperElement.querySelector('.review__text');

    if (textElement.scrollHeight > textElement.offsetHeight) {
      textWrapperElement.classList.add('review__text-wrapper--clippable');
    } else {
      textWrapperElement.classList.remove('review__text-wrapper--clippable');
    }

    if (!isClipped) {
      textWrapperElement.classList.remove('review__text-wrapper--clipped');
    }
  });
}

function initReviewsList(listElement) {
  updateReviewsTextWrappersList(listElement);
  setReviewsTextWrappersMode();

  window.addEventListener('resize', throttle(setReviewsTextWrappersMode, 500));

  listElement.addEventListener('click', (evt) => {
    const toggleButtonElement = evt.target.closest('.review__toggle-button');

    if (!toggleButtonElement) {
      return;
    }

    const textWrapperElement = toggleButtonElement.closest('.review__text-wrapper');
    textWrapperElement.classList.toggle('review__text-wrapper--clipped');
  });
}

export { initReviewsList };
