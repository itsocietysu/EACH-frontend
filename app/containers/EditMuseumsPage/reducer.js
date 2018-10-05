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
  SEND_DATA,
  SEND_DATA_SUCCESS,
  SEND_DATA_ERROR,
} from './constants';

export const initialState = fromJS({
  eid: 0,
  deleting: false,
  sending: false,
  error: false,
});

function editDataReducer(state = initialState, action) {
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
    case SEND_DATA:
      return state
        .set('sending', true)
        .set('error', false);
    case SEND_DATA_SUCCESS:
      return state.set('sending', false);
    case SEND_DATA_ERROR:
      return state
        .set('sending', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default editDataReducer;
