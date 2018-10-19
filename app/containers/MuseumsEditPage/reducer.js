/*
 * MuseumsEditPageReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_MUSEUM,
  LOAD_MUSEUM_SUCCESS,
  LOAD_MUSEUM_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  data: false,
  eid: 0,
});

function museumReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MUSEUM:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false)
        .set('eid', action.eid);
    case LOAD_MUSEUM_SUCCESS:
      return state.set('loading', false).set('data', action.museum);
    case LOAD_MUSEUM_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default museumReducer;
