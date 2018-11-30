import messages from './messages';

export const appEnum = {
  EACH: 0,
  VK: 1,
  Google: 2,
};

const configs = [
  {
    name: 'EACH',
    message: messages.each,
    app: appEnum.EACH,
    path: './images/logo.svg',
  },
  {
    name: 'VKontakte',
    message: messages.vkontakte,
    app: appEnum.VK,
    path: './images/logo-vk.png',
  },
  {
    name: 'Google+',
    message: messages.google,
    app: appEnum.Google,
    path: './images/logo-google.png',
  },
];

export default configs;
