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

  constructor({ modalElement, openModal, closeModal }) {
    this.#modalElement = modalElement;
    this.#openModal = openModal;
    this.#closeModal = closeModal;
  }

  setRequestCodeTimeInterval = (seconds) => {
    this.#requestCodeTimeInterval = seconds;
  }

  close = () => {
    this.#closeModal(this.#modalElement);
  };

  open = () => {
    this.#openModal(this.#modalElement);
  };

  resetCodeRequestForm = () => {
    this.#codeRequestFormElement.reset();
  }

  resetCodeSendingForm = () => {
    this.#codeSendingFormElement.reset();
  }

  sendData = async (url, body, onSuccess, onFail, onFinally) => {
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
      errorTextClass: 'prompt-text',
    });

    this.#codeSendingFormPristine = new Pristine(this.#codeSendingFormElement, {
      classTo: 'modal-form__item',
      errorClass: 'invalid',
      errorTextParent: 'modal-form__item',
      errorTextTag: 'p',
      errorTextClass: 'prompt-text',
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

  #onModalClick = (evt) => {
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
  #onCodeRequestFormSubmit = (evt) => {
    evt.preventDefault();

    if (this.#timer > 0) {
      this.goToCodeSendingForm();
    } else {
      const actionUrl = this.#codeRequestFormElement.getAttribute('action');
      const isValid = this.#codeRequestFormPristine.validate();

      if (isValid) {
        this.#codeRequestFormSubmitButton.disabled = true;
        this.#codeRequestFormSubmitButton.classList.add(this.#submitButtonPendingStateClass);

        this.sendData(
          actionUrl,
          new FormData(evt.target),
          this.#onCodeRequestFormSuccessSubmit,
          this.#onCodeRequestFormErrorSubmit,
          () => {
            this.#codeRequestFormSubmitButton.disabled = false;
            this.#codeRequestFormSubmitButton.classList.remove(this.#submitButtonPendingStateClass);
          }
        );
      } else {
        this.#modalElement.classList.remove('modal--error');
        setTimeout(() => this.#modalElement.classList.add('modal--error'), 50);
      }
    }
  };

  // Обработчик нажатия на кнопку отправить повторно
  #onResendCodeButtonClick = (evt) => {
    evt.preventDefault();

    this.#resendCodeButtonElement.disabled = true;
    const actionUrl = this.#codeRequestFormElement.getAttribute('action');

    this.sendData(
      actionUrl,
      new FormData(this.#codeRequestFormElement),
      this.#onCodeReRequestFormSuccessSubmit,
      this.#onCodeReRequestFormErrorSubmit,
      () => {
        this.#resendCodeButtonElement.disabled = false;
      }
    );
  };

  // Обработчик отправки формы подтверждения
  #onCodeSendingFormSubmit = (evt) => {
    evt.preventDefault();

    const actionUrl = this.#codeSendingFormElement.getAttribute('action');
    const isValid = this.#codeSendingFormPristine.validate();

    if (isValid) {
      this.#codeSendingFormSubmitButton.disabled = true;
      this.#codeSendingFormSubmitButton.classList.add(this.#submitButtonPendingStateClass);

      this.sendData(
        actionUrl,
        new FormData(evt.target),
        this.#onCodeSendingFormSuccessSubmit,
        this.#onCodeSendingFormErrorSubmit,
        () => {
          this.#codeSendingFormSubmitButton.disabled = false;
          this.#codeSendingFormSubmitButton.classList.remove(this.#submitButtonPendingStateClass);
        }
      );
    } else {
      this.#modalElement.classList.remove('modal--error');
      setTimeout(() => this.#modalElement.classList.add('modal--error'), 50);
    }
  };

  #onOpenerElementClick = (evt) => {
    evt.preventDefault();
    this.open();
  };

  setCodeRequestSubmitHandlers = (onSuccess, onFail) => {
    this.#onCodeRequestFormSuccessSubmit = onSuccess;
    this.#onCodeRequestFormErrorSubmit = onFail;
  }

  setCodeReRequestSubmitHandlers = (onSuccess, onFail) => {
    this.#onCodeReRequestFormSuccessSubmit = onSuccess;
    this.#onCodeReRequestFormErrorSubmit = onFail;
  }

  setCodeSendingSubmitHandlers = (onSuccess, onFail) => {
    this.#onCodeSendingFormSuccessSubmit = onSuccess;
    this.#onCodeSendingFormErrorSubmit = onFail;
  }

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

    document.querySelectorAll('[data-modal-opener="sign-in"]').forEach((openerElement) => {
      openerElement.addEventListener('click', this.#onOpenerElementClick);
    });
  }
}

function initSignInModal(modalElement, openModal, closeModal) {
  const signInModal = new SignInModal({ modalElement, openModal, closeModal });
  signInModal.init();

  return signInModal;
}
/* * * * * * * * * * * * * * * * * * * * * * * */
