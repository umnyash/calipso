/* * * * * * * * * * * * * * * * * * * * * * * *
 * file-field.js
 */
function initFileField(fieldElement) {
  const controlElement = fieldElement.querySelector('.file-field__control');

  fieldElement.addEventListener('change', ({ target }) => {
    fieldElement.classList.toggle('file-field--empty', !target.value);
  });

  fieldElement.addEventListener('click', ({ target }) => {
    const resetButtonElement = target.closest('.file-field__reset-button');

    if (!resetButtonElement) {
      return;
    }

    fieldElement.classList.add('file-field--empty');
    controlElement.value = '';
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
