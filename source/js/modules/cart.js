/* * * * * * * * * * * * * * * * * * * * * * * *
 * cart.js
 */
class Cart {
  #siteHeaderElement = null;
  #cartElement = null;
  #openModal = null;
  #showAlert = null;
  #heading = null;

  #boxElement = null;
  #cartInnerElement = null;
  formElement = null;
  #infoElement = null;
  #promocodeElement = null;
  #receivingSectionInnerElement = null;
  #receivingRadiobuttonsElement = null;
  #receivingDeliveryGroupElement = null;
  #receivingPickupGroupElement = null;
  #chooseAllProductsButtonElement = null;
  #submitButtonElement = null;
  #checkoutLinkElement = null;
  #formCheckoutSection = null;
  #cartItemElements = null;

  #pristine = null;

  constructor({ cartElement, openModal, showAlert }) {
    this.#cartElement = cartElement;
    this.#openModal = openModal;
    this.#showAlert = showAlert;

    this.formElement = this.#cartElement.querySelector('.cart-form');
    this.#heading = this.#cartElement.querySelector('.page-heading .heading');
  }

  #sendData = async (url, body, onSuccess, onFail, onFinally) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body,
      });
      if (!response.ok) {
        throw new Error(`${response.status} – ${response.statusText}`);
      }
      const data = await response.json();
      onSuccess(data);
    } catch (err) {
      onFail();
    } finally {
      onFinally();
    }
  };

  #goToCheckout = () => {
    this.formElement.classList.add('cart-form--checkout');
    this.#infoElement.classList.add('cart-form__info--checkout');
    this.#heading.textContent = 'Оформление заказа';

    this.#cartItemElements.forEach((cartItemElement) => {
      const isChecked = cartItemElement.querySelector('input[type="checkbox"]').checked;

      if (isChecked) {
        cartItemElement.classList.add('cart-item--checkout');
      } else {
        cartItemElement.parentElement.classList.add('cart-form__products-item--hidden');
      }
    });

    setTimeout(() => {
      this.#boxElement.scrollTo({
        top: this.#formCheckoutSection.offsetTop - this.#siteHeaderElement.offsetHeight,
        behavior: 'smooth',
      });
    }, 100);
  };

  #clearCart = () => {
    this.#cartInnerElement.querySelector('.cart__heading').remove();
    this.formElement.remove();
  };

  showResult = (orderNumber) => {
    this.#clearCart();
    this.#cartInnerElement.insertAdjacentHTML('beforeend', `
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
    this.#pristine = new Pristine(this.formElement, {
      classTo: 'cart-form__item',
      errorClass: 'invalid',
      errorTextParent: 'cart-form__item',
      errorTextTag: 'p',
      errorTextClass: 'prompt-text',
    });
  };

  #toggleCartInfoStickiness = () => {
    const isPageScrolledDown = this.#boxElement.scrollHeight - this.#boxElement.scrollTop === this.#boxElement.clientHeight;

    if (!isPageScrolledDown) {
      this.#infoElement.classList.add('cart-form__info--sticked');
    } else {
      this.#infoElement.classList.remove('cart-form__info--sticked');
    }
  };

  #onBoxScroll = throttle(this.#toggleCartInfoStickiness, 100);
  #onWindowResize = throttle(this.#toggleCartInfoStickiness, 100);

  #onFormClick = (evt) => {
    const checkoutLink = evt.target.closest('.cart-form__checkout-link');
    const promocodeToggleButtonElement = evt.target.closest('.cart-form__promocode-button');
    const chooseAllProductsButtonElement = evt.target.closest('.cart-form__choose-all-button');
    const textFieldClearButtonElement = evt.target.closest('.text-field__clear-button');
    const counterButtonElement = evt.target.closest('.counter__button');

    if (checkoutLink) {
      evt.preventDefault();
      this.#goToCheckout();
      this.#toggleCartInfoStickiness();
      return;
    }

    if (promocodeToggleButtonElement) {
      this.#promocodeElement.classList.toggle('cart-form__promocode--hidden');
      return;
    }

    if (chooseAllProductsButtonElement) {
      const cartItemCheckboxElements = this.formElement.querySelectorAll('.cart-item__checkbox .checker__control');
      let isButtonActive = chooseAllProductsButtonElement.classList.contains('cart-form__choose-all-button--active');

      cartItemCheckboxElements.forEach((checkboxElement) => {
        checkboxElement.checked = !isButtonActive;
        checkboxElement.dispatchEvent(new Event('input', {
          bubbles: true,
        }));
        checkboxElement.dispatchEvent(new Event('change', {
          bubbles: true,
        }));
      });
      this.#chooseAllProductsButtonElement.classList.toggle('cart-form__choose-all-button--active', !isButtonActive);
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

  #checkCartItems = () => {
    const cartItemCheckboxElements = this.formElement.querySelectorAll('.cart-item__checkbox .checker__control');
    const checkedCartItems = Array.from(cartItemCheckboxElements).filter((checkboxElement) => checkboxElement.checked);

    const isAllChecked = cartItemCheckboxElements.length === checkedCartItems.length;

    this.#chooseAllProductsButtonElement.classList.toggle('cart-form__choose-all-button--active', isAllChecked);
    this.#checkoutLinkElement.disabled = !checkedCartItems.length;
  };

  #onFormChange = (evt) => {
    const cartItemCheckboxElement = evt.target.closest('.cart-item__checkbox');

    if (cartItemCheckboxElement) {
      this.#checkCartItems();
    }
  };

  #onReceivingRadiobuttonsChange = ({ target }) => {
    if (target.closest('.cart-form__receiving-radiobutton--pickup')) {
      this.#receivingPickupGroupElement.classList.remove('cart-form__section-inner-group--hidden');
      this.#receivingDeliveryGroupElement.remove();

      this.#initPristine();
    } else {
      this.#receivingPickupGroupElement.classList.add('cart-form__section-inner-group--hidden');

      this.#receivingSectionInnerElement.appendChild(this.#receivingDeliveryGroupElement);
      this.#initPristine();
    }
  };

  #onFormSubmit = (evt) => {
    evt.preventDefault();

    const SUBMIT_BUTTON_PENDING_STATE_CLASS = 'button--pending';
    const isValid = this.#pristine.validate();

    // const actionUrl = this.#formElement.getAttribute('action'); // url можно задать в атрибуте формы и брать оттуда
    const actionUrl = 'https://fakestoreapi.com/products'; // Либо задать здесь. Пока не решил как делать.

    if (isValid) {
      this.#submitButtonElement.disabled = true;
      this.#submitButtonElement.classList.add(SUBMIT_BUTTON_PENDING_STATE_CLASS);

      this.#sendData(
        actionUrl,
        new FormData(evt.target),
        (data) => {
          this.formElement.reset();
          const orderNumber = data.number || '45678'; // Нужно будет удалить "|| '45678'"
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
          this.#submitButtonElement.disabled = false;
          this.#submitButtonElement.classList.remove(SUBMIT_BUTTON_PENDING_STATE_CLASS);
        }
      );
    } else {
      const firstInvalidFormItem = this.formElement.querySelector('.invalid');
      firstInvalidFormItem.querySelector('input').focus();

      this.#boxElement.scrollTo({
        top: firstInvalidFormItem.offsetTop - this.#siteHeaderElement.offsetHeight,
        behavior: 'smooth',
      });
    }
  };

  initForm() {
    this.#siteHeaderElement = document.querySelector('.site-header')
    this.#boxElement = document.querySelector('.page__inner');
    this.#cartInnerElement = this.#cartElement.querySelector('.cart__inner');
    this.#infoElement = this.formElement.querySelector('.cart-form__info');
    this.#chooseAllProductsButtonElement = this.formElement.querySelector('.cart-form__choose-all-button');
    this.#receivingSectionInnerElement = this.formElement.querySelector('.cart-form__section--receiving .cart-form__section-inner');
    this.#receivingRadiobuttonsElement = this.#receivingSectionInnerElement.querySelector('.cart-form__radiobuttons-list--receiving');
    this.#receivingDeliveryGroupElement = this.#receivingSectionInnerElement.querySelector('.cart-form__section-inner-group--delivery');
    this.#receivingPickupGroupElement = this.#receivingSectionInnerElement.querySelector('.cart-form__section-inner-group--pickup');
    this.#promocodeElement = this.#infoElement.querySelector('.cart-form__promocode');
    this.#submitButtonElement = this.formElement.querySelector('.cart-form__submit-button');
    this.#checkoutLinkElement = this.formElement.querySelector('.cart-form__checkout-link');
    this.#formCheckoutSection = this.formElement.querySelector('.cart-form__section--checkout');
    this.#cartItemElements = this.formElement.querySelectorAll('.cart-item');

    this.#setValidationTexts();
    this.#initPristine();
    this.formElement.addEventListener('click', this.#onFormClick);
    this.formElement.addEventListener('change', this.#onFormChange);
    this.#receivingRadiobuttonsElement.addEventListener('change', this.#onReceivingRadiobuttonsChange);
    this.formElement.addEventListener('submit', this.#onFormSubmit);
    this.#boxElement.addEventListener('scroll', this.#onBoxScroll);
    window.addEventListener('resize', this.#onWindowResize);

    this.#checkCartItems();
    this.#toggleCartInfoStickiness();
  }
}

function initCart(cartElement, openModal, showAlert) {
  const cart = new Cart({ cartElement, openModal, showAlert });

  if (cart.formElement) {
    cart.initForm();
  }

  return cart;
}
/* * * * * * * * * * * * * * * * * * * * * * * */
