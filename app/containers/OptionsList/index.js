/*
 *
 * OptionsList
 *
 */
/* eslint-disable react/prefer-stateless-function,react/prop-types */
import React from 'react';

import LinkList from 'containers/LinkList';
import Wrapper from './Wrapper';
import { userLinks, adminLinks } from './linkConfig';

class OptionsList extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <LinkList
          values={this.props.accessType === 'admin' ? adminLinks : userLinks}
        />
      </Wrapper>
    );
  }
}

export default OptionsList;
