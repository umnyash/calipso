/* * * * * * * * * * * * * * * * * * * * * * * *
 * cities-modal.js
 */
class CitiesModal {
  #modalElement = null;
  #initScrollContainer = null;
  #openModal = null;

  #formElement = null;
  #listWrapperElement = null;
  #popularCitiesListElement = null;
  #foundCitiesListElement = null;
  #scrollContainerElement = null;
  #swiper = null;

  constructor({ modalElement, initScrollContainer, openModal, }) {
    this.#modalElement = modalElement;
    this.#initScrollContainer = initScrollContainer;
    this.#openModal = openModal;
  }

  reset = () => {
    this.#listWrapperElement.innerHTML = '';
    this.#listWrapperElement.append(this.#popularCitiesListElement);
  };

  open = (evt) => {
    evt.preventDefault();

    const popup = evt.target.closest('.popup');

    if (popup) {
      popup.remove();
    }

    this.reset();
    this.#openModal(this.#modalElement);
    this.#modalElement.querySelector('input').focus();
  };

  #onFormClick = (evt) => {
    const textFieldClearButtonElement = evt.target.closest('.text-field__clear-button');

    if (textFieldClearButtonElement) {
      const textFieldElement = textFieldClearButtonElement.closest('.text-field');
      const textFieldControlElement = textFieldElement.querySelector('.text-field__control');
      textFieldControlElement.value = '';
      textFieldControlElement.focus();
    }
  };

  init() {
    this.#formElement = this.#modalElement.querySelector('.cities__form');
    this.#listWrapperElement = this.#modalElement.querySelector('.cities__list-wrapper');
    this.#popularCitiesListElement = this.#modalElement.querySelector('.cities__list--popular');
    this.#foundCitiesListElement = this.#modalElement.querySelector('.cities__list--found');
    this.#scrollContainerElement = this.#modalElement.querySelector('.cities__scroll-container');

    this.#foundCitiesListElement?.remove();
    this.#swiper = this.#initScrollContainer(this.#scrollContainerElement);
    this.#formElement.addEventListener('click', this.#onFormClick);

    const observer = new MutationObserver(() => {
      this.#swiper.update();
    });

    observer.observe(this.#listWrapperElement, {
      subtree: true,
      characterData: true,
      attributes: true,
      childList: true,
    });

    document.querySelectorAll('[data-modal-opener="cities"]').forEach((openerElement) => {
      openerElement.addEventListener('click', this.open);
    });

    // Временный код, чтобы показывать "найденные" города при клике на поле ввода
    this.#formElement.addEventListener('click', (evt) => {
      const textFieldControlElement = evt.target.closest('.text-field__control');

      if (textFieldControlElement) {
        this.#listWrapperElement.innerHTML = '';
        this.#listWrapperElement.append(this.#foundCitiesListElement);
      }
    });
    //////////////////////////////////////////////////////////////////////////////
  }
}

function initCitiesModal(modalElement, initScrollContainer, openModal) {
  const citiesModal = new CitiesModal({ modalElement, initScrollContainer, openModal });
  citiesModal.init();
  return citiesModal;
}
/* * * * * * * * * * * * * * * * * * * * * * * */
