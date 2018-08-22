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
  CHANGE_TITLE,
  CHANGE_TEXT,
  CHANGE_DESC,
  CHANGE_IMAGE,
  CHANGE_PRIORITY,
  CHANGE_DATA,
  CHANGE_OPEN_MSG,
  SEND_FEED_DATA,
  SEND_MUSEUM_DATA,
  SEND_DATA_SUCCESS,
  SEND_DATA_ERROR,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {object} title The new text of the textarea field
 *
 * @param  {string} locale The locale of the textarea field
 *
 * @return {object}    An action object with a type of CHANGE_TITLE passing the title
 */
export function changeTitle(title, locale) {
  return {
    type: CHANGE_TITLE,
    title,
    locale,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {object} text The new text of the textarea field
 *
 * @param  {string} locale The locale of the textarea field
 *
 * @return {object}    An action object with a type of CHANGE_TEXT passing the text
 */
export function changeText(text, locale) {
  return {
    type: CHANGE_TEXT,
    text,
    locale,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {object} desc The new desc of the textarea field
 *
 * @param  {string} locale The locale of the textarea field
 *
 * @return {object}    An action object with a type of CHANGE_DESC passing the desc
 */
export function changeDesc(desc, locale) {
  return {
    type: CHANGE_DESC,
    desc,
    locale,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {string} image The new base64 of the img field
 *
 * @return {object}    An action object with a type of CHANGE_IMAGE passing the image
 */
export function changeImg(image) {
  return {
    type: CHANGE_IMAGE,
    image,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {string} priority The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_PRIORITY passing the priority
 */
export function changePriority(priority) {
  return {
    type: CHANGE_PRIORITY,
    priority,
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
 * Send feed data, this action starts the request saga
 *
 * @return {object} An action object with a type of SEND_FEED_DATA
 */
export function sendFeedData() {
  return {
    type: SEND_FEED_DATA,
  };
}

/**
 * Send museum data, this action starts the request saga
 *
 * @return {object} An action object with a type of SEND_MUSEUM_DATA
 */
export function sendMuseumData() {
  return {
    type: SEND_MUSEUM_DATA,
  };
}

/**
 * Dispatched when data is sent by the request saga
 *
 * @return {object} An action object with a type of SEND_DATA_SUCCESS
 */
export function dataSent() {
  return {
    type: SEND_DATA_SUCCESS,
  };
}

/**
 * Dispatched when sending data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of SEND_DATA_ERROR passing the error
 */
export function dataSendingError(error) {
  return {
    type: SEND_DATA_ERROR,
    error,
  };
}

/**
 * Dispatched when need open or close message box
 *
 * @param  {object} message The new message
 *
 * @return {object} An action object with a type of CHANGE_OPEN_MSG passing the message
 */
export function changeOpenMsg(message) {
  return {
    type: CHANGE_OPEN_MSG,
    message,
  };
}
