/* * * * * * * * * * * * * * * * * * * * * * * *
 * reviews-list.js
 */
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
  #galleryModal = null;
  #initGallery = null;
  #initVideo = null;
  #openModal = null;
  #reviewTextWrapperElements = null;

  constructor({ listElement, galleryModal, initGallery, initVideo, openModal }) {
    this.#listElement = listElement;
    this.#galleryModal = galleryModal;
    this.#initGallery = initGallery;
    this.#initVideo = initVideo;
    this.#openModal = openModal;
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

  #onWindowResize = throttle(this.#setReviewsTextWrappersMode, 500);

  #onListClick = (evt) => {
    const toggleButtonElement = evt.target.closest('.review__toggle-button');
    const feedSliderItemElement = evt.target.closest('.feed__slider-item');

    if (toggleButtonElement) {
      const textWrapperElement = toggleButtonElement.closest('.review__text-wrapper');
      textWrapperElement.classList.toggle('review__text-wrapper--clipped');
    }

    if (feedSliderItemElement) {
      evt.preventDefault();
      const feedSliderListElement = feedSliderItemElement.parentElement;
      feedSliderListElement.classList.add('no-click');
      const feedSliderItemElementNumber = Array.from(feedSliderListElement.children).indexOf(feedSliderItemElement);

      const review = feedSliderItemElement.closest('.review');

      const galleryModal = new this.#galleryModal({
        content: reviewsGalleryData[review.dataset.id],
        openModal: this.#openModal,
        initGallery: this.#initGallery,
        initVideo: this.#initVideo,
      });
      galleryModal.open(feedSliderItemElementNumber);
      feedSliderListElement.classList.remove('no-click');
    }
  };

  init = () => {
    this.updateReviewsTextWrappersList();
    this.#setReviewsTextWrappersMode();

    window.addEventListener('resize', this.#onWindowResize);
    this.#listElement.addEventListener('click', this.#onListClick);
  };
}

function initReviewsList(listElement, galleryModal, initGallery, initVideo, openModal) {
  const reviewsList = new ReviewsList({ listElement, galleryModal, initGallery, initVideo, openModal });
  reviewsList.init();

  return reviewsList;
}
/* * * * * * * * * * * * * * * * * * * * * * * */
