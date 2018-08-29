/**
 * EditForm selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditForm = state => state.get('editForm', initialState);

const makeSelectFormData = () =>
  createSelector(selectEditForm, editFormState =>
    editFormState.get('formData').toJS(),
  );

const makeSelectMod = () =>
  createSelector(selectEditForm, editFormState => editFormState.get('mod'));

const makeSelectMessage = () =>
  createSelector(selectEditForm, editFormState => editFormState.get('message'));

const makeSelectOpenMsg = () =>
  createSelector(selectEditForm, editFormState =>
    editFormState.get('isOpenMsg'),
  );

export {
  selectEditForm,
  makeSelectFormData,
  makeSelectMod,
  makeSelectMessage,
  makeSelectOpenMsg,
};
