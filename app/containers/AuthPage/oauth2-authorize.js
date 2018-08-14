/* eslint-disable no-buffer-constructor */
import configs from './configs';

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

  window.eachRedirectOauth2 = { auth: configs, state, errCb, redirectUrl };

  const authWindow = window.open(url);
  return authWindow;
}
