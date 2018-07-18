/* eslint-disable react/prefer-stateless-function,react/prop-types */
/*
 * LogoutButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import { withRouter } from 'react-router-dom';

import Button from './Button';
import messages from './messages';
import { checkLogin } from '../App/actions';
import saga from './saga';

class LogoutButton extends React.Component {
  handleSubmit = () => {
    this.props.onLogout();
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <Button type="button" onClick={this.handleSubmit}>
          <FormattedMessage {...messages.logout} />
        </Button>
      </div>
    );
  }
}

LogoutButton.propTypes = {
  onLogout: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLogout: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(checkLogin());
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'logout', saga });

export default compose(
  withSaga,
  withConnect,
  withRouter,
)(LogoutButton);
