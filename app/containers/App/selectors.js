/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectRoute = state => state.get('route');

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

const selectGlobal = state => state.get('global');

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.get('currentUser'));

const makeSelectErrors = () =>
  createSelector(selectGlobal, globalState => globalState.get('errors'));

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectErrors,
  makeSelectLocation,
};
