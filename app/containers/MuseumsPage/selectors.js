/**
 * MuseumsPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMuseums = state => state.get('museums', initialState);

const makeSelectLoading = () =>
  createSelector(selectMuseums, museumsState => museumsState.get('loading'));

const makeSelectError = () =>
  createSelector(selectMuseums, museumsState => museumsState.get('error'));

const makeSelectData = () =>
  createSelector(selectMuseums, museumsState => museumsState.get('data'));

export { selectMuseums, makeSelectLoading, makeSelectError, makeSelectData };
