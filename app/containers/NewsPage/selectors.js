/**
 * NewsPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectFeed = state => state.get('feedId', initialState);

const makeSelectLoading = () =>
  createSelector(selectFeed, feedState => feedState.get('loading'));

const makeSelectError = () =>
  createSelector(selectFeed, feedState => feedState.get('error'));

const makeSelectData = () =>
  createSelector(selectFeed, feedState => feedState.get('data'));

const makeSelectEid = () =>
  createSelector(selectFeed, feedState => feedState.get('eid'));

export {
  selectFeed,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectEid,
};
