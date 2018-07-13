import { put, select, takeLatest } from 'redux-saga/effects';
import { CHECK_LOGIN } from 'containers/App/constants';
import { loginChecked, loginCheckingError } from 'containers/App/actions';

import { makeSelectUsername, makeSelectPassword } from './selectors';

function checkEmpty(id, value) {
  var elem = document.getElementById(id);
  elem.style.borderColor = 'transparent';
  elem.style.borderBottom = '1px dotted #999';
  if (value.trim().length === 0) {
    elem.style.border = '2px solid rgb(255, 178, 139)';
  }
}

/**
 * Login data check handler
 */
export function* checkLogin() {
  // Select username and password from store
  const username = yield select(makeSelectUsername());
  const password = yield select(makeSelectPassword());
  console.log("Try Sign in");
  checkEmpty('username', username);
  checkEmpty('password', password);
  console.log("Login: " + username);
  console.log("Password: " + password);
  if (username.length !== 0 && password.length !== 0) {
    try {
      // check login data with data on server
      console.log("Done");
      yield put(loginChecked(username));
    } catch (err) {
      yield put(loginCheckingError(err));
    }
  }
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
