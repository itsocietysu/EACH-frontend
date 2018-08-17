/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import P from 'components/P';
import PageLayout from 'components/PageLayout';
import Header from 'components/Header';
import Footer from 'components/Footer';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';

export class FeaturePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Feature Page</title>
          <meta name="description" content="Feature page of EACH application" />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <List>
          <ListItem>
            <ListItemTitle>
              <FormattedMessage {...messages.textHeader} />
            </ListItemTitle>
            <P>
              <FormattedMessage {...messages.textMessage} />
            </P>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default function() {
  return <PageLayout header={Header} component={FeaturePage} footer={Footer} />;
}
