/* * * * * * * * * * * * * * * * * * * * * * * *
 * static-gallery-modal.js
 */
function initStaticGalleryModal(modalElement, openModal, initGallery, openerElementSelector) {
  const galleryElement = modalElement.querySelector('.modal__gallery');

  let gallerySlider = null;

  if (galleryElement) {
    gallerySlider = initGallery(galleryElement);
  }

  document.querySelectorAll(openerElementSelector).forEach((openerElement) => {
    openerElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      const listItemElement = evt.target.closest('li');

      if (listItemElement && gallerySlider) {
        const listElement = listItemElement.parentElement;
        const listItemNumber = Array.from(listElement.children).indexOf(listItemElement);
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
