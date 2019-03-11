/*
 * Museums Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_MUSEUMS,
  LOAD_MUSEUMS_SUCCESS,
  LOAD_MUSEUMS_ERROR,
} from './constants';

/**
 * Load museums data, this action starts the request saga
 *
 * @param  {number} page The number of new current page
 *
 * @return {object} An action object with a type of LOAD_MUSEUMS passing the page number
 */
export function loadMuseums(page) {
  return {
    type: LOAD_MUSEUMS,
    page,
  };
}

/**
 * Dispatched when museums data is loaded by the request saga
 *
 * @param  {array} museums The current museums
 *
 * @param  {number} count The count of all museums
 *
 * @param  {number} page The number page from response
 *
 * @return {object} An action object with a type of LOAD_MUSEUMS_SUCCESS passing museums data, count of all museums and number of page
 */
export function museumsLoaded(museums, count, page) {
  return {
    type: LOAD_MUSEUMS_SUCCESS,
    museums,
    count,
    page,
  };
}

/**
 * Dispatched when loading museums data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_MUSEUMS_ERROR passing the error
 */
export function museumsLoadingError(error) {
  return {
    type: LOAD_MUSEUMS_ERROR,
    error,
  };
}
