import { KeyCode } from './const.js';

export const isDownArrowEvent = (evt) => evt.code === KeyCode.DOWN_ARROW;
export const isLeftArrowEvent = (evt) => evt.code === KeyCode.LEFT_ARROW;
export const isRightArrowEvent = (evt) => evt.code === KeyCode.RIGHT_ARROW;
