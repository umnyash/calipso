/* * * * * * * * * * * * * * * * * * * * * * * *
 * search-form-with-submit-button.js
 */
function initSearchFormWithSubmitButton(formElement) {
  const fieldElement = formElement.querySelector('.text-field__control');
  const submitButtonElement = formElement.querySelector('.search-form__submit-button');

  fieldElement.addEventListener('input', (evt) => {
    submitButtonElement.disabled = evt.target.value.length === 0;
  });

  submitButtonElement.disabled = fieldElement.value.length === 0;
}
/* * * * * * * * * * * * * * * * * * * * * * * */
