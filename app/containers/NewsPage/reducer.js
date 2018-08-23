/*
 * NewsPageReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { LOAD_FEED, LOAD_FEED_SUCCESS, LOAD_FEED_ERROR } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  data: false,
  eid: 0,
});

function feedReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FEED:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false)
        .set('eid', action.eid);
    case LOAD_FEED_SUCCESS:
      return state.set('loading', false).set('data', action.feed);
    case LOAD_FEED_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default feedReducer;
