/*
 * HomePageReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { LOAD_FEEDS, LOAD_FEEDS_SUCCESS, LOAD_FEEDS_ERROR } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  data: false,
  page: 1,
  count: 0,
});

function feedsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FEEDS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false)
        .set('page', action.page);
    case LOAD_FEEDS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', action.feeds)
        .set('count', action.count)
        .set('page', action.page);
    case LOAD_FEEDS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default feedsReducer;
