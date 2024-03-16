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
import { initGalleryModal } from './gallery-modal.js';
import { openModal } from './modal.js';
import { initProductHeaderStickyFormButtons } from './product-header-sticky-form-buttons.js';
import { initStickyCartInfo } from './sticky-cart-info.js';
import { initFolds, toggleFoldState } from './folds.js';
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
import { initCartForm } from './cart-form.js';
import { initAllBrands } from './all-brand.js';
import { initTextFieldWithList } from './text-field-with-list.js';

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
document.querySelectorAll('.text-field--date').forEach(initDateField);
document.querySelectorAll('.scroll-container').forEach(initScrollContainer);
document.querySelectorAll('.reviews__list').forEach(initReviewsList);
document.querySelectorAll('.file-field').forEach(initFileField);
document.querySelectorAll('.feed').forEach(initFeed);
document.querySelectorAll('.video-reviews').forEach(initVideoReiewsSlider);
document.querySelectorAll('.video').forEach(initVideo);
document.querySelectorAll('.projects-slider').forEach(initProjectsSlider);
document.querySelectorAll('input[type="tel"]').forEach(initTelField);
document.querySelectorAll('.cart-form').forEach(initCartForm);
document.querySelectorAll('.all-brands').forEach(initAllBrands);
document.querySelectorAll('.text-field--with-list').forEach(initTextFieldWithList);

document.querySelectorAll('.modal--with_catalog-filters').forEach((modalElement) => {
  initCatalogFiltersModal(modalElement, initScrollContainer, openModal, toggleFoldState);
});

document.querySelectorAll('.modal--with_product-gallery').forEach((modalElement) => {
  initGalleryModal(modalElement, openModal, initGallery, '.product__images');
});

document.querySelectorAll('.modal--with_review-gallery').forEach((modalElement) => {
  initGalleryModal(modalElement, openModal, initGallery, '.review__slider .swiper');
});

/// Проверка модалки
const modal = document.querySelector('[data-modal="product-question"]');
const modalOpener = document.querySelector('[data-modal-opener="product-question"]');

if (modal && modalOpener) {
  modalOpener.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.classList.add('modal--open');
  });

  modal.querySelector('.modal__close-button').addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.classList.remove('modal--open');
  });
}
