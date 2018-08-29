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

import injectSaga from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';
import { getLogined, getSession } from 'cookieManager';
import {
  makeSelectErrors,
  makeSelectLoading,
  makeSelectCurrentUser,
} from 'containers/App/selectors';
import { getUserData, clearError } from 'containers/App/actions';
import saga from 'containers/App/saga';

class AuthComponent extends React.Component {
  componentWillMount() {
    this.props.init();
  }
  render() {
    const { loading, errors, component: Component, user } = this.props;
    const error = errors.filter(element => element.source === 'user');
    if (error.length) return <Redirect to="/" />;
    if (loading) return <LoadingIndicator />;
    if (user.name) return <Component />;
    return null;
  }
}

AuthComponent.propTypes = {
  component: PropTypes.func.isRequired,
  init: PropTypes.func,
  loading: PropTypes.bool,
  errors: PropTypes.any,
  user: PropTypes.object,
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

const withSaga = injectSaga({ key: 'authRoute', saga });

export const Auth = compose(
  withSaga,
  withConnect,
)(AuthComponent);

const AuthRoute = ({ component: Component, ...rest }) => {
  if (getLogined() !== 'true' || !getSession()) return <Redirect to="/" />;
  return (
    <Route
      {...rest}
      component={params => <Auth component={() => <Component {...params} />} />}
    />
  );
};

export default AuthRoute;
