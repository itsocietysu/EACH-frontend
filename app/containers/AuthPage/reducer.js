/*
 * AuthPageReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { GET_TOKEN, GET_TOKEN_SUCCESS } from './constants';

export const initialState = fromJS({
  loading: false,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOKEN:
      return state.set('loading', true);
    case GET_TOKEN_SUCCESS:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default authReducer;
