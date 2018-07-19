/**
 * HomePage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectFeeds = state => state.get('feeds', initialState);

const makeSelectLoading = () =>
  createSelector(selectFeeds, feedsState => feedsState.get('loading'));

const makeSelectError = () =>
  createSelector(selectFeeds, feedsState => feedsState.get('error'));

const makeSelectData = () =>
  createSelector(selectFeeds, feedsState => feedsState.get('data'));

export { selectFeeds, makeSelectLoading, makeSelectError, makeSelectData };
