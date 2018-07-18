/* eslint-disable import/first */
import { put, select, takeLatest } from 'redux-saga/effects';
import { CHANGE_SHOW } from './constants';
import { showChanged } from './actions';

import { makeSelectShow } from './selectors';

/**
 * Show change handler
 */
export function* changeShow() {
  const show = yield select(makeSelectShow());
  yield put(showChanged(!show));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* changeShowData() {
  yield takeLatest(CHANGE_SHOW, changeShow);
}
