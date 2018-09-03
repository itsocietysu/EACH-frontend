import messages from './messages';

const configs = [
  {
    name: 'MUSEEACH',
    message: messages.museeach,
    configs: {
      oauth2RedirectUrl: '/auth',
      clientId: 'Gu2SCEBUwQV3TSlNIu8uMzvKRMYuGP5ePh044jGErO6O9RR0',
      clientSecret: '',
      scopes: ['email'],
      authorizationUrl: 'http://each.itsociety.su:5000/oauth2/authorize',
      tokenUrl: 'http://each.itsociety.su:5000/oauth2/token',
    },
  },
];

export default configs;
