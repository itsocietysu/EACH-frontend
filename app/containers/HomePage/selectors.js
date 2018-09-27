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

const makeSelectCount = () =>
  createSelector(selectFeeds, feedsState => feedsState.get('count'));

const makeSelectPage = () =>
  createSelector(selectFeeds, feedsState => feedsState.get('page'));

export {
  selectFeeds,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectCount,
  makeSelectPage,
};
