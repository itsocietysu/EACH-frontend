/*
 * EditForm Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_TEXT,
  CHANGE_TEXT_LOCALE,
  CHANGE_IMAGE,
  CHANGE_NUMBER,
  CHANGE_DATA,
  CHANGE_OPEN_MSG,
  CHANGE_CROP,
} from './constants';

/**
 * Changes the textarea field with locale of the form
 *
 * @param  {object} text The new text of the textarea field
 * @param  {string} locale The locale of the textarea field
 * @param  {string} field The name of the textarea field
 *
 * @return {object}    An action object with a type of CHANGE_TEXT_LOCALE passing the text, locale and field
 */
export function changeTextLocale(text, locale, field) {
  return {
    type: CHANGE_TEXT_LOCALE,
    text,
    locale,
    field,
  };
}

/**
 * Changes the textarea field without locale of the form
 *
 * @param  {object} text The new text of the textarea field
 * @param  {string} field The name of the textarea field
 *
 * @return {object}    An action object with a type of CHANGE_TEXT passing the text and field
 */
export function changeText(text, field) {
  return {
    type: CHANGE_TEXT,
    text,
    field,
  };
}

/**
 * Changes the img field of the form
 *
 * @param  {string} image The new base64 of the img field after loading
 * @param  {string} field The name of the img field
 *
 * @return {object}    An action object with a type of CHANGE_IMAGE passing the image and field
 */
export function changeImg(image, field) {
  return {
    type: CHANGE_IMAGE,
    image,
    field,
  };
}

/**
 * Changes the img field of the form
 *
 * @param  {string} crop The new base64 of the img field after cropping
 * @param  {string} field The name of the img field
 *
 * @return {object}    An action object with a type of CHANGE_CROP passing the crop and field
 */
export function changeCrop(crop, field) {
  return {
    type: CHANGE_CROP,
    crop,
    field,
  };
}

/**
 * Changes the input field with number of the form
 *
 * @param  {string} number The new text of the input field
 * @param  {string} field The name of the input field
 * @param  {string} format The format of number
 *
 * @return {object}    An action object with a type of CHANGE_NUMBER passing the number, field and format
 */
export function changeNumber(number, field, format) {
  return {
    type: CHANGE_NUMBER,
    number,
    field,
    format,
  };
}

/**
 * Dispatched when popup modal opens
 *
 * @param  {object} data The new data of form
 * @param  {string} mod The new mod of sending data
 *
 * @return {object}    An action object with a type of CHANGE_DATA passing the data and mod
 */
export function changeData(data, mod) {
  return {
    type: CHANGE_DATA,
    data,
    mod,
  };
}

/**
 * Dispatched when need to open or close message box
 *
 * @param  {object} message The new message
 * @param  {boolean} cancel If message can be cancel
 * @param  {function} onSubmit The function to need to call if submit
 * @param  {function} onClose The function to need to call if close
 *
 * @return {object} An action object with a type of CHANGE_OPEN_MSG passing the message, cancel, onsubmit and onClose
 */
export function changeOpenMsg(message, cancel, onSubmit, onClose) {
  return {
    type: CHANGE_OPEN_MSG,
    message,
    cancel,
    onSubmit,
    onClose,
  };
}
