/* eslint-disable import/first */
import { select, call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_DATA } from './constants';
import { dataDeleted, dataDeletingError } from './actions';

import request from 'utils/request';
import { makeSelectEid } from './selectors';

import { LOAD_FEEDS } from 'containers/HomePage/constants';
import { loadFeeds } from 'containers/HomePage/saga';
import { makeSelectData } from 'containers/HomePage/selectors';
import { feedsLoaded } from 'containers/HomePage/actions';
import { getSession } from 'cookieManager';

/**
 * Feed data delete handler
 */
export function* deleteFeed() {
  const eid = yield select(makeSelectEid());
  const requestURL = `http://each.itsociety.su:4201/each/feed/${eid}?hard=true`;
  const options = {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${getSession()}`,
    },
  };
  try {
    yield call(request, requestURL, options);
    yield put(dataDeleted());
    const data = yield select(makeSelectData());
    yield put(feedsLoaded(data.filter(element => element.eid !== eid)));
  } catch (err) {
    yield put(dataDeletingError(err));
    console.error(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadDeleteNewsData() {
  yield takeLatest(LOAD_FEEDS, loadFeeds);
  yield takeLatest(DELETE_DATA, deleteFeed);
}
