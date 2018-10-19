/**
 * MuseumsEditPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMuseum = state => state.get('museumId', initialState);

const makeSelectLoading = () =>
  createSelector(selectMuseum, museumState => museumState.get('loading'));

const makeSelectError = () =>
  createSelector(selectMuseum, museumState => museumState.get('error'));

const makeSelectData = () =>
  createSelector(selectMuseum, museumState => museumState.get('data'));

const makeSelectEid = () =>
  createSelector(selectMuseum, museumState => museumState.get('eid'));

export {
  selectMuseum,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectEid,
};
