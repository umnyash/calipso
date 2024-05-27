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

  constructor({ modalElement, initScrollContainer, openModal, }) {
    this.#modalElement = modalElement;
    this.#initScrollContainer = initScrollContainer;
    this.#openModal = openModal;
  }

  open = (evt) => {
    evt.preventDefault();

    const popup = evt.target.closest('.popup');

    if (popup) {
      popup.remove();
    }

    this.#openModal(this.#modalElement);
    this.#modalElement.querySelector('input').focus();
  };

  #onFormClick = (evt) => {
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
      childList: true,
    });

    document.querySelectorAll('[data-modal-opener="cities"]').forEach((openerElement) => {
      openerElement.addEventListener('click', this.open);
    });
  }
}

function initCitiesModal(modalElement, initScrollContainer, openModal) {
  const citiesModal = new CitiesModal({ modalElement, initScrollContainer, openModal });
  citiesModal.init();
  return citiesModal;
}
/* * * * * * * * * * * * * * * * * * * * * * * */
