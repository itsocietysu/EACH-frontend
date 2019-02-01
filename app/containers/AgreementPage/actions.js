/*
 * AgreementPage Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_ERROR } from './constants';

/**
 * Load data, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_DATA
 */
export function loadData() {
  return {
    type: LOAD_DATA,
  };
}

/**
 * Dispatched when data is loaded by the request saga
 *
 * @param  {string} data The current agreement
 *
 * @return {object} An action object with a type of LOAD_DATA_SUCCESS passing the data
 */
export function dataLoaded(data) {
  return {
    type: LOAD_DATA_SUCCESS,
    data,
  };
}

/**
 * Dispatched when loading data fails
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
