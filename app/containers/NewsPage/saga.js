/* eslint-disable import/first */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_FEED } from './constants';
import { feedLoaded, feedLoadingError } from './actions';
import { makeSelectEid } from './selectors';

import requestAuth from 'utils/requestAuth';

/**
 * Feed data load handler
 */
export function* loadFeed() {
  const eid = yield select(makeSelectEid());
  const requestURL = `http://each.itsociety.su:4201/each/feed/${eid}`;
  let data;
  try {
    const feed = yield call(requestAuth, requestURL);
    data = {
      eid: feed[0].eid,
      title: feed[0].title,
      text: feed[0].text,
      desc: feed[0].desc,
      image: `${
        feed[0].image[0] ? `http://${feed[0].image[0].url}` : '/Photo.png'
      }`,
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
