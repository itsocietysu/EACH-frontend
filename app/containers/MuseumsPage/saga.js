/* eslint-disable import/first */
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_MUSEUMS } from './constants';
import { museumsLoaded, museumsLoadingError } from './actions';

import request from 'utils/request';

/**
 * Museums data load handler
 */
export function* loadMuseums() {
  const requestURL = `http://each.itsociety.su:4200/each/all`;
  try {
    const museums = yield call(request, requestURL);
    yield put(museumsLoaded(museums.museum));
  } catch (err) {
    yield put(museumsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadMuseumsData() {
  yield takeLatest(LOAD_MUSEUMS, loadMuseums);
}
