import { call, select, put, takeLatest } from 'redux-saga/effects';
import { LOAD_MUSEUMS } from './constants';
import { museumsLoaded, museumsLoadingError } from './actions';

import requestAuth from '../../utils/requestAuth';
import { makeSelectPage } from './selectors';

/**
 * Museums data load handler
 */
export function* loadMuseums() {
  const page = yield select(makeSelectPage());
  const requestURL = `http://each.itsociety.su:4201/each/museum/tape?FirstMuseum=${(page -
    1) *
    10}&LastMuseum=${page * 10 - 1}`;
  try {
    const museums = yield call(requestAuth, requestURL);
    let data = false;
    if (museums.result.length) {
      data = museums.result.map(item => ({
        eid: item.eid,
        name: { RU: item.name, EN: item.name },
        desc: { RU: item.desc, EN: item.desc },
        image: `${
          item.image[0] ? `http://${item.image[0].url}` : '/Photo.png'
        }`,
      }));
    }
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
