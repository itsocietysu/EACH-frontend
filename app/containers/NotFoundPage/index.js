/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import H1 from '../../components/H1';
import messages from './messages';

import { withRequest } from '../../utils/auth';

export function NotFound() {
  return (
    <article>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    </article>
  );
}

export default compose(withRequest)(NotFound);
