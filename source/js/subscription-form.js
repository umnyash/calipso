function initSubscriptionForm(formElement, sendData, openModal, showAlert) {
  const SUBMIT_BUTTON_PENDING_STATE_CLASS = 'button--pending';
  const emailFieldElement = formElement.querySelector('.subscription__form-item .text-field__control');
  const submitButtonElement = formElement.querySelector('.subscription__form-submit-button');
  const actionUrl = formElement.getAttribute('action');

  emailFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
  emailFieldElement.dataset.pristineEmailMessage = 'Введите корректный e-mail адрес.';

  const pristine = new Pristine(formElement, { // eslint-disable-line
    classTo: 'subscription__form-item',
    errorClass: 'invalid',
    errorTextParent: 'subscription__form-item',
    errorTextTag: 'p',
    errorTextClass: 'prompt-text',
  });

  formElement.addEventListener('click', (evt) => {
    const textFieldClearButtonElement = evt.target.closest('.text-field__clear-button');

    if (textFieldClearButtonElement) {
      const textFieldElement = textFieldClearButtonElement.closest('.text-field');
      const textFieldControlElement = textFieldElement.querySelector('.text-field__control');
      textFieldControlElement.value = '';
      textFieldControlElement.focus();
    }
  });

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      submitButtonElement.disabled = true;
      submitButtonElement.classList.add(SUBMIT_BUTTON_PENDING_STATE_CLASS);

      sendData(
        actionUrl,
        new FormData(evt.target),
        () => {
          formElement.reset();
          showAlert(openModal, {
            heading: 'Вы подписались',
          });
        },
        () => {
          showAlert(openModal, {
            status: 'error',
            heading: 'Ошибка',
            text: 'Не удалось подписаться, попробуйте снова.'
          });
        },
        () => {
          submitButtonElement.disabled = false;
          submitButtonElement.classList.remove(SUBMIT_BUTTON_PENDING_STATE_CLASS);
        }
      );
    } else {
      formElement.classList.remove('subscription__form--error');
      setTimeout(() => formElement.classList.add('subscription__form--error'), 50);
    }
  });
}

export { initSubscriptionForm };
