function initCartForm(formElement) {
  const promocodeElement = formElement.querySelector('.cart-form__promocode');
  const promocodeToggleButtonElement = formElement.querySelector('.cart-form__promocode-button');

  promocodeToggleButtonElement?.addEventListener('click', () => {
    promocodeElement.classList.toggle('cart-form__promocode--hidden');
  });
}

export { initCartForm };
