/*
 * HomePage Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { LOAD_FEEDS, LOAD_FEEDS_SUCCESS, LOAD_FEEDS_ERROR } from './constants';

/**
 * Load feeds data, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_FEEDS
 */
export function loadFeeds() {
  return {
    type: LOAD_FEEDS,
  };
}

/**
 * Dispatched when feeds data is loaded by the request saga
 *
 * @param  {array} feeds The current feeds
 *
 * @return {object} An action object with a type of LOAD_FEEDS_SUCCESS passing feeds data
 */
export function feedsLoaded(feeds) {
  return {
    type: LOAD_FEEDS_SUCCESS,
    feeds,
  };
}

/**
 * Dispatched when loading feeds data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_FEEDS_ERROR passing the error
 */
export function feedsLoadingError(error) {
  return {
    type: LOAD_FEEDS_ERROR,
    error,
  };
}
