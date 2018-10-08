/*
 * EditNewsPage Actions
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
  SEND_DATA,
  SEND_DATA_SUCCESS,
  SEND_DATA_ERROR,
} from './constants';

/**
 * Delete feed data, this action starts the request saga
 *
 * @param  {number} eid The eid of feed that would to be deleted
 *
 * @return {object} An action object with a type of DELETE_DATA passing the eid
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

/**
 * Send news data, this action starts the request saga
 *
 * @return {object} An action object with a type of SEND_DATA
 */
export function sendData() {
  return {
    type: SEND_DATA,
  };
}

/**
 * Dispatched when data is sent by the request saga
 *
 * @return {object} An action object with a type of SEND_DATA_SUCCESS
 */
export function dataSent() {
  return {
    type: SEND_DATA_SUCCESS,
  };
}

/**
 * Dispatched when sending data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of SEND_DATA_ERROR passing the error
 */
export function dataSendingError(error) {
  return {
    type: SEND_DATA_ERROR,
    error,
  };
}
