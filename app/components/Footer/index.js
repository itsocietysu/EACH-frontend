import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section style={{ textAlign: 'right' }}>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <A href="https://itsociety.su/ru/">ITSociety</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
