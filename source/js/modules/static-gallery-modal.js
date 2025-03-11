/* * * * * * * * * * * * * * * * * * * * * * * *
 * static-gallery-modal.js
 */

function initStaticGalleryModal(modalElement, openModal, initGallery, openerListWrapperElementSelector) {
  const EXCEPTION_ELEMENT_SELECTORS = ['.product-images__slider-item--video'];

  const anchorElementsSelector = `ul li${EXCEPTION_ELEMENT_SELECTORS.map((selector) => `:not(${selector})`).join('')}`;
  const galleryElement = modalElement.querySelector('.modal__gallery');
  let gallerySlider = null;

  if (galleryElement) {
    gallerySlider = initGallery(galleryElement);
  }

  document.querySelectorAll(openerListWrapperElementSelector).forEach((openerElement) => {
    const anchorElements = Array.from(openerElement.querySelectorAll(anchorElementsSelector));

    openerElement.addEventListener('click', (evt) => {
      const listItemElement = evt.target.closest('li');
      const isExceptionElement = EXCEPTION_ELEMENT_SELECTORS.some((selector) => listItemElement.matches(selector));

      if (isExceptionElement) {
        return;
      }

      evt.preventDefault();

      if (listItemElement && gallerySlider) {
        const listItemNumber = anchorElements.indexOf(listItemElement);
        gallerySlider.slideTo(listItemNumber, 0);
      }
      openModal(modalElement);

      if (gallerySlider) {
        setTimeout(() => {
          gallerySlider.update();
        }, 100)
      }
    });
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
