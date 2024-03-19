function initReviewModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm) {
  const alert = {
    success: {
      heading: 'Спасибо, что оценили нашу работу',
      text: 'Ваш отзыв будет проверен модератором сайта, и опубликован в течение 2 рабочих дней',
    },
    error: {
      status: 'error',
      heading: 'Ошибка',
      text: 'Не удалось отправить отзыв, попробуйте снова.'
    },
  };

  initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert);
}

export { initReviewModal };
