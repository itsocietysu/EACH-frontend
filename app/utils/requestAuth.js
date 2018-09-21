import request from './request';
import { getSession, getOAuth } from '../cookieManager';
import clients from '../containers/AuthPage/client_config.json';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function requestAuth(url, options) {
  let optionsAuth;
  if (options)
    optionsAuth = Object.assign(options, {
      headers: {
        authorization: `Bearer ${getSession()} ${
          clients.clients_arr[getOAuth()]
        }`,
      },
    });
  else
    optionsAuth = {
      headers: {
        authorization: `Bearer ${getSession()} ${
          clients.clients_arr[getOAuth()]
        }`,
      },
    };
  return request(url, optionsAuth);
}
