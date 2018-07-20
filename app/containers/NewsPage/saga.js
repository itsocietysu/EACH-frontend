/* eslint-disable import/first */
import { takeLatest } from 'redux-saga/effects';
import { LOAD_FEEDS } from 'containers/HomePage/constants';
import { loadFeeds } from 'containers/HomePage/saga';

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadNewsData() {
  yield takeLatest(LOAD_FEEDS, loadFeeds);
}
