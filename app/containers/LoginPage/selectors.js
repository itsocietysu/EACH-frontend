/**
 * Loginpage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.get('login', initialState);

const makeSelectUsername = () =>
  createSelector(selectLogin, loginState =>
    loginState.getIn(['userData', 'username']),
  );

const makeSelectPassword = () =>
  createSelector(selectLogin, loginState =>
    loginState.getIn(['userData', 'password']),
  );

export { selectLogin, makeSelectUsername, makeSelectPassword };
