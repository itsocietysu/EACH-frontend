/* eslint-disable react/prop-types,react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectCurrentUser } from '../../containers/App/selectors';

import { getLogined, getUser } from '../../cookieManager';

import injectSaga from '../../utils/injectSaga';
import LoginButton from '../../containers/LoginButton';
import UserPanel from '../../containers/UserPanel';
import { getUserData } from '../../containers/App/actions';
import saga from '../../containers/App/saga';

class UserButton extends React.Component {
  componentDidMount() {
    if (getLogined() === 'true' && !this.props.user.name) this.props.onAuth();
  }
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
