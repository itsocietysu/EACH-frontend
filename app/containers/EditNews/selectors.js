/**
 * EditNews selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditNews = state => state.get('editNews', initialState);

const makeSelectImage = () =>
  createSelector(selectEditNews, editNewsState =>
    editNewsState.getIn(['newsData', 'image']),
  );

const makeSelectUrl = () =>
  createSelector(selectEditNews, editNewsState => editNewsState.get('url'));

const makeSelectFile = () =>
  createSelector(selectEditNews, editNewsState => editNewsState.get('file'));

const makeSelectTitle = () =>
  createSelector(selectEditNews, editNewsState =>
    editNewsState.getIn(['newsData', 'title']),
  );

const makeSelectText = () =>
  createSelector(selectEditNews, editNewsState =>
    editNewsState.getIn(['newsData', 'text']),
  );

const makeSelectNewsData = () =>
  createSelector(selectEditNews, editNewsState =>
    editNewsState.get('newsData'),
  );

const makeSelectMod = () =>
  createSelector(selectEditNews, editNewsState => editNewsState.get('mod'));

export {
  selectEditNews,
  makeSelectUrl,
  makeSelectImage,
  makeSelectFile,
  makeSelectTitle,
  makeSelectText,
  makeSelectNewsData,
  makeSelectMod,
};
