/* eslint-disable no-unused-vars */
import { put, select, takeLatest } from 'redux-saga/effects';
import { CHECK_LOGIN } from 'containers/App/constants';
import { loginChecked, loginCheckingError } from 'containers/App/actions';

import { setLogined } from 'cookieManager';

/**
 * Login data check handler
 */
export function* checkLogin() {
  yield put(loginChecked('Admin'));
  setLogined(true);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* checkLoginData() {
  // Watches for CHECK_LOGIN actions and calls checkLogin when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(CHECK_LOGIN, checkLogin);
}
