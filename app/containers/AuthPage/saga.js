/* eslint-disable import/first,guard-for-in,no-restricted-syntax,prettier/prettier,no-param-reassign */
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_TOKEN } from './constants';
import { tokenGot } from './actions';

import request from 'utils/request';
import { setSession, setLogined } from 'cookieManager';

const buildFormData = data => {
  const formArr = [];

  for (const name in data) {
    const val = data[name];
    if (val !== undefined && val !== '') {
      formArr.push(
        [name, '=', encodeURIComponent(val).replace(/%20/g, '+')].join(''),
      );
    }
  }
  return formArr.join('&');
};

/**
 * Token get handler
 */
export function* getToken() {
  const oauth2 = window.opener.eachRedirectOauth2;
  let qp;

  if (/code|token|error/.test(window.location.hash)) {
    qp = window.location.hash.substring(1);
  } else {
    qp = window.location.search.substring(1);
  }

  const arr = qp.split('&');
  arr.forEach((v, i, _arr) => {
    _arr[i] = `"${v.replace('=', '":"')}"`;
  });
  qp = qp
    ? JSON.parse(
      `{${arr.join()}}`,
      (key, value) => (key === '' ? value : decodeURIComponent(value)),
    )
    : {};

  const isValid = qp.state === oauth2.state;
  if (!isValid) {
    oauth2.errCb({
      source: 'auth',
      level: 'warning',
      message:
        "Authorization may be unsafe, passed state was changed in server Passed state wasn't returned from auth server",
    });
  }

  if (qp.code) {
    delete oauth2.state;
    const form = {
      grant_type: 'authorization_code',
      code: qp.code,
      client_id: oauth2.auth.clientId,
      client_secret: oauth2.auth.clientSecret,
      redirect_uri: oauth2.auth.oauth2RedirectUrl,
    };
    const options = {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: buildFormData(form),
    };
    try {
      const resp = yield call(request, oauth2.auth.tokenUrl, options);
      window.close();
      setSession(resp.access_token);
      setLogined(true);
      yield put(tokenGot());
    } catch (err) {
      oauth2.errCb({
        source: 'auth',
        level: 'error',
        message: err.message,
      });
    }
  } else {
    let oauthErrorMsg;
    if (qp.error) {
      oauthErrorMsg = `[${qp.error}]: ${
        qp.error_description
          ? `${qp.error_description}. `
          : 'no accessCode received from the server. '
      }${qp.error_uri ? `More info: ${qp.error_uri}` : ''}`;
    }

    oauth2.errCb({
      source: 'auth',
      level: 'error',
      message:
        oauthErrorMsg ||
        '[Authorization failed]: no accessCode received from the server',
    });
    window.close();
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadFeedsData() {
  yield takeLatest(GET_TOKEN, getToken);
}
