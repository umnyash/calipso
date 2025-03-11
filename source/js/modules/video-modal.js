/* * * * * * * * * * * * * * * * * * * * * * * *
 * video-modal.js
 */
function initVideoModal(modalElement) {
  const playerElement = modalElement.querySelector('.video__player');
  const posterElement = modalElement.querySelector('.video__poster');

  document.querySelectorAll('[data-modal-opener="video"').forEach((openerElement) => {
    openerElement.addEventListener('click', (evt) => {
      evt.preventDefault();

      playerElement.src = openerElement.dataset.videoSrc;
      posterElement.src = openerElement.dataset.videoPoster;
      openModal(modalElement);
    });
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
