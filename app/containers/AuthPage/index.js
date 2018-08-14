/* eslint-disable react/prefer-stateless-function */
/*
 * AuthPage
 *
 * This is the page for getting token
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';
import { getToken } from './actions';
import reducer from './reducer';
import saga from './saga';

export class AuthPage extends React.Component {
  componentWillMount() {
    this.props.auth();
  }
  render() {
    return (
      <article>
        <Helmet>
          <title>Auth Page</title>
          <meta name="description" content="An EACH application auth page" />
        </Helmet>
        <LoadingIndicator />
      </article>
    );
  }
}

AuthPage.propTypes = {
  auth: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    auth: () => dispatch(getToken()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AuthPage);
