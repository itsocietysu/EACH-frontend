/**
 * AgreementEditForm selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditAgreement = state =>
  state.get('editAgreementForm', initialState);

const makeSelectError = () =>
  createSelector(selectEditAgreement, editAgreementState =>
    editAgreementState.get('error'),
  );

const makeSelectDataToPost = () =>
  createSelector(selectEditAgreement, editAgreementState =>
    editAgreementState.get('dataToPost').toJS(),
  );

export { selectEditAgreement, makeSelectError, makeSelectDataToPost };
