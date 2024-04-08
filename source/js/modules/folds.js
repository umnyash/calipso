/* * * * * * * * * * * * * * * * * * * * * * * *
 * folds.js
 */
function toggleFoldState(buttonElement) {
  const foldElement = buttonElement.closest('.folds__item');
  const contentWrapperElement = foldElement.querySelector('.folds__content-wrapper');
  const contentElement = contentWrapperElement.querySelector('.folds__content');

  const contentElementHeight = contentElement.getBoundingClientRect().height;
  contentWrapperElement.style.height = `${contentElementHeight}px`;

  setTimeout(() => {
    foldElement.classList.toggle('folds__item--open');
  }, 20);

  buttonElement.ariaExpanded = buttonElement.ariaExpanded === 'true' ? 'false' : 'true';
}

function initFolds(foldsElement) {
  foldsElement.addEventListener('click', ({ target }) => {
    const buttonElement = target.closest('.folds__button');
    if (!buttonElement) {
      return;
    }

    toggleFoldState(buttonElement);
  });

  foldsElement.addEventListener('transitionend', ({ target }) => {
    const foldElement = target.closest('.folds__item');

    if (!foldElement || !foldElement.classList.contains('folds__item--open')) {
      return;
    }

    if (target.classList.contains('folds__content-wrapper')) {
      setTimeout(() => {
        target.style.height = 'auto';
      }, 0);
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
