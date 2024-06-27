"use strict";

/* * * * * * * * * * * * * * * * * * * * * * * *
 * const.js
 */
const DESKTOP_WIDTH_MEDIA_QUERY = '(min-width: 1346px)';
const LAPTOP_WIDTH_MEDIA_QUERY = '(min-width: 1260px)';
const WIDE_TABLET_WIDTH_MEDIA_QUERY = '(min-width: 1024px)';
const KeyCode = Object.freeze({
  LEFT_ARROW: 'ArrowLeft',
  RIGHT_ARROW: 'ArrowRight',
  DOWN_ARROW: 'ArrowDown',
  UP_ARROW: 'ArrowUp',
  SPACE: 'Space',
  ESCAPE: 'Escape'
});
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * util.js
 */
const pageInnerElement = document.querySelector('.page__inner');
function togglePageScroll() {
  pageInnerElement.classList.toggle('scroll-lock');
}
function isDownArrowEvent(evt) {
  return evt.code === KeyCode.DOWN_ARROW;
}
function isEscapeEvent(evt) {
  return evt.code === KeyCode.ESCAPE;
}
function isLeftArrowEvent(evt) {
  return evt.code === KeyCode.LEFT_ARROW;
}
function isRightArrowEvent(evt) {
  return evt.code === KeyCode.RIGHT_ARROW;
}
function isSpaceEvent(evt) {
  return evt.code === KeyCode.SPACE;
}
function isUpArrowEvent(evt) {
  return evt.code === KeyCode.UP_ARROW;
}
function createElementByString(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
}
function getPaginationButtonCreator(slideName = 'Слайд') {
  return (index, className) => `
    <button class='${className}' type='button'>
      <span class='visually-hidden'>${slideName} ${index + 1}.</span>
    </button>
  `;
}
function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
function throttle(callback, delay) {
  let lastTime = 0;
  let timeoutId;
  return (...rest) => {
    const now = new Date();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), delay);
    if (now - lastTime >= delay) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}
function getDigitsFromString(string) {
  return string.replace(/\D/g, '');
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * alert.js
 */
function showAlert(openModal, alert) {
  const modalString = `
    <div class="modal modal--with_alert">
      <div class="modal__inner">
        <button class="modal__close-button" type="button">
          <span class="visually-hidden">Закрыть</span>
        </button>
        <section class="alert modal__alert ${alert.status === 'error' ? 'alert--error' : ''}">
          <h2 class="alert__heading">${alert.heading}</h2>
          ${alert.text ? `<p class="alert__text">${alert.text}</p>` : ''}
          <button class="button alert__button button--secondary" type="button">${alert.buttonText || 'Закрыть'}</button>
        </section>
      </div>
    </div>
  `;
  const modalElement = createElementByString(modalString);
  document.body.append(modalElement);
  openModal(modalElement);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * all-brands.js
 */
function initAllBrands(allBrandsElement) {
  const searchFormElement = allBrandsElement.querySelector('.all-brands__form');
  const searchFieldElement = searchFormElement.querySelector('.text-field__control');
  const clearButtonElement = searchFormElement.querySelector('.text-field__clear-button');
  const allBrands = {};
  const groupElements = allBrandsElement.querySelectorAll('.all-brands__group');
  groupElements.forEach(groupElement => {
    const groupTitle = groupElement.querySelector('.all-brands__group-name').textContent;
    allBrands[groupTitle] = {
      group: groupElement,
      links: groupElement.querySelectorAll('.all-brands__link')
    };
  });
  function filterBrandsList(query) {
    for (const title in allBrands) {
      const brands = allBrands[title];
      let isFind = false;
      brands.links.forEach(linkElement => {
        if (linkElement.textContent.toLowerCase().includes(query.toLowerCase())) {
          linkElement.parentElement.classList.remove('all-brands__item--hidden');
          isFind = true;
        } else {
          linkElement.parentElement.classList.add('all-brands__item--hidden');
        }
      });
      if (isFind) {
        brands.group.classList.remove('all-brands__group--hidden');
      } else {
        brands.group.classList.add('all-brands__group--hidden');
      }
    }
  }
  function onSearchFieldInput({
    target
  }) {
    filterBrandsList(target.value.trim().toLowerCase());
  }
  function onSearchFormSubmit(evt) {
    evt.preventDefault();
  }
  function onClearButtonClick(evt) {
    evt.preventDefault();
    searchFieldElement.value = '';
    filterBrandsList('');
  }
  searchFormElement.addEventListener('submit', onSearchFormSubmit);
  searchFieldElement.addEventListener('input', onSearchFieldInput);
  clearButtonElement.addEventListener('click', onClearButtonClick);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * api.js
 */
async function sendData(url, body, onSuccess = () => {}, onFail = () => {}, onFinally = () => {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body
    });
    if (!response.ok) {
      throw new Error(`${response.status} – ${response.statusText}`);
    }
    try {
      const data = await response.json();
      onSuccess(data);
    } catch (err) {
      onSuccess();
    }
  } catch (err) {
    onFail();
  } finally {
    onFinally();
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * article-preview-template.js
 */
function createArticlePreviewTemplate(article, modificators) {
  const dateFormatter = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const date = dateFormatter.format(Date.parse(article.date)).replace(/ г.$/, '');
  return `
    <li class="article-preview ${modificators ? modificators : ''}">
      <h3 class="article-preview__heading">
        <a class="article-preview__link" href="${article.href}">${article.title}</a>
      </h3>
      <p class="article-preview__label">${article.type}</p>
      <picture class="article-preview__image-wrapper">
        <img class="article-preview__image" src="${article.image}" alt="" loading="lazy"/>
      </picture>
      <time class="article-preview__date" datetime="${article.date}">${date}</time>
    </li>
  `;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * articles-slider.js
 */
function initArticlesSlider(articlesSliderElement) {
  const swiperElement = articlesSliderElement.querySelector('.articles__slider');
  const prevButtonElement = articlesSliderElement.querySelector('.articles__slider-arrows .slider-arrows__button--prev');
  const nextButtonElement = articlesSliderElement.querySelector('.articles__slider-arrows .slider-arrows__button--next');
  const swiper = new Swiper(swiperElement, {
    slidesPerView: 'auto',
    spaceBetween: 15,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      1346: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      1900: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    }
  });
  const filterElement = articlesSliderElement.querySelector('.articles__filter');
  const slideElements = articlesSliderElement.querySelectorAll('.articles__slider-item');
  const onFilterChange = evt => {
    const tag = evt.target.value;
    slideElements.forEach(slideElement => {
      slideElement.classList.toggle('articles__slider-item--hidden', !(slideElement.dataset.tag === tag || tag === 'all'));
    });
    swiper.update();
  };
  filterElement.addEventListener('change', onFilterChange);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * banners.js
 */
function initBanners(bannersElement) {
  const sliderElement = bannersElement.querySelector('.banners__slider');
  const thumbnailsSliderElement = bannersElement.querySelector('.banners__thumbnails-slider');
  const thumbnailElements = thumbnailsSliderElement.querySelectorAll('.banners__thumbnail');
  const thumbnailsSwiper = new Swiper(thumbnailsSliderElement, {
    spaceBetween: 5,
    slidesPerView: 'auto',
    watchSlidesProgress: true
  });
  const bannersSwiper = new Swiper(sliderElement, {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },
    thumbs: {
      swiper: thumbnailsSwiper,
      slideThumbActiveClass: 'banners__thumbnails-item--active'
    }
  });
  bannersSwiper.on('autoplayTimeLeft', (_s, _time, progress) => {
    thumbnailElements.forEach(thumbnailElement => {
      thumbnailElement.style.setProperty('--thumbnail-progress', 1 - progress);
    });
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

function initButtonPrintPdf(buttonElement) {
  const documentUrl = buttonElement.dataset.url;
  buttonElement.addEventListener('click', () => {
    buttonElement.disabled = true;
    buttonElement.classList.add('document-actions__button--pending');
    const iframeElement = document.createElement('iframe');
    iframeElement.style.display = 'none';
    iframeElement.addEventListener('load', () => {
      iframeElement.contentWindow.print();
      buttonElement.classList.remove('document-actions__button--pending');
      buttonElement.disabled = false;
    });
    iframeElement.src = documentUrl;
    document.body.appendChild(iframeElement);
  });
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 * cart.js
 */

function showCartResult({
  heading,
  text,
  buttonText,
  buttonHref
}) {
  const cartInnerElement = document.querySelector('.cart__inner');
  cartInnerElement.querySelector('.cart__heading').remove();
  cartInnerElement.querySelector('.cart__form').remove();
  cartInnerElement.insertAdjacentHTML('beforeend', `
    <div class="cart-result">
      <div class="cart-result__inner container">
        <h1 class="cart-result__heading heading">${heading}</h1>
        <p class="cart-result__text">${text}</p>
        <a class="button cart-result__button button--primary" href="${buttonHref}">${buttonText}</a>
      </div>
    </div>
  `);
}
function resetCartForm() {
  const formElement = document.querySelector('.cart-form');
  formElement.reset();
}
class Cart {
  #siteHeaderElement = null;
  #cartElement = null;
  #openModal = null;
  #showAlert = null;
  #onCartFormSuccessSubmit = null;
  #onCartFormErrorSubmit = null;
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
  constructor({
    cartElement,
    openModal,
    showAlert,
    onCartFormSuccessSubmit,
    onCartFormErrorSubmit
  }) {
    this.#cartElement = cartElement;
    this.#openModal = openModal;
    this.#showAlert = showAlert;
    this.#onCartFormSuccessSubmit = onCartFormSuccessSubmit;
    this.#onCartFormErrorSubmit = onCartFormErrorSubmit;
    this.formElement = this.#cartElement.querySelector('.cart-form');
    this.#heading = this.#cartElement.querySelector('.page-heading .heading');
  }
  #sendData = async (url, body, onSuccess, onFail, onFinally) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body
      });
      if (!response.ok) {
        throw new Error(`${response.status} – ${response.statusText}`);
      }
      const data = await response.json();
      onSuccess(data);
    } catch (err) {
      onFail(err);
    } finally {
      onFinally();
    }
  };
  #goToCheckout = () => {
    this.formElement.classList.add('cart-form--checkout');
    this.#infoElement.classList.add('cart-form__info--checkout');
    this.#heading.textContent = 'Оформление заказа';
    this.#cartItemElements.forEach(cartItemElement => {
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
        behavior: 'smooth'
      });
    }, 100);
  };
  #clearCart = () => {
    this.#cartInnerElement.querySelector('.cart__heading').remove();
    this.formElement.remove();
  };
  showResult = ({
    heading,
    text,
    buttonText,
    buttonHref
  }) => {
    this.#clearCart();
    this.#cartInnerElement.insertAdjacentHTML('beforeend', `
      <div class="cart-result">
        <div class="cart-result__inner container">
          <h1 class="cart-result__heading heading">${heading}</h1>
          <p class="cart-result__text">${text}</p>
          <a class="button cart-result__button button--primary" href="${buttonHref}">${buttonText}</a>
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
      errorTextClass: 'prompt-text'
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
  #onFormClick = evt => {
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
      cartItemCheckboxElements.forEach(checkboxElement => {
        checkboxElement.checked = !isButtonActive;
        checkboxElement.dispatchEvent(new Event('input', {
          bubbles: true
        }));
        checkboxElement.dispatchEvent(new Event('change', {
          bubbles: true
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
          bubbles: true
        }));
        counterControlElement.dispatchEvent(new Event('change', {
          bubbles: true
        }));
      }
    }
  };
  #checkCartItems = () => {
    const cartItemCheckboxElements = this.formElement.querySelectorAll('.cart-item__checkbox .checker__control');
    const checkedCartItems = Array.from(cartItemCheckboxElements).filter(checkboxElement => checkboxElement.checked);
    const isAllChecked = cartItemCheckboxElements.length === checkedCartItems.length;
    this.#chooseAllProductsButtonElement.classList.toggle('cart-form__choose-all-button--active', isAllChecked);
    this.#checkoutLinkElement.disabled = !checkedCartItems.length;
  };
  #onFormChange = evt => {
    const cartItemCheckboxElement = evt.target.closest('.cart-item__checkbox');
    if (cartItemCheckboxElement) {
      this.#checkCartItems();
    }
  };
  #onReceivingRadiobuttonsChange = ({
    target
  }) => {
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
  #successDefaultCb = () => {
    resetCartForm();
    showCartResult({
      heading: 'Heading',
      text: 'text',
      buttonText: 'button',
      buttonHref: '#'
    });
  };
  #errorDefaultCb = () => {
    this.#showAlert(this.#openModal, {
      status: 'error',
      heading: 'Ошибка',
      text: 'Текст ошибки.'
    });
  };
  #onFormSubmit = evt => {
    evt.preventDefault();
    const SUBMIT_BUTTON_PENDING_STATE_CLASS = 'button--pending';
    const isValid = this.#pristine.validate();
    const actionUrl = this.formElement.getAttribute('action');
    if (isValid) {
      this.#submitButtonElement.disabled = true;
      this.#submitButtonElement.classList.add(SUBMIT_BUTTON_PENDING_STATE_CLASS);
      this.#sendData(actionUrl, new FormData(evt.target), data => {
        const successCb = this.#onCartFormSuccessSubmit ?? this.#successDefaultCb;
        successCb(data);
      }, err => {
        const errorCb = this.#onCartFormErrorSubmit ?? this.#errorDefaultCb;
        errorCb(err);
      }, () => {
        this.#submitButtonElement.disabled = false;
        this.#submitButtonElement.classList.remove(SUBMIT_BUTTON_PENDING_STATE_CLASS);
      });
    } else {
      const firstInvalidFormItem = this.formElement.querySelector('.invalid');
      firstInvalidFormItem.querySelector('input').focus();
      this.#boxElement.scrollTo({
        top: firstInvalidFormItem.offsetTop - this.#siteHeaderElement.offsetHeight,
        behavior: 'smooth'
      });
    }
  };
  initForm() {
    this.#siteHeaderElement = document.querySelector('.site-header');
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
function initCart(cartElement, openModal, showAlert, onCartFormSuccessSubmit, onCartFormErrorSubmit) {
  const cart = new Cart({
    cartElement,
    openModal,
    showAlert,
    onCartFormSuccessSubmit,
    onCartFormErrorSubmit
  });
  if (cart.formElement) {
    cart.initForm();
  }
  return cart;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * catalog-filters-modal.js
 */
class CatalogFiltersModal {
  #changeEvent = new Event('change', {
    bubbles: true
  });
  #inputEvent = new Event('input', {
    bubbles: true
  });
  #modalElement = null;
  #initScrollContainer = null;
  #openModal = null;
  #toggleFoldState = null;
  #filtersElement = null;
  #scrollContainerElement = null;
  #swiper = null;
  #fieldControlElements = null;
  #appliedFiltersElement = null;
  #state = null;
  constructor({
    modalElement,
    initScrollContainer,
    openModal,
    toggleFoldState
  }) {
    this.#modalElement = modalElement;
    this.#initScrollContainer = initScrollContainer;
    this.#openModal = openModal;
    this.#toggleFoldState = toggleFoldState;
  }
  #createAppliedFilterTemplate = (text, fieldName, fieldValue) => `<li class="catalog__applied-filter">${text}
      <button class="catalog__applied-filter-reset-button" data-field-name="${fieldName}" data-field-value="${fieldValue}">
        <span class="visually-hidden">Удалить фильтр</span>
      </button>
    </li>`;
  #updateAppliedFilters = () => {
    const appliedFiltersTemplates = [];
    const appliedRanges = [];
    this.#fieldControlElements.forEach(controlElement => {
      const isActive = controlElement.type === 'checkbox' || controlElement.type === 'radio' ? controlElement.checked : controlElement.value;
      if (!isActive) {
        return;
      }
      const fieldName = controlElement.name;
      let text = '';
      const value = controlElement.value;
      if (controlElement.dataset.rangeLimit) {
        const rangeFoldElement = controlElement.closest('.catalog-filters__folds-item--range');
        const rangeName = rangeFoldElement.dataset.rangeName;
        if (appliedRanges.includes(rangeName)) {
          return;
        }
        let rangeMinValue = null;
        let rangeMaxValue = null;
        if (controlElement.dataset.rangeLimit === 'min') {
          rangeMinValue = controlElement.value;
          rangeMaxValue = rangeFoldElement.querySelector('.number-range__field-control[data-range-limit="max"]').value;
        } else {
          rangeMinValue = rangeFoldElement.querySelector('.number-range__field-control[data-range-limit="min"]').value;
          rangeMaxValue = controlElement.value;
        }
        if (rangeMinValue && rangeMaxValue) {
          text = `${rangeName} от ${rangeMinValue} до ${rangeMaxValue}`;
        } else if (rangeMinValue) {
          text = `${rangeName} от ${rangeMinValue}`;
        } else if (rangeMaxValue) {
          text = `${rangeName} до ${rangeMaxValue}`;
        } else {
          text = '';
        }
        appliedRanges.push(rangeName);
      } else {
        const fieldElement = controlElement.closest('.checker, .color');
        text = fieldElement.querySelector('.checker__label, .color__name').textContent;
      }
      const appliedFilterTemplate = this.#createAppliedFilterTemplate(text, fieldName, value);
      appliedFiltersTemplates.push(appliedFilterTemplate);
    });
    this.#appliedFiltersElement.innerHTML = '';
    const appliedFiltersTemplateString = appliedFiltersTemplates.join('');
    this.#appliedFiltersElement.insertAdjacentHTML('beforeend', appliedFiltersTemplateString);
  };
  #updateState = () => {
    const newState = new Map();
    this.#fieldControlElements.forEach(fieldElement => {
      const value = fieldElement.type === 'checkbox' || fieldElement.type === 'radio' ? fieldElement.checked : fieldElement.value;
      newState.set(fieldElement, value);
    });
    this.#state = newState;
  };
  #setFieldValuesFromState = () => {
    this.#state.forEach((value, fieldElement) => {
      if (fieldElement.type === 'checkbox' || fieldElement.type === 'radio') {
        fieldElement.checked = value;
      } else {
        fieldElement.value = value;
      }
      fieldElement.dispatchEvent(this.#changeEvent);
    });
  };
  #onOpenerClick = evt => {
    evt.preventDefault();
    this.#setFieldValuesFromState();
    this.#openModal(this.#modalElement);
    const targetFoldName = evt.target.dataset.foldName;
    if (targetFoldName) {
      const foldButtonElement = this.#filtersElement.querySelector(`[data-fold-name="${targetFoldName}"]`);
      if (foldButtonElement.ariaExpanded !== 'true') {
        this.#toggleFoldState(foldButtonElement);
      }
      const overHeight = this.#scrollContainerElement.scrollHeight - this.#scrollContainerElement.offsetHeight;
      if (overHeight > 0) {
        const shift = Math.min(overHeight, foldButtonElement.offsetTop);
        this.#swiper.setTranslate(-shift);
      }
      setTimeout(() => this.#swiper.update(), 300);
    }
  };
  #onFiltersClick = evt => {
    const boxToggleButtonElement = evt.target.closest('.catalog-filter__box-toggle-button');
    const foldToggleButtonElement = evt.target.closest('.catalog-filters__folds-button');
    if (boxToggleButtonElement) {
      const boxElement = boxToggleButtonElement.closest('.catalog-filter__box');
      boxElement.classList.toggle('catalog-filter__box--expand');
      setTimeout(() => this.#swiper.update(), 300);
    } else if (foldToggleButtonElement) {
      setTimeout(() => this.#swiper.update(), 300);
    }
  };
  #onFiltersChange = evt => {
    const foldElement = evt.target.closest('.catalog-filters__folds-item');
    if (foldElement) {
      if (foldElement.classList.contains('catalog-filters__folds-item--range')) {
        const rangeMinValueFieldElement = foldElement.querySelector('.number-range__field-control[data-range-limit="min"]');
        const rangeMaxValueFieldElement = foldElement.querySelector('.number-range__field-control[data-range-limit="max"]');
        const rangeMinValue = rangeMinValueFieldElement.value;
        const rangeMaxValue = rangeMaxValueFieldElement.value;
        const foldValueElement = foldElement.querySelector('.catalog-filters__folds-value-label');
        const rangeName = foldElement.dataset.rangeName;
        if (rangeMinValue && rangeMaxValue) {
          foldValueElement.textContent = `${rangeName} от ${rangeMinValue} до ${rangeMaxValue}`;
        } else if (rangeMinValue) {
          foldValueElement.textContent = `${rangeName} от ${rangeMinValue}`;
        } else if (rangeMaxValue) {
          foldValueElement.textContent = `${rangeName} до ${rangeMaxValue}`;
        } else {
          foldValueElement.textContent = '';
        }
      } else if (foldElement.classList.contains('catalog-filters__folds-item--checkers')) {
        const foldValueElement = foldElement.querySelector('.catalog-filters__folds-value-label');
        const optionElements = Array.from(foldElement.querySelectorAll('.checker, .color'));
        foldValueElement.textContent = optionElements.filter(optionElement => optionElement.querySelector('input').checked).map(optionElement => optionElement.querySelector('.checker__label, .color__name').textContent).join(', ');
      }
    }
  };
  #onFiltersSubmit = () => {
    this.#updateState();
    this.#updateAppliedFilters();
  };
  #onFiltersReset = () => {
    setTimeout(() => {
      this.#fieldControlElements.forEach(fieldElement => {
        fieldElement.dispatchEvent(this.#changeEvent);
      });
    }, 0);
  };
  #onAppliedFiltersClick = evt => {
    const resetButtonElement = evt.target.closest('.catalog__applied-filter-reset-button');
    if (!resetButtonElement) {
      return;
    }
    const appliedFiltersItem = resetButtonElement.parentElement;
    const associatedFieldName = resetButtonElement.dataset.fieldName;
    const associatedFieldControlElements = this.#fieldControlElements.filter(fieldControlElement => fieldControlElement.name === associatedFieldName);
    if (associatedFieldControlElements[0].dataset.rangeLimit) {
      const rangeFoldElement = associatedFieldControlElements[0].closest('.catalog-filters__folds-item--range');
      rangeFoldElement.querySelectorAll('input').forEach(inputElement => {
        inputElement.value = '';
        inputElement.dispatchEvent(this.#inputEvent);
      });
    } else if (associatedFieldControlElements[0].type === 'checkbox' || associatedFieldControlElements[0].type === 'radio') {
      const associatedFieldValue = resetButtonElement.dataset.fieldValue;
      const associatedFieldControlElement = Array.from(associatedFieldControlElements).find(fieldControlElement => fieldControlElement.value === associatedFieldValue);
      associatedFieldControlElement.checked = false;
      associatedFieldControlElement.dispatchEvent(this.#inputEvent);
    }
    appliedFiltersItem.remove();
    this.#updateState();
  };
  init = () => {
    this.#filtersElement = this.#modalElement.querySelector('.catalog-filters');
    this.#scrollContainerElement = this.#filtersElement.querySelector('.catalog-filters__scroll-container');
    this.#swiper = this.#initScrollContainer(this.#scrollContainerElement);
    this.#fieldControlElements = Array.from(this.#filtersElement.querySelectorAll('input'));
    this.#appliedFiltersElement = document.querySelector('.catalog__applied-filters');
    this.#updateState();
    const openerButtonElements = document.querySelectorAll('.catalog__filter-opener-button');
    openerButtonElements.forEach(buttonElement => {
      buttonElement.addEventListener('click', this.#onOpenerClick);
    });
    this.#filtersElement.addEventListener('click', this.#onFiltersClick);
    this.#filtersElement.addEventListener('change', this.#onFiltersChange);
    this.#filtersElement.addEventListener('submit', this.#onFiltersSubmit);
    this.#filtersElement.addEventListener('reset', this.#onFiltersReset);
    this.#appliedFiltersElement.addEventListener('click', this.#onAppliedFiltersClick);
  };
}
function initCatalogFiltersModal(modalElement, initScrollContainer, openModal, toggleFoldState) {
  const catalogFiltersModal = new CatalogFiltersModal({
    modalElement,
    initScrollContainer,
    openModal,
    toggleFoldState
  });
  catalogFiltersModal.init();
  return catalogFiltersModal;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * catalog-sorting.js
 */
function initCatalogSorting(sortingElement) {
  const toggleButtonElement = sortingElement.querySelector('.catalog-sorting__toggle-button');
  const closeeButtonElement = sortingElement.querySelector('.catalog-sorting__close-button');
  toggleButtonElement.addEventListener('click', evt => {
    evt.preventDefault();
    sortingElement.classList.toggle('catalog-sorting--open');
  });
  closeeButtonElement.addEventListener('click', evt => {
    evt.preventDefault();
    sortingElement.classList.remove('catalog-sorting--open');
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * cities-modal.js
 */
class CitiesModal {
  #modalElement = null;
  #initScrollContainer = null;
  #openModal = null;
  #formElement = null;
  #foundCitiesListElement = null;
  #popularCitiesScrollContainerElement = null;
  #foundCitiesScrollContainerElement = null;
  #popularCitiesSwiper = null;
  #foundCitiesSwiper = null;
  constructor({
    modalElement,
    initScrollContainer,
    openModal
  }) {
    this.#modalElement = modalElement;
    this.#initScrollContainer = initScrollContainer;
    this.#openModal = openModal;
  }
  open = evt => {
    evt.preventDefault();
    const popup = evt.target.closest('.popup');
    if (popup) {
      popup.remove();
    }
    this.#openModal(this.#modalElement);
    this.#modalElement.querySelector('input').focus();
  };
  #onFormClick = evt => {
    const textFieldClearButtonElement = evt.target.closest('.text-field__clear-button');
    if (textFieldClearButtonElement) {
      const textFieldElement = textFieldClearButtonElement.closest('.text-field');
      const textFieldControlElement = textFieldElement.querySelector('.text-field__control');
      textFieldControlElement.value = '';
      this.#popularCitiesScrollContainerElement.classList.remove('cities__scroll-container--hidden');
      textFieldControlElement.focus();
    }
  };
  init() {
    this.#formElement = this.#modalElement.querySelector('.cities__form');
    this.#foundCitiesListElement = this.#modalElement.querySelector('.cities__list--found');
    this.#popularCitiesScrollContainerElement = this.#modalElement.querySelector('.cities__scroll-container--popular');
    this.#foundCitiesScrollContainerElement = this.#modalElement.querySelector('.cities__scroll-container--found');
    this.#popularCitiesSwiper = this.#initScrollContainer(this.#popularCitiesScrollContainerElement);
    this.#foundCitiesSwiper = this.#initScrollContainer(this.#foundCitiesScrollContainerElement);
    this.#formElement.addEventListener('click', this.#onFormClick);
    const observer = new MutationObserver(() => {
      this.#popularCitiesSwiper.update();
      this.#foundCitiesSwiper.update();
    });
    observer.observe(this.#foundCitiesListElement, {
      subtree: true,
      characterData: true,
      attributes: true,
      childList: true
    });
    document.querySelectorAll('[data-modal-opener="cities"]').forEach(openerElement => {
      openerElement.addEventListener('click', this.open);
    });
  }
}
function initCitiesModal(modalElement, initScrollContainer, openModal) {
  const citiesModal = new CitiesModal({
    modalElement,
    initScrollContainer,
    openModal
  });
  citiesModal.init();
  return citiesModal;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * cooperation-modal.js
 */
function initCooperationModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, onCooperationFormSuccessSubmit) {
  const alert = {
    success: {
      heading: 'Спасибо! Ваша заявка успешно отправлена',
      text: 'Наш менеджер свяжется с вами в течении 3 рабочих дней для обсуждения деталей'
    },
    error: {
      status: 'error',
      heading: 'Ошибка',
      text: 'Не удалось отправить заявку, попробуйте снова.'
    }
  };
  initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert, onCooperationFormSuccessSubmit);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * date-field.js
 */
function initDateField(fieldElement, setInputDateMask) {
  const fieldControlElement = fieldElement.querySelector('.text-field__control');
  const toggleButtonElement = fieldElement.querySelector('.text-field__calendar-button');
  let calendarElement = null;
  const calendar = new AirDatepicker(fieldElement, {
    classes: 'calendar text-field__calendar',
    dateFormat: 'dd.MM.yyyy',
    minDate: fieldElement.closest('[data-modal="salon"]') ? Date.now() : '',
    navTitles: {
      classes: 'text-field__calendar',
      days: 'MMMM <span class="calendar__title-accent">yyyy</span>',
      weekends: [0, 6]
    },
    onSelect({
      formattedDate
    }) {
      fieldControlElement.value = formattedDate || '';
      fieldControlElement.dispatchEvent(new Event('input'));
      closeCalendar();
    }
  });
  calendarElement = fieldElement.querySelector('.text-field__calendar');
  function setCalendarDate(value) {
    if (!value) {
      return;
    }
    calendar.selectDate(value, {
      updateTime: false,
      silent: true
    });
  }
  function openCalendar() {
    setCalendarDate(formatDateString(fieldControlElement.value));
    calendar.setViewDate(formatDateString(fieldControlElement.value) || Date.now());
    calendar.setCurrentView('days');
    calendarElement.classList.add('text-field__calendar--open');
    document.addEventListener('click', onDocumentClickWhenCalendarOpened);
    toggleButtonElement.classList.add('text-field__calendar-button--active');
  }
  function closeCalendar() {
    calendarElement.classList.remove('text-field__calendar--open');
    document.removeEventListener('click', onDocumentClickWhenCalendarOpened);
    toggleButtonElement.classList.remove('text-field__calendar-button--active');
  }
  function toggleCalendar() {
    if (calendarElement.classList.contains('text-field__calendar--open')) {
      closeCalendar();
    } else {
      openCalendar();
    }
  }
  function formatDateString(string) {
    return string.split('.').reverse().join('-');
  }
  function onDocumentClickWhenCalendarOpened({
    target
  }) {
    if (!target.closest('.text-field--date') && !target.closest('.calendar__title-accent')) {
      closeCalendar();
    }
  }
  fieldControlElement.addEventListener('input', () => {
    if (!fieldControlElement.value) {
      return;
    }
    const formattedControlValue = formatDateString(fieldControlElement.value);
    setCalendarDate(formattedControlValue);
    if (!calendarElement.classList.contains('text-field__calendar--open')) {
      return;
    }
    calendar.setViewDate(formattedControlValue);
    calendar.setCurrentView('days');
  });
  toggleButtonElement.addEventListener('click', () => {
    toggleCalendar();
  });
  fieldControlElement.addEventListener('keydown', evt => {
    if (isSpaceEvent(evt)) {
      evt.preventDefault();
      toggleCalendar();
    }
  });
  setInputDateMask(fieldControlElement);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * document-modal.js
 */
function initDocumentModal(modalElement, openModal) {
  const modalName = modalElement.dataset.modal;
  document.querySelectorAll(`[data-modal-opener="${modalName}"]`).forEach(openerElement => {
    openerElement.addEventListener('click', evt => {
      evt.preventDefault();
      openModal(modalElement);
    });
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * feed.js
 */
function initFeed(feedElement) {
  const swiperElement = feedElement.querySelector('.swiper');
  const prevButtonElement = feedElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = feedElement.querySelector('.slider-arrows__button--next');
  new Swiper(swiperElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement
    },
    breakpoints: {
      1900: {
        spaceBetween: 16
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * feedback-form.js
 */
function initFeedbackForm(formElement, sendData, openModal, showAlert, onFeedbackFormSuccessSubmit) {
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
    errorTextClass: 'prompt-text'
  });
  function successDefaultCb() {
    showAlert(openModal, {
      heading: 'Спасибо за обратную связь!'
    });
  }
  ;
  const successCb = onFeedbackFormSuccessSubmit ?? successDefaultCb;
  formElement.addEventListener('click', evt => {
    const textFieldClearButtonElement = evt.target.closest('.text-field__clear-button');
    if (textFieldClearButtonElement) {
      const textFieldElement = textFieldClearButtonElement.closest('.text-field');
      const textFieldControlElement = textFieldElement.querySelector('.text-field__control');
      textFieldControlElement.value = '';
      textFieldControlElement.focus();
    }
  });
  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      submitButtonElement.disabled = true;
      submitButtonElement.classList.add(SUBMIT_BUTTON_PENDING_STATE_CLASS);
      sendData(actionUrl, new FormData(evt.target), data => {
        formElement.reset();
        successCb(data);
      }, () => {
        showAlert(openModal, {
          status: 'error',
          heading: 'Ошибка',
          text: 'Не удалось отправить сообщение, попробуйте снова.'
        });
      }, () => {
        submitButtonElement.disabled = false;
        submitButtonElement.classList.remove(SUBMIT_BUTTON_PENDING_STATE_CLASS);
      });
    } else {
      formElement.classList.remove('feedback-form--error');
      setTimeout(() => formElement.classList.add('feedback-form--error'), 50);
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * feedback-modal.js
 */
function initFeedbackModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, onFeedbackFormSuccessSubmit) {
  const alert = {
    success: {
      heading: 'Заявка успешно отправлена',
      text: 'Наш менеджер свяжется с вами'
    },
    error: {
      status: 'error',
      heading: 'Ошибка',
      text: 'Не удалось отправить заявку, попробуйте снова.'
    }
  };
  initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert, onFeedbackFormSuccessSubmit);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * file-field.js
 */
function initFileField(fieldElement) {
  const controlElement = fieldElement.querySelector('.file-field__control');
  fieldElement.addEventListener('change', ({
    target
  }) => {
    fieldElement.classList.toggle('file-field--empty', !target.value);
  });
  fieldElement.addEventListener('click', ({
    target
  }) => {
    const resetButtonElement = target.closest('.file-field__reset-button');
    if (!resetButtonElement) {
      return;
    }
    fieldElement.classList.add('file-field--empty');
    controlElement.value = '';
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * filter.js
 */
function initFilterSlider(sliderElement) {
  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    breakpoints: {
      1346: {
        spaceBetween: 20
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * folds.js
 */
function toggleFoldState(buttonElement) {
  const foldElement = buttonElement.closest('.folds__item');
  const contentWrapperElement = foldElement.querySelector('.folds__content-wrapper');
  const contentElement = contentWrapperElement.querySelector('.folds__content');
  const contentElementHeight = contentElement.getBoundingClientRect().height;
  contentWrapperElement.style.height = `${contentElementHeight}px`;
  setTimeout(() => {
    foldElement.classList.toggle('folds__item--open');
  }, 20);
  buttonElement.ariaExpanded = buttonElement.ariaExpanded === 'true' ? 'false' : 'true';
}
function initFolds(foldsElement) {
  foldsElement.addEventListener('click', ({
    target
  }) => {
    const buttonElement = target.closest('.folds__button');
    if (!buttonElement) {
      return;
    }
    toggleFoldState(buttonElement);
  });
  foldsElement.addEventListener('transitionend', ({
    target
  }) => {
    const foldElement = target.closest('.folds__item');
    if (!foldElement || !foldElement.classList.contains('folds__item--open')) {
      return;
    }
    if (target.classList.contains('folds__content-wrapper')) {
      setTimeout(() => {
        target.style.height = 'auto';
      }, 0);
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * gallery-modal.js
 */
function createGalleryModalTemplate(content) {
  return `
    <div class="modal modal--with_gallery modal--with_review-gallery">
      <div class="modal__inner">
        <button class="modal__close-button" type="button"><span class="visually-hidden">Закрыть</span></button>
        <div class="gallery modal__gallery">
          <div class="gallery__inner">
            <div class="gallery__slider">
              <ul class="slider-arrows gallery__slider-arrows slider-arrows--with-background">
                <li class="slider-arrows__item">
                  <button class="slider-arrows__button slider-arrows__button--prev" type="button"><span class="visually-hidden">Предыдущий</span></button>
                </li>
                <li class="slider-arrows__item">
                  <button class="slider-arrows__button slider-arrows__button--next" type="button"><span class="visually-hidden">Следующий</span></button>
                </li>
              </ul>
              <div class="gallery__slider-wrapper swiper">
                <ul class="gallery__slider-list swiper-wrapper">
                  ${content.map(file => `
                    <li class="gallery__slider-item swiper-slide">
                      ${file.type === 'video' ? `
                        <div class="video gallery__video">
                          <video class="video__player" src="${file.src}" playsinline controls></video>
                          <img class="video__poster" src="${file.posterSrc}" alt="">
                          <div class="video__play-button-wrapper">
                            <button class="video__play-button"><span class="visually-hidden">Воспроизвести</span></button>
                          </div>
                        </div>
                      ` : `
                        <picture class="gallery__image-wrapper">
                          <img class="gallery__image" src="${file.src}" alt="">
                        </picture>
                      `}
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
            <div class="gallery__thumbnails-slider">
              <ul class="slider-arrows gallery__thumbnails-slider-arrows">
                <li class="slider-arrows__item">
                  <button class="slider-arrows__button slider-arrows__button--prev" type="button"><span class="visually-hidden">Предыдущий</span></button>
                </li>
                <li class="slider-arrows__item">
                  <button class="slider-arrows__button slider-arrows__button--next" type="button"><span class="visually-hidden">Следующий</span></button>
                </li>
              </ul>
              <div class="gallery__thumbnails-slider-wrapper swiper">
                <ul class="gallery__thumbnails-slider-list swiper-wrapper">
                  ${content.map(file => `
                    <li class="gallery__thumbnails-slider-item swiper-slide">
                      ${file.type === 'video' ? `
                        <div class="gallery__image-wrapper gallery__image-wrapper--video">
                          <img class="gallery__thumbnails-image" src="${file.posterSrc}" alt=""/>
                        </div>
                      ` : `
                        <picture class="gallery__image-wrapper">
                          <img class="gallery__thumbnails-image" src="${file.src}" alt=""/>
                        </picture>
                      `}
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
class GalleryModal {
  #modalElement = null;
  #openModal = null;
  #mainSlider = null;
  constructor({
    content,
    openModal,
    initGallery,
    initVideo
  }) {
    this.#openModal = openModal;
    this.#modalElement = createElementByString(createGalleryModalTemplate(content));
    document.body.append(this.#modalElement);
    this.#mainSlider = initGallery(this.#modalElement.querySelector('.gallery'));
    this.#modalElement.querySelectorAll('.video').forEach(initVideo);
  }
  open = (slideNumber = 0) => {
    this.#mainSlider.slideTo(slideNumber, 0);
    this.#openModal(this.#modalElement);
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * gallery.js
 */
function initGallery(productGalleryElement) {
  const sliderElement = productGalleryElement.querySelector('.gallery__slider-wrapper');
  const prevButtonElement = productGalleryElement.querySelector('.gallery__slider .slider-arrows__button--prev');
  const nextButtonElement = productGalleryElement.querySelector('.gallery__slider .slider-arrows__button--next');
  const thumbnailsSliderElement = productGalleryElement.querySelector('.gallery__thumbnails-slider-wrapper');
  const thumbnailsSliderPrevButtonElement = productGalleryElement.querySelector('.gallery__thumbnails-slider .slider-arrows__button--prev');
  const thumbnailsSliderNextButtonElement = productGalleryElement.querySelector('.gallery__thumbnails-slider .slider-arrows__button--next');
  const videoElements = sliderElement.querySelectorAll('video');
  const thumbnailsSwiper = new Swiper(thumbnailsSliderElement, {
    spaceBetween: 10,
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    breakpoints: {
      768: {
        slidesPerView: 3
      },
      1346: {
        spaceBetween: 20
      }
    }
  });
  const mainSlider = new Swiper(sliderElement, {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      prevEl: [prevButtonElement, thumbnailsSliderPrevButtonElement],
      nextEl: [nextButtonElement, thumbnailsSliderNextButtonElement]
    },
    thumbs: {
      swiper: thumbnailsSwiper,
      slideThumbActiveClass: 'gallery__thumbnails-slider-item--active'
    },
    on: {
      slideChange: () => {
        videoElements.forEach(video => video.pause());
      }
    }
  });
  return mainSlider;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * input-date-mask.js
 */
function setInputDateMask(inputElement) {
  const DAY_NUMBER_MAX_FIRST_DIGIT = 3;
  const DAY_NUMBER_LENGTH = 2;
  const DAY_MIN_NUMBER = 1;
  const DAY_MAX_NUMBER = 31;
  const MONTH_NUMBER_MAX_FIRST_DIGIT = 1;
  const MONTH_NUMBER_LENGTH = 2;
  const MONTH_MIN_NUMBER = 1;
  const MONTH_MAX_NUMBER = 12;
  function formatInputValue(value) {
    const digits = getDigitsFromString(value); // Цифры из введённой строки.
    let formattedValue = '';
    if (digits.length) {
      const dayNumberFirstDigit = +digits[0];
      if (dayNumberFirstDigit <= DAY_NUMBER_MAX_FIRST_DIGIT) {
        // В этой ветке первые две цифры являются номером дня.
        formattedValue = dayNumberFirstDigit;
        if (digits.length > 1) {
          const dayNumber = +digits.substring(0, 2);
          if (dayNumber === 0) {
            formattedValue = `0${DAY_MIN_NUMBER}`;
          } else {
            formattedValue = dayNumber <= DAY_MAX_NUMBER ? dayNumber.toString().padStart(DAY_NUMBER_LENGTH, '0') : DAY_MAX_NUMBER;
          }
        }

        // Поскольку в этой ветке первые две цифры явлются номером дня, третья станет первой цифрой номера месяца.

        if (digits.length > 2) {
          const monthNumberFirstDigit = +digits[2];
          if (monthNumberFirstDigit <= MONTH_NUMBER_MAX_FIRST_DIGIT) {
            // В этой ветке третья и четвёртая цифры являются номером месяца.
            formattedValue = `${formattedValue}.${monthNumberFirstDigit}`;

            // Проверяем 4-число, вместе с третьим
            if (digits.length > 3) {
              const dayNumber = digits.substring(0, 2);
              const monthNumber = +digits.substring(2, 4);
              if (monthNumber === 0) {
                formattedValue = `${dayNumber}.0${MONTH_MIN_NUMBER}`;
              } else {
                formattedValue = `${dayNumber}.${monthNumber <= MONTH_MAX_NUMBER ? monthNumber.toString().padStart(MONTH_NUMBER_LENGTH, '0') : MONTH_MAX_NUMBER}`;
              }
            }

            // Поскольку в этой ветке третья и четвёртая цифры являются номером месяца, пятая цифра станет первой цифрой номера года.
            if (digits.length > 4) {
              const yearNumber = digits.substring(4, 8);
              formattedValue += `.${yearNumber}`;
            }
          } else {
            // В этой ветке номером месяца является только третья цифра.
            const dayNumber = digits.substring(0, 2);
            formattedValue = `${dayNumber}.0${monthNumberFirstDigit}`;

            // Поскольку в этой ветке номером месяца является только третья цифра, четвёртая станет первой цифрой номера года.
            if (digits.length > 3) {
              const yearNumber = digits.substring(3, 7);
              formattedValue += `.${yearNumber}`;
            }
          }
        }
      } else {
        // В этой ветке номером дня является только первая цифра.
        formattedValue = `0${dayNumberFirstDigit}`;

        // Поскольку в этой ветке номером дня является только первая цифра, вторая станет первой цифрой номера месяца.

        if (digits.length > 1) {
          const monthNumberFirstDigit = +digits[1];
          if (monthNumberFirstDigit <= MONTH_NUMBER_MAX_FIRST_DIGIT) {
            formattedValue = `${formattedValue}.${monthNumberFirstDigit}`;
            if (digits.length > 2) {
              // В этой ветке вторая и третья цифры являются номером месяца.
              const dayNumber = digits.substring(0, 1).padStart(DAY_NUMBER_LENGTH, '0');
              const monthNumber = +digits.substring(1, 3);
              if (monthNumber === 0) {
                formattedValue = `${dayNumber}.0${MONTH_MIN_NUMBER}`;
              } else {
                formattedValue = `${dayNumber}.${monthNumber <= MONTH_MAX_NUMBER ? monthNumber.toString().padStart(MONTH_NUMBER_LENGTH, '0') : MONTH_MAX_NUMBER}`;
              }
            }

            // Поскольку в этой ветке вторая и третья цифры являются номером месяца, четвёртая цифра станет первой цифрой номера года.
            if (digits.length > 3) {
              const yearNumber = digits.substring(3, 7);
              formattedValue += `.${yearNumber}`;
            }
          } else {
            // В этой ветке номером месяца является только вторая цифра.
            formattedValue = `${formattedValue}.0${monthNumberFirstDigit}`;

            // Поскольку в этой ветке номером месяца является только вторая цифра, третья станет первой цифрой номера года.
            if (digits.length > 2) {
              const yearNumber = digits.substring(2, 6);
              formattedValue += `.${yearNumber}`;
            }
          }
        }
      }
    }
    return formattedValue;
  }
  inputElement.addEventListener('input', evt => {
    if (inputElement.value.length !== inputElement.selectionStart) {
      if (evt.data && /\D/g.test(evt.data)) {
        inputElement.value = formatInputValue(inputElement.value);
      }
      return;
    }
    inputElement.value = formatInputValue(inputElement.value);
  });
  inputElement.addEventListener('change', () => {
    inputElement.value = formatInputValue(inputElement.value);
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * installment-request-modal.js
 */
function initInstallmentRequestModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, onInstallmentRequestFormSuccessSubmit) {
  const alert = {
    success: {
      heading: 'Заявка успешно отправлена',
      text: 'Наш менеджер свяжется с вами в течении 3 рабочих дней'
    },
    error: {
      status: 'error',
      heading: 'Ошибка',
      text: 'Не удалось отправить заявку, попробуйте снова.'
    }
  };
  initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert, onInstallmentRequestFormSuccessSubmit);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * map.js
 */
async function initMap(mapElement) {
  const COORDINATES = [44.008906, 56.323592];
  const containerElement = mapElement.querySelector('.map__inner');
  containerElement.classList.remove('map__inner--hidden');
  containerElement.style.filter = 'grayscale(1)';
  await ymaps3.ready;
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapMarker,
    YMapDefaultFeaturesLayer
  } = ymaps3;
  const map = new YMap(containerElement, {
    location: {
      center: COORDINATES,
      zoom: 15
    }
  });
  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());
  const markerElement = document.querySelector('#map-marker-template').content.querySelector('.map-marker').cloneNode(true);
  const marker = new YMapMarker({
    coordinates: COORDINATES
  }, markerElement);
  const timerId = setInterval(() => {
    const canvasElement = mapElement.querySelector('canvas');
    if (canvasElement) {
      clearInterval(timerId);
      canvasElement.style.filter = 'grayscale(1)';
      containerElement.style.filter = '';
      map.addChild(marker);
    }
  }, 1000);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * modal.js
 */
const MODAL_DISAPPEARANCE_TIME = 100;
const openedModals = [];
function openModal(modal) {
  modal.classList.remove('modal--hidden');
  openedModals.push(modal);
  document.addEventListener('keydown', onModalEscapeEvent);
  document.addEventListener('click', onModalClick);
  setTimeout(() => {
    modal.classList.add('modal--open');
  }, 100);
}
function closeModal(modal) {
  modal.classList.remove('modal--error');
  modal.classList.remove('modal--open');
  openedModals.pop();
  if (!openedModals.length) {
    document.removeEventListener('keydown', onModalEscapeEvent);
    document.removeEventListener('click', onModalClick);
  }
  setTimeout(() => {
    modal.classList.add('modal--hidden');
    if (modal.classList.contains('modal--with_alert') || modal.classList.contains('modal--with_review-gallery')) {
      modal.remove();
    }
  }, MODAL_DISAPPEARANCE_TIME);
}
function onModalEscapeEvent(evt) {
  if (!isEscapeEvent(evt)) {
    return;
  }
  evt.preventDefault();
  closeModal(openedModals[openedModals.length - 1]);
}
function onModalClick({
  target
}) {
  if (!target.classList.contains('modal__close-button') && !target.classList.contains('alert__button')) {
    return;
  }
  closeModal(openedModals[openedModals.length - 1]);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * navigation-shortcuts.js
 */
function initNavigationShortcuts(navigationShortcutsElement) {
  const swiperElement = navigationShortcutsElement.querySelector('.swiper');
  new Swiper(swiperElement, {
    slidesPerView: 'auto',
    spaceBetween: 10
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * one-click-modal.js
 */
function initOneClickModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, onOneClickFormSuccessSubmit) {
  const alert = {
    success: {
      heading: 'Заявка успешно отправлена',
      text: 'Наш менеджер свяжется с вами'
    },
    error: {
      status: 'error',
      heading: 'Ошибка',
      text: 'Не удалось отправить заявку, попробуйте снова.'
    }
  };
  initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert, onOneClickFormSuccessSubmit);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * phone-change-modal.js
 */
class PhoneChangeModal {
  #submitButtonPendingStateClass = 'button--pending';
  #requestCodeTimeInterval = 60;
  #timer = 0;
  #modalElement = null;
  #openModal = null;
  #closeModal = null;
  #externalPhoneFieldElement = null;
  #externalPhoneTextElement = null;
  #codeRequestFormElement = null;
  #codeRequestFormSubmitButton = null;
  #codeRequestFormPristine = null;
  #phoneFieldElement = null;
  #codeSendingFormElement = null;
  #codeSendingFormSubmitButton = null;
  #codeSendingFormPristine = null;
  #phoneTextElement = null;
  #codeFieldElement = null;
  #codeSendingFormFooterElement = null;
  #resendCodeButtonElement = null;
  #resendCodeTextElement = null;
  #resendCodeTextTimerElement = null;
  #onCodeRequestFormSuccessSubmit = null;
  #onCodeRequestFormErrorSubmit = null;
  #onCodeReRequestFormSuccessSubmit = null;
  #onCodeReRequestFormErrorSubmit = null;
  #onCodeSendingFormSuccessSubmit = null;
  #onCodeSendingFormErrorSubmit = null;
  constructor({
    modalElement,
    openModal,
    closeModal
  }) {
    this.#modalElement = modalElement;
    this.#openModal = openModal;
    this.#closeModal = closeModal;
  }
  setRequestCodeTimeInterval = seconds => {
    this.#requestCodeTimeInterval = seconds;
  };
  close = () => {
    this.#closeModal(this.#modalElement);
  };
  open = () => {
    this.#openModal(this.#modalElement);
  };
  setExternalPhone = phoneNumber => {
    if (this.#externalPhoneFieldElement) {
      this.#externalPhoneFieldElement.value = phoneNumber;
    }
    if (this.#externalPhoneTextElement) {
      this.#externalPhoneTextElement.textContent = phoneNumber;
    }
  };
  getPhoneFieldValue = () => this.#phoneFieldElement.value;
  resetCodeRequestForm = () => {
    this.#codeRequestFormElement.reset();
  };
  resetCodeSendingForm = () => {
    this.#codeSendingFormElement.reset();
  };
  sendData = async (url, body, onSuccess, onFail, onFinally) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body
      });
      if (!response.ok) {
        throw new Error(`${response.status} – ${response.statusText}`);
      }
      const data = await response.json();
      onSuccess(data);
    } catch (err) {
      onFail(err);
    } finally {
      onFinally();
    }
  };
  #setValidationTexts() {
    this.#phoneFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    this.#codeFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
  }
  #initPristine = () => {
    this.#codeRequestFormPristine = new Pristine(this.#codeRequestFormElement, {
      classTo: 'modal-form__item',
      errorClass: 'invalid',
      errorTextParent: 'modal-form__item',
      errorTextTag: 'p',
      errorTextClass: 'prompt-text'
    });
    this.#codeSendingFormPristine = new Pristine(this.#codeSendingFormElement, {
      classTo: 'modal-form__item',
      errorClass: 'invalid',
      errorTextParent: 'modal-form__item',
      errorTextTag: 'p',
      errorTextClass: 'prompt-text'
    });
  };
  finishWaitingForResend = () => {
    this.#codeSendingFormFooterElement.prepend(this.#resendCodeButtonElement);
    this.#resendCodeTextElement.remove();
  };
  startWaitingForResend = () => {
    if (this.#timer <= 0) {
      this.#timer = this.#requestCodeTimeInterval;
      this.#resendCodeTextTimerElement.textContent = this.#timer;
      const timerId = setInterval(() => {
        this.#timer--;
        this.#resendCodeTextTimerElement.textContent = this.#timer;
        if (this.#timer <= 0) {
          clearInterval(timerId);
          this.finishWaitingForResend();
        }
      }, 1000);
      this.#resendCodeButtonElement.remove();
      this.#codeSendingFormFooterElement.prepend(this.#resendCodeTextElement);
    }
  };
  goToCodeRequestForm = () => {
    this.#codeRequestFormElement.classList.remove('modal-form__form--hidden');
    this.#codeSendingFormElement.classList.add('modal-form__form--hidden');
  };
  goToCodeSendingForm = () => {
    this.#codeRequestFormElement.classList.add('modal-form__form--hidden');
    this.#codeSendingFormElement.classList.remove('modal-form__form--hidden');
    const formattedPhoneText = this.#phoneFieldElement.value.replace(/[()]/g, '').replace(/-/g, ' ');
    this.#phoneTextElement.textContent = formattedPhoneText;
    this.startWaitingForResend();
  };
  #onModalClick = evt => {
    const textFieldClearButtonElement = evt.target.closest('.text-field__clear-button');
    const backButtonElement = evt.target.closest('.modal-form__back-button');
    if (textFieldClearButtonElement) {
      const textFieldElement = textFieldClearButtonElement.closest('.text-field');
      const textFieldControlElement = textFieldElement.querySelector('.text-field__control');
      textFieldControlElement.value = '';
      textFieldControlElement.focus();
      return;
    }
    if (backButtonElement) {
      evt.preventDefault();
      this.goToCodeRequestForm();
    }
  };

  // Обработчик отправки формы запроса кода
  #onCodeRequestFormSubmit = evt => {
    evt.preventDefault();
    if (this.#timer > 0) {
      this.goToCodeSendingForm();
    } else {
      const actionUrl = this.#codeRequestFormElement.getAttribute('action');
      const isValid = this.#codeRequestFormPristine.validate();
      if (isValid) {
        this.#codeRequestFormSubmitButton.disabled = true;
        this.#codeRequestFormSubmitButton.classList.add(this.#submitButtonPendingStateClass);
        this.sendData(actionUrl, new FormData(evt.target), this.#onCodeRequestFormSuccessSubmit, this.#onCodeRequestFormErrorSubmit, () => {
          this.#codeRequestFormSubmitButton.disabled = false;
          this.#codeRequestFormSubmitButton.classList.remove(this.#submitButtonPendingStateClass);
        });
      } else {
        this.#modalElement.classList.remove('modal--error');
        setTimeout(() => this.#modalElement.classList.add('modal--error'), 50);
      }
    }
  };

  // Обработчик нажатия на кнопку отправить повторно
  #onResendCodeButtonClick = evt => {
    evt.preventDefault();
    this.#resendCodeButtonElement.disabled = true;
    const actionUrl = this.#codeRequestFormElement.getAttribute('action');
    this.sendData(actionUrl, new FormData(this.#codeRequestFormElement), this.#onCodeReRequestFormSuccessSubmit, this.#onCodeReRequestFormErrorSubmit, () => {
      this.#resendCodeButtonElement.disabled = false;
    });
  };

  // Обработчик отправки формы подтверждения
  #onCodeSendingFormSubmit = evt => {
    evt.preventDefault();
    const actionUrl = this.#codeSendingFormElement.getAttribute('action');
    const isValid = this.#codeSendingFormPristine.validate();
    if (isValid) {
      this.#codeSendingFormSubmitButton.disabled = true;
      this.#codeSendingFormSubmitButton.classList.add(this.#submitButtonPendingStateClass);
      this.sendData(actionUrl, new FormData(evt.target), this.#onCodeSendingFormSuccessSubmit, this.#onCodeSendingFormErrorSubmit, () => {
        this.#codeSendingFormSubmitButton.disabled = false;
        this.#codeSendingFormSubmitButton.classList.remove(this.#submitButtonPendingStateClass);
      });
    } else {
      this.#modalElement.classList.remove('modal--error');
      setTimeout(() => this.#modalElement.classList.add('modal--error'), 50);
    }
  };
  #onOpenerElementClick = evt => {
    evt.preventDefault();
    this.open();
  };
  setCodeRequestSubmitHandlers = (onSuccess, onFail) => {
    this.#onCodeRequestFormSuccessSubmit = onSuccess;
    this.#onCodeRequestFormErrorSubmit = onFail;
  };
  setCodeReRequestSubmitHandlers = (onSuccess, onFail) => {
    this.#onCodeReRequestFormSuccessSubmit = onSuccess;
    this.#onCodeReRequestFormErrorSubmit = onFail;
  };
  setCodeSendingSubmitHandlers = (onSuccess, onFail) => {
    this.#onCodeSendingFormSuccessSubmit = onSuccess;
    this.#onCodeSendingFormErrorSubmit = onFail;
  };
  init() {
    this.#externalPhoneFieldElement = document.querySelector('.profile-form__item--phone .text-field__control');
    this.#externalPhoneTextElement = document.querySelector('.account__phone');
    this.#codeRequestFormElement = this.#modalElement.querySelector('.modal-form__form--code-request');
    this.#codeRequestFormSubmitButton = this.#codeRequestFormElement.querySelector('.modal-form__submit-button');
    this.#phoneFieldElement = this.#codeRequestFormElement.querySelector('.modal-form__item--tel .text-field__control');
    this.#codeSendingFormElement = this.#modalElement.querySelector('.modal-form__form--code-sending');
    this.#codeSendingFormSubmitButton = this.#codeSendingFormElement.querySelector('.modal-form__submit-button');
    this.#phoneTextElement = this.#codeSendingFormElement.querySelector('.modal-form__phone-text');
    this.#codeFieldElement = this.#codeSendingFormElement.querySelector('.modal-form__item--code .text-field__control');
    this.#codeSendingFormFooterElement = this.#codeSendingFormElement.querySelector('.modal-form__footer');
    this.#resendCodeButtonElement = this.#codeSendingFormElement.querySelector('.modal-form__footer-button--resend-code');
    this.#resendCodeTextElement = this.#codeSendingFormElement.querySelector('.modal-form__footer-text--resend-code');
    this.#resendCodeTextTimerElement = this.#resendCodeTextElement.querySelector('.modal-form__footer-text-timer');
    this.#setValidationTexts();
    this.#initPristine();
    this.#modalElement.addEventListener('click', this.#onModalClick);
    this.#codeRequestFormElement.addEventListener('submit', this.#onCodeRequestFormSubmit);
    this.#codeSendingFormElement.addEventListener('submit', this.#onCodeSendingFormSubmit);
    this.#resendCodeButtonElement.addEventListener('click', this.#onResendCodeButtonClick);
    document.querySelectorAll('[data-modal-opener="phone-change"]').forEach(openerElement => {
      openerElement.addEventListener('click', this.#onOpenerElementClick);
    });
  }
}
function initPhoneChangeModal(modalElement, openModal, closeModal) {
  const phoneChangeModal = new PhoneChangeModal({
    modalElement,
    openModal,
    closeModal
  });
  phoneChangeModal.init();
  return phoneChangeModal;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * premium-brands-slider.js
 */
function initPremiumBrandsSlider(sliderElement) {
  const swiperElement = sliderElement.querySelector('.swiper');
  const prevButtonElement = sliderElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderElement.querySelector('.slider-arrows__button--next');
  new Swiper(swiperElement, {
    slidesPerView: 'auto',
    loop: true,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * product-card-template.js
 */
function createProductCardTemplate(product, modificators) {
  const priceFormatter = new Intl.NumberFormat('ru');
  let price = null;
  let oldPrice = null;
  if (product.discount) {
    oldPrice = priceFormatter.format(product.price);
    price = priceFormatter.format(product.price * (100 - product.discount) / 100);
  } else {
    price = priceFormatter.format(product.price);
  }
  const dimensions = Object.values(product.dimensions).join('х');
  return `
    <article class="product-card product-card-popup__card ${modificators ? modificators : ''}">
      <div class="product-card__heading-and-signs">
        <h3 class="product-card__heading">
          <a class="product-card__link" href="${product.href}">${product.title}</a>
        </h3>
        <p class="product-card__signs">${dimensions}</p>
      </div>
      <div class="product-card__prices">
        <p class="product-card__price ${product.discount ? 'accent' : ''}">${price} ₽</p>
        ${product.discount ? `<s class="product-card__old-price">${oldPrice} ₽</s><p class="producr-card__discount">-${product.discount}%</p>` : ''}
      </div>
      <a class="product-card__slider swiper" href="${product.href}">
        <ul class="product-card__slider-list swiper-wrapper">
          ${product.images.map((image, index) => `
            <li class="product-card__slider-item swiper-slide">
              <img class="product-card__image" src="${image}" alt="" loading="lazy"/>
            </li>
          `).join('')}
        </ul>
        <p class="product-card__slider-pagination"></p>
      </a>
      <div class="product-card__labels-wrapper">
        <div class="product-card__labels">
          ${product.isPremium ? '<p class="product-card__premium-label"><span class="product-card__premium-label-text">Premium</span></p>' : ''}
          ${product.status === 'in-stock' ? '<p class="product-card__label">В наличии</p>' : ''}
          <p class="product-card__like-button-wrapper">
            <button class="like-button product-card__like-button ${product.isFavorite ? 'like-button--active' : ''}" type="button">
              <span class="visually-hidden">Нравится</span>
            </button>
          </p>
        </div>
      </div>
      <a class="product-card__brand" href="${product.brandHref}">
        Бренд <span class="product-card__brand-name">${product.brand}</span>
      </a>
    </article>
  `;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * product-card.js
 */
function initProductCard(productCardElement) {
  const sliderElement = productCardElement.querySelector('.product-card__slider');
  const paginationElement = sliderElement.querySelector('.product-card__slider-pagination');
  new Swiper(sliderElement, {
    pagination: {
      el: paginationElement,
      bulletClass: 'product-card__slider-pagination-button',
      bulletActiveClass: 'product-card__slider-pagination-button--current',
      renderBullet: getPaginationButtonCreator()
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * product-header-sticky-form-buttons.js
 */
function initProductHeaderStickyActionButtons(buttonsWrapperElement) {
  const box = document.querySelector('.page__inner');
  const onBoxScroll = () => {
    const isPageScrolledDown = box.scrollHeight - box.scrollTop === box.clientHeight;
    if (!isPageScrolledDown) {
      buttonsWrapperElement.classList.add('product-header__action-buttons--sticked');
    } else {
      buttonsWrapperElement.classList.remove('product-header__action-buttons--sticked');
    }
  };
  box.addEventListener('scroll', throttle(onBoxScroll, 100));
  window.addEventListener('resize', throttle(onBoxScroll, 100));
  onBoxScroll();
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * product-images.js
 */
function setSliderMode(slider, params) {
  slider.itself.classList.add(slider.modeClass, 'swiper');
  slider.list.classList.add('swiper-wrapper');
  slider.slides.forEach(row => row.classList.add('swiper-slide'));
  slider.swiper = new Swiper(slider.itself, params);
}
function setSliderSimpleMode(slider) {
  setSliderMode(slider, {
    pagination: {
      el: slider.pagination,
      bulletClass: 'product-images__slider-pagination-button',
      bulletActiveClass: 'product-images__slider-pagination-button--current',
      renderBullet: getPaginationButtonCreator()
    },
    grabCursor: true
  });
}
function resetSliderMode(slider) {
  slider?.swiper?.destroy(true, true);
  slider.itself.classList.remove('swiper');
  slider.list.classList.remove('swiper-wrapper');
  slider.slides.forEach(slide => {
    slide.removeAttribute('aria-label');
    slide.removeAttribute('role');
    slide.classList.remove('swiper-slide');
  });
  slider.list.removeAttribute('aria-live');
  slider.pagination.innerHTML = '';
  slider.swiper = null;
}
function initProductImages(productImagesElement) {
  const slider = {
    itself: productImagesElement.querySelector('.product-images__slider'),
    list: productImagesElement.querySelector('.product-images__slider-list'),
    slides: productImagesElement.querySelectorAll('.product-images__slider-item'),
    pagination: productImagesElement.querySelector('.product-images__slider-pagination')
  };
  const desktopWidthMediaQueryList = window.matchMedia(DESKTOP_WIDTH_MEDIA_QUERY);
  const toggleSliderMode = () => {
    if (desktopWidthMediaQueryList.matches) {
      resetSliderMode(slider);
    } else {
      setSliderSimpleMode(slider);
    }
  };
  desktopWidthMediaQueryList.addEventListener('change', () => {
    toggleSliderMode();
  });
  toggleSliderMode();
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * product-question-modal.js
 */
function initProductQuestionModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, onProductQuestionFormSuccessSubmit) {
  const alert = {
    success: {
      heading: 'Ваш вопрос успешно отправлен',
      text: 'Наш менеджер свяжется с вами'
    },
    error: {
      status: 'error',
      heading: 'Ошибка',
      text: 'Не удалось отправить вопрос, попробуйте снова.'
    }
  };
  initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert, onProductQuestionFormSuccessSubmit);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * products.js
 */
function initProducts(productsElement) {
  const swiperElement = productsElement.querySelector('.swiper');
  const prevButtonElement = productsElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = productsElement.querySelector('.slider-arrows__button--next');
  new Swiper(swiperElement, {
    slidesPerView: 'auto',
    spaceBetween: 15,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement
    },
    breakpoints: {
      768: {
        spaceBetween: 20
      },
      1346: {
        spaceBetween: 30
      },
      1900: {
        spaceBetween: 40
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

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
    formElement.querySelectorAll('input').forEach(fieldElement => {
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
    errorTextClass: 'prompt-text'
  });
  formElement.addEventListener('click', evt => {
    const textFieldClearButtonElement = evt.target.closest('.text-field__clear-button');
    if (textFieldClearButtonElement) {
      const textFieldElement = textFieldClearButtonElement.closest('.text-field');
      const textFieldControlElement = textFieldElement.querySelector('.text-field__control');
      textFieldControlElement.value = '';
      textFieldControlElement.focus();
      textFieldControlElement.dispatchEvent(new Event('input', {
        bubbles: true
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
      heading: 'Данные успешно обновлены'
    });
  }
  ;
  const successCb = onProfileFormSuccessSubmit ?? successDefaultCb;
  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      submitButtonElement.disabled = true;
      submitButtonElement.classList.add(SUBMIT_BUTTON_PENDING_STATE_CLASS);
      sendData(actionUrl, new FormData(evt.target), data => {
        currentFieldValues = getAllFieldValues();
        successCb(data);
      }, () => {
        showAlert(openModal, {
          status: 'error',
          heading: 'Ошибка',
          text: 'Не удалось обновить данные, попробуйте снова.'
        });
      }, () => {
        submitButtonElement.disabled = false;
        submitButtonElement.classList.remove(SUBMIT_BUTTON_PENDING_STATE_CLASS);
      });
    } else {
      formElement.classList.remove('profile-form--error');
      setTimeout(() => formElement.classList.add('profile-form--error'), 50);
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * project.js
 */
const productMockData = {
  id: '1',
  title: 'Тумба Mock',
  isPremium: true,
  isFavorite: false,
  status: 'in-stock',
  price: 100,
  discount: 0,
  dimensions: {
    width: '15',
    length: '20',
    height: '60'
  },
  images: ['img/products/product-3.webp', 'img/products/product-3.webp', 'img/products/product-3.webp', 'img/products/product-3.webp', 'img/products/product-3.webp'],
  images2x: ['img/products/product-3@2x.webp', 'img/products/product-3@2x.webp', 'img/products/product-3@2x.webp', 'img/products/product-3@2x.webp', 'img/products/product-3@2x.webp'],
  href: 'product.html',
  brand: 'Calligaris',
  brandHref: 'brand.html'
};
function createProductCardPopupTemplate(product, createProductCardTemplate, productCardModificators) {
  const productCardTemplate = createProductCardTemplate(product, productCardModificators);
  return `
    <div class="product-card-popup pin__popup">
      <div class="product-card-popup__inner">
        <button class="product-card-popup__close-button" type="button"><span class="visually-hidden">Закрыть</span></button>
        ${productCardTemplate}
        <a class="product-card-popup__link" href="${product.href}">Подробнее</a>
      </div>
    </div>
  `;
}
function closeActivePin(pinElement) {
  const POPUP_DISAPPEARANCE_TIME = 100;
  const popupEement = pinElement.querySelector('.pin__popup');
  const buttonElement = pinElement.querySelector('.plus-button');
  popupEement.classList.add('pin__popup--closing');
  setTimeout(() => {
    popupEement.remove();
  }, POPUP_DISAPPEARANCE_TIME);
  buttonElement.classList.remove('plus-button--active');
  pinElement.classList.remove('pin--active');
}
function closeAllActivePins(pinElements) {
  pinElements.forEach(pinElement => {
    if (pinElement.classList.contains('pin--active')) {
      closeActivePin(pinElement);
    }
  });
}
function initProject(projectElement, createProductCardTemplate, initProductCard, openModal, showAlert) {
  const MIN_INDENT_FROM_WINDOW_EDGE = 100;
  const pinElements = projectElement.querySelectorAll('.pin');
  const getData = async (url, onSuccess, onFail, onFinally) => {
    try {
      const response = await fetch(url);
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
  projectElement.addEventListener('click', evt => {
    const pinButtonElement = evt.target.closest('.plus-button');
    const popupCloseButtonElement = evt.target.closest('.product-card-popup__close-button');
    if (pinButtonElement) {
      const pinElement = pinButtonElement.closest('.pin');
      if (pinButtonElement.classList.contains('plus-button--active')) {
        closeActivePin(pinElement);
      } else {
        closeAllActivePins(pinElements);
        pinButtonElement.disabled = true;
        const productId = pinElement.dataset.productId;
        const actionUrl = `https://fakestoreapi.com/products/${productId}`;
        getData(actionUrl, data => {
          const productData = data && productMockData; // Нужно будет удалить "&& productMockData"
          const popupElement = createElementByString(createProductCardPopupTemplate(productData, createProductCardTemplate, 'product-card--popup'));
          initProductCard(popupElement.querySelector('.product-card'));
          pinElement.append(popupElement);
          pinButtonElement.classList.add('plus-button--active');
          pinElement.classList.add('pin--active');
          const wideTabletWidthMediaQueryList = window.matchMedia(WIDE_TABLET_WIDTH_MEDIA_QUERY);
          if (!wideTabletWidthMediaQueryList.matches) {
            return;
          }
          const popupElementXPosition = popupElement.getBoundingClientRect().x;
          if (popupElementXPosition < MIN_INDENT_FROM_WINDOW_EDGE) {
            const popupInnerElement = popupElement.querySelector('.product-card-popup__inner');
            popupInnerElement.style.transformOrigin = 'left bottom';
            popupElement.style.right = 'auto';
            popupElement.style.left = '20px';
          }
        }, () => {
          showAlert(openModal, {
            status: 'error',
            heading: 'Ошибка',
            text: 'Не удалось загрузить данные товара, попробуйте снова.'
          });
        }, () => {
          pinButtonElement.disabled = false;
        });
      }
    }
    if (popupCloseButtonElement) {
      const pinElement = popupCloseButtonElement.closest('.pin');
      closeActivePin(pinElement);
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * projects-slider.js
 */
function initProjectsSlider(sliderElement) {
  const swiperElement = sliderElement.querySelector('.swiper');
  const prevButtonElement = sliderElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderElement.querySelector('.slider-arrows__button--next');
  new Swiper(swiperElement, {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement
    },
    breakpoints: {
      1346: {
        spaceBetween: 30
      },
      1900: {
        spaceBetween: 40
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * review-modal.js
 */
function initReviewModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, onReviewFormSuccessSubmit) {
  const alert = {
    success: {
      heading: 'Спасибо, что оценили нашу работу',
      text: 'Ваш отзыв будет проверен модератором сайта, и опубликован в течение 2 рабочих дней'
    },
    error: {
      status: 'error',
      heading: 'Ошибка',
      text: 'Не удалось отправить отзыв, попробуйте снова.'
    }
  };
  initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert, onReviewFormSuccessSubmit);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * reviews-list.js
 */
const mockReviewGalleryData = [{
  type: 'video',
  src: 'files/video.mp4',
  posterSrc: 'img/reviews/review-1.webp'
}, {
  type: 'image',
  src: 'img/reviews/review-1.webp'
}, {
  type: 'image',
  src: 'img/reviews/review-2.webp'
}, {
  type: 'image',
  src: 'img/reviews/review-3.webp'
}, {
  type: 'image',
  src: 'img/reviews/review-1.webp'
}, {
  type: 'image',
  src: 'img/reviews/review-2.webp'
}, {
  type: 'image',
  src: 'img/reviews/review-3.webp'
}];
class ReviewsList {
  #listElement = null;
  #galleryModal = null;
  #initGallery = null;
  #initVideo = null;
  #openModal = null;
  #reviewTextWrapperElements = null;
  constructor({
    listElement,
    galleryModal,
    initGallery,
    initVideo,
    openModal
  }) {
    this.#listElement = listElement;
    this.#galleryModal = galleryModal;
    this.#initGallery = initGallery;
    this.#initVideo = initVideo;
    this.#openModal = openModal;
  }
  updateReviewsTextWrappersList = () => {
    this.#reviewTextWrapperElements = this.#listElement.querySelectorAll('.review__text-wrapper');
  };
  #setReviewsTextWrappersMode = () => {
    this.#reviewTextWrapperElements.forEach(textWrapperElement => {
      const isClipped = textWrapperElement.classList.contains('review__text-wrapper--clipped');
      textWrapperElement.classList.add('review__text-wrapper--clipped');
      const textElement = textWrapperElement.querySelector('.review__text');
      if (textElement.scrollHeight > textElement.offsetHeight) {
        textWrapperElement.classList.add('review__text-wrapper--clippable');
      } else {
        textWrapperElement.classList.remove('review__text-wrapper--clippable');
      }
      if (!isClipped) {
        textWrapperElement.classList.remove('review__text-wrapper--clipped');
      }
    });
  };
  #onWindowResize = throttle(this.#setReviewsTextWrappersMode, 500);
  #onListClick = evt => {
    const toggleButtonElement = evt.target.closest('.review__toggle-button');
    const feedSliderItemElement = evt.target.closest('.feed__slider-item');
    if (toggleButtonElement) {
      const textWrapperElement = toggleButtonElement.closest('.review__text-wrapper');
      textWrapperElement.classList.toggle('review__text-wrapper--clipped');
    }
    if (feedSliderItemElement) {
      evt.preventDefault();
      const feedSliderListElement = feedSliderItemElement.parentElement;
      feedSliderListElement.classList.add('no-click');
      const feedSliderItemElementNumber = Array.from(feedSliderListElement.children).indexOf(feedSliderItemElement);
      const review = feedSliderItemElement.closest('.review');
      const galleryModal = new this.#galleryModal({
        content: reviewsGalleryData[review.dataset.id],
        openModal: this.#openModal,
        initGallery: this.#initGallery,
        initVideo: this.#initVideo
      });
      galleryModal.open(feedSliderItemElementNumber);
      feedSliderListElement.classList.remove('no-click');
    }
  };
  init = () => {
    this.updateReviewsTextWrappersList();
    this.#setReviewsTextWrappersMode();
    window.addEventListener('resize', this.#onWindowResize);
    this.#listElement.addEventListener('click', this.#onListClick);
  };
}
function initReviewsList(listElement, galleryModal, initGallery, initVideo, openModal) {
  const reviewsList = new ReviewsList({
    listElement,
    galleryModal,
    initGallery,
    initVideo,
    openModal
  });
  reviewsList.init();
  return reviewsList;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * salon-modal.js
 */
function initSalonModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, onSalonFormSuccessSubmit) {
  const alert = {
    success: {
      heading: 'Заявка успешно отправлена',
      text: 'Наш менеджер свяжется с вами'
    },
    error: {
      status: 'error',
      heading: 'Ошибка',
      text: 'Не удалось отправить заявку, попробуйте снова.'
    }
  };
  initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert, onSalonFormSuccessSubmit);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * scroll-container.js
 */
function initScrollContainer(containerElement) {
  const scrollbarElement = containerElement.querySelector('.swiper-scrollbar');
  const swiper = new Swiper(containerElement, {
    direction: 'vertical',
    slidesPerView: 'auto',
    freeMode: true,
    autoHeight: true,
    scrollbar: {
      el: scrollbarElement,
      draggable: true
    },
    mousewheel: true
  });
  return swiper;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * search-modal.js
 */
const searchResultMockData = {
  products: [{
    id: '1',
    title: 'Стул Tosca',
    isPremium: true,
    isFavorite: false,
    status: 'in-stock',
    price: 12000,
    discount: 0,
    dimensions: {
      width: '15',
      length: '20',
      height: '60'
    },
    images: ['img/products/product-1.webp', 'img/products/product-1.webp', 'img/products/product-1.webp', 'img/products/product-1.webp', 'img/products/product-1.webp'],
    href: 'product.html',
    brand: 'Calligaris',
    brandHref: 'brand.html'
  }, {
    id: '2',
    title: 'Стул Tosca',
    isPremium: true,
    isFavorite: false,
    status: 'in-stock',
    price: 15000,
    discount: 0,
    dimensions: {
      width: '15',
      length: '20',
      height: '60'
    },
    images: ['img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp'],
    href: 'product.html',
    brand: 'Calligaris',
    brandHref: 'brand.html'
  }, {
    id: '3',
    title: 'Тумба Mock',
    isPremium: true,
    isFavorite: false,
    status: 'in-stock',
    price: 20000,
    discount: 10,
    dimensions: {
      width: '15',
      length: '20',
      height: '60'
    },
    images: ['img/products/product-3.webp', 'img/products/product-3.webp', 'img/products/product-3.webp', 'img/products/product-3.webp', 'img/products/product-3.webp'],
    href: 'product.html',
    brand: 'Calligaris',
    brandHref: 'brand.html'
  }, {
    id: '1',
    title: 'Стул Tosca',
    isPremium: true,
    isFavorite: false,
    status: 'in-stock',
    price: 12000,
    discount: 0,
    dimensions: {
      width: '15',
      length: '20',
      height: '60'
    },
    images: ['img/products/product-1.webp', 'img/products/product-1.webp', 'img/products/product-1.webp', 'img/products/product-1.webp', 'img/products/product-1.webp'],
    href: 'product.html',
    brand: 'Calligaris',
    brandHref: 'brand.html'
  }, {
    id: '2',
    title: 'Стул Tosca',
    isPremium: true,
    isFavorite: false,
    status: 'in-stock',
    price: 15000,
    discount: 0,
    dimensions: {
      width: '15',
      length: '20',
      height: '60'
    },
    images: ['img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp'],
    href: 'product.html',
    brand: 'Calligaris',
    brandHref: 'brand.html'
  }],
  articles: [{
    title: 'Смена экспозиции в&nbsp;выставочном зале',
    type: 'Блог',
    image: 'img/articles/previews/preview-1.webp',
    image2x: 'img/articles/previews/preview-1@2x.webp 2x',
    date: '2023-05-10',
    href: 'article.html'
  }]
};
class SearchModal {
  #maxListItemsCount = 4;
  #modalElement = null;
  #openModal = null;
  #modalContentElement = null;
  #controlElement = null;
  #formElement = null;
  #resultElement = null;
  #createProductCardTemplate = null;
  #initProductCard = null;
  #createArticlePreviewTemplate = null;
  constructor({
    modalElement,
    openModal,
    createProductCardTemplate,
    initProductCard,
    createArticlePreviewTemplate
  }) {
    this.#modalElement = modalElement;
    this.#openModal = openModal;
    this.#createProductCardTemplate = createProductCardTemplate;
    this.#initProductCard = initProductCard;
    this.#createArticlePreviewTemplate = createArticlePreviewTemplate;
  }
  #sendData = async (url, body, onSuccess, onFail) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body
      });
      if (!response.ok) {
        throw new Error(`${response.status} – ${response.statusText}`);
      }
      const data = await response.json();
      onSuccess(data);
    } catch (err) {
      onFail();
    }
  };
  #onModalClick = evt => {
    const clearButton = evt.target.closest('.text-field__clear-button');
    const popularLink = evt.target.closest('.search-modal__popular-list-link');
    if (clearButton) {
      this.#controlElement.value = '';
      this.#controlElement.focus();
      this.#controlElement.dispatchEvent(new Event('input', {
        bubbles: true
      }));
    }
    if (popularLink) {
      this.#controlElement.value = popularLink.textContent;
      this.#controlElement.focus();
      this.#controlElement.dispatchEvent(new Event('input', {
        bubbles: true
      }));
    }
  };
  #createResultGroupTemplate(groupTitle, moreResultsLinkHref, list) {
    const moreResultsLink = `
      <a class="search-modal__result-group__link link link--small" href="${moreResultsLinkHref}">Ещё результаты</a>
    `;
    return `
      <section class="search-modal__result-group">
        <header class="search-modal__result-group-header">
          <h3 class="search-modal__result-group-heading">По вашему запросу найдены «${groupTitle}»</h3>
          ${moreResultsLinkHref ? moreResultsLink : ''}
        </header>
        ${list}
      </section>
    `;
  }
  #showSearchResults = () => {
    if (this.#controlElement.value.trim().length < 3) {
      this.#modalContentElement.classList.remove('search-modal--with-result');
      this.#resultElement.innerHTML = '';
      return;
    }
    this.#modalContentElement.classList.add('search-modal--with-result');
    const actionUrl = this.#formElement.getAttribute('action');
    this.#sendData(actionUrl, new FormData(this.#formElement), data => {
      this.#resultElement.innerHTML = '';
      const searchResult = data && [];
      if (!searchResult?.products?.length && !searchResult?.articles?.length) {
        this.#resultElement.insertAdjacentHTML('beforeend', '<p class="search-modal__result-placeholder">По вашему запросу ничего не найдено</p>');
        return;
      }
      if (searchResult.products.length) {
        const productsListTemplate = `
            <ul class="products-list products-list--size_xs search-modal__result-group-list">
              ${searchResult.products.slice(0, this.#maxListItemsCount).map(product => this.#createProductCardTemplate(product, 'product-card--size_xs')).join('')}
            </ul>
          `;
        const moreResultsLinkHref = searchResult.products.length > this.#maxListItemsCount ? `search.html?query=${this.#controlElement.value.trim()}` : null;
        const resultGroupTemplate = this.#createResultGroupTemplate('Товары', moreResultsLinkHref, productsListTemplate);
        const resultGroupElement = createElementByString(resultGroupTemplate);
        resultGroupElement.querySelectorAll('.product-card').forEach(this.#initProductCard);
        this.#resultElement.append(resultGroupElement);
      }
      if (searchResult.articles.length) {
        const articlesListTemplate = `
            <ul class="articles-list articles-list--size_s search-modal__result-group-list">
              ${searchResult.articles.map(article => this.#createArticlePreviewTemplate(article, 'article-preview--size_s')).join('')}
            </ul>
          `;
        const moreResultsLinkHref = searchResult.articles.length > this.#maxListItemsCount ? `search.html?query=${this.#controlElement.value.trim()}` : null;
        const resultGroupTemplate = this.#createResultGroupTemplate('Статьи', moreResultsLinkHref, articlesListTemplate);
        const resultGroupElement = createElementByString(resultGroupTemplate);
        this.#resultElement.append(resultGroupElement);
      }
    }, () => {
      this.#resultElement.innerHTML = '';
      this.#resultElement.insertAdjacentHTML('beforeend', '<p class="search-modal__result-placeholder search-modal__result-placeholder--error">Ошибка. Не удалось произвести поиск.</p>');
    });
  };
  #onControlInput = debounce(this.#showSearchResults, 500);
  open = evt => {
    evt.preventDefault();
    this.#openModal(this.#modalElement);
    this.#modalElement.querySelector('input').focus();
  };
  init = () => {
    this.#modalContentElement = this.#modalElement.querySelector('.search-modal');
    this.#formElement = this.#modalContentElement.querySelector('.search-modal__form');
    this.#controlElement = this.#formElement.querySelector('.text-field__control');
    this.#resultElement = this.#modalContentElement.querySelector('.search-modal__result');
    document.querySelectorAll('[data-modal-opener="search"]').forEach(openerElement => {
      openerElement.addEventListener('click', this.open);
    });
    this.#modalContentElement.addEventListener('click', this.#onModalClick);
    this.#controlElement.addEventListener('input', this.#onControlInput);
  };
}
function initSearchModal(modalElement, openModal, createProductCardTemplate, initProductCard, createArticlePreviewTemplate) {
  const searchModal = new SearchModal({
    modalElement,
    openModal,
    createProductCardTemplate,
    initProductCard,
    createArticlePreviewTemplate
  });
  searchModal.init();
  return searchModal;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * selection-slider.js
 */
function initSelectionSlider(sliderElement) {
  const swiperElement = sliderElement.querySelector('.swiper');
  const prevButtonElement = sliderElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderElement.querySelector('.slider-arrows__button--next');
  new Swiper(swiperElement, {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement
    },
    breakpoints: {
      1346: {
        spaceBetween: 30
      },
      1900: {
        spaceBetween: 40
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * sign-in-modal.js
 */
class SignInModal {
  #submitButtonPendingStateClass = 'button--pending';
  #requestCodeTimeInterval = 60; // Нужно увеличить интервал между запросами кода по номеру телефона
  #timer = 0;
  #modalElement = null;
  #openModal = null;
  #closeModal = null;
  #codeRequestFormElement = null;
  #codeRequestFormSubmitButton = null;
  #codeRequestFormPristine = null;
  #phoneFieldElement = null;
  #codeSendingFormElement = null;
  #codeSendingFormSubmitButton = null;
  #codeSendingFormPristine = null;
  #phoneTextElement = null;
  #codeFieldElement = null;
  #codeSendingFormFooterElement = null;
  #resendCodeButtonElement = null;
  #resendCodeTextElement = null;
  #resendCodeTextTimerElement = null;
  #onCodeRequestFormSuccessSubmit = null;
  #onCodeRequestFormErrorSubmit = null;
  #onCodeReRequestFormSuccessSubmit = null;
  #onCodeReRequestFormErrorSubmit = null;
  #onCodeSendingFormSuccessSubmit = null;
  #onCodeSendingFormErrorSubmit = null;
  constructor({
    modalElement,
    openModal,
    closeModal
  }) {
    this.#modalElement = modalElement;
    this.#openModal = openModal;
    this.#closeModal = closeModal;
  }
  setRequestCodeTimeInterval = seconds => {
    this.#requestCodeTimeInterval = seconds;
  };
  close = () => {
    this.#closeModal(this.#modalElement);
  };
  open = () => {
    this.#openModal(this.#modalElement);
  };
  resetCodeRequestForm = () => {
    this.#codeRequestFormElement.reset();
  };
  resetCodeSendingForm = () => {
    this.#codeSendingFormElement.reset();
  };
  sendData = async (url, body, onSuccess, onFail, onFinally) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body
      });
      if (!response.ok) {
        throw new Error(`${response.status} – ${response.statusText}`);
      }
      const data = await response.json();
      onSuccess(data);
    } catch (err) {
      onFail(err);
    } finally {
      onFinally();
    }
  };
  #setValidationTexts() {
    this.#phoneFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    this.#codeFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
  }
  #initPristine = () => {
    this.#codeRequestFormPristine = new Pristine(this.#codeRequestFormElement, {
      classTo: 'modal-form__item',
      errorClass: 'invalid',
      errorTextParent: 'modal-form__item',
      errorTextTag: 'p',
      errorTextClass: 'prompt-text'
    });
    this.#codeSendingFormPristine = new Pristine(this.#codeSendingFormElement, {
      classTo: 'modal-form__item',
      errorClass: 'invalid',
      errorTextParent: 'modal-form__item',
      errorTextTag: 'p',
      errorTextClass: 'prompt-text'
    });
  };
  finishWaitingForResend = () => {
    this.#codeSendingFormFooterElement.prepend(this.#resendCodeButtonElement);
    this.#resendCodeTextElement.remove();
  };
  startWaitingForResend = () => {
    if (this.#timer <= 0) {
      this.#timer = this.#requestCodeTimeInterval;
      this.#resendCodeTextTimerElement.textContent = this.#timer;
      const timerId = setInterval(() => {
        this.#timer--;
        this.#resendCodeTextTimerElement.textContent = this.#timer;
        if (this.#timer <= 0) {
          clearInterval(timerId);
          this.finishWaitingForResend();
        }
      }, 1000);
      this.#resendCodeButtonElement.remove();
      this.#codeSendingFormFooterElement.prepend(this.#resendCodeTextElement);
    }
  };
  goToCodeRequestForm = () => {
    this.#codeRequestFormElement.classList.remove('modal-form__form--hidden');
    this.#codeSendingFormElement.classList.add('modal-form__form--hidden');
  };
  goToCodeSendingForm = () => {
    this.#codeRequestFormElement.classList.add('modal-form__form--hidden');
    this.#codeSendingFormElement.classList.remove('modal-form__form--hidden');
    const formattedPhoneText = this.#phoneFieldElement.value.replace(/[()]/g, '').replace(/-/g, ' ');
    this.#phoneTextElement.textContent = formattedPhoneText;
    this.startWaitingForResend();
  };
  #onModalClick = evt => {
    const textFieldClearButtonElement = evt.target.closest('.text-field__clear-button');
    const backButtonElement = evt.target.closest('.modal-form__back-button');
    if (textFieldClearButtonElement) {
      const textFieldElement = textFieldClearButtonElement.closest('.text-field');
      const textFieldControlElement = textFieldElement.querySelector('.text-field__control');
      textFieldControlElement.value = '';
      textFieldControlElement.focus();
      return;
    }
    if (backButtonElement) {
      evt.preventDefault();
      this.goToCodeRequestForm();
    }
  };

  // Обработчик отправки формы запроса кода
  #onCodeRequestFormSubmit = evt => {
    evt.preventDefault();
    if (this.#timer > 0) {
      this.goToCodeSendingForm();
    } else {
      const actionUrl = this.#codeRequestFormElement.getAttribute('action');
      const isValid = this.#codeRequestFormPristine.validate();
      if (isValid) {
        this.#codeRequestFormSubmitButton.disabled = true;
        this.#codeRequestFormSubmitButton.classList.add(this.#submitButtonPendingStateClass);
        this.sendData(actionUrl, new FormData(evt.target), this.#onCodeRequestFormSuccessSubmit, this.#onCodeRequestFormErrorSubmit, () => {
          this.#codeRequestFormSubmitButton.disabled = false;
          this.#codeRequestFormSubmitButton.classList.remove(this.#submitButtonPendingStateClass);
        });
      } else {
        this.#modalElement.classList.remove('modal--error');
        setTimeout(() => this.#modalElement.classList.add('modal--error'), 50);
      }
    }
  };

  // Обработчик нажатия на кнопку отправить повторно
  #onResendCodeButtonClick = evt => {
    evt.preventDefault();
    this.#resendCodeButtonElement.disabled = true;
    const actionUrl = this.#codeRequestFormElement.getAttribute('action');
    this.sendData(actionUrl, new FormData(this.#codeRequestFormElement), this.#onCodeReRequestFormSuccessSubmit, this.#onCodeReRequestFormErrorSubmit, () => {
      this.#resendCodeButtonElement.disabled = false;
    });
  };

  // Обработчик отправки формы подтверждения
  #onCodeSendingFormSubmit = evt => {
    evt.preventDefault();
    const actionUrl = this.#codeSendingFormElement.getAttribute('action');
    const isValid = this.#codeSendingFormPristine.validate();
    if (isValid) {
      this.#codeSendingFormSubmitButton.disabled = true;
      this.#codeSendingFormSubmitButton.classList.add(this.#submitButtonPendingStateClass);
      this.sendData(actionUrl, new FormData(evt.target), this.#onCodeSendingFormSuccessSubmit, this.#onCodeSendingFormErrorSubmit, () => {
        this.#codeSendingFormSubmitButton.disabled = false;
        this.#codeSendingFormSubmitButton.classList.remove(this.#submitButtonPendingStateClass);
      });
    } else {
      this.#modalElement.classList.remove('modal--error');
      setTimeout(() => this.#modalElement.classList.add('modal--error'), 50);
    }
  };
  #onOpenerElementClick = evt => {
    evt.preventDefault();
    this.open();
  };
  setCodeRequestSubmitHandlers = (onSuccess, onFail) => {
    this.#onCodeRequestFormSuccessSubmit = onSuccess;
    this.#onCodeRequestFormErrorSubmit = onFail;
  };
  setCodeReRequestSubmitHandlers = (onSuccess, onFail) => {
    this.#onCodeReRequestFormSuccessSubmit = onSuccess;
    this.#onCodeReRequestFormErrorSubmit = onFail;
  };
  setCodeSendingSubmitHandlers = (onSuccess, onFail) => {
    this.#onCodeSendingFormSuccessSubmit = onSuccess;
    this.#onCodeSendingFormErrorSubmit = onFail;
  };
  init() {
    this.#codeRequestFormElement = this.#modalElement.querySelector('.modal-form__form--code-request');
    this.#codeRequestFormSubmitButton = this.#codeRequestFormElement.querySelector('.modal-form__submit-button');
    this.#phoneFieldElement = this.#codeRequestFormElement.querySelector('.modal-form__item--tel .text-field__control');
    this.#codeSendingFormElement = this.#modalElement.querySelector('.modal-form__form--code-sending');
    this.#codeSendingFormSubmitButton = this.#codeSendingFormElement.querySelector('.modal-form__submit-button');
    this.#phoneTextElement = this.#codeSendingFormElement.querySelector('.modal-form__phone-text');
    this.#codeFieldElement = this.#codeSendingFormElement.querySelector('.modal-form__item--code .text-field__control');
    this.#codeSendingFormFooterElement = this.#codeSendingFormElement.querySelector('.modal-form__footer');
    this.#resendCodeButtonElement = this.#codeSendingFormElement.querySelector('.modal-form__footer-button--resend-code');
    this.#resendCodeTextElement = this.#codeSendingFormElement.querySelector('.modal-form__footer-text--resend-code');
    this.#resendCodeTextTimerElement = this.#resendCodeTextElement.querySelector('.modal-form__footer-text-timer');
    this.#setValidationTexts();
    this.#initPristine();
    this.#modalElement.addEventListener('click', this.#onModalClick);
    this.#codeRequestFormElement.addEventListener('submit', this.#onCodeRequestFormSubmit);
    this.#codeSendingFormElement.addEventListener('submit', this.#onCodeSendingFormSubmit);
    this.#resendCodeButtonElement.addEventListener('click', this.#onResendCodeButtonClick);
    document.querySelectorAll('[data-modal-opener="sign-in"]').forEach(openerElement => {
      openerElement.addEventListener('click', this.#onOpenerElementClick);
    });
  }
}
function initSignInModal(modalElement, openModal, closeModal) {
  const signInModal = new SignInModal({
    modalElement,
    openModal,
    closeModal
  });
  signInModal.init();
  return signInModal;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * simple-modal-form.js
 */
function initSimpleModalForm(modalElement, sendData, openModal, closeModal, showAlert, alert, onFormSuccessSubmit) {
  const SUBMIT_BUTTON_PENDING_STATE_CLASS = 'button--pending';
  const modalName = modalElement.dataset.modal;
  const formElement = modalElement.querySelector('.modal__form');
  const submitButtonElement = formElement.querySelector('.modal-form__submit-button');
  const nameFieldElement = modalElement.querySelector('.modal-form__item--name .text-field__control');
  const surnameFieldElement = modalElement.querySelector('.modal-form__item--surname .text-field__control');
  const patronymicFieldElement = modalElement.querySelector('.modal-form__item--patronymic .text-field__control');
  const phoneFieldElement = modalElement.querySelector('.modal-form__item--phone .text-field__control');
  const emailFieldElement = modalElement.querySelector('.modal-form__item--email .text-field__control');
  const dateFieldElement = modalElement.querySelector('.modal-form__item--date .text-field__control');
  const commentFieldElement = modalElement.querySelector('.modal-form__item--comment .textarea__control');
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
  if (phoneFieldElement) {
    phoneFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    phoneFieldElement.dataset.pristineEmailMessage = 'Введите корректный номер телефона.';
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
  if (commentFieldElement) {
    commentFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
  }
  const actionUrl = formElement.getAttribute('action');
  const pristine = new Pristine(formElement, {
    classTo: 'modal-form__item',
    errorClass: 'invalid',
    errorTextParent: 'modal-form__item',
    errorTextTag: 'p',
    errorTextClass: 'prompt-text'
  });
  function successDefaultCb() {
    showAlert(openModal, alert.success);
  }
  ;
  const successCb = onFormSuccessSubmit ?? successDefaultCb;
  formElement.addEventListener('click', evt => {
    const textFieldClearButtonElement = evt.target.closest('.text-field__clear-button');
    if (textFieldClearButtonElement) {
      const textFieldElement = textFieldClearButtonElement.closest('.text-field');
      const textFieldControlElement = textFieldElement.querySelector('.text-field__control');
      textFieldControlElement.value = '';
      textFieldControlElement.focus();
    }
  });
  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      submitButtonElement.disabled = true;
      submitButtonElement.classList.add(SUBMIT_BUTTON_PENDING_STATE_CLASS);
      sendData(actionUrl, new FormData(evt.target), data => {
        closeModal(modalElement);
        successCb(data);
        formElement.reset();
      }, () => {
        closeModal(modalElement);
        showAlert(openModal, alert.error);
      }, () => {
        submitButtonElement.disabled = false;
        submitButtonElement.classList.remove(SUBMIT_BUTTON_PENDING_STATE_CLASS);
      });
    } else {
      modalElement.classList.remove('modal--error');
      setTimeout(() => modalElement.classList.add('modal--error'), 50);
    }
  });
  document.querySelectorAll(`[data-modal-opener="${modalName}"]`).forEach(openerElement => {
    openerElement.addEventListener('click', evt => {
      evt.preventDefault();
      pristine.reset();
      modalElement.classList.remove('modal--error');
      openModal(modalElement);
      modalElement.querySelector('input').focus();
    });
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * site-header.js
 */
function initSiteHeader(headerElement) {
  const toggleButtonElement = headerElement.querySelector('.site-header__menu-button');
  const navigationElement = headerElement.querySelector('.site-header__navigation');
  const laptopWidthMediaQueryList = window.matchMedia(LAPTOP_WIDTH_MEDIA_QUERY);
  toggleButtonElement.addEventListener('click', () => {
    toggleButtonElement.classList.toggle('site-header__menu-button--close');
    toggleButtonElement.ariaExpanded = toggleButtonElement.ariaExpanded === 'true' ? 'false' : 'true';
    navigationElement.classList.toggle('site-header__navigation--open');
    headerElement.classList.toggle('page__site-header--expand');
    togglePageScroll();
  });
  const groupsElement = navigationElement.querySelector('.site-navigation__panels');
  const backButtonElement = navigationElement.querySelector('.site-navigation__back-button');
  const titleElement = navigationElement.querySelector('.site-navigation__title');
  const closeButtonElement = navigationElement.querySelector('.site-navigation__close-button');
  closeButtonElement.addEventListener('click', evt => {
    evt.preventDefault();
    navigationElement.classList.remove('site-header__navigation--open');
    headerElement.classList.remove('page__site-header--expand');
    toggleButtonElement.classList.remove('site-header__menu-button--animated');
    toggleButtonElement.classList.remove('site-header__menu-button--close');
    toggleButtonElement.ariaExpanded = 'false';
  });
  const firstPanelOpener = navigationElement.querySelector('.site-navigation__top-link--opener');
  let activePanelElement = null;
  let activePanelOpenerElement = null;
  let openedItemElement = null;
  if (!activePanelElement && laptopWidthMediaQueryList.matches) {
    openPanel(firstPanelOpener);
  }
  laptopWidthMediaQueryList.addEventListener('change', () => {
    if (!activePanelElement && laptopWidthMediaQueryList.matches) {
      openPanel(firstPanelOpener);
    }
  });
  navigationElement.addEventListener('click', evt => {
    if (!laptopWidthMediaQueryList.matches) {
      const panelOpenerElement = evt.target.closest('.site-navigation__top-link--opener');
      const bottomMenuOpenerElement = evt.target.closest('.site-navigation__middle-link--opener');
      if (panelOpenerElement) {
        evt.preventDefault();
        openPanel(panelOpenerElement);
      }
      if (bottomMenuOpenerElement) {
        evt.preventDefault();
        if (openedItemElement) {
          closeBottomMenu();
        }
        openBottomMenu(bottomMenuOpenerElement);
      }
    }
  });
  navigationElement.addEventListener('mouseover', evt => {
    if (laptopWidthMediaQueryList.matches) {
      const panelOpenerElement = evt.target.closest('.site-navigation__top-link--opener');
      if (panelOpenerElement) {
        openPanel(panelOpenerElement);
      }
    }
  });
  backButtonElement.addEventListener('click', evt => {
    evt.preventDefault();
    if (openedItemElement) {
      closeBottomMenu();
    } else if (activePanelElement) {
      closePanel();
    }
  });
  function openPanel(panelOpenerElement) {
    const panelElement = groupsElement.querySelector(`#${panelOpenerElement.dataset.panelId}`);
    if (panelElement) {
      if (activePanelElement) {
        closePanel();
      }
      if (openedItemElement) {
        closeBottomMenu();
      }
      titleElement.textContent = panelOpenerElement.textContent;
      panelOpenerElement.classList.add('site-navigation__top-link--active');
      panelElement.classList.add('site-navigation__panel--active');
      navigationElement.classList.add('site-navigation--inside');
      activePanelElement = panelElement;
      activePanelOpenerElement = panelOpenerElement;
    }
  }
  function closePanel() {
    activePanelElement.classList.remove('site-navigation__panel--active');
    activePanelOpenerElement.classList.remove('site-navigation__top-link--active');
    navigationElement.classList.remove('site-navigation--inside');
    activePanelElement = null;
    activePanelOpenerElement = null;
  }
  function openBottomMenu(bottomMenuOpenerElement) {
    if (openedItemElement) {
      closeBottomMenu();
    }
    titleElement.textContent = bottomMenuOpenerElement.textContent;
    openedItemElement = bottomMenuOpenerElement.parentElement;
    const adjacentItemElements = openedItemElement.parentElement.children;
    openedItemElement.classList.add('site-navigation__item--opened');
    for (const itemElement of adjacentItemElements) {
      if (itemElement === openedItemElement) {
        continue;
      }
      itemElement.classList.add('site-navigation__item--hidden');
    }
  }
  function closeBottomMenu() {
    openedItemElement.classList.remove('site-navigation__item--opened');
    const adjacentItemElements = openedItemElement.parentElement.children;
    titleElement.textContent = activePanelOpenerElement?.textContent;
    for (const itemElement of adjacentItemElements) {
      if (itemElement === openedItemElement) {
        continue;
      }
      itemElement.classList.remove('site-navigation__item--hidden');
    }
    openedItemElement = null;
  }

  // Скрытие/отображение шапки при скролле
  let pageScrollY = 0;
  const box = document.querySelector('.page__inner');
  const onBoxScroll = () => {
    const headerHeight = headerElement.offsetHeight;
    if (box.scrollTop > 0) {
      headerElement.classList.add('site-header--sticked');
    }
    if (box.scrollTop > pageScrollY && box.scrollTop > headerHeight) {
      headerElement.classList.add('page__site-header--hidden');
    } else {
      headerElement.classList.remove('page__site-header--hidden');
      if (box.scrollTop === 0) {
        headerElement.classList.remove('site-header--sticked');
      }
    }
    pageScrollY = box.scrollTop;
  };
  box.addEventListener('scroll', throttle(onBoxScroll, 100));
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * static-gallery-modal.js
 */
function initStaticGalleryModal(modalElement, openModal, initGallery, openerElementSelector) {
  const galleryElement = modalElement.querySelector('.modal__gallery');
  let gallerySlider = null;
  if (galleryElement) {
    gallerySlider = initGallery(galleryElement);
  }
  document.querySelectorAll(openerElementSelector).forEach(openerElement => {
    openerElement.addEventListener('click', evt => {
      evt.preventDefault();
      const listItemElement = evt.target.closest('li');
      if (listItemElement && gallerySlider) {
        const listElement = listItemElement.parentElement;
        const listItemNumber = Array.from(listElement.children).indexOf(listItemElement);
        gallerySlider.slideTo(listItemNumber, 0);
      }
      openModal(modalElement);
      if (gallerySlider) {
        setTimeout(() => {
          gallerySlider.update();
        }, 100);
      }
    });
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * subscription-form.js
 */
function initSubscriptionForm(formElement, sendData, openModal, showAlert, onSubscriptionFormSuccessSubmit) {
  const SUBMIT_BUTTON_PENDING_STATE_CLASS = 'button--pending';
  const emailFieldElement = formElement.querySelector('.subscription__form-item .text-field__control');
  const submitButtonElement = formElement.querySelector('.subscription__form-submit-button');
  const actionUrl = formElement.getAttribute('action');
  emailFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
  emailFieldElement.dataset.pristineEmailMessage = 'Введите корректный e-mail адрес.';
  const pristine = new Pristine(formElement, {
    classTo: 'subscription__form-item',
    errorClass: 'invalid',
    errorTextParent: 'subscription__form-item',
    errorTextTag: 'p',
    errorTextClass: 'prompt-text'
  });
  function successDefaultCb() {
    showAlert(openModal, {
      heading: 'Вы подписались'
    });
  }
  ;
  const successCb = onSubscriptionFormSuccessSubmit ?? successDefaultCb;
  formElement.addEventListener('click', evt => {
    const textFieldClearButtonElement = evt.target.closest('.text-field__clear-button');
    if (textFieldClearButtonElement) {
      const textFieldElement = textFieldClearButtonElement.closest('.text-field');
      const textFieldControlElement = textFieldElement.querySelector('.text-field__control');
      textFieldControlElement.value = '';
      textFieldControlElement.focus();
    }
  });
  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      submitButtonElement.disabled = true;
      submitButtonElement.classList.add(SUBMIT_BUTTON_PENDING_STATE_CLASS);
      sendData(actionUrl, new FormData(evt.target), data => {
        formElement.reset();
        successCb(data);
      }, () => {
        showAlert(openModal, {
          status: 'error',
          heading: 'Ошибка',
          text: 'Не удалось подписаться, попробуйте снова.'
        });
      }, () => {
        submitButtonElement.disabled = false;
        submitButtonElement.classList.remove(SUBMIT_BUTTON_PENDING_STATE_CLASS);
      });
    } else {
      formElement.classList.remove('subscription__form--error');
      setTimeout(() => formElement.classList.add('subscription__form--error'), 50);
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * taber.js
 */
function initTaber(taber, idPrefix) {
  const listElement = taber.querySelector('.taber__list');
  const tabElements = Array.from(listElement.querySelectorAll('.taber__tab'));
  const panelElements = taber.querySelectorAll('.taber__panel');
  listElement.setAttribute('role', 'tablist');
  tabElements.forEach((tabElement, index) => {
    tabElement.role = 'tab';
    tabElement.id = `${idPrefix}-tab-${index + 1}`;
    tabElement.tabIndex = -1;
    tabElement.parentNode.role = 'presentation';
  });
  panelElements.forEach((panelElement, index) => {
    panelElement.role = 'tabpanel';
    panelElement.tabIndex = -1;
    panelElement.setAttribute('aria-labelledby', tabElements[index].id);
    panelElement.classList.add('taber__panel--hidden');
  });
  const switchTab = (oldTabElement, newTabElement, isInitialization) => {
    if (oldTabElement) {
      oldTabElement.ariaSelected = null;
      oldTabElement.tabIndex = -1;
      oldTabElement.classList.remove('taber__tab--active');
      const oldIndex = tabElements.indexOf(oldTabElement);
      panelElements[oldIndex].classList.add('taber__panel--hidden');
    }
    if (!isInitialization) {
      newTabElement.focus();
    }
    newTabElement.tabIndex = 0;
    newTabElement.ariaSelected = true;
    newTabElement.classList.add('taber__tab--active');
    const index = tabElements.indexOf(newTabElement);
    panelElements[index].classList.remove('taber__panel--hidden');
  };
  const openStartTab = () => {
    const targetTabHash = window.location.hash;
    const targetTab = tabElements.find(tabElement => tabElement.hash === targetTabHash);
    switchTab(null, targetTab || tabElements[0], true);
  };
  openStartTab();
  listElement.addEventListener('click', evt => {
    evt.preventDefault();
    const tabElement = evt.target.closest('.taber__tab');
    if (!tabElement) {
      return;
    }
    const currentTabElement = listElement.querySelector('[aria-selected]');
    if (tabElement === currentTabElement) {
      return;
    }
    switchTab(currentTabElement, tabElement);
  });
  const desktopWidthMediaQueryList = window.matchMedia(DESKTOP_WIDTH_MEDIA_QUERY);
  listElement.addEventListener('keydown', evt => {
    const index = tabElements.indexOf(evt.target);
    if (taber.classList.contains('taber--vertical') && desktopWidthMediaQueryList.matches) {
      if (!isDownArrowEvent(evt) && !isRightArrowEvent(evt) && !isUpArrowEvent(evt)) {
        return;
      }
      evt.preventDefault();
      if (isRightArrowEvent(evt)) {
        panelElements[index].focus();
      } else {
        const newIndex = isUpArrowEvent(evt) ? index - 1 : index + 1;
        if (!tabElements[newIndex]) {
          return;
        }
        switchTab(evt.target, tabElements[newIndex]);
      }
      return;
    }
    if (!isDownArrowEvent(evt) && !isLeftArrowEvent(evt) && !isRightArrowEvent(evt)) {
      return;
    }
    evt.preventDefault();
    if (isDownArrowEvent(evt)) {
      panelElements[index].focus();
    } else {
      const newIndex = isLeftArrowEvent(evt) ? index - 1 : index + 1;
      if (!tabElements[newIndex]) {
        return;
      }
      switchTab(evt.target, tabElements[newIndex]);
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * tel-field.js
 */
function initTelField(fieldElement) {
  function getInputNumbersValue(input) {
    return input.value.replace(/\D/g, '');
  }
  function onFieldInput(evt) {
    const input = evt.target;
    let fieldNumbersValue = getInputNumbersValue(input);
    let formattedInputValue = '';
    const selectionStart = input.selectionStart;
    if (!fieldNumbersValue) {
      input.value = '';
      return;
    }
    if (input.value.length !== selectionStart) {
      if (evt.data && /\D/g.test(evt.data)) {
        input.value = fieldNumbersValue;
      }
      return;
    }
    if (!['7', '8', '9'].includes(fieldNumbersValue[0])) {
      input.value = `+${fieldNumbersValue}`.substring(0, 16);
      return;
    }
    if (fieldNumbersValue[0] === '9') {
      fieldNumbersValue = `7${fieldNumbersValue}`;
    }
    const firstSymbol = fieldNumbersValue[0] === '8' ? '8' : '+7';
    formattedInputValue = `${firstSymbol} `;
    if (fieldNumbersValue.length > 1) {
      formattedInputValue += `(${fieldNumbersValue.substring(1, 4)}`;
    }
    if (fieldNumbersValue.length >= 5) {
      formattedInputValue += `) ${fieldNumbersValue.substring(4, 7)}`;
    }
    if (fieldNumbersValue.length >= 8) {
      formattedInputValue += `-${fieldNumbersValue.substring(7, 9)}`;
    }
    if (fieldNumbersValue.length >= 10) {
      formattedInputValue += `-${fieldNumbersValue.substring(9, 11)}`;
    }
    input.value = formattedInputValue;
  }
  function onFieldKeydown(evt) {
    const input = evt.target;
    if (evt.code === 'Backspace' && getInputNumbersValue(input).length === 1) {
      input.value = '';
    }
  }
  function onFieldPaste(evt) {
    const pasted = evt.clipboardData || window.clipboardData;
    const input = evt.target;
    const fieldNumbersValue = getInputNumbersValue(input);
    if (pasted) {
      const pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = fieldNumbersValue;
      }
    }
  }
  fieldElement.addEventListener('input', onFieldInput);
  fieldElement.addEventListener('keydown', onFieldKeydown);
  fieldElement.addEventListener('paste', onFieldPaste);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * text-field-with-list.js
 */
function initTextFieldWithList(fieldElement) {
  const controlElement = fieldElement.querySelector('.text-field__control');
  const listElement = fieldElement.querySelector('.text-field__data-list');
  function openDataList() {
    listElement.classList.add('text-field__data-list--open');
    document.addEventListener('click', onDataListClick);
  }
  function closeDataList() {
    listElement.classList.remove('text-field__data-list--open');
    document.removeEventListener('click', onDataListClick);
  }
  function onDataListClick({
    target
  }) {
    if (!target.closest('.text-field')) {
      closeDataList();
    }
  }
  controlElement.addEventListener('click', () => {
    openDataList();
  });
  listElement.addEventListener('click', ({
    target
  }) => {
    const linkElement = target.closest('.text-field__data-link');
    if (!linkElement) {
      return;
    }
    controlElement.value = linkElement.textContent;
    controlElement.dispatchEvent(new Event('input', {
      bubbles: true
    }));
    closeDataList();
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * user-navigation.js
 */
function initUserNavigation(navigtionElement) {
  const toggleButtonElement = document.querySelector('.shortcuts__link--user');
  function onDocumentClickWhenNavigationOpen({
    target
  }) {
    const navigationElement = target.closest('.user-navigation');
    if (!navigationElement && target !== toggleButtonElement) {
      closeNavigation();
    }
  }
  function openNavigation() {
    navigtionElement.classList.add('site-header__user-navigation--open');
    document.addEventListener('click', onDocumentClickWhenNavigationOpen);
  }
  function closeNavigation() {
    navigtionElement.classList.remove('site-header__user-navigation--open');
    document.removeEventListener('click', onDocumentClickWhenNavigationOpen);
  }
  toggleButtonElement.addEventListener('click', evt => {
    if (toggleButtonElement.dataset.modalOpener) {
      return;
    }
    evt.preventDefault();
    if (navigtionElement.classList.contains('site-header__user-navigation--open')) {
      closeNavigation();
    } else {
      openNavigation();
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * video-reviews-slider.js
 */
function initVideoReiewsSlider(reviewsElement) {
  const swiperElement = reviewsElement.querySelector('.swiper');
  const prevButtonElement = reviewsElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = reviewsElement.querySelector('.slider-arrows__button--next');
  new Swiper(swiperElement, {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement
    },
    watchSlidesProgress: true,
    breakpoints: {
      1346: {
        spaceBetween: 30
      },
      1900: {
        spaceBetween: 40
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * video.js
 */
function initVideo(videoElement) {
  const posterElement = videoElement.querySelector('.video__poster');
  const playButtonWrapperElement = videoElement.querySelector('.video__play-button-wrapper');
  const playButtonElement = videoElement.querySelector('.video__play-button');
  const playerElement = videoElement.querySelector('.video__player');
  playButtonElement.addEventListener('click', () => {
    playerElement.play();
    playButtonWrapperElement.classList.add('video__play-button-wrapper--hidden');
    posterElement.classList.add('video__poster--hidden');
  });
  playerElement.addEventListener('ended', () => {
    playButtonWrapperElement.classList.remove('video__play-button-wrapper--hidden');
    posterElement.classList.remove('video__poster--hidden');
  });
  playerElement.addEventListener('play', () => {
    document.querySelectorAll('video').forEach(video => {
      if (video === playerElement) {
        return;
      }
      video.pause();
    });
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * main.js
 */

document.querySelectorAll('.cart').forEach(cartElement => {
  const successCb = typeof onCartFormSuccessSubmit !== 'undefined' ? onCartFormSuccessSubmit : null;
  const errorCb = typeof onCartFormErrorSubmit !== 'undefined' ? onCartFormErrorSubmit : null;
  initCart(cartElement, openModal, showAlert, successCb, errorCb);
});
document.querySelectorAll('.reviews__list').forEach(listElement => {
  initReviewsList(listElement, GalleryModal, initGallery, initVideo, openModal);
});
document.querySelectorAll('.site-header').forEach(initSiteHeader);
document.querySelectorAll('.premium-brands__slider').forEach(initPremiumBrandsSlider);
document.querySelectorAll('.selection__slider').forEach(initSelectionSlider);
document.querySelectorAll('.taber').forEach((taber, index) => {
  initTaber(taber, `taber-${index + 1}`);
});
document.querySelectorAll('.filter__slider').forEach(initFilterSlider);
document.querySelectorAll('.banners').forEach(initBanners);
document.querySelectorAll('.map').forEach(initMap);
document.querySelectorAll('.product-card').forEach(initProductCard);
document.querySelectorAll('.products').forEach(initProducts);
document.querySelectorAll('.articles--with-slider').forEach(initArticlesSlider);
document.querySelectorAll('.navigation-shortcuts').forEach(initNavigationShortcuts);
document.querySelectorAll('.catalog-sorting').forEach(initCatalogSorting);
document.querySelectorAll('.product-images').forEach(initProductImages);
document.querySelectorAll('.product-header__action-buttons').forEach(initProductHeaderStickyActionButtons);
document.querySelectorAll('.folds').forEach(initFolds);
document.querySelectorAll('.text-field--date').forEach(fieldElement => {
  initDateField(fieldElement, setInputDateMask);
});
document.querySelectorAll('.scroll-container').forEach(initScrollContainer);
document.querySelectorAll('.file-field').forEach(initFileField);
document.querySelectorAll('.feed').forEach(initFeed);
document.querySelectorAll('.video-reviews').forEach(initVideoReiewsSlider);
document.querySelectorAll('.video').forEach(initVideo);
document.querySelectorAll('.projects-slider').forEach(initProjectsSlider);
document.querySelectorAll('input[type="tel"]').forEach(initTelField);
document.querySelectorAll('.all-brands').forEach(initAllBrands);
document.querySelectorAll('.profile-form').forEach(formElement => {
  const successCb = typeof onProfileFormSuccessSubmit !== 'undefined' ? onProfileFormSuccessSubmit : null;
  initProfileForm(formElement, sendData, openModal, showAlert, successCb);
});
document.querySelectorAll('.feedback-form').forEach(formElement => {
  const cb = typeof onFeedbackFormSuccessSubmit !== 'undefined' ? onFeedbackFormSuccessSubmit : null;
  initFeedbackForm(formElement, sendData, openModal, showAlert, cb);
});
document.querySelectorAll('.subscription__form').forEach(formElement => {
  const cb = typeof onSubscriptionFormSuccessSubmit !== 'undefined' ? onSubscriptionFormSuccessSubmit : null;
  initSubscriptionForm(formElement, sendData, openModal, showAlert, cb);
});
document.querySelectorAll('[data-modal="cooperation"]').forEach(modalElement => {
  const cb = typeof onCooperationFormSuccessSubmit !== 'undefined' ? onCooperationFormSuccessSubmit : null;
  initCooperationModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, cb);
});
document.querySelectorAll('[data-modal="feedback"]').forEach(modalElement => {
  const cb = typeof onFeedbackFormSuccessSubmit !== 'undefined' ? onFeedbackFormSuccessSubmit : null;
  initFeedbackModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, cb);
});
document.querySelectorAll('[data-modal="salon"]').forEach(modalElement => {
  const cb = typeof onSalonFormSuccessSubmit !== 'undefined' ? onSalonFormSuccessSubmit : null;
  initSalonModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, cb);
});
document.querySelectorAll('[data-modal="installment-request"]').forEach(modalElement => {
  const cb = typeof onInstallmentRequestFormSuccessSubmit !== 'undefined' ? onInstallmentRequestFormSuccessSubmit : null;
  initInstallmentRequestModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, cb);
});
document.querySelectorAll('[data-modal="product-question"]').forEach(modalElement => {
  const cb = typeof onProductQuestionFormSuccessSubmit !== 'undefined' ? onProductQuestionFormSuccessSubmit : null;
  initProductQuestionModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, cb);
});
document.querySelectorAll('[data-modal="one-click"]').forEach(modalElement => {
  const cb = typeof onOneClickFormSuccessSubmit !== 'undefined' ? onOneClickFormSuccessSubmit : null;
  initOneClickModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, cb);
});
document.querySelectorAll('[data-modal="review"]').forEach(modalElement => {
  const cb = typeof onReviewFormSuccessSubmit !== 'undefined' ? onReviewFormSuccessSubmit : null;
  initReviewModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, cb);
});
document.querySelectorAll('[data-modal="catalog-filters"]').forEach(modalElement => {
  initCatalogFiltersModal(modalElement, initScrollContainer, openModal, toggleFoldState);
});
document.querySelectorAll('.modal--with_product-gallery').forEach(modalElement => {
  initStaticGalleryModal(modalElement, openModal, initGallery, '.product__images');
});
document.querySelectorAll('.modal--with_selection-gallery').forEach(modalElement => {
  initStaticGalleryModal(modalElement, openModal, initGallery, '.selection__slider-list');
});
document.querySelectorAll('[data-modal$="-document"]').forEach(modalElement => {
  initDocumentModal(modalElement, openModal);
});
document.querySelectorAll('.project').forEach(projetcElement => {
  initProject(projetcElement, createProductCardTemplate, initProductCard, openModal, showAlert);
});
document.querySelectorAll('[data-modal="search"]').forEach(modalElement => {
  initSearchModal(modalElement, openModal, createProductCardTemplate, initProductCard, createArticlePreviewTemplate);
});
document.querySelectorAll('.user-navigation').forEach(initUserNavigation);
document.querySelectorAll('[data-modal="cities"]').forEach(modalElement => {
  initCitiesModal(modalElement, initScrollContainer, openModal);
});
document.querySelectorAll('.document-actions__button--print').forEach(initButtonPrintPdf);
const signInModalElement = document.querySelector('[data-modal="sign-in"]');
let signInModal;
if (signInModalElement) {
  signInModal = initSignInModal(signInModalElement, openModal, closeModal);
}
const phoneChangeModalElement = document.querySelector('[data-modal="phone-change"]');
let phoneChangeModal;
if (phoneChangeModalElement) {
  phoneChangeModal = initPhoneChangeModal(phoneChangeModalElement, openModal, closeModal);
}

/* * * * * * * * * * * * * * * * * * * * * * * */