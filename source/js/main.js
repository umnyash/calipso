/* * * * * * * * * * * * * * * * * * * * * * * *
 * main.js
 */
document.querySelectorAll('.cart').forEach((cartElement) => {
  initCart(cartElement, openModal, showAlert);
});

document.querySelectorAll('.reviews__list').forEach((listElement) => {
  initReviewsList(listElement, GalleryModal, initGallery, initVideo, openModal, showAlert);
});

document.querySelectorAll('.site-header').forEach(initSiteHeader);
document.querySelectorAll('.premium-brands__slider').forEach(initPremiumBrandsSlider);
document.querySelectorAll('.selection__slider').forEach(initSelectionSlider);

document.querySelectorAll('.taber').forEach((taber, index) => {
  initTaber(taber, `taber-${index + 1}`);
});

document.querySelectorAll('.filter__slider').forEach(initFilterSlider);
document.querySelectorAll('.banners').forEach(initBanners);
document.querySelectorAll('.map').forEach(initMap);
document.querySelectorAll('.product-card').forEach(initProductCard);
document.querySelectorAll('.products').forEach(initProducts);
document.querySelectorAll('.articles--with-slider').forEach(initArticlesSlider);
document.querySelectorAll('.navigation-shortcuts').forEach(initNavigationShortcuts);
document.querySelectorAll('.catalog-sorting').forEach(initCatalogSorting);
document.querySelectorAll('.product-images').forEach(initProductImages);
document.querySelectorAll('.product-header__form-buttons').forEach(initProductHeaderStickyFormButtons);
document.querySelectorAll('.folds').forEach(initFolds);
document.querySelectorAll('.text-field--date').forEach((fieldElement) => {
  initDateField(fieldElement, setInputDateMask);
});
document.querySelectorAll('.scroll-container').forEach(initScrollContainer);
document.querySelectorAll('.file-field').forEach(initFileField);
document.querySelectorAll('.feed').forEach(initFeed);
document.querySelectorAll('.video-reviews').forEach(initVideoReiewsSlider);
document.querySelectorAll('.video').forEach(initVideo);
document.querySelectorAll('.projects-slider').forEach(initProjectsSlider);
document.querySelectorAll('input[type="tel"]').forEach(initTelField);
document.querySelectorAll('.all-brands').forEach(initAllBrands);
document.querySelectorAll('.text-field--with-list').forEach(initTextFieldWithList);
document.querySelectorAll('.profile-form').forEach((formElement) => {
  initProfileForm(formElement, sendData, openModal, showAlert);
});
document.querySelectorAll('.feedback-form').forEach((formElement) => {
  initFeedbackForm(formElement, sendData, openModal, showAlert);
});

document.querySelectorAll('.subscription__form').forEach((formElement) => {
  const cb = (typeof onSubscriptionFormSuccessSubmit !== 'undefined')
    ? onSubscriptionFormSuccessSubmit
    : null;

  initSubscriptionForm(formElement, sendData, openModal, showAlert, cb);
});

document.querySelectorAll('[data-modal="cooperation"]').forEach((modalElement) => {
  initCooperationModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm);
});
document.querySelectorAll('[data-modal="feedback"]').forEach((modalElement) => {
  initFeedbackModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm);
});
document.querySelectorAll('[data-modal="salon"]').forEach((modalElement) => {
  initSalonModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm);
});
document.querySelectorAll('[data-modal="installment-request"]').forEach((modalElement) => {
  initInstallmentRequestModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm);
});
document.querySelectorAll('[data-modal="product-question"]').forEach((modalElement) => {
  initProductQuestionModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm);
});
document.querySelectorAll('[data-modal="one-click"]').forEach((modalElement) => {
  initOneClickModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm);
});
document.querySelectorAll('[data-modal="review"]').forEach((modalElement) => {
  initReviewModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm);
});

document.querySelectorAll('[data-modal="catalog-filters"]').forEach((modalElement) => {
  initCatalogFiltersModal(modalElement, initScrollContainer, openModal, toggleFoldState);
});

document.querySelectorAll('.modal--with_product-gallery').forEach((modalElement) => {
  initStaticGalleryModal(modalElement, openModal, initGallery, '.product__images');
});

document.querySelectorAll('.modal--with_selection-gallery').forEach((modalElement) => {
  initStaticGalleryModal(modalElement, openModal, initGallery, '.selection__slider-list');
});

document.querySelectorAll('[data-modal$="-document"]').forEach((modalElement) => {
  initDocumentModal(modalElement, openModal);
});

document.querySelectorAll('.project').forEach((projetcElement) => {
  initProject(projetcElement, createProductCardTemplate, initProductCard, openModal, showAlert);
});

document.querySelectorAll('[data-modal="search"]').forEach((modalElement) => {
  initSearchModal(modalElement, openModal, createProductCardTemplate, initProductCard, createArticlePreviewTemplate);
});

document.querySelectorAll('[data-modal="phone-change"]').forEach((modalElement) => {
  initPhoneChangeModal(modalElement, openModal, closeModal, showAlert);
});

document.querySelectorAll('[data-modal="sign-in"]').forEach((modalElement) => {
  initSignInModal(modalElement, openModal, closeModal, showAlert);
});

document.querySelectorAll('.user-navigation').forEach(initUserNavigation);

document.querySelectorAll('[data-modal="cities"]').forEach((modalElement) => {
  initCitiesModal(modalElement, initScrollContainer, openModal);
});
/* * * * * * * * * * * * * * * * * * * * * * * */
