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
import { setSession, setLogined } from 'cookieManager';

import Button from 'components/Button';
import messages from './messages';
import { writeUsername } from '../App/actions';

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
      dispatch(writeUsername(''));
      setLogined(false);
      setSession('');
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
