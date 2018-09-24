/* eslint-disable react/prefer-stateless-function,react/prop-types,react/no-children-prop */
/*
 * LogoutButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withRouter } from 'react-router-dom';
import {
  rmSession,
  setLogined,
  rmUser,
  rmOAuth,
  getSession,
  getOAuth,
} from '../../cookieManager';

import Button from '../../components/Button';
import { userDataGot } from '../../containers/App/actions';
import messages from './messages';
import requestAuth from '../../utils/requestAuth';
import config from '../AuthPage/client_config.json';

export function Logout() {
  setLogined(false);
  rmSession();
  rmUser();
  rmOAuth();
}

class LogoutButton extends React.Component {
  render() {
    return (
      <Button
        onClick={() => {
          this.props.onLogout();
          this.props.history.push(`/`);
        }}
        children={<FormattedMessage {...messages.logout} />}
      />
    );
  }
}

LogoutButton.propTypes = {
  onLogout: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          access_token: getSession(),
          type: config.clients_arr[getOAuth()],
        }),
      };
      requestAuth(config.revoke_token_url, options);
      Logout();
      dispatch(userDataGot({ name: '', accessType: 'user' }));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(LogoutButton);
