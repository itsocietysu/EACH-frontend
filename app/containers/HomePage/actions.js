/*
 * HomePage Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  CHANGE_HOME_CONTENT,
} from './constants';

/**
 * Load content data, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_DATA
 */
export function loadData() {
  return {
    type: LOAD_DATA,
  };
}

/**
 * Dispatched when content data is loaded by the request saga
 *
 * @param  {array} data The current data
 *
 * @param  {object} header The current header
 *
 * @return {object} An action object with a type of LOAD_DATA_SUCCESS passing the data and the header
 */
export function dataLoaded(data, header) {
  return {
    type: LOAD_DATA_SUCCESS,
    data,
    header,
  };
}

/**
 * Dispatched when loading content data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_DATA_ERROR passing the error
 */
export function dataLoadingError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}

/**
 * Dispatched when content data is changed by user
 *
 * @param  {object} content The current content
 *
 * @return {object} An action object with a type of CHANGE_HOME_CONTENT passing the content
 */
export function contentChanged(content) {
  return {
    type: CHANGE_HOME_CONTENT,
    content,
  };
}
