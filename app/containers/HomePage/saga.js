/* eslint-disable import/first */
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_FEEDS } from './constants';
import { feedsLoaded, feedsLoadingError } from './actions';

import request from 'utils/request';

/**
 * Museums data load handler
 */
export function* loadFeeds() {
  const requestURL = `http://each.itsociety.su:4201/each/feed/all`;
  try {
    const feeds = yield call(request, requestURL);
    let data = false;
    if (feeds.length) {
      const withImages = [feeds.length];
      for (let i = 0; i < feeds.length; i += 1)
        withImages[i] = yield call(
          request,
          `http://each.itsociety.su:4201/each/feed/${feeds[i].eid}`,
        );
      data = withImages.map(item => ({
        eid: item[0].eid,
        title: item[0].title,
        text: item[0].text,
        image: `http://${item[0].image[0].url}`,
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
