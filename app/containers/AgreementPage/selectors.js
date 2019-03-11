/**
 * AgreementPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAgreement = state => state.get('agreementPage', initialState);

const makeSelectLoading = () =>
  createSelector(selectAgreement, agreementState =>
    agreementState.get('loading'),
  );

const makeSelectError = () =>
  createSelector(selectAgreement, agreementState =>
    agreementState.get('error'),
  );

const makeSelectData = () =>
  createSelector(selectAgreement, agreementState => agreementState.get('data'));

export { selectAgreement, makeSelectLoading, makeSelectError, makeSelectData };
