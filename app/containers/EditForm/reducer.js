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
  CHANGE_DESC,
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
    title: { RU: '', EN: '' },
    text: { RU: '', EN: '' },
    desc: { RU: '', EN: '' },
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
      return state.setIn(['formData', 'title', `${action.locale}`], action.title);
    case CHANGE_TEXT:
      return state.setIn(['formData', 'text', `${action.locale}`], action.text);
    case CHANGE_DESC:
      return state.setIn(['formData', 'desc', `${action.locale}`], action.desc);
    case CHANGE_PRIORITY:
      return state.setIn(['formData', 'priority'], action.priority);
    case CHANGE_DATA:
      return state
        .setIn(['formData', 'eid'], action.data.eid)
        .setIn(['formData', 'image'], action.data.image)
        .setIn(['formData', 'title'], fromJS(action.data.title))
        .setIn(['formData', 'text'], fromJS(action.data.text))
        .setIn(['formData', 'desc'], fromJS(action.data.desc))
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
