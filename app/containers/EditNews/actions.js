/*
 * EditNews Actions
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
  CHANGE_URL,
  CHANGE_FILE,
  CHANGE_DATA,
  CHANGE_MOD,
  SEND_DATA,
  SEND_DATA_SUCCESS,
  SEND_DATA_ERROR,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {title} title The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_TITLE
 */
export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    title,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {text} text The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_TEXT
 */
export function changeText(text) {
  return {
    type: CHANGE_TEXT,
    text,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {string} image The new text of the img field
 *
 * @return {object}    An action object with a type of CHANGE_URL
 */
export function changeUrl(image) {
  return {
    type: CHANGE_URL,
    image,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {string} file The name of new file
 *
 * @param  {string} image The new text of the img field
 *
 * @return {object}    An action object with a type of CHANGE_FILE
 */
export function changeFile(file, image) {
  return {
    type: CHANGE_FILE,
    file,
    image,
  };
}

/**
 *
 * @param  {object} data The new data of news
 *
 * @return {object}    An action object with a type of CHANGE_DATA
 */
export function changeData(data) {
  return {
    type: CHANGE_DATA,
    data,
  };
}

/**
 *
 * @param  {string} mod The new mod of sending data
 *
 * @return {object}    An action object with a type of CHANGE_MOD
 */
export function changeMod(mod) {
  return {
    type: CHANGE_MOD,
    mod,
  };
}

/**
 * Send data, this action starts the request saga
 *
 * @return {object} An action object with a type of SEND_DATA
 */
export function sendData() {
  return {
    type: SEND_DATA,
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
