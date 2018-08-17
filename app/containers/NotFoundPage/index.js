/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import PageLayout from 'components/PageLayout';
import Header from 'components/Header';
import Footer from 'components/Footer';
import messages from './messages';

export function NotFound() {
  return (
    <article>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    </article>
  );
}

export default function() {
  return <PageLayout header={Header} component={NotFound} footer={Footer} />;
}
