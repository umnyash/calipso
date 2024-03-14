import { KeyCode } from './const.js';

export function isDownArrowEvent(evt) {
  return evt.code === KeyCode.DOWN_ARROW;
}

export function isEscapeEvent(evt) {
  return evt.code === KeyCode.ESCAPE;
}

export function isLeftArrowEvent(evt) {
  return evt.code === KeyCode.LEFT_ARROW;
}

export function isRightArrowEvent(evt) {
  return evt.code === KeyCode.RIGHT_ARROW;
}

export function isSpaceEvent(evt) {
  return evt.code === KeyCode.SPACE;
}

// export const getPaginationButtonCreator = (slideName = 'Слайд') => (index, className) => `
//   <button class='${className}' type='button'>
//     <span class='visually-hidden'>${slideName} ${index + 1}.</span>
//   </button>
// `;

export function getPaginationButtonCreator(slideName = 'Слайд') {
  return (index, className) => `
    <button class='${className}' type='button'>
      <span class='visually-hidden'>${slideName} ${index + 1}.</span>
    </button>
  `;
}

export function throttle(callback, delay) {
  let lastTime = 0;
  let timeoutId;

  return (...rest) => {
    const now = new Date();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), delay);

    if (now - lastTime >= delay) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export function getDigitsFromString(string) {
  return string.replace(/\D/g, '');
}
