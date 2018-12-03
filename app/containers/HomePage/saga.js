/* eslint-disable prefer-const */
import { call, select, put, takeLatest } from 'redux-saga/effects';
import { LOAD_DATA } from './constants';
import { dataLoaded, dataLoadingError } from './actions';
import { makeSelectContent } from './selectors';

import request from '../../utils/request';
import { MUSEUM_CFG, urls } from '../EditPage/configs';
import { getDataFromResp } from '../../utils/utils';

/**
 * Home data load handler
 */
export function* loadFeeds() {
  const content = yield select(makeSelectContent());
  const requestURL = urls[content].tape(false, 0, 9);
  try {
    const resp = yield call(request, requestURL);
    let data = getDataFromResp(resp.result, content);
    if (data.length) {
      if (content === MUSEUM_CFG) {
        data = data.map(v => {
          let val = v;
          val.desc.RU = 'Установите приложение';
          val.desc.EN = 'Setup app';
          return val;
        });
      }
      yield put(dataLoaded(data));
    } else yield put(dataLoaded(false));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadHomeData() {
  yield takeLatest(LOAD_DATA, loadFeeds);
}
