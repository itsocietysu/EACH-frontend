/*
 * EditPage Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SET_CONTENT,
  DELETE_DATA,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_ERROR,
  SEND_DATA,
  SEND_DATA_SUCCESS,
  SEND_DATA_ERROR,
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
} from './constants';

/**
 * Set content of the page, this action dispatched when page is initialized
 *
 * @param  {string} content The content of page
 *
 * @param  {object} reqProps The props for load request
 *
 * @return {object} An action object with a type of SET_CONTENT passing the content and reqProps
 */
export function setContent(content, reqProps) {
  return {
    type: SET_CONTENT,
    content,
    reqProps,
  };
}

/**
 * Delete item, this action starts the request saga
 *
 * @param  {number} eid The eid of item that would to be deleted
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
 * Dispatched when item is deleted by the request saga
 *
 * @return {object} An action object with a type of DELETE_DATA_SUCCESS
 */
export function dataDeleted() {
  return {
    type: DELETE_DATA_SUCCESS,
  };
}

/**
 * Dispatched when deleting item fails
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
 * Send item's data, this action starts the request saga
 *
 * @param  {object} data The data for send
 *
 * @param  {string} mod The mod of sending data
 *
 * @return {object} An action object with a type of SEND_DATA
 */
export function sendData(data, mod) {
  return {
    type: SEND_DATA,
    data,
    mod,
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

/**
 * Load data, this action starts the request saga
 *
 * @param  {number} page The number of new current page
 *
 * @return {object} An action object with a type of LOAD_DATA passing the page number
 */
export function loadData(page) {
  return {
    type: LOAD_DATA,
    page,
  };
}

/**
 * Dispatched when data is loaded by the request saga
 *
 * @param  {array} data The current locations
 *
 * @param  {number} count The count of all items
 *
 * @param  {number} page The number page from response
 *
 * @return {object} An action object with a type of LOAD_DATA_SUCCESS passing data, count of all items and number of page
 */
export function dataLoaded(data, count, page) {
  return {
    type: LOAD_DATA_SUCCESS,
    data,
    count,
    page,
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
