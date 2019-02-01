/*
 * AgreementEditForm Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { SEND_DATA, SEND_DATA_SUCCESS, SEND_DATA_ERROR } from './constants';

/**
 * Send item's data, this action starts the request saga
 *
 * @param  {object} data The data for send
 *
 * @return {object} An action object with a type of SEND_DATA passing the data
 */
export function sendData(data) {
  return {
    type: SEND_DATA,
    data,
  };
}

/**
 * Dispatched when item's data is sent by the request saga
 *
 * @return {object} An action object with a type of SEND_DATA_SUCCESS
 */
export function dataSent() {
  return {
    type: SEND_DATA_SUCCESS,
  };
}

/**
 * Dispatched when sending item's data fails
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
