/*
 *
 * OptionsList
 *
 */
/* eslint-disable react/prefer-stateless-function,react/prop-types */
import React from 'react';

import LinkList from 'containers/LinkList';
import Wrapper from './Wrapper';
import messages from './messages';

const userOptions = ['museums'];
const adminOptions = ['museums', 'editNews'];

class OptionsToggle extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <LinkList
          values={
            this.props.accessType === 'admin' ? adminOptions : userOptions
          }
          messages={messages}
        />
      </Wrapper>
    );
  }
}

export default OptionsToggle;
