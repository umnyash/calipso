function initPhoneModal(modalElement) {
  const formElement = modalElement.querySelector('form');
  const codeFieldElement = modalElement.querySelector('input[name="code"]');
  const phoneFieldElement = modalElement.querySelector('input[name="phone"]');

  if (codeFieldElement) {
    codeFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
  }

  if (phoneFieldElement) {
    phoneFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    phoneFieldElement.dataset.pristineEmailMessage = 'Введите корректный номер телефона.';
  }

  const pristine = new Pristine(formElement, { // eslint-disable-line
    classTo: 'text-field',
    errorClass: 'invalid',
    errorTextParent: 'text-field',
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

    if (!isValid) {
      modalElement.classList.remove('modal--error');
      setTimeout(() => modalElement.classList.add('modal--error'), 50);
    }
  });
}

document.querySelectorAll('[data-modal="phone"], [data-modal="code"], [data-modal="sign-in"]').forEach(initPhoneModal);
