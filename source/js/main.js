import { initSiteHeader } from './site-header.js';
import { initPremiumBrandsSlider } from './premium-brands-slider.js';
import { initSelectionSlider } from './selection-slider.js';
import { initTaber } from './taber.js';
import { initFilterSlider } from './filter.js';
import { initBanners } from './banners.js';
import { initMap } from './map.js';
import { initProductCard } from './product-card.js';
import { initProducts } from './products.js';
import { initNavigationShortcuts } from './navigation-shortcuts.js';
import { initCatalogSorting } from './catalog-sorting.js';
import { initProductImages } from './product-images.js';
import { initGallery } from './gallery.js';
import { initStaticGalleryModal } from './static-gallery-modal.js';
import { openModal, closeModal } from './modal.js';
import { initProductHeaderStickyFormButtons } from './product-header-sticky-form-buttons.js';
import { initStickyCartInfo } from './sticky-cart-info.js';
import { initFolds, toggleFoldState } from './folds.js';
import { setInputDateMask } from './input-date-mask.js';
import { initDateField } from './date-field.js';
import { initScrollContainer } from './scroll-container.js';
import { initCatalogFiltersModal } from './catalog-filters-modal.js';
import { initReviewsList } from './reviews-list.js';
import { initFileField } from './file-field.js';
import { initFeed } from './feed.js';
import { initVideoReiewsSlider } from './video-reviews-slider.js';
import { initVideo } from './video.js';
import { initProjectsSlider } from './projects-slider.js';
import { initTelField } from './tel-field.js';
import { initAllBrands } from './all-brand.js';
import { initTextFieldWithList } from './text-field-with-list.js';
import { initProfileForm } from './profile-form.js';
import { sendData, getData } from './api.js';
import { showAlert } from './alert.js';
import { initSimpleModalForm } from './simple-modal-form.js';
import { initCooperationModal } from './cooperation-modal.js';
import { initFeedbackModal } from './feedback-modal.js';
import { initSalonModal } from './salon-modal.js';
import { initOneClickModal } from './one-click-modal.js';
import { initInstallmentRequestModal } from './installment-request-modal.js';
import { initProductQuestionModal } from './product-question-modal.js';
import { initReviewModal } from './review-modal.js';
import { initSubscriptionForm } from './subscription-form.js';
import { initFeedbackForm } from './feedback-form.js';
import { initCart } from './cart.js';
import { GalleryModal } from './gallery-modal.js';
import { initDocumentModal } from './document-modal.js';
import { initProject } from './project.js';
import { initSearchModal } from './search-modal.js';
import { createProductCardTemplate } from './product-card-tempate.js';
import { createArticlePreviewTemplate } from './article-preview-tempate.js';
import { initPhoneChangeModal } from './phone-change-modal.js';

document.querySelectorAll('.cart').forEach((cartElement) => {
  initCart(cartElement, sendData, openModal, showAlert);
});

document.querySelectorAll('.reviews__list').forEach((listElement) => {
  initReviewsList(listElement, getData, GalleryModal, initGallery, initVideo, openModal, showAlert);
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
document.querySelectorAll('.navigation-shortcuts').forEach(initNavigationShortcuts);
document.querySelectorAll('.catalog-sorting').forEach(initCatalogSorting);
document.querySelectorAll('.product-images').forEach(initProductImages);
document.querySelectorAll('.product-header__form-buttons').forEach(initProductHeaderStickyFormButtons);
document.querySelectorAll('.cart-form__info').forEach(initStickyCartInfo);
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
  initSubscriptionForm(formElement, sendData, openModal, showAlert);
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

document.querySelectorAll('.modal--with_catalog-filters').forEach((modalElement) => {
  initCatalogFiltersModal(modalElement, initScrollContainer, openModal, toggleFoldState);
});

document.querySelectorAll('.modal--with_product-gallery').forEach((modalElement) => {
  initStaticGalleryModal(modalElement, openModal, initGallery, '.product__images');
});

document.querySelectorAll('[data-modal$="-document"]').forEach((modalElement) => {
  initDocumentModal(modalElement, openModal);
});

document.querySelectorAll('.project').forEach((projetcElement) => {
  initProject(projetcElement, getData, createProductCardTemplate, initProductCard, openModal, showAlert);
});

document.querySelectorAll('[data-modal="search"]').forEach((modalElement) => {
  initSearchModal(modalElement, openModal, getData, createProductCardTemplate, initProductCard, createArticlePreviewTemplate);
});

document.querySelectorAll('[data-modal="phone-change"]').forEach((modalElement) => {
  initPhoneChangeModal(modalElement, openModal, closeModal, showAlert);
});
