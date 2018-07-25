/* eslint-disable import/first */
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_FEEDS } from './constants';
import { feedsLoaded, feedsLoadingError } from './actions';

import request from 'utils/request';

/**
 * Feeds data load handler
 */
export function* loadFeeds() {
  const requestURL = `http://each.itsociety.su:4201/each/feed/all`;
  try {
    const feeds = yield call(request, requestURL);
    let data = false;
    if (feeds.length) {
      data = feeds.map(item => ({
        eid: item.eid,
        title: item.title,
        text: item.text,
        image: `http://${item.image[0].url}`,
      }));
    }
    yield put(feedsLoaded(data));
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
