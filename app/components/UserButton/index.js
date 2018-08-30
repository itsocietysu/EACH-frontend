/* eslint-disable react/prop-types,react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectCurrentUser } from '../../containers/App/selectors';

import { getLogined, getUser } from '../../cookieManager';

import LoginButton from '../../containers/LoginButton';
import UserPanel from '../../containers/UserPanel';

class UserButton extends React.Component {
  render() {
    if (getLogined() === 'true' && getUser())
      return (
        <UserPanel
          username={getUser()}
          accessType={this.props.user.accessType}
        />
      );
    return <LoginButton />;
  }
}

UserButton.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default withConnect(UserButton);
