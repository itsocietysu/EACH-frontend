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
    path: '/logo.svg',
  },
  {
    name: 'VKontakte',
    message: messages.vkontakte,
    app: appEnum.VK,
    path: '/logo-vk.svg',
  },
  {
    name: 'Google+',
    message: messages.google,
    app: appEnum.Google,
    path: '/logo-google.svg',
  },
];

export default configs;
