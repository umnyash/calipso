/* * * * * * * * * * * * * * * * * * * * * * * *
 * feedback-modal.js
 */
function initFeedbackModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, onFeedbackFormSuccessSubmit) {
  const alert = {
    success: {
      heading: 'Заявка успешно отправлена',
      text: 'Наш менеджер свяжется с вами',
    },
    error: {
      status: 'error',
      heading: 'Ошибка',
      text: 'Не удалось отправить заявку, попробуйте снова.'
    },
  };

  initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert, onFeedbackFormSuccessSubmit);
}
/* * * * * * * * * * * * * * * * * * * * * * * */
