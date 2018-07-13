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

import { CHECK_LOGIN, CHECK_LOGIN_SUCCESS, CHECK_LOGIN_ERROR } from './constants';

/**
 * Check the login data, this action starts the request saga
 *
 * @return {object} An action object with a type of CHECK_LOGIN
 */
export function checkLogin() {
  return {
    type: CHECK_LOGIN,
  };
}

/**
 * Dispatched when the login data is checked by the request saga
 *
 * @param  {string} username The current username
 *
 * @return {object} An action object with a type of CHECK_LOGIN_SUCCESS passing the login data
 */
export function loginChecked(username) {
  return {
    type: CHECK_LOGIN_SUCCESS,
    username,
  };
}

/**
 * Dispatched when checking login data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of CHECK_LOGIN_ERROR passing the error
 */
export function loginCheckingError(error) {
  return {
    type: CHECK_LOGIN_ERROR,
    error,
  };
}
