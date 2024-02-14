import { initSiteHeader } from './site-header.js';
import { initPremiumBrandsSlider } from './premium-brands-slider.js';
import { initSelectionSlider } from './selection-slider.js';
import { initTaber } from './taber.js';
import { initFilterSlider } from './filter.js';

document.querySelectorAll('.site-header').forEach(initSiteHeader);
document.querySelectorAll('.premium-brands__slider').forEach(initPremiumBrandsSlider);
document.querySelectorAll('.selection__slider').forEach(initSelectionSlider);

document.querySelectorAll('.taber').forEach((taber, index) => {
  initTaber(taber, `taber-${index + 1}`);
});

document.querySelectorAll('.filter__slider').forEach(initFilterSlider);
