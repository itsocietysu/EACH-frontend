/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { WRITE_USERNAME, NEW_ERROR, CLEAR_ERROR } from './constants';

/**
 * @return {object} An action object with a type of CLEAR_ERROR
 */
export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}

/**
 * @param  {string} username The current username
 *
 * @return {object} An action object with a type of WRITE_USERNAME passing the login data
 */
export function writeUsername(username) {
  return {
    type: WRITE_USERNAME,
    username,
  };
}

/**
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of NEW_ERROR passing the error
 */
export function newError(error) {
  return {
    type: NEW_ERROR,
    error,
  };
}
