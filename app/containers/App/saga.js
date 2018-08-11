/* eslint-disable import/first */
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_USER_DATA } from './constants';
import { userdataGot, newError } from './actions';

import request from 'utils/request';
import { getSession, setLogined } from 'cookieManager';

/**
 * User data get handler
 */
export function* getUser() {
  const requestURL = `http://each.itsociety.su:5000/oauth2/tokeninfo?access_token=${getSession()}`;
  try {
    const user = yield call(request, requestURL);
    const data = {
      name: user.name,
      accessType: user.access_type,
    };
    yield put(userdataGot(data));
  } catch (err) {
    yield put(
      newError({ source: 'user', level: 'error', message: err.message }),
    );
    setLogined(false);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getUserData() {
  yield takeLatest(GET_USER_DATA, getUser);
}
