/* eslint-disable prettier/prettier */
/*
 * AgreementEditFormReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  SEND_DATA,
  SEND_DATA_SUCCESS,
  SEND_DATA_ERROR,
} from './constants';

export const initialState = fromJS({
  sending: false,
  dataToPost: false,
  error: false,
});

function editAgreementReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_DATA:
      return state
        .set('dataToPost', fromJS(action.data))
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

export default editAgreementReducer;
