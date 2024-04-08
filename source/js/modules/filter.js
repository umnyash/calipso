/* * * * * * * * * * * * * * * * * * * * * * * *
 * filter.js
 */
function initFilterSlider(sliderElement) {
  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    breakpoints: {
      1346: {
        spaceBetween: 20
      },
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
