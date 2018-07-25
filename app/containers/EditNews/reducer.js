/* eslint-disable prettier/prettier */
/*
 * EditNewsReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  CHANGE_TITLE,
  CHANGE_TEXT,
  CHANGE_URL,
  CHANGE_FILE,
  CHANGE_DATA,
  CHANGE_MOD,
  SEND_DATA,
  SEND_DATA_SUCCESS,
  SEND_DATA_ERROR,
} from "./constants";

export const initialState = fromJS({
  newsData: {
    eid: '',
    image: '',
    title: '',
    text: '',
  },
  url: '',
  file: '',
  mod: 'add',
  sending: false,
  error: false,
});

function editNewsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_URL:
      return state
        .set('file', '')
        .set('url', action.url)
        .setIn(['newsData', 'image'], action.image);
    case CHANGE_FILE:
      return state
        .set('file', action.file)
        .set('url', '')
        .setIn(['newsData', 'image'], action.image);
    case CHANGE_TITLE:
      return state.setIn(['newsData', 'title'], action.title);
    case CHANGE_TEXT:
      return state.setIn(['newsData', 'text'], action.text);
    case CHANGE_DATA:
      return state
        .setIn(['newsData', 'eid'], action.data.eid)
        .setIn(['newsData', 'image'], action.data.image)
        .setIn(['newsData', 'title'], action.data.title)
        .setIn(['newsData', 'text'], action.data.text)
        .set('url', '')
        .set('file', '');
    case CHANGE_MOD:
      return state.set('mod', action.mod);
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

export default editNewsReducer;
