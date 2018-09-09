import messages from './messages';

export const appEnum = {
  EACH: 0,
  VK: 1,
  Google: 2,
  Facebook: 3,
};

const configs = [
  {
    name: 'EACH',
    message: messages.each,
    app: appEnum.EACH,
  },
  {
    name: 'VKontakte',
    message: messages.vkontakte,
    app: appEnum.VK,
  },
  {
    name: 'Google+',
    message: messages.google,
    app: appEnum.Google,
  },
  {
    name: 'Facebook',
    message: messages.facebook,
    app: appEnum.Facebook,
  },
];

export default configs;
