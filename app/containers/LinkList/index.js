/* eslint-disable react/no-children-prop,react/prop-types,react/prefer-stateless-function */
/*
 *
 * LinkList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import Button from 'components/Button';
import LogoutButton from 'containers/LogoutButton';
import { showChanged } from 'containers/UserPanel/actions';

import Nav from './Nav';
import Ul from './Ul';

class LinkList extends React.Component {
  render() {
    let content = <div />;

    // If we have items, render them
    if (this.props.values) {
      content = this.props.values.map(value => (
        <Button
          key={value}
          onClick={() => {
            this.props.onClick();
            this.props.history.push(`/${value}`);
          }}
          children={<FormattedMessage {...this.props.messages[value]} />}
        />
      ));
    }
    return (
      <Nav>
        <Ul>
          {content}
          <LogoutButton />
        </Ul>
      </Nav>
    );
  }
}

LinkList.propTypes = {
  onClick: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onClick: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(showChanged(false));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(LinkList);
