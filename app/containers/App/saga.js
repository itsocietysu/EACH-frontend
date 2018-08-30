import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_USER_DATA } from './constants';
import { userDataGot, newError } from './actions';

import request from '../../utils/request';
import { getSession, setUser } from '../../cookieManager';
import { Logout } from '../LogoutButton/index';

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
    setUser(user.name);
    yield put(userDataGot(data));
  } catch (err) {
    Logout();
    yield put(
      newError({ source: 'user', level: 'error', message: err.message }),
    );
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getUserData() {
  yield takeLatest(GET_USER_DATA, getUser);
}
