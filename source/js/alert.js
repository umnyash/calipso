import { createElementByString } from './util.js';

function showAlert(openModal, alert) {
  const modalString = `
    <div class="modal modal--with_alert">
      <div class="modal__inner">
        <button class="modal__close-button" type="button">
          <span class="visually-hidden">Закрыть</span>
        </button>
        <section class="alert modal__alert ${(alert.status === 'error') ? 'alert--error' : ''}">
          <h2 class="alert__heading">${alert.heading}</h2>
          ${alert.text ? `<p class="alert__text">${alert.text}</p>` : ''}
          <button class="button alert__button button--secondary" type="button">${alert.buttonText || 'Закрыть'}</button>
        </section>
      </div>
    </div>
  `;

  const modalElement = createElementByString(modalString);
  document.body.append(modalElement);
  openModal(modalElement);
}

export { showAlert };
