/* eslint-disable prefer-const */
import { call, select, put, takeLatest } from 'redux-saga/effects';
import { LOAD_DATA } from './constants';
import { dataLoaded, dataLoadingError } from './actions';
import { makeSelectContent, makeSelectHeader } from './selectors';

import request from '../../utils/request';
import { FEED_CFG, MUSEUM_CFG, urls } from '../EditPage/configs';
import { getDataFromResp } from '../../utils/utils';

/**
 * Home data load handler
 */
export function* loadFeeds() {
  const content = yield select(makeSelectContent());
  let header = yield select(makeSelectHeader());
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
      } else if (content === FEED_CFG) {
        const requestHeader = urls[FEED_CFG].tape(
          false,
          resp.count - 1,
          resp.count - 1,
        );
        const respHeader = yield call(request, requestHeader);
        const headerArr = getDataFromResp(respHeader.result, content);
        if (headerArr.length === 1 && headerArr[0].priority === '-1')
          [header] = headerArr;
        else header = false;
      }
      yield put(dataLoaded(data, header));
    } else yield put(dataLoaded(false, false));
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
