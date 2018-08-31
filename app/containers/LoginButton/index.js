/* eslint-disable no-unused-vars,react/prefer-stateless-function */
/*
 * LoginButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import { getLogined } from '../../cookieManager';
import oauth2Authorize from '../AuthPage/oauth2-authorize';
import { getUserData, clearError, newError } from '../App/actions';
import saga from '../App/saga';
import Button from './Button';
import messages from './messages';

export class LoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authTimer: null,
      authWindow: null,
    };
  }

  authorize = () => {
    if (this.state.authTimer) {
      clearInterval(this.state.authTimer);
      this.setState({ authTimer: null, authWindow: null });
    }
    this.props.clearErr();
    const authWindow = oauth2Authorize(this.props.errCb);
    if (authWindow)
      this.setState({
        authTimer: setInterval(() => this.checkChildWindow(), 250),
        authWindow,
      });
  };

  checkChildWindow() {
    if (this.state.authWindow && this.state.authWindow.closed) {
      clearInterval(this.state.authTimer);
      this.setState({ authTimer: null, authWindow: null });
      if (getLogined() === 'true') this.props.onAuth();
    }
  }

  render() {
    return (
      <div style={{ float: 'right', marginRight: '30px' }}>
        <Button type="button" onClick={this.authorize}>
          <FormattedMessage {...messages.login} />
        </Button>
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
    onAuth: () => dispatch(getUserData()),
    errCb: error => dispatch(newError(error)),
    clearErr: () => dispatch(clearError()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'user', saga });

export default compose(
  withSaga,
  withConnect,
)(LoginButton);
