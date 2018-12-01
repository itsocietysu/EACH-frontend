/**
 * HomePage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectLoading = () =>
  createSelector(selectHome, homeState => homeState.get('loading'));

const makeSelectError = () =>
  createSelector(selectHome, homeState => homeState.get('error'));

const makeSelectData = () =>
  createSelector(selectHome, homeState => homeState.get('data'));

const makeSelectContent = () =>
  createSelector(selectHome, homeState => homeState.get('homeContent'));

export {
  selectHome,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectContent,
};
