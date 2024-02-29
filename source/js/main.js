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
import { initProductGallery } from './product-gallery.js';
import { initProductGalleryModal } from './product-gallery-modal.js';
import { openModal } from './modal.js';
import { initProductHeaderStickyFormButtons } from './product-header-sticky-form-buttons.js';
import { initStickyCartInfo } from './sticky-cart-info.js';
import { initSelect } from './select.js';
import { initFolds } from './folds.js';
import { initDateFieldCalendar } from './date-field-calendar.js';
import { initCitiesScrollContainer } from './cities-scroll-container.js';

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
document.querySelectorAll('.select').forEach(initSelect);
document.querySelectorAll('.folds').forEach(initFolds);
document.querySelectorAll('.text-field--date .text-field__control-wrapper').forEach(initDateFieldCalendar);
document.querySelectorAll('.cities__scroll-container').forEach(initCitiesScrollContainer);

const productGalleryModalElement = document.querySelector('.modal--with_product-gallery');
if (productGalleryModalElement) {
  initProductGalleryModal(productGalleryModalElement, openModal, initProductGallery);
}

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
