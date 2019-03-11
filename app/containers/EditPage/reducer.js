/* eslint-disable prettier/prettier */
/*
 * EditPageReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  SET_CONTENT,
  DELETE_DATA,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_ERROR,
  SEND_DATA,
  SEND_DATA_SUCCESS,
  SEND_DATA_ERROR,
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
} from './constants';

export const initialState = fromJS({
  eid: 0,
  deleting: false,
  sending: false,
  loading: false,
  data: false,
  dataToPost: false,
  postMod: 'add',
  page: 1,
  count: 0,
  error: false,
  content: '',
  reqProps: false,
});

function editDataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTENT:
      return state
        .set('content', action.content)
        .set('data', false)
        .set('reqProps', action.reqProps);
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
        .set('dataToPost', fromJS(action.data))
        .set('postMod', action.mod)
        .set('sending', true)
        .set('error', false);
    case SEND_DATA_SUCCESS:
      return state.set('sending', false);
    case SEND_DATA_ERROR:
      return state
        .set('sending', false)
        .set('error', action.error);
    case LOAD_DATA:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false)
        .set('page', action.page);
    case LOAD_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('data', action.data)
        .set('count', action.count)
        .set('page', action.page);
    case LOAD_DATA_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default editDataReducer;
