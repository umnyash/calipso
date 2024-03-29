function initOneClickModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm) {
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

  initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert);
}

export { initOneClickModal };
