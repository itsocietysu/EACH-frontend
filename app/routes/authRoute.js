/* eslint-disable react/prop-types,react/prefer-stateless-function */
/*
 * Authorization route
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from '../utils/injectSaga';
import LoadingIndicator from '../components/LoadingIndicator/index';
import { getLogined, getSession } from '../cookieManager';
import {
  makeSelectErrors,
  makeSelectLoading,
  makeSelectCurrentUser,
} from '../containers/App/selectors';
import { getUserData, clearError } from '../containers/App/actions';
import saga from '../containers/App/saga';
import { DAEMON } from '../utils/constants';

class AuthComponent extends React.Component {
  componentWillMount() {
    this.props.user.name = '';
    this.props.init();
  }
  render() {
    const { loading, errors, component: Component, user, isAuth } = this.props;
    const error = errors.filter(element => element.source === 'user');
    if (error.length) return <Redirect to="/" />;
    if (loading && isAuth) return <LoadingIndicator />;
    if (user.name) return <Component />;
    if (isAuth) return null;
    return <Component />;
  }
}

AuthComponent.propTypes = {
  component: PropTypes.func.isRequired,
  init: PropTypes.func,
  loading: PropTypes.bool,
  errors: PropTypes.any,
  user: PropTypes.object,
  isAuth: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    init: () => {
      dispatch(clearError());
      dispatch(getUserData());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'global', saga, mode: DAEMON });

export const Auth = compose(
  withSaga,
  withConnect,
)(AuthComponent);

const AuthRoute = ({ component: Component, isRequest, isAuth, ...rest }) => {
  if (!isRequest)
    return <Route {...rest} component={params => <Component {...params} />} />;
  if (isAuth && (getLogined() !== 'true' || !getSession()))
    return <Redirect to="/" />;
  return (
    <Route
      {...rest}
      component={params => (
        <Auth component={() => <Component {...params} />} isAuth={isAuth} />
      )}
    />
  );
};

export default AuthRoute;
