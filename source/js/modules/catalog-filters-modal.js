/* * * * * * * * * * * * * * * * * * * * * * * *
 * catalog-filters-modal.js
 */
class CatalogFiltersModal {
  #changeEvent = new Event('change', { bubbles: true });
  #modalElement = null;
  #initScrollContainer = null;
  #openModal = null;
  #toggleFoldState = null;

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

  #onFiltersChange = (evt) => {
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
        foldValueElement.textContent = optionElements
          .filter((optionElement) => optionElement.querySelector('input').checked)
          .map((optionElement) => optionElement.querySelector('.checker__label, .color__name').textContent)
          .join(', ');
      }
    }
  };

  #onFiltersReset = () => {
    this.#filtersElement.action = this.#filtersElement.dataset.url;

    setTimeout(() => {
      this.#fieldControlElements.forEach((fieldElement) => {
        fieldElement.dispatchEvent(this.#changeEvent);
      });
    }, 0);
  };

  init = () => {
    this.#filtersElement = this.#modalElement.querySelector('.catalog-filters');
    this.#scrollContainerElement = this.#filtersElement.querySelector('.catalog-filters__scroll-container');
    this.#swiper = this.#initScrollContainer(this.#scrollContainerElement);
    this.#fieldControlElements = Array.from(this.#filtersElement.querySelectorAll('input'));

    const openerButtonElements = document.querySelectorAll('.catalog__filter-opener-button');
    openerButtonElements.forEach((buttonElement) => {
      buttonElement.addEventListener('click', this.#onOpenerClick);
    });

    this.#filtersElement.addEventListener('click', this.#onFiltersClick);
    this.#filtersElement.addEventListener('change', this.#onFiltersChange);
    this.#filtersElement.addEventListener('reset', this.#onFiltersReset);
  };
}

function initCatalogFiltersModal(modalElement, initScrollContainer, openModal, toggleFoldState) {
  const catalogFiltersModal = new CatalogFiltersModal({ modalElement, initScrollContainer, openModal, toggleFoldState });
  catalogFiltersModal.init();
  return catalogFiltersModal;
}
/* * * * * * * * * * * * * * * * * * * * * * * */
