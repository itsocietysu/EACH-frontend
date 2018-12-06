import Cookies from 'universal-cookie';
import { DEFAULT_LOCALE } from './i18n';

const cookies = new Cookies();

export function setLogined(logined) {
  cookies.set('logined', logined, { path: '/' });
}

export function getLogined() {
  return cookies.get('logined');
}

export function setSession(session) {
  cookies.set('user_session', session, { path: '/' });
}

export function getSession() {
  return cookies.get('user_session');
}

export function rmSession() {
  return cookies.remove('user_session', { path: '/' });
}

export function setLocale(locale) {
  cookies.set('locale', locale, { path: '/' });
}

export function getLocale() {
  return cookies.get('locale') || DEFAULT_LOCALE;
}

export function setUser(user) {
  cookies.set('cur_user', user, { path: '/' });
}

export function getUser() {
  return cookies.get('cur_user');
}

export function rmUser() {
  return cookies.remove('cur_user', { path: '/' });
}

export function setOAuth(app) {
  cookies.set('oauth', app, { path: '/' });
}

export function getOAuth() {
  return cookies.get('oauth');
}

export function rmOAuth() {
  return cookies.remove('oauth', { path: '/' });
}
