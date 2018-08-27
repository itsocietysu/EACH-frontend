/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import HeaderLink from '../Header/HeaderLink';
import messages from '../Header/messages';
import LocaleToggle from '../../containers/LocaleToggle';
import '../Header/index.css';
import './index.css';

class HeaderSimply extends React.Component {
  render() {
    return (
      <div className="navBar">
        <div>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
        </div>
        <section className="toggleSimply">
          <LocaleToggle />
        </section>
      </div>
    );
  }
}

export default HeaderSimply;
