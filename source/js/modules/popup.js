/* * * * * * * * * * * * * * * * * * * * * * * *
 * popup.js
 */
function initPopupsClosing() {
  document.addEventListener('click', ({ target }) => {
    if (target.matches('.popup__button.button--primary') || target.matches('.popup__close-button')) {
      const popupElement = target.closest('.popup');
      popupElement.classList.add('popup--closing');

      setTimeout(() => {
        popupElement.remove();
      }, 300);
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
