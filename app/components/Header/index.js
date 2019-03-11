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
        <section className="toggle">
          <LocaleToggle />
        </section>
        <div className="navBar">
          <div className="divNavBar">
            <HeaderLink to="/">
              <Img src="/logo.svg" alt="MUSEEACH - Logo" />
              <H1>МУЗЕИЧ</H1>
            </HeaderLink>
            {this.props.back && (
              <Button
                borderRadius="4px"
                borderWidth="2px"
                onClick={this.props.history.goBack}
              >
                <FormattedMessage {...messages.back} />
              </Button>
            )}
          </div>
          <UserButton />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  back: PropTypes.bool,
};

export default withRouter(Header);
