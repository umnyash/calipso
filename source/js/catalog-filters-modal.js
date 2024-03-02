function initCatalogFiltersModal(modalElement, initScrollContainer, openModal, toggleFoldState) {
  const filtersElement = modalElement.querySelector('.catalog-filters');
  const scrollContainerElement = filtersElement.querySelector('.catalog-filters__scroll-container');
  const swiper = initScrollContainer(scrollContainerElement);

  const openerButtonElements = document.querySelectorAll('.catalog__filter-opener-button');

  filtersElement.addEventListener('click', (evt) => {
    const boxToggleButtonElement = evt.target.closest('.catalog-filter__box-toggle-button');
    const foldToggleButtonElement = evt.target.closest('.catalog-filters__folds-button');

    if (boxToggleButtonElement) {
      const boxElement = boxToggleButtonElement.closest('.catalog-filter__box');
      boxElement.classList.toggle('catalog-filter__box--expand');
      setTimeout(() => swiper.updateSlides(), 300);
    } else if (foldToggleButtonElement) {
      setTimeout(() => swiper.updateSlides(), 300);
    }
  });

  openerButtonElements.forEach((buttonElement) => {
    buttonElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openModal(modalElement);
      const targetFoldName = evt.target.dataset.foldName;

      if (targetFoldName) {
        const foldButtonElement = filtersElement.querySelector(`[data-fold-name="${targetFoldName}"]`);
        if(foldButtonElement.ariaExpanded !== 'true') {
          toggleFoldState(foldButtonElement);
        }

        swiper.setTranslate(-foldButtonElement.offsetTop);
        setTimeout(() => swiper.updateSlides(), 300);
      }
    });
  });
}

export { initCatalogFiltersModal };
