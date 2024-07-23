/* * * * * * * * * * * * * * * * * * * * * * * *
 * popup.js
 */
function initPopupsClosing() {
  document.addEventListener('click', (evt) => {

    if (evt.target.matches('.popup__button.button--primary') || evt.target.matches('.popup__close-button')) {
      evt.preventDefault();

      const popupElement = evt.target.closest('.popup');
      popupElement.classList.add('popup--closing');

      setTimeout(() => {
        popupElement.remove();
      }, 300);
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
