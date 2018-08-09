/* eslint-disable react/no-children-prop,react/prop-types,react/prefer-stateless-function */
/*
 *
 * LinkList
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

import Button from 'components/Button';
import LogoutButton from 'containers/LogoutButton';

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

export default withRouter(LinkList);
