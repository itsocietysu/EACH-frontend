/* eslint-disable prettier/prettier */
/*
 * NewsListItemReducer
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
  eid: '0',
  deleting: false,
  error: false,
});

function deleteNewsReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_DATA:
      return state
        .set('eid', action.eid)
        .set('sending', true)
        .set('error', false);
    case DELETE_DATA_SUCCESS:
      return state.set('deleting', true);
    case DELETE_DATA_ERROR:
      return state
        .set('deleting', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default deleteNewsReducer;
