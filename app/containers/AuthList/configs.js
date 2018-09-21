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
];

export default configs;
