/* eslint-disable react/prop-types,react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';

import { getLogined } from 'cookieManager';

import LoginButton from 'containers/LoginButton';
import UserPanel from 'containers/UserPanel';

function UserButton(props) {
  if (getLogined() === 'true') return <UserPanel username={props.username} />;
  return <LoginButton />;
}

UserButton.propTypes = {
  username: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectCurrentUser(),
});

export default connect(
  mapStateToProps,
  null,
)(UserButton);
