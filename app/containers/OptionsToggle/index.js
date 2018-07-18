/*
 *
 * OptionsToggle
 *
 */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import LinkToggle from 'components/LinkToggle';
import Wrapper from './Wrapper';
import messages from './messages';

const appOptions = ['museums', 'smth'];

class OptionsToggle extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <LinkToggle values={appOptions} messages={messages} />
      </Wrapper>
    );
  }
}

export default OptionsToggle;
