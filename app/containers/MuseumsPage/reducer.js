/* eslint-disable prettier/prettier */
/*
 * MuseumsReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_MUSEUMS,
  LOAD_MUSEUMS_SUCCESS,
  LOAD_MUSEUMS_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  data: false,
  page: 1,
  count: 0,
});

function museumsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MUSEUMS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false)
        .set('page', action.page);
    case LOAD_MUSEUMS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', action.museums)
        .set('count', action.count)
        .set('page', action.page);
    case LOAD_MUSEUMS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default museumsReducer;
