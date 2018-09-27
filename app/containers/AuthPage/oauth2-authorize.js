/* eslint-disable no-buffer-constructor,guard-for-in,no-restricted-syntax,prettier/prettier,no-param-reassign */
import request from '../../utils/request';
import { setSession, setLogined, setOAuth, setUser } from '../../cookieManager';
import { appEnum } from '../AuthList/configs';
import { parseQueryString } from '../../utils/utils';
import config from './client_config.json';

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
  const { app } = oauth2;
  let qp;

  if (/code|token|error/.test(window.location.hash)) {
    qp = window.location.hash.substring(1);
  } else {
    qp = window.location.search.substring(1);
  }
  qp = parseQueryString(qp);

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
      redirect_uri: oauth2.redirectUrl,
      code: qp.code,
      type: config.clients_arr[app],
    };
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const url = [config.access_token_url, buildFormData(form)].join(
      config.access_token_url.indexOf('?') === -1 ? '?' : '&',
    );
    getTokenRequest(url, options, oauth2.cb, oauth2.errCb, window, app);
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

function getTokenRequest(tokenUrl, options, cb, errCb, window, app) {
  request(tokenUrl, options)
    .then(resp => {
      setSession(resp.access_token);
      setLogined(true);
      setUser(resp.name);
      setOAuth(app);
      cb({
        name: resp.name,
        accessType: resp.access_type,
      });
      window.close();
    })
    .catch(err => {
      errCb({
        source: 'auth',
        level: 'error',
        message: err.message,
      });
      window.close();
    }
    );
}

export default function authorize(app, errCb, cb) {
  const configs = config.clients[config.clients_arr[app]];
  const query = [];
  query.push('response_type=code');

  if (typeof configs.client_id === 'string') {
    query.push(`client_id=${encodeURIComponent(configs.client_id)}`);
  }

  const redirectUrl = window.location.origin + config.oauth2RedirectUrl;

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
  if (app === appEnum.VK) {
    query.push(`v=${encodeURIComponent("5.85")}`);
    query.push(`revoke=${encodeURIComponent("1")}`);
  }

  if (Array.isArray(configs.scopes) && configs.scopes.length > 0) {
    const scopeSeparator = ' ';
    query.push(
      `scope=${encodeURIComponent(configs.scopes.join(scopeSeparator))}`,
    );
  }

  const state = btoa(new Date());

  query.push(`state=${encodeURIComponent(state)}`);

  const url = [configs.authorization_url, query.join('&')].join(
    configs.authorization_url.indexOf('?') === -1 ? '?' : '&',
  );

  window.eachRedirectOauth2 = {
    app,
    state,
    cb,
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
