import { call, select, put, takeLatest } from 'redux-saga/effects';
import { LOAD_FEEDS } from './constants';
import { feedsLoaded, feedsLoadingError } from './actions';
import { makeSelectPage } from './selectors';

import request from '../../utils/request';
import { urls, FEED_CFG } from '../EditPage/configs';
import { getDataFromResp } from '../../utils/utils';

/**
 * Feeds data load handler
 */
export function* loadFeeds() {
  const page = yield select(makeSelectPage());
  const requestURL = urls[FEED_CFG].tape(false, (page - 1) * 10, page * 10 - 1);
  try {
    const feeds = yield call(request, requestURL);
    const data = getDataFromResp(feeds.result, FEED_CFG);
    if (data.length) yield put(feedsLoaded(data, feeds.count, feeds.page));
    else yield put(feedsLoaded(false, feeds.count, feeds.page));
  } catch (err) {
    yield put(feedsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadFeedsData() {
  yield takeLatest(LOAD_FEEDS, loadFeeds);
}
