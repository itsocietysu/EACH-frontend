/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import HeaderLink from '../Header/HeaderLink';
import messages from '../Header/messages';
import LocaleToggle from '../../containers/LocaleToggle';
import UserButton from '../UserButton';
import '../Header/index.css';
import './index.css';

class HeaderSimple extends React.Component {
  render() {
    return (
      <div>
        {this.props.user && (
          <section className="toggle">
            <LocaleToggle />
          </section>
        )}
        <div className="navBar">
          <div>
            <HeaderLink to="/">
              <FormattedMessage {...messages.home} />
            </HeaderLink>
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

HeaderSimple.propTypes = { user: PropTypes.bool };

export default HeaderSimple;
