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
 * @param  {number} page The number of new current page
 *
 * @return {object} An action object with a type of LOAD_FEEDS passing the page number
 */
export function loadFeeds(page) {
  return {
    type: LOAD_FEEDS,
    page,
  };
}

/**
 * Dispatched when feeds data is loaded by the request saga
 *
 * @param  {array} feeds The current feeds
 *
 * @param  {number} count The count of all feeds
 *
 * @param  {number} page The number page from response
 *
 * @return {object} An action object with a type of LOAD_FEEDS_SUCCESS passing feeds data, count of all feeds and number of page
 */
export function feedsLoaded(feeds, count, page) {
  return {
    type: LOAD_FEEDS_SUCCESS,
    feeds,
    count,
    page,
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
