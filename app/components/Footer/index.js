/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from '../A';
import HeaderLink from '../Header/HeaderLink';
import Wrapper from './Wrapper';
import messages from './messages';
import messagesAgreement from '../../containers/AgreementPage/messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <HeaderLink to="/user_agreement">
          <FormattedMessage {...messagesAgreement.header} />
        </HeaderLink>
      </section>
      <section>
        <FormattedMessage
          {...messages.author}
          values={{
            author: <A href="https://itsociety.su">ITS</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
