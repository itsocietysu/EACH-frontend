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

const makeSelectMessage = () =>
  createSelector(selectEditNews, editNewsState => editNewsState.get('message'));

const makeSelectOpenMsg = () =>
  createSelector(selectEditNews, editNewsState =>
    editNewsState.get('isOpenMsg'),
  );

export {
  selectEditNews,
  makeSelectImage,
  makeSelectTitle,
  makeSelectText,
  makeSelectNewsData,
  makeSelectMod,
  makeSelectMessage,
  makeSelectOpenMsg,
};
