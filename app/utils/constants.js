import config from '../containers/AuthPage/client_config.json';
import { getOAuth, getSession } from '../cookieManager';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const colors = {
  base: '#5b7bbb',
};

export const MUSEUM_CFG = 'museum';
export const FEED_CFG = 'feed';
export const LOCATION_CFG = 'location';
export const QUEST_CFG = 'quest';

const startUrl = 'http://each.itsociety.su:4201/each/';

export const urls = {
  museum: {
    add: `${startUrl}add`,
    update: `${startUrl}update`,
    delete: eid => `${startUrl}museum/${eid}?hard=true`,
    tape: (reqProps, firstM, lastM) =>
      `${startUrl}museum/tape?FirstMuseum=${firstM}&LastMuseum=${lastM}`,
    get_by_id: eid => `${startUrl}museum/${eid}`,
  },
  feed: {
    add: `${startUrl}feed`,
    update: `${startUrl}feed`,
    delete: eid => `${startUrl}feed/${eid}?hard=true`,
    tape: (reqProps, firstF, lastF) =>
      `${startUrl}feed/tape?FirstFeed=${firstF}&LastFeed=${lastF}`,
    get_by_id: eid => `${startUrl}feed/${eid}`,
  },
  location: {
    add: `${startUrl}location`,
    update: '',
    delete: eid => `${startUrl}location/${eid}?hard=true`,
    tape: (reqProps, firstL, lastL) =>
      `${startUrl}location/tape?FirstLocation=${firstL}&LastLocation=${lastL}`,
    startswith: value => `${startUrl}location?startswith=${value}`,
  },
  quest: {
    add: `${startUrl}game`,
    update: `${startUrl}game`,
    delete: eid => `${startUrl}game/${eid}?hard=true`,
    tape: reqProps => `${startUrl}game/all/museum/${reqProps.museumId}`,
  },
  auth: {
    access_token_url: `${startUrl}token/get?expansion=true`,
    token_info_url: expansion =>
      `${startUrl}token/info?access_token=${getSession()}&type=${
        config.clients_arr[getOAuth()]
      }&expansion=${expansion}`,
    revoke_token_url: `${startUrl}token/revoke`,
    oauth2RedirectUrl: '/auth',
  },
  scenario: {
    get: eid => `${startUrl}scenario/${eid}`,
    update: `${startUrl}scenario`,
  },
};
