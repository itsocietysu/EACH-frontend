/* eslint-disable prettier/prettier */
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

import {
  WRITE_USERNAME,
  NEW_ERROR,
  CLEAR_ERROR,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  currentUser: 'A',
  errors: [],
});

function appReducer(state = initialState, action) {
  const errors = state.get('errors');
  switch (action.type) {
    case CLEAR_ERROR:
      return state.set('errors', []);
    case WRITE_USERNAME:
      return state.set('currentUser', action.username);
    case NEW_ERROR:
      return state.set('errors', errors.concat(action.error));
    default:
      return state;
  }
}

export default appReducer;
