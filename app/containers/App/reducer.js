/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { CHECK_LOGIN_SUCCESS, CHECK_LOGIN, CHECK_LOGIN_ERROR } from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  correctLogin: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_LOGIN:
      return state
        .set('loading', true)
        .set('error', false)
        .set('correctLogin', false)
    case CHECK_LOGIN_SUCCESS:
      return state
        .set('correctLogin', true)
        .set('loading', false)
        .set('currentUser', action.username);
    case CHECK_LOGIN_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
