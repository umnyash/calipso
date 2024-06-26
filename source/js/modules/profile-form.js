/* * * * * * * * * * * * * * * * * * * * * * * *
 * profile-form.js
 */
function initProfileForm(formElement, sendData, openModal, showAlert, onProfileFormSuccessSubmit) {
  const SUBMIT_BUTTON_PENDING_STATE_CLASS = 'button--pending';

  const nameFieldElement = formElement.querySelector('.profile-form__item--name .text-field__control');
  const surnameFieldElement = formElement.querySelector('.profile-form__item--surname .text-field__control');
  const patronymicFieldElement = formElement.querySelector('.profile-form__item--patronymic .text-field__control');
  const emailFieldElement = formElement.querySelector('.profile-form__item--email .text-field__control');
  const dateFieldElement = formElement.querySelector('.profile-form__item--date .text-field__control');
  const cityFieldElement = formElement.querySelector('.profile-form__item--city .text-field__control');
  const streetFieldElement = formElement.querySelector('.profile-form__item--street .text-field__control');
  const houseFieldElement = formElement.querySelector('.profile-form__item--house .text-field__control');

  const submitButtonElement = formElement.querySelector('.profile-form__submit-button');
  const actionUrl = formElement.getAttribute('action');

  if (nameFieldElement) {
    nameFieldElement.setAttribute('data-pristine-pattern', '/^[a-zа-яЁё -]+$/i');
    nameFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    nameFieldElement.dataset.pristinePatternMessage = 'Допустимы только буквы, дефисы и пробелы.';
  }

  if (surnameFieldElement) {
    surnameFieldElement.setAttribute('data-pristine-pattern', '/^[a-zа-яЁё -]+$/i');
    surnameFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    surnameFieldElement.dataset.pristinePatternMessage = 'Допустимы только буквы, дефисы и пробелы.';
  }

  if (patronymicFieldElement) {
    patronymicFieldElement.setAttribute('data-pristine-pattern', '/^[a-zа-яЁё -]+$/i');
    patronymicFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    patronymicFieldElement.dataset.pristinePatternMessage = 'Допустимы только буквы, дефисы и пробелы.';
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

  if (cityFieldElement) {
    cityFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
  }

  if (streetFieldElement) {
    streetFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
  }

  if (houseFieldElement) {
    houseFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
  }

  function getAllFieldValues() {
    const values = [];

    formElement.querySelectorAll('input').forEach((fieldElement) => {
      if (fieldElement.type === 'checkbox') {
        values.push(fieldElement.checked);
      } else {
        values.push(fieldElement.value.trim());
      }
    });

    return values;
  }

  let currentFieldValues = getAllFieldValues();

  function isFieldValuesChanged() {
    const newFieldValues = getAllFieldValues();
    const newValuesString = newFieldValues.join();
    const currentValuesString = currentFieldValues.join();

    return currentValuesString !== newValuesString;
  }

  const pristine = new Pristine(formElement, {
    classTo: 'profile-form__item',
    errorClass: 'invalid',
    errorTextParent: 'profile-form__item',
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
      textFieldControlElement.dispatchEvent(new Event('input', {
        bubbles: true,
      }));
    }
  });

  formElement.addEventListener('change', () => {
    formElement.classList.remove('profile-form--error');
  });

  formElement.addEventListener('input', () => {
    submitButtonElement.disabled = !isFieldValuesChanged();
  });

  function successDefaultCb() {
    showAlert(openModal, {
      heading: 'Данные успешно обновлены',
    });
  };

  const successCb = onProfileFormSuccessSubmit ?? successDefaultCb;

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      submitButtonElement.disabled = true;
      submitButtonElement.classList.add(SUBMIT_BUTTON_PENDING_STATE_CLASS);

      sendData(
        actionUrl,
        new FormData(evt.target),
        (data) => {
          currentFieldValues = getAllFieldValues();
          successCb(data);
        },
        () => {
          showAlert(openModal, {
            status: 'error',
            heading: 'Ошибка',
            text: 'Не удалось обновить данные, попробуйте снова.'
          });
        },
        () => {
          submitButtonElement.disabled = false;
          submitButtonElement.classList.remove(SUBMIT_BUTTON_PENDING_STATE_CLASS);
        }
      );
    } else {
      formElement.classList.remove('profile-form--error');
      setTimeout(() => formElement.classList.add('profile-form--error'), 50);
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
