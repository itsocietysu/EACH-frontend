/* eslint-disable react/prefer-stateless-function,react/no-children-prop */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from '../../components/A';
import H3 from '../../components/H3';
import messages from './messages';
import './index.css';
import { getLocale } from '../../cookieManager';

const cookieUri = {
  RU: 'https://ru.wikipedia.org/wiki/Cookie',
  EN: 'https://en.wikipedia.org/wiki/HTTP_cookie',
};

export class CookieBanner extends React.Component {
  constructor(props) {
    super(props);

    const cookie = localStorage.getItem('cookie-agreed');
    this.state = { show: cookie !== '1', close: false };
  }

  render() {
    if (this.state.show)
      return (
        <div className={`cookie-banner ${this.state.close ? 'close' : 'open'}`}>
          <div className="notification">
            <H3>
              <FormattedMessage {...messages.cookie} />
            </H3>
            <A href={cookieUri[getLocale()]}>
              <H3>
                <FormattedMessage {...messages.more} />
              </H3>
            </A>
          </div>
          <div className="agree">
            <div>
              <i className="fas fa-caret-right" />
            </div>
            <button
              onClick={() => {
                localStorage.setItem('cookie-agreed', '1');
                this.setState({ show: true, close: true });
              }}
              children={
                <H3>
                  <FormattedMessage {...messages.agree} />
                </H3>
              }
            />
          </div>
        </div>
      );
    return <div />;
  }
}

export default CookieBanner;
