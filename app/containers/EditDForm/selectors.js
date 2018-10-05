/**
 * EditForm selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditForm = state => state.get('editDForm', initialState);

const makeSelectFormData = () =>
  createSelector(selectEditForm, editFormState =>
    editFormState.get('formData').toJS(),
  );

const makeSelectMsgData = () =>
  createSelector(selectEditForm, editFormState =>
    editFormState.get('msgData').toJS(),
  );

const makeSelectCrop = () =>
  createSelector(selectEditForm, editFormState =>
    editFormState.get('crop').toJS(),
  );

const makeSelectMod = () =>
  createSelector(selectEditForm, editFormState => editFormState.get('mod'));

export {
  selectEditForm,
  makeSelectFormData,
  makeSelectMsgData,
  makeSelectCrop,
  makeSelectMod,
};
