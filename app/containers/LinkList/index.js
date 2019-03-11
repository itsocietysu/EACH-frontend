/* eslint-disable react/prop-types,react/prefer-stateless-function,jsx-a11y/anchor-is-valid */
/*
 *
 * LinkList
 *
 */

import React from 'react';

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
          <i className={`fa ${value.icon} fa-2x`} />
        </Link>
      ));
    }
    return (
      <Nav>
        <Ul flexDirection="column" width="46px" className="options-link-list">
          {content}
          <LogoutButton />
        </Ul>
      </Nav>
    );
  }
}

export default LinkList;
