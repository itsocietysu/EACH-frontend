/*
 * EditFormReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  CHANGE_TEXT,
  CHANGE_IMAGE,
  CHANGE_TEXT_LOCALE,
  CHANGE_NUMBER,
  CHANGE_DATA,
  CHANGE_OPEN_MSG,
  CHANGE_CROP,
} from './constants';

export const initialState = fromJS({
  formData: {},
  mod: 'add',
  crop: {},
  msgData: {
    isOpenMsg: false,
    message: {},
    isCancelMsg: false,
    onSubmit: () => {},
    onClose: () => {},
  },
});

function editFormReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_IMAGE:
      return state.setIn(['formData', action.field], action.image);
    case CHANGE_CROP:
      return state.setIn(['crop', action.field], action.crop);
    case CHANGE_TEXT_LOCALE:
      return state.setIn(
        ['formData', action.field, action.locale],
        action.text,
      );
    case CHANGE_TEXT:
      return state.setIn(['formData', action.field], action.text);
    case CHANGE_NUMBER:
      try {
        switch (action.format) {
          case 'int':
            return state.setIn(
              ['formData', action.field],
              parseInt(action.number, 10).toString(10),
            );
          case 'double':
            return state.setIn(['formData', action.field], action.number);
          default:
            return state;
        }
      } catch (Exception) {
        return state;
      }
    case CHANGE_DATA:
      return state.set('formData', fromJS(action.data));
    case CHANGE_OPEN_MSG:
      return state
        .setIn(['msgData', 'isOpenMsg'], !state.getIn(['msgData', 'isOpenMsg']))
        .setIn(['msgData', 'message'], action.message)
        .setIn(['msgData', 'isCancelMsg'], action.cancel)
        .setIn(['msgData', 'onSubmit'], action.onSubmit)
        .setIn(['msgData', 'onClose'], action.onClose);
    default:
      return state;
  }
}

export default editFormReducer;
