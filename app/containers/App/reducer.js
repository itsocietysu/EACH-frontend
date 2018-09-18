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
  GET_USER_DATA_SUCCESS,
  NEW_ERROR,
  CLEAR_ERROR,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  userData: {
    name: '',
    accessType: 'user',
  },
  loading: false,
  errors: [],
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERROR:
      return state.set('errors', fromJS([]));
    case GET_USER_DATA_SUCCESS:
      return state
        .setIn(['userData', 'name'], action.data.name)
        .setIn(['userData', 'accessType'], action.data.accessType)
        .set('loading', false);
    case NEW_ERROR:
      return state.set('errors', state.get('errors').concat(action.error));
    default:
      return state;
  }
}

export default appReducer;
