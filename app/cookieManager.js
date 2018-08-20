import Cookies from 'universal-cookie';

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

export function setLocale(locale) {
  cookies.set('locale', locale, { path: '/' });
}

export function getLocale() {
  return cookies.get('locale');
}
