import { isEscapeEvent } from './util.js';

const openedModals = [];

export function openModal(modal) {
  modal.classList.add('modal--open');
  openedModals.push(modal);
  document.addEventListener('keydown', onModalEscapeEvent);
  document.addEventListener('click', onModalClick);
}

export function closeModal(modal) {
  openedModals.pop();

  modal.classList.remove('modal--open');

  if (!openedModals.length) {
    document.removeEventListener('keydown', onModalEscapeEvent);
    document.removeEventListener('click', onModalClick);
  }

  if (modal.classList.contains('modal--with_alert')) {
    modal.remove();
  }
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
