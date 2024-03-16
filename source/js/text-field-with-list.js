function initTextFieldWithList(fieldElement) {
  const controlElement = fieldElement.querySelector('.text-field__control');
  const listElement = fieldElement.querySelector('.text-field__data-list');

  controlElement.addEventListener('focus', () => {
    listElement.classList.add('text-field__data-list--open');
  });

  controlElement.addEventListener('blur', () => {
    listElement.classList.remove('text-field__data-list--open');
  });
}

export { initTextFieldWithList };
