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
