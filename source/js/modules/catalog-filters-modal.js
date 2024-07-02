/* * * * * * * * * * * * * * * * * * * * * * * *
 * catalog-filters-modal.js
 */
class CatalogFiltersModal {
  #changeEvent = new Event('change', { bubbles: true });
  #inputEvent = new Event('input', { bubbles: true });
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

  constructor({ modalElement, initScrollContainer, openModal, toggleFoldState }) {
    this.#modalElement = modalElement;
    this.#initScrollContainer = initScrollContainer;
    this.#openModal = openModal;
    this.#toggleFoldState = toggleFoldState;
  }

  #createAppliedFilterTemplate = (text, fieldName, fieldValue) =>
    `<li class="catalog__applied-filter">${text}
      <button class="catalog__applied-filter-reset-button" data-field-name="${fieldName}" data-field-value="${fieldValue}">
        <span class="visually-hidden">Удалить фильтр</span>
      </button>
    </li>`;

  #updateAppliedFilters = () => {
    const appliedFiltersTemplates = [];
    const appliedRanges = [];

    this.#fieldControlElements.forEach((controlElement) => {
      const isActive = (controlElement.type === 'checkbox' || controlElement.type === 'radio')
        ? controlElement.checked
        : controlElement.value;

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

    this.#fieldControlElements.forEach((fieldElement) => {
      const value = (fieldElement.type === 'checkbox' || fieldElement.type === 'radio')
        ? fieldElement.checked
        : fieldElement.value;

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

  #onOpenerClick = (evt) => {
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

  #onFiltersSubmit = () => {
    this.#updateState();
    this.#updateAppliedFilters();
  };

  #onFiltersReset = () => {
    this.#filtersElement.action = this.#filtersElement.dataset.url;

    setTimeout(() => {
      this.#fieldControlElements.forEach((fieldElement) => {
        fieldElement.dispatchEvent(this.#changeEvent);
      });
    }, 0);
  };

  #onAppliedFiltersClick = (evt) => {
    const resetButtonElement = evt.target.closest('.catalog__applied-filter-reset-button');

    if (!resetButtonElement) {
      return;
    }

    const appliedFiltersItem = resetButtonElement.parentElement;
    const associatedFieldName = resetButtonElement.dataset.fieldName;
    const associatedFieldControlElements = this.#fieldControlElements
      .filter((fieldControlElement) => fieldControlElement.name === associatedFieldName);

    if (associatedFieldControlElements[0].dataset.rangeLimit) {
      const rangeFoldElement = associatedFieldControlElements[0].closest('.catalog-filters__folds-item--range');

      rangeFoldElement.querySelectorAll('input').forEach((inputElement) => {
        inputElement.value = '';
        inputElement.dispatchEvent(this.#inputEvent);
      });
    } else if (associatedFieldControlElements[0].type === 'checkbox' || associatedFieldControlElements[0].type === 'radio') {
      const associatedFieldValue = resetButtonElement.dataset.fieldValue;

      const associatedFieldControlElement = Array.from(associatedFieldControlElements)
        .find((fieldControlElement) => fieldControlElement.value === associatedFieldValue);

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
    openerButtonElements.forEach((buttonElement) => {
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
  const catalogFiltersModal = new CatalogFiltersModal({ modalElement, initScrollContainer, openModal, toggleFoldState });
  catalogFiltersModal.init();
  return catalogFiltersModal;
}
/* * * * * * * * * * * * * * * * * * * * * * * */
