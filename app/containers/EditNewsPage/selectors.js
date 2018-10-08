/**
 * EditNewsPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditNews = state => state.get('editNewsData', initialState);

const makeSelectEid = () =>
  createSelector(selectEditNews, editNewsState => editNewsState.get('eid'));

export { selectEditNews, makeSelectEid };
