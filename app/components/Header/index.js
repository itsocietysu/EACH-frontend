/* eslint-disable import/first,react/prefer-stateless-function */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';
import Logo from './logo.png';
import LocaleToggle from 'containers/LocaleToggle';
import UserButton from 'components/UserButton';

class Header extends React.Component {
  render() {
    return (
      <div>
        <section style={{ textAlign: 'right' }}>
          <LocaleToggle />
        </section>
        <A>
          <Img src={Logo} alt="EACH - Logo" />
        </A>
        <NavBar>
          <div style={{ float: 'left' }}>
            <HeaderLink to="/">
              <FormattedMessage {...messages.home} />
            </HeaderLink>
          </div>
          <div style={{ float: 'left' }}>
            <HeaderLink to="/features">
              <FormattedMessage {...messages.features} />
            </HeaderLink>
          </div>
          <UserButton />
        </NavBar>
      </div>
    );
  }
}

export default Header;
