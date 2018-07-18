/*
 *
 * LinkList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import LogoutButton from 'containers/LogoutButton';
import LinkL from './Link';
import Nav from './Nav';
import Ul from './Ul';

function LinkList(props) {
  let content = <li>--</li>;

  // If we have items, render them
  if (props.values) {
    content = props.values.map(value => (
      <li key={value}>
        <LinkL to={`/${value}`}>
          <FormattedMessage {...props.messages[value]} />
        </LinkL>
      </li>
    ));
  }

  return (
    <Nav>
      <Ul>{content}</Ul>
      <LogoutButton />
    </Nav>
  );
}

LinkList.propTypes = {
  values: PropTypes.array,
  messages: PropTypes.object,
};

export default LinkList;
