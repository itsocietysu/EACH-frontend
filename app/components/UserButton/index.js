/* eslint-disable react/prop-types,react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';

import { getLogined, getSession } from 'cookieManager';

import LoginButton from 'containers/LoginButton';
import UserPanel from 'containers/UserPanel';
import { writeUsername } from 'containers/App/actions';

class UserButton extends React.Component {
  componentWillMount() {
    // todo: get user's rights by user_id or token
    if (getLogined() === 'true' && getSession() !== 'undefined')
      this.props.onAuth();
  }
  render() {
    // todo: get user's rights by user_id or token
    if (getLogined() === 'true' && getSession() !== 'undefined')
      return <UserPanel username={this.props.username} />;
    return <LoginButton />;
  }
}

UserButton.propTypes = {
  username: PropTypes.string,
  onAuth: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectCurrentUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onAuth: () => {
      // todo: get username by user_id or token
      dispatch(writeUsername('Admin'));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserButton);
