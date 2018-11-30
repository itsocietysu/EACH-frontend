/* eslint-disable react/prop-types,react/prefer-stateless-function,jsx-a11y/anchor-is-valid */
/*
 *
 * LinkList
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import LogoutButton from '../LogoutButton';

import Link from './Link';
import Nav from './Nav';
import Ul from './Ul';

class LinkList extends React.Component {
  render() {
    let content = <div />;

    // If we have items, render them
    if (this.props.values) {
      content = this.props.values.map(value => (
        <Link key={value.path} to={value.path}>
          <FormattedMessage {...value.message} />
        </Link>
      ));
    }
    return (
      <Nav>
        <Ul flexDirection="column" width="150px">
          {content}
          <LogoutButton />
        </Ul>
      </Nav>
    );
  }
}

export default LinkList;
