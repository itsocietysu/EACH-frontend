/* eslint-disable react/prefer-stateless-function,react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

import Img from './Img';
import HeaderLink from './HeaderLink';
import messages from './messages';
import LocaleToggle from '../../containers/LocaleToggle';
import UserButton from '../../components/UserButton';
import H1 from '../../components/H1';
import Button from '../../containers/UserPanel/Button';
import './index.css';

class Header extends React.Component {
  render() {
    return (
      <div>
        {this.props.user && (
          <section className="toggle">
            <LocaleToggle />
          </section>
        )}
        <div className="navBar">
          <div className="divNavBar">
            <HeaderLink to="/">
              <Img src="/images/logo.svg" alt="MUSEEACH - Logo" />
              <H1>МУЗЕИЧ</H1>
            </HeaderLink>
            {this.props.back && (
              <Button onClick={this.props.history.goBack}>
                <FormattedMessage {...messages.back} />
              </Button>
            )}
          </div>
          {this.props.user ? (
            <UserButton />
          ) : (
            <section className="toggleSimple">
              <LocaleToggle />
            </section>
          )}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.bool,
  simple: PropTypes.bool,
  back: PropTypes.bool,
};

export default withRouter(Header);
