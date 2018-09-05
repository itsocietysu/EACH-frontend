import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Redirect } from 'react-router-dom';

import LoadingIndicator from '../components/LoadingIndicator/index';
import { getLogined, getOAuth, getSession, setUser } from '../cookieManager';
import request from './request';
import { newError, userDataGot } from '../containers/App/actions';
import { Logout } from '../containers/LogoutButton/index';

export const AUTH = 'authorizeComponent';
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

    state = { req: false, func: false };
    componentWillMount() {
      if (getLogined() === 'true' && getSession() && getOAuth()) {
        console.log(getOAuth());
        const requestURL = `http://each.itsociety.su:5000/oauth2/tokeninfo?access_token=${getSession()}`;
        this.state.req = true;
        this.state.func = request(requestURL)
          .then(user => {
            const data = {
              name: user.name,
              accessType: user.access_type,
            };
            setUser(user.name);
            this.context.store.dispatch(userDataGot(data));
            this.setState({ req: false });
          })
          .catch(err => {
            Logout();
            this.context.store.dispatch(
              newError({
                source: 'user',
                level: 'error',
                message: err.message,
              }),
            );
          });
      }
    }

    render() {
      if (mode === AUTH && (getLogined() !== 'true' || !getSession()))
        return <Redirect to="/" />;
      if (!this.state.req || mode !== AUTH)
        return <WrappedComponent {...this.props} />;
      return <LoadingIndicator />;
    }
  }

  return hoistNonReactStatics(AuthorizationInjector, WrappedComponent);
};

export const withAuth = Auth({ mode: AUTH });
export const withRequest = Auth({ mode: REQUEST });
export default Auth;
