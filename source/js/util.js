/* * * * * * * * * * * * * * * * * * * * * * * *
 * util.js
 */
function isDownArrowEvent(evt) {
  return evt.code === KeyCode.DOWN_ARROW;
}

function isEscapeEvent(evt) {
  return evt.code === KeyCode.ESCAPE;
}

function isLeftArrowEvent(evt) {
  return evt.code === KeyCode.LEFT_ARROW;
}

function isRightArrowEvent(evt) {
  return evt.code === KeyCode.RIGHT_ARROW;
}

function isSpaceEvent(evt) {
  return evt.code === KeyCode.SPACE;
}

function createElementByString(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

function getPaginationButtonCreator(slideName = 'Слайд') {
  return (index, className) => `
    <button class='${className}' type='button'>
      <span class='visually-hidden'>${slideName} ${index + 1}.</span>
    </button>
  `;
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttle(callback, delay) {
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

function getDigitsFromString(string) {
  return string.replace(/\D/g, '');
}
/* * * * * * * * * * * * * * * * * * * * * * * */
