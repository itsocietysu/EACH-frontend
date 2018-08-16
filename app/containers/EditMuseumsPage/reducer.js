/* eslint-disable prettier/prettier */
/*
 * EditMuseumsPageReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  DELETE_DATA,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_ERROR,
} from './constants';

export const initialState = fromJS({
  eid: 0,
  deleting: false,
  error: false,
});

function deleteMuseumReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_DATA:
      return state
        .set('eid', action.eid)
        .set('deleting', true)
        .set('error', false);
    case DELETE_DATA_SUCCESS:
      return state
        .set('deleting', false)
        .set('eid', 0);
    case DELETE_DATA_ERROR:
      return state
        .set('deleting', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default deleteMuseumReducer;
