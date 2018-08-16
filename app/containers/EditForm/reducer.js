/* eslint-disable prettier/prettier */
/*
 * EditFormReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  CHANGE_TITLE,
  CHANGE_TEXT,
  CHANGE_IMAGE,
  CHANGE_PRIORITY,
  CHANGE_DATA,
  CHANGE_OPEN_MSG,
  SEND_FEED_DATA,
  SEND_MUSEUM_DATA,
  SEND_DATA_SUCCESS,
  SEND_DATA_ERROR,
} from "./constants";

export const initialState = fromJS({
  formData: {
    eid: '',
    image: '',
    title: '',
    text: '',
    priority: '',
  },
  mod: 'add',
  sending: false,
  error: false,
  isOpenMsg: false,
  message: {},
});

function editFormReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_IMAGE:
      return state.setIn(['formData', 'image'], action.image);
    case CHANGE_TITLE:
      return state.setIn(['formData', 'title'], action.title);
    case CHANGE_TEXT:
      return state.setIn(['formData', 'text'], action.text);
    case CHANGE_PRIORITY:
      return state.setIn(['formData', 'priority'], action.priority);
    case CHANGE_DATA:
      return state
        .setIn(['formData', 'eid'], action.data.eid)
        .setIn(['formData', 'image'], action.data.image)
        .setIn(['formData', 'title'], action.data.title)
        .setIn(['formData', 'text'], action.data.text)
        .setIn(['formData', 'priority'], action.data.priority)
        .set('mod', action.mod);
    case CHANGE_OPEN_MSG:
      return state
        .set('isOpenMsg', !state.get('isOpenMsg'))
        .set('message', action.message);
    case SEND_FEED_DATA:
      return state
        .set('sending', true)
        .set('error', false);
    case SEND_MUSEUM_DATA:
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

export default editFormReducer;
