/*
 * UserPanel Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { CHANGE_SHOW, CHANGE_SHOW_SUCCESS } from './constants';

/**
 * Change show, this action starts the request saga
 *
 * @return {object} An action object with a type of CHANGE_SHOW
 */
export function changeShow() {
  return {
    type: CHANGE_SHOW,
  };
}

/**
 * Dispatched when show is changed by the request saga
 *
 * @param  {bool} show The current show
 *
 * @return {object} An action object with a type of CHANGE_SHOW_SUCCESS passing museums data
 */
export function showChanged(show) {
  return {
    type: CHANGE_SHOW_SUCCESS,
    show,
  };
}
