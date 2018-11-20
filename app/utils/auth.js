import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Redirect } from 'react-router-dom';

import LoadingIndicator from '../components/LoadingIndicator/index';
import { getLogined, getOAuth, getSession, setUser } from '../cookieManager';
import requestAuth from './requestAuth';
import { newError, userDataGot } from '../containers/App/actions';
import { Logout } from '../containers/LogoutButton/index';

import config from '../containers/AuthPage/client_config.json';

export const AUTH_USER = 'authorizeUserComponent';
export const AUTH_ADMIN = 'authorizeAdminComponent';
export const REQUEST = 'requestComponent';

/**
 * Dynamically injects a authorization
 *
 * @param {string} mode An authorization mode
 *
 */
const Auth = ({ mode }) => WrappedComponent => {
  class AuthorizationInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    static displayName = `withAuth(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    state = { req: false, func: false, accessType: 'user', error: false };
    componentWillMount() {
      if (getLogined() === 'true' && getSession() && getOAuth()) {
        const requestURL = `${
          config.token_info_url
        }?access_token=${getSession()}&type=${config.clients_arr[getOAuth()]}`;
        this.state.req = true;
        this.state.func = requestAuth(requestURL)
          .then(user => {
            const data = {
              name: user.name,
              accessType: user.access_type,
            };
            setUser(user.name);
            this.context.store.dispatch(userDataGot(data));
            this.setState({ req: false, accessType: data.accessType });
          })
          .catch(err => {
            if (err.message !== 'Failed to fetch') Logout();
            this.context.store.dispatch(
              newError({
                source: 'user',
                level: 'error',
                message: err.message,
              }),
            );
            this.setState({ req: false, accessType: 'user', error: true });
          });
      }
    }

    render() {
      if (
        mode !== REQUEST &&
        (getLogined() !== 'true' ||
          !getSession() ||
          !getOAuth() ||
          (!this.state.req &&
            ((mode === AUTH_ADMIN && this.state.accessType !== 'admin') ||
              this.state.error)))
      )
        return <Redirect to="/" />;
      if (
        (!this.state.req &&
          ((mode === AUTH_ADMIN && this.state.accessType === 'admin') ||
            mode === AUTH_USER)) ||
        mode === REQUEST
      )
        return <WrappedComponent {...this.props} />;
      return <LoadingIndicator />;
    }
  }

  return hoistNonReactStatics(AuthorizationInjector, WrappedComponent);
};

export const withAuth = Auth({ mode: AUTH_USER });
export const withAuthAdmin = Auth({ mode: AUTH_ADMIN });
export const withRequest = Auth({ mode: REQUEST });
export default Auth;
