/* eslint-disable react/prefer-stateless-function,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
/*
 * LoginButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Popup from 'reactjs-popup';

import injectSaga from '../../utils/injectSaga';
import { getLogined } from '../../cookieManager';
import oauth2Authorize from '../AuthPage/oauth2-authorize';
import { getUserData, clearError, newError } from '../App/actions';
import saga from '../App/saga';
import Button from './Button';
import messages from './messages';
import AuthList from '../AuthList';

const PopupContentStyle = {
  boxShadow: 'none',
  width: 'initial',
  padding: '0px',
  borderRadius: '4px',
  border: '0px',
};

const PopupArrowStyle = {
  border: '2px solid rgb(217, 146, 92)',
  borderLeft: 'none',
  borderTop: 'none',
};

const panelStyle = { float: 'right' };

export class LoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authTimer: null,
      authWindow: null,
    };
  }

  authorize = app => {
    if (this.state.authTimer) {
      clearInterval(this.state.authTimer);
      this.setState({ authTimer: null, authWindow: null });
    }
    this.props.clearErr();
    const authWindow = oauth2Authorize(app, this.props.errCb);
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
      <div style={panelStyle}>
        <Popup
          trigger={
            <Button type="button">
              <FormattedMessage {...messages.login} />
            </Button>
          }
          closeOnDocumentClick
          arrowStyle={PopupArrowStyle}
          contentStyle={PopupContentStyle}
        >
          {close => (
            <div onClick={close}>
              <AuthList authFunc={app => this.authorize(app)} />
            </div>
          )}
        </Popup>
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
