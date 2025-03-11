/* * * * * * * * * * * * * * * * * * * * * * * *
 * order-call-modal.js
 */
function initOrderCallModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, onOrderCallFormSuccessSubmit) {
  const alert = {
    success: {
      heading: 'Спасибо! Ваш вопрос успешно отправлен',
      text: 'Наш менеджер свяжется с вами в течении 3 рабочих дней',
    },
    error: {
      status: 'error',
      heading: 'Ошибка',
      text: 'Не удалось отправить вопрос, попробуйте снова.'
    },
  };

  initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert, onOrderCallFormSuccessSubmit);
}
/* * * * * * * * * * * * * * * * * * * * * * * */
