import { KeyCode } from './const.js';

export const isDownArrowEvent = (evt) => evt.code === KeyCode.DOWN_ARROW;
export const isEscapeEvent = (evt) => evt.code === KeyCode.ESCAPE;
export const isLeftArrowEvent = (evt) => evt.code === KeyCode.LEFT_ARROW;
export const isRightArrowEvent = (evt) => evt.code === KeyCode.RIGHT_ARROW;
export const isSpaceEvent = (evt) => evt.code === KeyCode.SPACE;

export const getPaginationButtonCreator = (slideName = 'Слайд') => (index, className) => `
  <button class='${className}' type='button'>
    <span class='visually-hidden'>${slideName} ${index + 1}.</span>
  </button>
`;

export const throttle = (callback, delay) => {
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
};

export function getDigitsFromString(string) {
  return string.replace(/\D/g, '');
}
