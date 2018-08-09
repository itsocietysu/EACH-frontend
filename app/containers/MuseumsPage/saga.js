/* eslint-disable import/first */
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_MUSEUMS } from './constants';
import { museumsLoaded, museumsLoadingError } from './actions';

import request from 'utils/request';
import { getSession } from 'cookieManager';

/**
 * Museums data load handler
 */
export function* loadMuseums() {
  const requestURL = `http://each.itsociety.su:4201/each/museum/all`;
  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${getSession()}`,
    },
  };
  try {
    const museums = yield call(request, requestURL, options);
    let data = false;
    if (museums.length) {
      data = museums.map(item => {
        if (item.image[0])
          return {
            eid: item.eid,
            name: item.name,
            desc: item.desc,
            image: `http://${item.image[0].url}`,
          };
        return {
          eid: item.eid,
          name: item.name,
          desc: item.desc,
          image: `/Photo.png`,
        };
      });
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
