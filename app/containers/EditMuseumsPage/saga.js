/* eslint-disable import/first */
import { select, call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_DATA } from './constants';
import { dataDeleted, dataDeletingError } from './actions';

import requestAuth from 'utils/requestAuth';
import { makeSelectEid } from './selectors';

import { LOAD_MUSEUMS } from 'containers/MuseumsPage/constants';
import { loadMuseums } from 'containers/MuseumsPage/saga';
import { makeSelectData } from 'containers/MuseumsPage/selectors';
import { museumsLoaded } from 'containers/MuseumsPage/actions';

/**
 * Museum data delete handler
 */
export function* deleteFeed() {
  const eid = yield select(makeSelectEid());
  const requestURL = `http://each.itsociety.su:4201/each/museum/${eid}?hard=true`;
  const options = {
    method: 'DELETE',
  };
  try {
    yield call(requestAuth, requestURL, options);
    yield put(dataDeleted());
    const data = yield select(makeSelectData());
    yield put(museumsLoaded(data.filter(element => element.eid !== eid)));
  } catch (err) {
    yield put(dataDeletingError(err));
    console.error(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadDeleteMuseumData() {
  yield takeLatest(LOAD_MUSEUMS, loadMuseums);
  yield takeLatest(DELETE_DATA, deleteFeed);
}
