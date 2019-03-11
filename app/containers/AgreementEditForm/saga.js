/* eslint-disable no-param-reassign,guard-for-in,no-restricted-syntax */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SEND_DATA } from './constants';
import { dataSendingError, dataSent } from './actions';

import requestAuth from '../../utils/requestAuth';

import { makeSelectDataToPost } from './selectors';

import { AGREEMENT_CFG, urls } from '../../utils/constants';

/**
 * Data send handler
 */
export function* sendData() {
  const formData = yield select(makeSelectDataToPost());
  const requestURL = urls[AGREEMENT_CFG].update;
  const body = new FormData();
  body.append('text', formData.user_agreement);
  const method = 'PUT';
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body,
  };
  try {
    yield call(requestAuth, requestURL, options);
    yield put(dataSent());
  } catch (err) {
    yield put(dataSendingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* editAgreement() {
  yield takeLatest(SEND_DATA, sendData);
}
