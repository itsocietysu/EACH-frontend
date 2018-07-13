/*
 * LoginPage
 *
 * This is the '/login' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectCorrectLogin,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import Link from './Link';
import messages from './messages';
import { checkLogin } from '../App/actions';
import { changeUsername, changePassword } from './actions';
import { makeSelectUsername, makeSelectPassword } from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.PureComponent {
  render() {
    return (
      <article>
        <Helmet>
          <title>Login Page</title>
          <meta name="description" content="An EACH application loginpage" />
        </Helmet>
        <div>
          <CenteredSection>
            <Form>
              <label htmlFor="username">
                <FormattedMessage {...messages.login}>
                  {placeholder => (
                    <Input
                      id="username"
                      type="text"
                      placeholder={placeholder}
                      value={this.props.username}
                      onChange={this.props.onChangeUsername}
                    />
                  )}
                </FormattedMessage>
              </label>
              <br />
              <label htmlFor="password">
                <FormattedMessage {...messages.password}>
                  {placeholder => (
                    <Input
                      id="password"
                      type="password"
                      placeholder={placeholder}
                      value={this.props.password}
                      onChange={this.props.onChangePassword}
                    />
                  )}
                </FormattedMessage>
              </label>
              <br />
              <label htmlFor="signIn">
                <FormattedMessage {...messages.signIn}>
                  {placeholder => (
                    <Button
                      id="signIn"
                      type="submit"
                      value={placeholder}
                      onClick={this.props.onSubmitForm}
                    />
                  )}
                </FormattedMessage>
              </label>
            </Form>
            <Link to="/registration">
              <FormattedMessage {...messages.registration} />
            </Link>
          </CenteredSection>
        </div>
      </article>
    );
  }
}

LoginPage.propTypes = {
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
  password: PropTypes.string,
  onChangePassword: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(checkLogin());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  password: makeSelectPassword(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
