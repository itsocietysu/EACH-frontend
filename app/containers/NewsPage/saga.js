import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_FEED } from './constants';
import { feedLoaded, feedLoadingError } from './actions';
import { makeSelectEid } from './selectors';

import requestAuth from '../../utils/requestAuth';

/**
 * Feed data load handler
 */
export function* loadFeed() {
  const eid = yield select(makeSelectEid());
  const requestURL = `http://each.itsociety.su:4201/each/feed/${eid}`;
  let data;
  try {
    const feed = (yield call(requestAuth, requestURL))[0];
    data = {
      eid: feed.eid,
      title: feed.title,
      text: feed.text,
      desc: feed.desc,
      image: `${feed.image[0] ? `http://${feed.image[0].url}` : '/Photo.png'}`,
    };
    yield put(feedLoaded(data));
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
