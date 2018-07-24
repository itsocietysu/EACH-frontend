/* eslint-disable import/first */
import { select, call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_DATA } from './constants';
import { dataDeleted, dataDeletingError } from './actions';

import request from 'utils/request';
import { makeSelectEid } from './selectors';

/**
 * Feed data delete handler
 */
export function* deleteFeed() {
  const eid = yield select(makeSelectEid());
  const requestURL = `http://each.itsociety.su:4201/each/feed/${eid}?hard=true`;
  const options = {
    method: 'DELETE',
  };
  try {
    yield call(request, requestURL, options);
    yield put(dataDeleted());
  } catch (err) {
    yield put(dataDeletingError(err));
    console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* deleteFeedData() {
  yield takeLatest(DELETE_DATA, deleteFeed);
}
