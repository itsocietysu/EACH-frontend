/*
 *
 * OptionsList
 *
 */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import LinkList from 'components/LinkList';
import Wrapper from './Wrapper';
import messages from './messages';

const appOptions = ['museums', 'smth'];

class OptionsToggle extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <LinkList values={appOptions} messages={messages} />
      </Wrapper>
    );
  }
}

export default OptionsToggle;
