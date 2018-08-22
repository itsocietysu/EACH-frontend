/* eslint-disable import/first */
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_MUSEUMS } from './constants';
import { museumsLoaded, museumsLoadingError } from './actions';

import requestAuth from 'utils/requestAuth';

/**
 * Museums data load handler
 */
export function* loadMuseums() {
  const requestURL = `http://each.itsociety.su:4201/each/museum/all`;
  try {
    const museums = yield call(requestAuth, requestURL);
    let data = false;
    if (museums.length) {
      data = museums.map(item => ({
        eid: item.eid,
        name: { RU: item.name, EN: item.name },
        desc: { RU: item.desc, EN: item.desc },
        image: `${
          item.image[0] ? `http://${item.image[0].url}` : '/Photo.png'
        }`,
      }));
    }
    yield put(museumsLoaded(data));
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
