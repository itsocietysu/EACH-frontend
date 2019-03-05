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
export const AGREEMENT_CFG = 'agreement';

const isProd = process.env.NODE_ENV === 'production';
const backUri = isProd
  ? 'http://134.0.116.13:4201/each/'
  : 'http://eachdev.itsociety.su:4201/each/';
const oauthUri = isProd
  ? 'http://134.0.116.13:5000/'
  : 'http://eachdev.itsociety.su:5000/';

const config = {
  clients_arr: ['each', 'vkontakte', 'google'],
  clients: {
    each: {
      client_id: 'Gu2SCEBUwQV3TSlNIu8uMzvKRMYuGP5ePh044jGErO6O9RR0',
      scopes: ['email'],
      authorization_url: `${oauthUri}oauth2/authorize`,
    },
    vkontakte: {
      client_id: '6682398',
      scopes: ['email', 'offline'],
      authorization_url: 'https://oauth.vk.com/authorize',
    },
    google: {
      client_id:
        '190923403189-srp0gleu6imvtph8gcauf03uhb66q65h.apps.googleusercontent.com',
      scopes: ['email', 'profile'],
      authorization_url: 'https://accounts.google.com/o/oauth2/auth',
    },
  },
};

export const urls = {
  museum: {
    add: `${backUri}add`,
    update: `${backUri}update`,
    delete: eid => `${backUri}museum/${eid}?hard=true`,
    tape: (reqProps, firstM, lastM) =>
      `${backUri}museum/tape?FirstMuseum=${firstM}&LastMuseum=${lastM}`,
    get_by_id: eid => `${backUri}museum/${eid}`,
  },
  feed: {
    add: `${backUri}feed`,
    update: `${backUri}feed`,
    delete: eid => `${backUri}feed/${eid}?hard=true`,
    tape: (reqProps, firstF, lastF) =>
      `${backUri}feed/tape?FirstFeed=${firstF}&LastFeed=${lastF}`,
    get_by_id: eid => `${backUri}feed/${eid}`,
  },
  location: {
    add: `${backUri}location`,
    update: '',
    delete: eid => `${backUri}location/${eid}?hard=true`,
    tape: (reqProps, firstL, lastL) =>
      `${backUri}location/tape?FirstLocation=${firstL}&LastLocation=${lastL}`,
    startswith: value => `${backUri}location?startswith=${value}`,
  },
  quest: {
    add: `${backUri}game`,
    update: `${backUri}game?feedback=true`,
    delete: eid => `${backUri}game/${eid}?hard=true`,
    tape: reqProps =>
      `${backUri}game/all/museum/${reqProps.museumId}?feedback=true`,
  },
  auth: {
    access_token_url: `${backUri}token/get?expansion=true`,
    token_info_url: expansion =>
      `${backUri}token/info?access_token=${getSession()}&type=${
        config.clients_arr[getOAuth()]
      }&expansion=${expansion}`,
    revoke_token_url: `${backUri}token/revoke`,
    oauth2RedirectUrl: '/auth',
    clients: config,
  },
  scenario: {
    get: eid => `${backUri}scenario/${eid}`,
    update: `${backUri}scenario`,
  },
  agreement: {
    get: `${backUri}agreement/get`,
    update: `${backUri}agreement/update`,
  },
};
