/* eslint-disable no-buffer-constructor */
import getConfigs from './configs';

const btoa = str => {
  let buffer;

  if (str instanceof Buffer) {
    buffer = str;
  } else {
    buffer = new Buffer(str.toString(), 'utf-8');
  }

  return buffer.toString('base64');
};

export default function authorize(errCb) {
  const configs = getConfigs();
  const query = [];
  query.push('response_type=code');

  if (typeof configs.clientId === 'string') {
    query.push(`client_id=${encodeURIComponent(configs.clientId)}`);
  }

  const redirectUrl = configs.oauth2RedirectUrl;

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

  const auth = getConfigs();
  window.eachRedirectOauth2 = { auth, state, errCb };

  const authWindow = window.open(url);
  return authWindow;
}
