/* eslint-disable import/first,no-param-reassign */
import { select, call, put, takeLatest } from 'redux-saga/effects';
import { SEND_DATA } from './constants';
import { dataSended, dataSendingError } from './actions';

import request from 'utils/request';
import { makeSelectData, makeSelectMod } from './selectors';

/**
 * Feed data send handler
 */
export function* sendFeed() {
  const mod = yield select(makeSelectMod());
  const data = yield select(makeSelectData());
  const requestURL = `http://each.itsociety.su:4201/each/feed`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: data.get('eid'),
      title: data.get('title'),
      text: data.get('text'),
      prop: {
        image: data.get('image'),
      },
    }),
  };
  if (mod === 'edit') options.method = 'PUT';
  try {
    yield call(request, requestURL, options);
    yield put(dataSended());
  } catch (err) {
    yield put(dataSendingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sendFeedData() {
  yield takeLatest(SEND_DATA, sendFeed);
}
