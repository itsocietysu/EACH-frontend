/* eslint-disable prettier/prettier */
/*
 * AgreementPageReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  data: false,
  error: false,
});

function agreementReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false);
    case LOAD_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('data', action.data);
    case LOAD_DATA_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default agreementReducer;
