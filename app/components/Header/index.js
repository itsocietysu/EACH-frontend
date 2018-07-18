/* eslint-disable import/first,react/prop-types,react/jsx-no-bind */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import HeaderButton from './HeaderButton';
import messages from './messages';
import Logo from './logo.png';
import LocaleToggle from 'containers/LocaleToggle';
import OptionsToggle from 'containers/OptionsToggle';
import DivVisible from './DivVisible';
import DivHidden from './DivHidden';

function Login(props) {
  let content = (
    <DivHidden>
      <OptionsToggle />
    </DivHidden>
  );

  if (props.show)
    content = (
      <DivVisible>
        <OptionsToggle />
      </DivVisible>
    );

  if (!props.user) {
    return (
      <div style={{ float: 'right' }}>
        <label htmlFor="Login">
          <FormattedMessage {...messages.login}>
            {placeholder => (
              <HeaderButton
                id="Login"
                type="submit"
                value={placeholder}
                onClick={props.onLogin}
              />
            )}
          </FormattedMessage>
        </label>
      </div>
      /* <HeaderLink to="/login">
        <FormattedMessage {...messages.login} />
      </HeaderLink> */
    );
  }
  return (
    <div style={{ float: 'right' }}>
      <label htmlFor="User">
        <FormattedMessage {...messages.user} values={{ user: props.user }}>
          {placeholder => (
            <HeaderButton
              id="User"
              type="submit"
              value={placeholder}
              onClick={props.onClick}
            />
          )}
        </FormattedMessage>
      </label>
      {content}
    </div>
  );
}

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, username: '' };
  }

  onClick() {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  onLogin() {
    this.setState({
      username: 'Admin',
    });
  }

  render() {
    return (
      <div>
        <section style={{ float: 'right' }}>
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
          <Login
            onLogin={this.onLogin.bind(this)}
            onClick={this.onClick.bind(this)}
            show={this.state.show}
            user={this.state.username}
          />
        </NavBar>
      </div>
    );
  }
}

export default Header;
