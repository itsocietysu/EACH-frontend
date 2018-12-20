import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_FEED } from './constants';
import { feedLoaded, feedLoadingError } from './actions';
import { makeSelectEid } from './selectors';

import requestAuth from '../../utils/requestAuth';
import { FEED_CFG, urls } from '../../utils/constants';
import { getDataFromResp } from '../../utils/utils';

/**
 * Feed data load handler
 */
export function* loadFeed() {
  const eid = yield select(makeSelectEid());
  const requestURL = urls[FEED_CFG].get_by_id(eid);
  try {
    const feed = yield call(requestAuth, requestURL);
    const data = getDataFromResp(feed, FEED_CFG);
    if (data.length) yield put(feedLoaded(data[0]));
    else yield put(feedLoaded(false));
  } catch (err) {
    yield put(feedLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadFeedData() {
  yield takeLatest(LOAD_FEED, loadFeed);
}
