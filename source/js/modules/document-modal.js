/* * * * * * * * * * * * * * * * * * * * * * * *
 * document-modal.js
 */
function initDocumentModal(modalElement, openModal) {
  const modalName = modalElement.dataset.modal;
  const headingElement = modalElement.querySelector('.document-modal__heading');
  const contentElement = modalElement.querySelector('.document-modal__scroll-container-content');
  const copyButtonElement = modalElement.querySelector('.document-actions__button--copy');

  if (headingElement && contentElement && copyButtonElement) {
    copyButtonElement.addEventListener('click', (evt) => {
      evt.preventDefault();

      const headingText = headingElement.textContent;
      const contentText = contentElement.textContent;
      const textToCopy = `${headingText} ${contentText}`;
      navigator.clipboard.writeText(textToCopy);
    });
  }

  document.querySelectorAll(`[data-modal-opener="${modalName}"]`).forEach((openerElement) => {
    openerElement.addEventListener('click', (evt) => {
      evt.preventDefault();

      openModal(modalElement);
    });
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
