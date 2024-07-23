/* * * * * * * * * * * * * * * * * * * * * * * *
 * catalog-filters-modal.js
 */
class CatalogFiltersModal {
  #inputEvent = new Event('input', { bubbles: true });
  #modalElement = null;
  #initScrollContainer = null;
  #openModal = null;
  #toggleFoldState = null;
  #resetButtonElement = null;

  #filtersElement = null;
  #scrollContainerElement = null;
  #swiper = null;
  #fieldControlElements = null;

  constructor({ modalElement, initScrollContainer, openModal, toggleFoldState }) {
    this.#modalElement = modalElement;
    this.#initScrollContainer = initScrollContainer;
    this.#openModal = openModal;
    this.#toggleFoldState = toggleFoldState;
  }

  #onOpenerClick = (evt) => {
    evt.preventDefault();
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
    }

    setTimeout(() => this.#swiper.update(), 300);
  };

  #onFiltersClick = (evt) => {
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

  #setFoldLabel = (fieldElement) => {
    const foldElement = fieldElement.closest('.catalog-filters__folds-item');

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
        foldValueElement.textContent = optionElements
          .filter((optionElement) => optionElement.querySelector('input').checked)
          .map((optionElement) => optionElement.querySelector('.checker__label, .color__name').textContent)
          .join(', ');
      }
    }
  }

  #setFoldLabels = () => {
    this.#fieldControlElements.forEach(this.#setFoldLabel);
  }

  #onFiltersInput = (evt) => {
    this.#setFoldLabel(evt.target);
  };

  #onResetButtonClick = (evt) => {
    evt.preventDefault();

    this.#fieldControlElements.forEach((fieldElement) => {
      switch (fieldElement.type) {
        case 'number':
        case 'text':
          fieldElement.value = '';
          break;
        case 'checkbox':
        case 'radio':
          fieldElement.checked = false;
          break;
      }
    });

    this.#fieldControlElements.forEach((fieldElement) => {
      fieldElement.dispatchEvent(this.#inputEvent);
    });
  }

  init = () => {
    this.#filtersElement = this.#modalElement.querySelector('.catalog-filters');
    this.#scrollContainerElement = this.#filtersElement.querySelector('.catalog-filters__scroll-container');
    this.#swiper = this.#initScrollContainer(this.#scrollContainerElement);
    this.#fieldControlElements = Array.from(this.#filtersElement.querySelectorAll('input'));
    this.#resetButtonElement = this.#filtersElement.querySelector('.catalog-filters__reset-button');

    this.#setFoldLabels();

    const openerButtonElements = document.querySelectorAll('.catalog__filter-opener-button');
    openerButtonElements.forEach((buttonElement) => {
      buttonElement.addEventListener('click', this.#onOpenerClick);
    });

    this.#filtersElement.addEventListener('click', this.#onFiltersClick);
    this.#resetButtonElement.addEventListener('click', this.#onResetButtonClick);
    this.#filtersElement.addEventListener('input', this.#onFiltersInput);
  };
}

function initCatalogFiltersModal(modalElement, initScrollContainer, openModal, toggleFoldState) {
  const catalogFiltersModal = new CatalogFiltersModal({ modalElement, initScrollContainer, openModal, toggleFoldState });
  catalogFiltersModal.init();
  return catalogFiltersModal;
}
/* * * * * * * * * * * * * * * * * * * * * * * */
