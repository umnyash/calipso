/* * * * * * * * * * * * * * * * * * * * * * * *
 * feedback-form.js
 */
function initFeedbackForm(formElement, sendData, openModal, showAlert) {
  const SUBMIT_BUTTON_PENDING_STATE_CLASS = 'button--pending';

  const nameFieldElement = formElement.querySelector('.feedback-form__item--name .text-field__control');
  const emailFieldElement = formElement.querySelector('.feedback-form__item--email .text-field__control');
  const phoneFieldElement = formElement.querySelector('.feedback-form__item--phone .text-field__control');
  const commentFieldElement = formElement.querySelector('.feedback-form__item--comment .textarea__control');

  const submitButtonElement = formElement.querySelector('.feedback-form__submit-button');
  const actionUrl = formElement.getAttribute('action');

  if (nameFieldElement) {
    nameFieldElement.pattern = /^[a-zа-яЁё -]+$/i;
    nameFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    nameFieldElement.dataset.pristinePatternMessage = 'Допустимы только буквы, дефисы и пробелы.';
  }

  if (phoneFieldElement) {
    phoneFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
  }

  if (emailFieldElement) {
    emailFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    emailFieldElement.dataset.pristineEmailMessage = 'Введите корректный e-mail адрес.';
  }

  if (commentFieldElement) {
    commentFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
  }

  const pristine = new Pristine(formElement, {
    classTo: 'feedback-form__item',
    errorClass: 'invalid',
    errorTextParent: 'feedback-form__item',
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
            heading: 'Спасибо за обратную связь!',
          });
        },
        () => {
          showAlert(openModal, {
            status: 'error',
            heading: 'Ошибка',
            text: 'Не удалось отправить сообщение, попробуйте снова.'
          });
        },
        () => {
          submitButtonElement.disabled = false;
          submitButtonElement.classList.remove(SUBMIT_BUTTON_PENDING_STATE_CLASS);
        }
      );
    } else {
      formElement.classList.remove('feedback-form--error');
      setTimeout(() => formElement.classList.add('feedback-form--error'), 50);
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
