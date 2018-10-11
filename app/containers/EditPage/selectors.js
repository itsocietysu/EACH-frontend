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

export {
  selectEditData,
  makeSelectEid,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPage,
  makeSelectCount,
  makeSelectContent,
};
