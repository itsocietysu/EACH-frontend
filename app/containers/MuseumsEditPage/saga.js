import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_MUSEUM } from './constants';
import { museumLoaded, museumLoadingError } from './actions';
import { makeSelectEid } from './selectors';

import requestAuth from '../../utils/requestAuth';
import { getValues } from '../EditPage/configs';
import { getItemFromResp } from '../../utils/utils';

/**
 * Museum data load handler
 */
export function* loadMuseum() {
  const eid = yield select(makeSelectEid());
  const requestURL = `http://each.itsociety.su:4201/each/museum/${eid}`;
  try {
    const museum = yield call(requestAuth, requestURL);
    let data = false;
    const { fields, props } = getValues.museum;
    if (museum.length) {
      data = museum.map(item => getItemFromResp(item, fields, props));
      yield put(museumLoaded(data[0]));
    } else yield put(museumLoaded(false));
  } catch (err) {
    yield put(museumLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadMuseumData() {
  yield takeLatest(LOAD_MUSEUM, loadMuseum);
}
