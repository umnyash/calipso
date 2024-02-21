function initProductGalleryModal(modalElement, openModal, initProductGallery) {
  const productGalleryElement = modalElement.querySelector('.modal__product-gallery');

  if (productGalleryElement) {
    initProductGallery(productGalleryElement);
  }

  document.querySelectorAll('[data-modal-opener="product-gallery"]').forEach((opener) => {
    opener.addEventListener('click', (evt) => {
      evt.preventDefault();
      openModal(modalElement);
    });
  });
}

export { initProductGalleryModal };
