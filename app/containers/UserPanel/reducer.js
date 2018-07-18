/*
 * UserPanelReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { CHANGE_SHOW, CHANGE_SHOW_SUCCESS } from './constants';

// The initial state of the UserPanel
export const initialState = fromJS({
  changing: false,
  show: false,
});

function userPanelReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SHOW:
      return state.set('changing', false);
    case CHANGE_SHOW_SUCCESS:
      return state.set('changing', true).set('show', action.show);
    default:
      return state;
  }
}

export default userPanelReducer;
