/* eslint-disable react/prefer-stateless-function,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
/*
 * LoginButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import oauth2Authorize from '../AuthPage/oauth2-authorize';
import { clearError, newError, userDataGot } from '../App/actions';
import messages from './messages';
import AuthList from '../AuthList';
import H1 from '../../components/H1';
import './index.css';

export class LoginButton extends React.Component {
  authorize = app => {
    this.props.clearErr();
    oauth2Authorize(app, this.props.errCb, this.props.onAuth);
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-overlay">
          <H1>
            <FormattedMessage {...messages.login} />
          </H1>
          <div className="login-icons">
            <AuthList authFunc={app => this.authorize(app)} />
          </div>
        </div>
      </div>
    );
  }
}

LoginButton.propTypes = {
  onAuth: PropTypes.func,
  errCb: PropTypes.func,
  clearErr: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAuth: data => dispatch(userDataGot(data)),
    errCb: error => dispatch(newError(error)),
    clearErr: () => dispatch(clearError()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withConnect(LoginButton);
