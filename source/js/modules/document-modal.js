/* * * * * * * * * * * * * * * * * * * * * * * *
 * document-modal.js
 */
function initDocumentModal(modalElement, openModal) {
  const modalName = modalElement.dataset.modal;

  document.querySelectorAll(`[data-modal-opener="${modalName}"]`).forEach((openerElement) => {
    openerElement.addEventListener('click', (evt) => {
      evt.preventDefault();

      openModal(modalElement);
    });
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
