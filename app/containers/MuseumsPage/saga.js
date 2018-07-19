/* eslint-disable import/first */
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_MUSEUMS } from './constants';
import { museumsLoaded, museumsLoadingError } from './actions';

import request from 'utils/request';

/**
 * Museums data load handler
 */
export function* loadMuseums() {
  const requestURL = `http://each.itsociety.su:4201/each/all`;
  try {
    const museums = yield call(request, requestURL);
    let data = false;
    if (museums.length) {
      const withImages = [museums.length];
      for (let i = 0; i < museums.length; i += 1)
        withImages[i] = yield call(
          request,
          `http://each.itsociety.su:4201/each/museum/${museums[i].eid}`,
        );
      data = withImages.map(item => ({
        eid: item[0].eid,
        name: item[0].name,
        desc: item[0].desc,
        image: `http://${item[0].image[0].url}`,
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
