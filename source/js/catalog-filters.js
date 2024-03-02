function initCatalogFilters(filtersElement, initScrollContainer) {
  const scrollContainerElement = filtersElement.querySelector('.catalog-filters__scroll-container');
  const swiper = initScrollContainer(scrollContainerElement);

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
}

export { initCatalogFilters };
