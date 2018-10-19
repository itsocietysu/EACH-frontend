/*
 * MuseumsEditPage Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_MUSEUM,
  LOAD_MUSEUM_SUCCESS,
  LOAD_MUSEUM_ERROR,
} from './constants';

/**
 * Load museum data, this action starts the request saga
 *
 * @param {number} eid The eid of museum
 *
 * @return {object} An action object with a type of LOAD_MUSEUM passing the eid
 */
export function loadMuseum(eid) {
  return {
    type: LOAD_MUSEUM,
    eid,
  };
}

/**
 * Dispatched when museum data is loaded by the request saga
 *
 * @param  {object} museum The current museum
 *
 * @return {object} An action object with a type of LOAD_MUSEUM_SUCCESS passing the museum data
 */
export function museumLoaded(museum) {
  return {
    type: LOAD_MUSEUM_SUCCESS,
    museum,
  };
}

/**
 * Dispatched when loading museum data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_MUSEUM_ERROR passing the error
 */
export function museumLoadingError(error) {
  return {
    type: LOAD_MUSEUM_ERROR,
    error,
  };
}
