import { select, call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_DATA } from './constants';
import { dataDeleted, dataDeletingError } from './actions';

import requestAuth from '../../utils/requestAuth';
import { makeSelectEid } from './selectors';

import { LOAD_FEEDS } from '../HomePage/constants';
import { loadFeeds } from '../HomePage/saga';
import {
  makeSelectData,
  makeSelectPage,
  makeSelectCount,
} from '../HomePage/selectors';
import { feedsLoaded } from '../HomePage/actions';

/**
 * Feed data delete handler
 */
export function* deleteFeed() {
  const eid = yield select(makeSelectEid());
  const requestURL = `http://each.itsociety.su:4201/each/feed/${eid}?hard=true`;
  const page = yield select(makeSelectPage());
  const count = yield select(makeSelectCount());
  const options = {
    method: 'DELETE',
  };
  try {
    yield call(requestAuth, requestURL, options);
    yield put(dataDeleted());
    const data = yield select(makeSelectData());
    yield put(
      feedsLoaded(data.filter(element => element.eid !== eid), count - 1, page),
    );
  } catch (err) {
    yield put(dataDeletingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* deleteData() {
  yield takeLatest(LOAD_FEEDS, loadFeeds);
  yield takeLatest(DELETE_DATA, deleteFeed);
}
