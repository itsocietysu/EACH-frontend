/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import HeaderLink from './HeaderLink';
import messages from './messages';
import Logo from './logo.png';
import LocaleToggle from '../../containers/LocaleToggle';
import UserButton from '../../components/UserButton';
import './index.css';

class Header extends React.Component {
  render() {
    return (
      <div>
        <section className="toggle">
          <LocaleToggle />
        </section>
        <A>
          <Img src={Logo} alt="MUSEEACH - Logo" />
        </A>
        <div className="navBar">
          <div>
            <HeaderLink to="/">
              <FormattedMessage {...messages.home} />
            </HeaderLink>
          </div>
          <UserButton />
        </div>
      </div>
    );
  }
}

export default Header;
