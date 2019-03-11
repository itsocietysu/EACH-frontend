/*
 * NewsPage Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { LOAD_FEED, LOAD_FEED_SUCCESS, LOAD_FEED_ERROR } from './constants';

/**
 * Load feed data, this action starts the request saga
 *
 * @param {number} eid The eid of feed
 *
 * @return {object} An action object with a type of LOAD_FEED passing the eid
 */
export function loadFeed(eid) {
  return {
    type: LOAD_FEED,
    eid,
  };
}

/**
 * Dispatched when feed data is loaded by the request saga
 *
 * @param  {object} feed The current feed
 *
 * @return {object} An action object with a type of LOAD_FEED_SUCCESS passing the feed data
 */
export function feedLoaded(feed) {
  return {
    type: LOAD_FEED_SUCCESS,
    feed,
  };
}

/**
 * Dispatched when loading feed data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_FEED_ERROR passing the error
 */
export function feedLoadingError(error) {
  return {
    type: LOAD_FEED_ERROR,
    error,
  };
}
