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
 * @return {object} An action object with a type of LOAD_MUSEUMS
 */
export function loadMuseums() {
  return {
    type: LOAD_MUSEUMS,
  };
}

/**
 * Dispatched when museums data is loaded by the request saga
 *
 * @param  {array} museums The current museums
 *
 * @return {object} An action object with a type of LOAD_MUSEUMS_SUCCESS passing museums data
 */
export function museumsLoaded(museums) {
  return {
    type: LOAD_MUSEUMS_SUCCESS,
    museums,
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
