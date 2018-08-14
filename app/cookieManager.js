import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function setLogined(logined) {
  cookies.set('logined', logined, { path: '/' });
}

export function getLogined() {
  return cookies.get('logined');
}

export function setSession(session) {
  cookies.set('session', session, { path: '/' });
}

export function getSession() {
  return cookies.get('session');
}
