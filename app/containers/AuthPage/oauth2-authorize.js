/* eslint-disable no-buffer-constructor,guard-for-in,no-restricted-syntax,prettier/prettier,no-param-reassign */
import request from '../../utils/request';
import { setSession, getSession, setLogined, getLogined } from '../../cookieManager';

const btoa = str => {
  let buffer;

  if (str instanceof Buffer) {
    buffer = str;
  } else {
    buffer = new Buffer(str.toString(), 'utf-8');
  }

  return buffer.toString('base64');
};

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

export function getToken() {
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
      redirect_uri: oauth2.redirectUrl,
    };
    const options = {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: buildFormData(form),
    };
    oauth2.cb(oauth2.auth.tokenUrl, options, oauth2.errCb);
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
  }
  setInterval(() => {if (getLogined() === 'true' && getSession()) window.close();}, 100);
}

function getTokenRequest(tokenUrl, options, errCb) {
  request(tokenUrl, options)
    .then(resp => {
      setSession(resp.access_token);
      setLogined(true);
    })
    .catch(err =>
      errCb({
        source: 'auth',
        level: 'error',
        message: err.message,
      }),
    );
}

export default function authorize(configs, errCb) {
  const query = [];
  query.push('response_type=code');

  if (typeof configs.clientId === 'string') {
    query.push(`client_id=${encodeURIComponent(configs.clientId)}`);
  }

  const redirectUrl = window.location.origin + configs.oauth2RedirectUrl;

  if (typeof redirectUrl === 'undefined') {
    errCb({
      source: 'validation',
      level: 'error',
      message:
        'oauth2RedirectUrl configuration is not passed. Oauth2 authorization cannot be performed.',
    });
    return false;
  }
  query.push(`redirect_uri=${encodeURIComponent(redirectUrl)}`);

  if (Array.isArray(configs.scopes) && configs.scopes.length > 0) {
    const scopeSeparator = ' ';
    query.push(
      `scope=${encodeURIComponent(configs.scopes.join(scopeSeparator))}`,
    );
  }

  const state = btoa(new Date());

  query.push(`state=${encodeURIComponent(state)}`);

  const url = [configs.authorizationUrl, query.join('&')].join(
    configs.authorizationUrl.indexOf('?') === -1 ? '?' : '&',
  );

  window.eachRedirectOauth2 = {
    auth: configs,
    state,
    cb: getTokenRequest,
    errCb,
    redirectUrl,
  };
  const width = 700;
  const height = 700;
  const left = window.screen.width / 2 - (width / 2 + 10);
  const top = window.screen.height / 2 - (height / 2 + 50);

  const authWindow = window.open(
    url,
    'Auth_Window',
    `status=no,height=${height},width=${width},resizable=yes,left=${left},top=${top},screenX=${left},screenY=${top},toolbar=no,menubar=no,scrollbars=no,location=no,directories=no`,
  );
  return authWindow;
}
