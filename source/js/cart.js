class Cart {
  #cartElement = null;
  #sendData = null;
  #openModal = null;
  #showAlert = null;
  #heading = null;

  formElement = null;
  #infoElement = null;
  #promocodeElement = null;
  #receivingRadiobuttonsElement = null;
  #receivingDeliveryGroupElement = null;
  #receivingPickupGroupElement = null;
  #chooseAllProductsButtonElement = null;
  #submitButton1Element = null;
  #submitButton2Element = null;

  #pristine = null;

  constructor({ cartElement, sendData, openModal, showAlert }) {
    this.#cartElement = cartElement;
    this.#sendData = sendData;
    this.#openModal = openModal;
    this.#showAlert = showAlert;

    this.formElement = this.#cartElement.querySelector('.cart-form');
    this.#heading = this.#cartElement.querySelector('.page-heading .heading');
  }

  #goToCheckout = () => {
    this.formElement.classList.add('cart-form--checkout');
    this.#infoElement.classList.add('cart-form__info--checkout');
    this.#heading.textContent = 'Оформление заказа';
  };

  #clearCart = () => {
    this.#cartElement.querySelector('.cart__heading').remove();
    this.formElement.remove();
  };

  showResult = (orderNumber) => {
    this.#clearCart();
    this.#cartElement.insertAdjacentHTML('beforeend', `
      <div class="cart-result">
        <div class="cart-result__inner container">
          <h1 class="cart-result__heading heading">Заказ № ${orderNumber} успешно оформлен!</h1>
          <p class="cart-result__text">Уведомления о&nbsp;заказе будут приходить на&nbsp;почту. Более подробно следить за&nbsp;состоянием заказа вы&nbsp;сможете через личный кабинет:</p><a class="button cart-result__button button--primary" href="#!">Войти в личный кабинет</a>
        </div>
      </div>
    `);
  };

  #setValidationTexts() {
    const nameFieldElement = this.formElement.querySelector('.cart-form__item--name .text-field__control');
    const phoneFieldElement = this.formElement.querySelector('.cart-form__item--phone .text-field__control');
    const emailFieldElement = this.formElement.querySelector('.cart-form__item--email .text-field__control');
    const cityFieldElement = this.formElement.querySelector('.cart-form__item--city .text-field__control');
    const streetFieldElement = this.formElement.querySelector('.cart-form__item--street .text-field__control');
    const houseFieldElement = this.formElement.querySelector('.cart-form__item--house .text-field__control');

    if (nameFieldElement) {
      nameFieldElement.setAttribute('data-pristine-pattern', '/^[a-zа-яЁё -]+$/i');
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

    if (cityFieldElement) {
      cityFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    }

    if (streetFieldElement) {
      streetFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    }

    if (houseFieldElement) {
      houseFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    }
  }

  #initPristine = () => {
    this.#pristine = new Pristine(this.formElement, { // eslint-disable-line
      classTo: 'cart-form__item',
      errorClass: 'invalid',
      errorTextParent: 'cart-form__item',
      errorTextTag: 'p',
      errorTextClass: 'prompt-text',
    });
  };

  #onFormClick = (evt) => {
    const checkoutLink = evt.target.closest('.cart-form__checkout-link');
    const promocodeToggleButtonElement = evt.target.closest('.cart-form__promocode-button');
    const chooseAllProductsButtonElement = evt.target.closest('.cart-form__choose-all-button');
    const textFieldClearButtonElement = evt.target.closest('.text-field__clear-button');
    const counterButtonElement = evt.target.closest('.counter__button');

    if (checkoutLink) {
      evt.preventDefault();
      this.#goToCheckout();
      return;
    }

    if (promocodeToggleButtonElement) {
      this.#promocodeElement.classList.toggle('cart-form__promocode--hidden');
      return;
    }

    if (chooseAllProductsButtonElement) {
      const cartItemCheckboxElements = this.formElement.querySelectorAll('.cart-item__checkbox .checker__control');
      cartItemCheckboxElements.forEach((checkboxElement) => {
        checkboxElement.checked = true;
        checkboxElement.dispatchEvent(new Event('input', {
          bubbles: true,
        }));
        checkboxElement.dispatchEvent(new Event('change', {
          bubbles: true,
        }));
      });
      this.#chooseAllProductsButtonElement.classList.add('cart-form__choose-all-button--active');
      return;
    }

    if (textFieldClearButtonElement) {
      const textFieldElement = textFieldClearButtonElement.closest('.text-field');
      const textFieldControlElement = textFieldElement.querySelector('.text-field__control');
      textFieldControlElement.value = '';
      textFieldControlElement.focus();
      return;
    }

    if (counterButtonElement) {
      const counterElement = counterButtonElement.closest('.counter');
      const counterControlElement = counterElement.querySelector('.counter__control');
      const counterControlValue = counterControlElement.value;

      if (counterButtonElement.classList.contains('counter__button--plus')) {
        counterControlElement.stepUp();
      } else {
        counterControlElement.stepDown();
      }

      if (counterControlValue !== counterControlElement.value) {
        counterControlElement.dispatchEvent(new Event('input', {
          bubbles: true,
        }));

        counterControlElement.dispatchEvent(new Event('change', {
          bubbles: true,
        }));
      }
    }
  };

  #onFormChange = (evt) => {
    const cartItemCheckboxElement = evt.target.closest('.cart-item__checkbox');

    if (cartItemCheckboxElement) {
      this.#chooseAllProductsButtonElement.classList.remove('cart-form__choose-all-button--active');
    }
  };

  #onReceivingRadiobuttonsChange = ({ target }) => {
    if (target.closest('.cart-form__receiving-radiobutton--pickup')) {
      this.#receivingPickupGroupElement.classList.remove('cart-form__section-inner-group--hidden');
      this.#receivingDeliveryGroupElement.classList.add('cart-form__section-inner-group--hidden');
    } else {
      this.#receivingPickupGroupElement.classList.add('cart-form__section-inner-group--hidden');
      this.#receivingDeliveryGroupElement.classList.remove('cart-form__section-inner-group--hidden');
    }
  };

  #onFormSubmit = (evt) => {
    evt.preventDefault();

    const SUBMIT_BUTTON_PENDING_STATE_CLASS = 'button--pending';
    const actionUrl = this.formElement.getAttribute('action');
    const isValid = this.#pristine.validate();

    if (isValid) {
      this.#submitButton1Element.disabled = true;
      this.#submitButton1Element.classList.add(SUBMIT_BUTTON_PENDING_STATE_CLASS);
      this.#submitButton2Element.disabled = true;
      this.#submitButton2Element.classList.add(SUBMIT_BUTTON_PENDING_STATE_CLASS);

      this.#sendData(
        actionUrl,
        new FormData(evt.target),
        (response) => {
          this.formElement.reset();
          const data = response.json();
          const orderNumber = data.number || '45678'; // В orderNumber нужно записать номер заказа
          this.showResult(orderNumber);
        },
        () => {
          this.#showAlert(this.#openModal, {
            status: 'error',
            heading: 'Ошибка',
            text: 'Не удалось отправить сообщение, попробуйте снова.'
          });
        },
        () => {
          this.#submitButton1Element.disabled = false;
          this.#submitButton1Element.classList.remove(SUBMIT_BUTTON_PENDING_STATE_CLASS);
          this.#submitButton2Element.disabled = false;
          this.#submitButton2Element.classList.remove(SUBMIT_BUTTON_PENDING_STATE_CLASS);
        }
      );
    } else {
      this.formElement.classList.remove('feedback-form--error');
      setTimeout(() => this.formElement.classList.add('feedback-form--error'), 50);
    }
  };

  initForm() {
    this.#infoElement = this.formElement.querySelector('.cart-form__info');
    this.#chooseAllProductsButtonElement = this.formElement.querySelector('.cart-form__choose-all-button');
    this.#receivingRadiobuttonsElement = this.formElement.querySelector('.cart-form__radiobuttons-list--receiving');
    this.#receivingDeliveryGroupElement = this.formElement.querySelector('.cart-form__section-inner-group--delivery');
    this.#receivingPickupGroupElement = this.formElement.querySelector('.cart-form__section-inner-group--pickup');
    this.#promocodeElement = this.#infoElement.querySelector('.cart-form__promocode');
    this.#submitButton1Element = this.formElement.querySelector('.cart-form__submit-button');
    this.#submitButton2Element = this.formElement.querySelector('.cart-form__section-submit-button');

    this.#setValidationTexts();
    this.#initPristine();
    this.formElement.addEventListener('click', this.#onFormClick);
    this.formElement.addEventListener('change', this.#onFormChange);
    this.#receivingRadiobuttonsElement.addEventListener('change', this.#onReceivingRadiobuttonsChange);
    this.formElement.addEventListener('submit', this.#onFormSubmit);
  }
}

function initCart(cartElement, sendData, openModal, showAlert) {
  const cart = new Cart({cartElement, sendData, openModal, showAlert});

  if (cart.formElement) {
    cart.initForm();
  }

  return cart;
}

export { initCart };
