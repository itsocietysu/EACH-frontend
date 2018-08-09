/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects';
import { CHECK_LOGIN } from 'containers/App/constants';
import { loginChecked } from 'containers/App/actions';

import { setLogined } from 'cookieManager';

/**
 * Logout handler
 */
export function* logout() {
  yield put(loginChecked(''));
  setLogined(false);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* Logout() {
  // Watches for CHECK_LOGIN actions and calls checkLogin when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(CHECK_LOGIN, logout);
}
