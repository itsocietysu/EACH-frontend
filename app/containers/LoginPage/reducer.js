/*
 * LoginReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { CHANGE_USERNAME, CHANGE_PASSWORD } from './constants';

// The initial state of the App
export const initialState = fromJS({
  userData: {
    username: '',
    password: '',
  },
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return state.setIn(['userData', 'username'], action.username);
    case CHANGE_PASSWORD:
      return state.setIn(['userData', 'password'], action.password);
    default:
      return state;
  }
}

export default loginReducer;
