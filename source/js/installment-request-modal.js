function initInstallmentRequestModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm) {
  const alert = {
    success: {
      heading: 'Заявка успешно отправлена',
      text: 'Наш менеджер свяжется с вами в течении 3 рабочих дней',
    },
    error: {
      status: 'error',
      heading: 'Ошибка',
      text: 'Не удалось отправить заявку, попробуйте снова.'
    },
  };

  initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert);
}

export { initInstallmentRequestModal };
