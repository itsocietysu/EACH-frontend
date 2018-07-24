/*
 * NewsListItem Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  DELETE_DATA,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_ERROR,
} from './constants';

/**
 * Delete data, this action starts the request saga
 *
 * @return {object} An action object with a type of DELETE_DATA
 */
export function deleteData(eid) {
  return {
    type: DELETE_DATA,
    eid,
  };
}

/**
 * Dispatched when data is deleted by the request saga
 *
 * @return {object} An action object with a type of DELETE_DATA_SUCCESS
 */
export function dataDeleted() {
  return {
    type: DELETE_DATA_SUCCESS,
  };
}

/**
 * Dispatched when deleting data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of DELETE_DATA_ERROR passing the error
 */
export function dataDeletingError(error) {
  return {
    type: DELETE_DATA_ERROR,
    error,
  };
}
