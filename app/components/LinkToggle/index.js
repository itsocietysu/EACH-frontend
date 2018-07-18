/*
 *
 * LinkToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import LinkL from './Link';
import Nav from './Nav';
import Ul from './Ul';

function LinkToggle(props) {
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
    </Nav>
  );
}

LinkToggle.propTypes = {
  values: PropTypes.array,
  messages: PropTypes.object,
};

export default LinkToggle;
