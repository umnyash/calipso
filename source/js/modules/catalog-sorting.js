/* * * * * * * * * * * * * * * * * * * * * * * *
 * catalog-sorting.js
 */
function initCatalogSorting(sortingElement) {
  const toggleButtonElement = sortingElement.querySelector('.catalog-sorting__toggle-button');
  const closeeButtonElement = sortingElement.querySelector('.catalog-sorting__close-button');

  toggleButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    sortingElement.classList.toggle('catalog-sorting--open');
  });

  closeeButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    sortingElement.classList.remove('catalog-sorting--open');
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
