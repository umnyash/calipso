/* * * * * * * * * * * * * * * * * * * * * * * *
 * main.js
 */

document.querySelectorAll('.cart').forEach((cartElement) => {
  const successCb = (typeof onCartFormSuccessSubmit !== 'undefined')
    ? onCartFormSuccessSubmit
    : null;

  const errorCb = (typeof onCartFormErrorSubmit !== 'undefined')
    ? onCartFormErrorSubmit
    : null;

  initCart(cartElement, openModal, showAlert, successCb, errorCb);
});

document.querySelectorAll('.reviews__list').forEach((listElement) => {
  initReviewsList(listElement, GalleryModal, initGallery, initVideo, openModal);
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
document.querySelectorAll('.product-header__action-buttons').forEach(initProductHeaderStickyActionButtons);
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

document.querySelectorAll('.profile-form').forEach((formElement) => {
  const successCb = (typeof onProfileFormSuccessSubmit !== 'undefined')
    ? onProfileFormSuccessSubmit
    : null;

  initProfileForm(formElement, sendData, openModal, showAlert, successCb);
});

document.querySelectorAll('.feedback-form').forEach((formElement) => {
  const cb = (typeof onFeedbackFormSuccessSubmit !== 'undefined')
    ? onFeedbackFormSuccessSubmit
    : null;

  initFeedbackForm(formElement, sendData, openModal, showAlert, cb);
});

document.querySelectorAll('.subscription__form').forEach((formElement) => {
  const cb = (typeof onSubscriptionFormSuccessSubmit !== 'undefined')
    ? onSubscriptionFormSuccessSubmit
    : null;

  initSubscriptionForm(formElement, sendData, openModal, showAlert, cb);
});

document.querySelectorAll('[data-modal="cooperation"]').forEach((modalElement) => {
  const cb = (typeof onCooperationFormSuccessSubmit !== 'undefined')
    ? onCooperationFormSuccessSubmit
    : null;

  initCooperationModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, cb);
});

document.querySelectorAll('[data-modal="feedback"]').forEach((modalElement) => {
  const cb = (typeof onFeedbackFormSuccessSubmit !== 'undefined')
    ? onFeedbackFormSuccessSubmit
    : null;

  initFeedbackModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, cb);
});

document.querySelectorAll('[data-modal="salon"]').forEach((modalElement) => {
  const cb = (typeof onSalonFormSuccessSubmit !== 'undefined')
    ? onSalonFormSuccessSubmit
    : null;

  initSalonModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, cb);
});

document.querySelectorAll('[data-modal="installment-request"]').forEach((modalElement) => {
  const cb = (typeof onInstallmentRequestFormSuccessSubmit !== 'undefined')
    ? onInstallmentRequestFormSuccessSubmit
    : null;

  initInstallmentRequestModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, cb);
});

document.querySelectorAll('[data-modal="product-question"]').forEach((modalElement) => {
  const cb = (typeof onProductQuestionFormSuccessSubmit !== 'undefined')
    ? onProductQuestionFormSuccessSubmit
    : null;

  initProductQuestionModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, cb);
});

document.querySelectorAll('[data-modal="one-click"]').forEach((modalElement) => {
  const cb = (typeof onOneClickFormSuccessSubmit !== 'undefined')
    ? onOneClickFormSuccessSubmit
    : null;

  initOneClickModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, cb);
});

document.querySelectorAll('[data-modal="review"]').forEach((modalElement) => {
  const cb = (typeof onReviewFormSuccessSubmit !== 'undefined')
    ? onReviewFormSuccessSubmit
    : null;

  initReviewModal(modalElement, sendData, openModal, closeModal, showAlert, initSimpleModalForm, cb);
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

document.querySelectorAll('.user-navigation').forEach(initUserNavigation);

document.querySelectorAll('[data-modal="cities"]').forEach((modalElement) => {
  initCitiesModal(modalElement, initScrollContainer, openModal);
});

document.querySelectorAll('.document-actions__button--print').forEach(initButtonPrintPdf);

const signInModalElement = document.querySelector('[data-modal="sign-in"]');
let signInModal;
if (signInModalElement) {
  signInModal = initSignInModal(signInModalElement, openModal, closeModal);
}

const phoneChangeModalElement = document.querySelector('[data-modal="phone-change"]');
let phoneChangeModal;
if (phoneChangeModalElement) {
  phoneChangeModal = initPhoneChangeModal(phoneChangeModalElement, openModal, closeModal);
}

document.querySelectorAll('.search-form--with-submit-button').forEach(initSearchFormWithSubmitButton);

initPopupsClosing();
/* * * * * * * * * * * * * * * * * * * * * * * */
