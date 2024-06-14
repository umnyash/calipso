/* * * * * * * * * * * * * * * * * * * * * * * *
 * gallery-modal.js
 */
function createGalleryModalTemplate(content) {
  return `
    <div class="modal modal--with_gallery modal--with_review-gallery">
      <div class="modal__inner">
        <button class="modal__close-button" type="button"><span class="visually-hidden">Закрыть</span></button>
        <div class="gallery modal__gallery">
          <div class="gallery__inner">
            <div class="gallery__slider">
              <ul class="slider-arrows gallery__slider-arrows slider-arrows--with-background">
                <li class="slider-arrows__item">
                  <button class="slider-arrows__button slider-arrows__button--prev" type="button"><span class="visually-hidden">Предыдущий</span></button>
                </li>
                <li class="slider-arrows__item">
                  <button class="slider-arrows__button slider-arrows__button--next" type="button"><span class="visually-hidden">Следующий</span></button>
                </li>
              </ul>
              <div class="gallery__slider-wrapper swiper">
                <ul class="gallery__slider-list swiper-wrapper">
                  ${content.map((file) => `
                    <li class="gallery__slider-item swiper-slide">
                      ${file.type === 'video' ? `
                        <div class="video gallery__video">
                          <video class="video__player" src="${file.src}" playsinline controls></video>
                          <img class="video__poster" src="${file.posterSrc}" alt="">
                          <div class="video__play-button-wrapper">
                            <button class="video__play-button"><span class="visually-hidden">Воспроизвести</span></button>
                          </div>
                        </div>
                      ` : `
                        <picture class="gallery__image-wrapper">
                          <img class="gallery__image" src="${file.src}" alt="">
                        </picture>
                      `}
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
            <div class="gallery__thumbnails-slider">
              <ul class="slider-arrows gallery__thumbnails-slider-arrows">
                <li class="slider-arrows__item">
                  <button class="slider-arrows__button slider-arrows__button--prev" type="button"><span class="visually-hidden">Предыдущий</span></button>
                </li>
                <li class="slider-arrows__item">
                  <button class="slider-arrows__button slider-arrows__button--next" type="button"><span class="visually-hidden">Следующий</span></button>
                </li>
              </ul>
              <div class="gallery__thumbnails-slider-wrapper swiper">
                <ul class="gallery__thumbnails-slider-list swiper-wrapper">
                  ${content.map((file) => `
                    <li class="gallery__thumbnails-slider-item swiper-slide">
                      ${file.type === 'video' ? `
                        <div class="gallery__image-wrapper gallery__image-wrapper--video">
                          <img class="gallery__thumbnails-image" src="${file.posterSrc}" alt=""/>
                        </div>
                      ` : `
                        <picture class="gallery__image-wrapper">
                          <img class="gallery__thumbnails-image" src="${file.src}" alt=""/>
                        </picture>
                      `}
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

class GalleryModal {
  #modalElement = null;
  #openModal = null;
  #mainSlider = null;

  constructor({ content, openModal, initGallery, initVideo }) {
    this.#openModal = openModal;
    this.#modalElement = createElementByString(createGalleryModalTemplate(content));
    document.body.append(this.#modalElement);
    this.#mainSlider = initGallery(this.#modalElement.querySelector('.gallery'));
    this.#modalElement.querySelectorAll('.video').forEach(initVideo);
  }

  open = (slideNumber = 0) => {
    this.#mainSlider.slideTo(slideNumber, 0);
    this.#openModal(this.#modalElement);
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * */
