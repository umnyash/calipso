/* * * * * * * * * * * * * * * * * * * * * * * *
 * all-brands.js
 */
function initAllBrands(allBrandsElement) {
  const searchFormElement = allBrandsElement.querySelector('.all-brands__form');
  const searchFieldElement = searchFormElement.querySelector('.text-field__control');
  const clearButtonElement = searchFormElement.querySelector('.text-field__clear-button');
  const allBrands = {};

  const groupElements = allBrandsElement.querySelectorAll('.all-brands__group');

  groupElements.forEach((groupElement) => {
    const groupTitle = groupElement.querySelector('.all-brands__group-name').textContent;

    allBrands[groupTitle] = {
      group: groupElement,
      links: groupElement.querySelectorAll('.all-brands__link'),
    };
  });

  function filterBrandsList(query) {
    for (const title in allBrands) {
      const brands = allBrands[title];

      let isFind = false;

      brands.links.forEach((linkElement) => {
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

  function onSearchFieldInput({ target }) {
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
