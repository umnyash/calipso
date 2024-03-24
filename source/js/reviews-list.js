import { throttle } from './util.js';

const mockReviewGalleryData = [
  {
    type: 'video',
    src: 'files/video.mp4',
    posterSrc: 'img/reviews/review-1.webp',
  },
  {
    type: 'image',
    src: 'img/reviews/review-1.webp',
  },
  {
    type: 'image',
    src: 'img/reviews/review-2.webp',
  },
  {
    type: 'image',
    src: 'img/reviews/review-3.webp',
  },
  {
    type: 'image',
    src: 'img/reviews/review-1.webp',
  },
  {
    type: 'image',
    src: 'img/reviews/review-2.webp',
  },
  {
    type: 'image',
    src: 'img/reviews/review-3.webp',
  },
];

class ReviewsList {
  #listElement = null;
  #getData = null;
  #galleryModal = null;
  #initGallery = null;
  #initVideo = null;
  #openModal = null;
  #showAlert = null;
  #reviewTextWrapperElements = null;

  constructor({ listElement, getData, galleryModal, initGallery, initVideo, openModal, showAlert }) {
    this.#listElement = listElement;
    this.#getData = getData;
    this.#galleryModal = galleryModal;
    this.#initGallery = initGallery;
    this.#initVideo = initVideo;
    this.#openModal = openModal;
    this.#showAlert = showAlert;
  }

  updateReviewsTextWrappersList = () => {
    this.#reviewTextWrapperElements = this.#listElement.querySelectorAll('.review__text-wrapper');
  };

  #setReviewsTextWrappersMode = () => {
    this.#reviewTextWrapperElements.forEach((textWrapperElement) => {
      const isClipped = textWrapperElement.classList.contains('review__text-wrapper--clipped');
      textWrapperElement.classList.add('review__text-wrapper--clipped');
      const textElement = textWrapperElement.querySelector('.review__text');

      if (textElement.scrollHeight > textElement.offsetHeight) {
        textWrapperElement.classList.add('review__text-wrapper--clippable');
      } else {
        textWrapperElement.classList.remove('review__text-wrapper--clippable');
      }

      if (!isClipped) {
        textWrapperElement.classList.remove('review__text-wrapper--clipped');
      }
    });
  };

  #onWindowResize = () => {
    const throttledFunction = throttle(this.#setReviewsTextWrappersMode, 500);
    throttledFunction();
  };

  #onListClick = (evt) => {
    const toggleButtonElement = evt.target.closest('.review__toggle-button');
    const feedSliderItemElement = evt.target.closest('.feed__slider-item');

    if (toggleButtonElement) {
      const textWrapperElement = toggleButtonElement.closest('.review__text-wrapper');
      textWrapperElement.classList.toggle('review__text-wrapper--clipped');
    }

    if (feedSliderItemElement) {
      const feedSliderListElement = feedSliderItemElement.parentElement;
      feedSliderListElement.classList.add('no-click');
      const feedSliderItemElementNumber = Array.from(feedSliderListElement.children).indexOf(feedSliderItemElement);

      // Теоретически id отзыва может быть записан в дата-атрибуте.
      // При клике можно определять на какой именно отзыв кликнули и получить его id.
      // Затем использовать этот Id для запроса фотографий и видео.

      // const review = feedSliderItemElement.closest('.review');
      // const reviewId = review.dataset.id;
      const actionUrl = 'https://echo.htmlacademy.ru'; // `https://echo.htmlacademy.ru/reviews/reviewId`

      this.#getData(
        actionUrl,
        (data) => {
          const galleryModal = new this.#galleryModal({
            content: data || mockReviewGalleryData,
            openModal: this.#openModal,
            initGallery: this.#initGallery,
            initVideo: this.#initVideo,
          });
          galleryModal.open(feedSliderItemElementNumber);
        },
        () => {
          this.#showAlert(this.#openModal, {
            status: 'error',
            heading: 'Ошибка',
            text: 'Не удалось загрузить данные, попробуйте снова.'
          });
        },
        () => {
          feedSliderListElement.classList.remove('no-click');
        }
      );
    }
  };

  init = () => {
    this.updateReviewsTextWrappersList();
    this.#setReviewsTextWrappersMode();

    window.addEventListener('resize', this.#onWindowResize);
    this.#listElement.addEventListener('click', this.#onListClick);
  };
}

function initReviewsList(listElement, getData, galleryModal, initGallery, initVideo, openModal, showAlert) {
  const reviewsList = new ReviewsList({ listElement, getData, galleryModal, initGallery, initVideo, openModal, showAlert });
  reviewsList.init();

  return reviewsList;
}

export { initReviewsList };
