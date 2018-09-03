/* eslint-disable react/no-children-prop,react/prop-types,react/prefer-stateless-function,jsx-a11y/anchor-is-valid */
/*
 *
 * FunctionList
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '../../components/Button';
import Nav from '../LinkList/Nav';
import Ul from '../LinkList/Ul';

class FunctionList extends React.Component {
  render() {
    let content = <div />;

    // If we have items, render them
    if (this.props.values) {
      content = this.props.values.map(value => (
        <Button
          key={value.name}
          children={<FormattedMessage {...value.message} />}
          onClick={value.func}
        />
      ));
    }
    return (
      <Nav>
        <Ul>{content}</Ul>
      </Nav>
    );
  }
}

export default FunctionList;
