function initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert) {
  const SUBMIT_BUTTON_PENDING_STATE_CLASS = 'button--pending';
  const modalName = modalElement.dataset.modal;
  const formElement = modalElement.querySelector('.modal__form');
  const submitButtonElement = formElement.querySelector('.modal-form__submit-button');

  const nameFieldElement = modalElement.querySelector('.modal-form__item--name .text-field__control');
  const surnameFieldElement = modalElement.querySelector('.modal-form__item--surname .text-field__control');
  const patronymicFieldElement = modalElement.querySelector('.modal-form__item--patronymic .text-field__control');
  const phoneFieldElement = modalElement.querySelector('.modal-form__item--phone .text-field__control');
  const emailFieldElement = modalElement.querySelector('.modal-form__item--email .text-field__control');
  const dateFieldElement = modalElement.querySelector('.modal-form__item--date .text-field__control');
  const commentFieldElement = modalElement.querySelector('.modal-form__item--comment .textarea__control');

  if (nameFieldElement) {
    nameFieldElement.pattern = /^[a-zа-яЁё -]+$/i;
    nameFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    nameFieldElement.dataset.pristinePatternMessage = 'Допустимы только буквы, дефисы и пробелы.';
  }

  if (surnameFieldElement) {
    surnameFieldElement.pattern = /^[a-zа-яЁё -]+$/i;
    surnameFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    surnameFieldElement.dataset.pristinePatternMessage = 'Допустимы только буквы, дефисы и пробелы.';
  }

  if (patronymicFieldElement) {
    patronymicFieldElement.pattern = /^[a-zа-яЁё -]+$/i;
    patronymicFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    patronymicFieldElement.dataset.pristinePatternMessage = 'Допустимы только буквы, дефисы и пробелы.';
  }

  if (phoneFieldElement) {
    phoneFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    phoneFieldElement.dataset.pristineEmailMessage = 'Введите корректный номер телефона.';
  }

  if (emailFieldElement) {
    emailFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    emailFieldElement.dataset.pristineEmailMessage = 'Введите корректный e-mail адрес.';
  }

  if (dateFieldElement) {
    dateFieldElement.pattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
    dateFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    dateFieldElement.dataset.pristinePatternMessage = 'Введите дату в формате дд.мм.гггг';
  }

  if (commentFieldElement) {
    commentFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
  }

  const actionUrl = formElement.getAttribute('action');

  const pristine = new Pristine(formElement, { // eslint-disable-line
    classTo: 'modal-form__item',
    errorClass: 'invalid',
    errorTextParent: 'modal-form__item',
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
          closeModal(modalElement);
          showAlert(openModal, alert.success);
          formElement.reset();
        },
        () => {
          closeModal(modalElement);
          showAlert(openModal, alert.error);
        },
        () => {
          submitButtonElement.disabled = false;
          submitButtonElement.classList.remove(SUBMIT_BUTTON_PENDING_STATE_CLASS);
        }
      );
    } else {
      modalElement.classList.remove('modal--error');
      setTimeout(() => modalElement.classList.add('modal--error'), 50);
    }
  });

  document.querySelectorAll(`[data-modal-opener="${modalName}"]`).forEach((openerElement) => {
    openerElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      modalElement.classList.remove('modal--error');

      openModal(modalElement);
      modalElement.querySelector('input').focus();
    });
  });
}

export { initSimpleModalForm };
