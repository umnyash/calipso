function initProductQuestionModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm) {
  const alert = {
    success: {
      heading: 'Ваш вопрос успешно отправлен',
      text: 'Наш менеджер свяжется с вами',
    },
    error: {
      status: 'error',
      heading: 'Ошибка',
      text: 'Не удалось отправить вопрос, попробуйте снова.'
    },
  };

  initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert);
}

export { initProductQuestionModal };
