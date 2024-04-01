function initCitiesModal(modalElement) {
  const formElement = modalElement.querySelector('.cities__form');

  formElement.addEventListener('click', (evt) => {
    const textFieldClearButtonElement = evt.target.closest('.text-field__clear-button');

    if (textFieldClearButtonElement) {
      const textFieldElement = textFieldClearButtonElement.closest('.text-field');
      const textFieldControlElement = textFieldElement.querySelector('.text-field__control');
      textFieldControlElement.value = '';
      textFieldControlElement.focus();
    }
  });
}

export { initCitiesModal };
