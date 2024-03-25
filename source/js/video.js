function initVideo(videoElement) {
  const posterElement = videoElement.querySelector('.video__poster');
  const playButtonWrapperElement = videoElement.querySelector('.video__play-button-wrapper');
  const playButtonElement = videoElement.querySelector('.video__play-button');
  const playerElement = videoElement.querySelector('.video__player');

  playButtonElement.addEventListener('click', () => {
    playerElement.play();
    playButtonWrapperElement.classList.add('video__play-button-wrapper--hidden');
    posterElement.classList.add('video__poster--hidden');
  });

  playerElement.addEventListener('ended', () => {
    playButtonWrapperElement.classList.remove('video__play-button-wrapper--hidden');
    posterElement.classList.remove('video__poster--hidden');
  });

  playerElement.addEventListener('play', () => {
    document.querySelectorAll('video').forEach((video) => {
      if (video === playerElement) {
        return;
      }

      video.pause();
    });
  });
}

export { initVideo };
