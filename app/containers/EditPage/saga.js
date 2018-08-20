/* eslint-disable import/first,no-console */
import { select, call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_FEED_DATA, DELETE_MUSEUM_DATA } from './constants';
import { dataDeleted, dataDeletingError } from './actions';

import requestAuth from 'utils/requestAuth';
import { makeSelectEid } from './selectors';

import { LOAD_MUSEUMS } from 'containers/MuseumsPage/constants';
import { loadMuseums } from 'containers/MuseumsPage/saga';
import { makeSelectData as makeSelectMuseumData } from 'containers/MuseumsPage/selectors';
import { museumsLoaded } from 'containers/MuseumsPage/actions';

import { LOAD_FEEDS } from 'containers/HomePage/constants';
import { loadFeeds } from 'containers/HomePage/saga';
import { makeSelectData as makeSelectFeedData } from 'containers/HomePage/selectors';
import { feedsLoaded } from 'containers/HomePage/actions';

/**
 * Museum data delete handler
 */
export function* deleteMuseum() {
  const eid = yield select(makeSelectEid());
  const requestURL = `http://each.itsociety.su:4201/each/museum/${eid}?hard=true`;
  const options = {
    method: 'DELETE',
  };
  try {
    yield call(requestAuth, requestURL, options);
    yield put(dataDeleted());
    const data = yield select(makeSelectMuseumData());
    yield put(museumsLoaded(data.filter(element => element.eid !== eid)));
  } catch (err) {
    yield put(dataDeletingError(err));
    console.error(err);
  }
}

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
    yield call(requestAuth, requestURL, options);
    yield put(dataDeleted());
    const data = yield select(makeSelectFeedData());
    yield put(feedsLoaded(data.filter(element => element.eid !== eid)));
  } catch (err) {
    yield put(dataDeletingError(err));
    console.error(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* deleteData() {
  yield takeLatest(LOAD_FEEDS, loadFeeds);
  yield takeLatest(LOAD_MUSEUMS, loadMuseums);
  yield takeLatest(DELETE_FEED_DATA, deleteFeed);
  yield takeLatest(DELETE_MUSEUM_DATA, deleteMuseum);
}
