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
});

function museumsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MUSEUMS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false);
    case LOAD_MUSEUMS_SUCCESS:
      return state.set('loading', false).set('data', action.data);
    case LOAD_MUSEUMS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default museumsReducer;
