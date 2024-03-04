function initGalleryModal(modalElement, openModal, initProductGallery, openerElementSelector) {
  const productGalleryElement = modalElement.querySelector('.modal__gallery');

  if (productGalleryElement) {
    initProductGallery(productGalleryElement);
  }

  document.querySelectorAll(openerElementSelector).forEach((openerElement) => {
    openerElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openModal(modalElement);
    });
  });
}

export { initGalleryModal };
