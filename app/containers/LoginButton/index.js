/* eslint-disable no-unused-vars */
/*
 * LoginButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import Button from './Button';
import messages from './messages';
import { checkLogin } from '../App/actions';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class LoginButton extends React.Component {
  render() {
    return (
      <div style={{ float: 'right', marginRight: '30px' }}>
        <Button type="button" onClick={this.props.onAuth}>
          <FormattedMessage {...messages.login} />
        </Button>
      </div>
    );
  }
}

LoginButton.propTypes = {
  onAuth: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAuth: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(checkLogin());
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withSaga,
  withConnect,
)(LoginButton);
