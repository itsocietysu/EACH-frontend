/**
 * EditNewsPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDeleteNews = state => state.get('deleteNewsData', initialState);

const makeSelectEid = () =>
  createSelector(selectDeleteNews, editNewsState => editNewsState.get('eid'));

export { selectDeleteNews, makeSelectEid };
