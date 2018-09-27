import { select, call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_DATA } from './constants';
import { dataDeleted, dataDeletingError } from './actions';

import requestAuth from '../../utils/requestAuth';
import { makeSelectEid } from './selectors';

import { loadMuseums } from '../MuseumsPage/saga';
import { LOAD_MUSEUMS } from '../MuseumsPage/constants';
import { makeSelectData } from '../MuseumsPage/selectors';
import { museumsLoaded } from '../MuseumsPage/actions';

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
    const data = yield select(makeSelectData());
    yield put(museumsLoaded(data.filter(element => element.eid !== eid)));
  } catch (err) {
    yield put(dataDeletingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* deleteData() {
  yield takeLatest(LOAD_MUSEUMS, loadMuseums);
  yield takeLatest(DELETE_DATA, deleteMuseum);
}
