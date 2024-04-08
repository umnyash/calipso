/* * * * * * * * * * * * * * * * * * * * * * * *
 * user-navigation.js
 */
function initUserNavigation(navigtionElement) {
  const toggleButtonElement = document.querySelector('.shortcuts__link--user');

  function onDocumentClickWhenNavigationOpen({ target }) {
    const navigationElement = target.closest('.user-navigation');

    if (!navigationElement && target !== toggleButtonElement) {
      closeNavigation();
    }
  }

  function openNavigation() {
    navigtionElement.classList.add('site-header__user-navigation--open');
    document.addEventListener('click', onDocumentClickWhenNavigationOpen);
  }

  function closeNavigation() {
    navigtionElement.classList.remove('site-header__user-navigation--open');
    document.removeEventListener('click', onDocumentClickWhenNavigationOpen);
  }

  toggleButtonElement.addEventListener('click', (evt) => {
    if (toggleButtonElement.dataset.modalOpener) {
      return;
    }

    evt.preventDefault();

    if (navigtionElement.classList.contains('site-header__user-navigation--open')) {
      closeNavigation();
    } else {
      openNavigation();
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
