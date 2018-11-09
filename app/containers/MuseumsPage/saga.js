import { call, select, put, takeLatest } from 'redux-saga/effects';
import { LOAD_MUSEUMS } from './constants';
import { museumsLoaded, museumsLoadingError } from './actions';

import requestAuth from '../../utils/requestAuth';
import { makeSelectPage } from './selectors';
import { MUSEUM_CFG, urls } from '../EditPage/configs';
import { getDataFromResp } from '../../utils/utils';

/**
 * Museums data load handler
 */
export function* loadMuseums() {
  const page = yield select(makeSelectPage());
  const requestURL = urls.museum.tape(false, (page - 1) * 10, page * 10 - 1);
  try {
    const museums = yield call(requestAuth, requestURL);
    const data = getDataFromResp(museums.result, MUSEUM_CFG);
    yield put(museumsLoaded(data, museums.count, museums.page));
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
