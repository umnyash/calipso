import { isEscapeEvent } from './util.js';

const openedModals = [];

export const openModal = (modal) => {
  modal.classList.add('modal--open');
  openedModals.push(modal);
  document.addEventListener('keydown', onModalEscapeEvent);
  document.addEventListener('click', onModalClick);
};

export const closeModal = (modal) => {
  openedModals.pop();
  document.removeEventListener('keydown', onModalEscapeEvent);
  document.removeEventListener('click', onModalClick);
  modal.classList.remove('modal--open');

  if (modal.classList.contains('modal--alert')) {
    modal.remove();
  }
};

function onModalEscapeEvent(evt) {
  if(!isEscapeEvent(evt)) {
    return;
  }

  evt.preventDefault();
  closeModal(openedModals[openedModals.length - 1]);
}

function onModalClick({ target }) {
  if (!target.classList.contains('modal') && !target.classList.contains('modal__close-button')) {
    return;
  }

  closeModal(openedModals[openedModals.length - 1]);
}
