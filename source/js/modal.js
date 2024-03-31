import { isEscapeEvent } from './util.js';

const MODAL_APPEARANCE_TIME = 300;
const MODAL_DISAPPEARANCE_TIME = 100;
const openedModals = [];

export function openModal(modal) {
  modal.classList.add('modal--open');
  modal.classList.add('modal--opening');
  openedModals.push(modal);
  document.addEventListener('keydown', onModalEscapeEvent);
  document.addEventListener('click', onModalClick);

  setTimeout(() => {
    modal.classList.remove('modal--opening');
  }, MODAL_APPEARANCE_TIME);
}

export function closeModal(modal) {
  modal.classList.remove('modal--error');
  modal.classList.add('modal--closing');
  openedModals.pop();


  if (!openedModals.length) {
    document.removeEventListener('keydown', onModalEscapeEvent);
    document.removeEventListener('click', onModalClick);
  }

  setTimeout(() => {
    modal.classList.remove('modal--open');
    modal.classList.remove('modal--closing');

    if (modal.classList.contains('modal--with_alert') || modal.classList.contains('modal--with_review-gallery')) {
      modal.remove();
    }
  }, MODAL_DISAPPEARANCE_TIME);
}

function onModalEscapeEvent(evt) {
  if(!isEscapeEvent(evt)) {
    return;
  }

  evt.preventDefault();
  closeModal(openedModals[openedModals.length - 1]);
}

function onModalClick({ target }) {
  if (!target.classList.contains('modal') && !target.classList.contains('modal__close-button') && !target.classList.contains('alert__button')) {
    return;
  }

  closeModal(openedModals[openedModals.length - 1]);
}
