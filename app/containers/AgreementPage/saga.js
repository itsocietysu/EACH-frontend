/* eslint-disable no-param-reassign,guard-for-in,no-restricted-syntax */
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_DATA } from './constants';
import { dataLoaded, dataLoadingError } from './actions';

import { AGREEMENT_CFG, urls } from '../../utils/constants';

import request from '../../utils/request';

/**
 * Data load handler
 */
export function* loadData() {
  const requestURL = urls[AGREEMENT_CFG].get;
  try {
    const resp = yield call(request, requestURL);
    yield put(dataLoaded(resp));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* editData() {
  yield takeLatest(LOAD_DATA, loadData);
}
