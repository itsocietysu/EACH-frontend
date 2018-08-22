/**
 * EditForm selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditForm = state => state.get('editForm', initialState);

const makeSelectImage = () =>
  createSelector(selectEditForm, editFormState =>
    editFormState.getIn(['formData', 'image']),
  );

const makeSelectTitle = () =>
  createSelector(selectEditForm, editFormState =>
    editFormState.getIn(['formData', 'title']),
  );

const makeSelectText = () =>
  createSelector(selectEditForm, editFormState =>
    editFormState.getIn(['formData', 'text']),
  );

const makeSelectDesc = () =>
  createSelector(selectEditForm, editFormState =>
    editFormState.getIn(['formData', 'desc']),
  );

const makeSelectPriority = () =>
  createSelector(selectEditForm, editFormState =>
    editFormState.getIn(['formData', 'priority']),
  );

const makeSelectFormData = () =>
  createSelector(selectEditForm, editFormState =>
    editFormState.get('formData'),
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
  makeSelectImage,
  makeSelectTitle,
  makeSelectText,
  makeSelectDesc,
  makeSelectPriority,
  makeSelectFormData,
  makeSelectMod,
  makeSelectMessage,
  makeSelectOpenMsg,
};
