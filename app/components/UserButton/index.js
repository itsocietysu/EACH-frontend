/* eslint-disable react/prop-types,react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';

import { getLogined } from 'cookieManager';

import injectSaga from 'utils/injectSaga';
import LoginButton from 'containers/LoginButton';
import UserPanel from 'containers/UserPanel';
import { getUserData } from 'containers/App/actions';
import saga from 'containers/App/saga';
import { compose } from 'redux';

class UserButton extends React.Component {
  componentWillMount() {
    if (getLogined() === 'true') this.props.onAuth();
  }
  render() {
    if (getLogined() === 'true' && this.props.user.get('name') !== '')
      return (
        <UserPanel
          username={this.props.user.get('name')}
          accessType={this.props.user.get('accessType')}
        />
      );
    return <LoginButton />;
  }
}

UserButton.propTypes = {
  user: PropTypes.object,
  onAuth: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onAuth: () => dispatch(getUserData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'user', saga });

export default compose(
  withSaga,
  withConnect,
)(UserButton);
