/* eslint-disable react/prefer-stateless-function,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
/*
 * LoginButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';

import oauth2Authorize from '../AuthPage/oauth2-authorize';
import { clearError, newError, userDataGot } from '../App/actions';
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
  authorize = app => {
    this.props.clearErr();
    oauth2Authorize(app, this.props.errCb, this.props.onAuth);
  };

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
