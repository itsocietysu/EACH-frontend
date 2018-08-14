/*
 * AuthPage Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { GET_TOKEN, GET_TOKEN_SUCCESS } from './constants';

/**
 * Get token, this action starts the request saga
 *
 * @return {object} An action object with a type of GET_TOKEN
 */
export function getToken() {
  return {
    type: GET_TOKEN,
  };
}

/**
 * Dispatched when token got by the request saga
 *
 * @return {object} An action object with a type of GET_TOKEN_SUCCESS
 */
export function tokenGot() {
  return {
    type: GET_TOKEN_SUCCESS,
  };
}
