/* eslint-disable react/prefer-stateless-function,react/prop-types,react/no-children-prop */
/*
 * LogoutButton
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import { withRouter } from 'react-router-dom';
import { setSession, setLogined } from 'cookieManager';

import Button from 'components/Button';
import messages from './messages';

class LogoutButton extends React.Component {
  onLogout() {
    setLogined(false);
    setSession('');
  }
  render() {
    return (
      <Button
        onClick={() => {
          this.onLogout();
          this.props.history.push(`/`);
        }}
        children={<FormattedMessage {...messages.logout} />}
      />
    );
  }
}

export default withRouter(LogoutButton);
