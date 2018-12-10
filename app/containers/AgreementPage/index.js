/*
 * AgreementPage
 *
 * Static page with user agreement
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from '../../components/H1';
import messages from './messages';
import { withRequest } from '../../utils/auth';

export class AgreementPage extends React.Component {
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>User Agreement Page</title>
          <meta
            name="description"
            content="User agreement page of EACH application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <p>
          <FormattedMessage {...messages.agreement} />
        </p>
      </div>
    );
  }
}

export default withRequest(AgreementPage);
