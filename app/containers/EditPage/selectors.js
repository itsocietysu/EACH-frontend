/**
 * EditPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditData = state => state.get('editDataPage', initialState);

const makeSelectEid = () =>
  createSelector(selectEditData, editDataState => editDataState.get('eid'));

const makeSelectLoading = () =>
  createSelector(selectEditData, editDataState => editDataState.get('loading'));

const makeSelectError = () =>
  createSelector(selectEditData, editDataState => editDataState.get('error'));

const makeSelectData = () =>
  createSelector(selectEditData, editDataState => editDataState.get('data'));

const makeSelectCount = () =>
  createSelector(selectEditData, editDataState => editDataState.get('count'));

const makeSelectPage = () =>
  createSelector(selectEditData, editDataState => editDataState.get('page'));

const makeSelectContent = () =>
  createSelector(selectEditData, editDataState => editDataState.get('content'));

const makeSelectRequestProps = () =>
  createSelector(selectEditData, editDataState =>
    editDataState.get('reqProps'),
  );

const makeSelectDataToPost = () =>
  createSelector(selectEditData, editDataState =>
    editDataState.get('dataToPost').toJS(),
  );

const makeSelectPostMod = () =>
  createSelector(selectEditData, editDataState => editDataState.get('postMod'));

export {
  selectEditData,
  makeSelectEid,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPage,
  makeSelectCount,
  makeSelectContent,
  makeSelectRequestProps,
  makeSelectDataToPost,
  makeSelectPostMod,
};
