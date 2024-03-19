function initCooperationModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm) {
  const alert = {
    success: {
      heading: 'Спасибо! Ваша заявка успешно отправлена',
      text: 'Наш менеджер свяжется с вами в течении 3 рабочих дней для обсуждения деталей',
    },
    error: {
      status: 'error',
      heading: 'Ошибка',
      text: 'Не удалось отправить заявку, попробуйте снова.'
    },
  };

  initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert);
}

export { initCooperationModal };
