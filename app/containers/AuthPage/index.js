/* eslint-disable react/prefer-stateless-function */
/*
 * AuthPage
 *
 * This is the page for getting token
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import LoadingIndicator from '../../components/LoadingIndicator';
import P from '../../components/P';
import { getToken } from './oauth2-authorize';

const PStyle = {
  textAlign: 'center',
};

export default class AuthPage extends React.Component {
  componentDidMount() {
    getToken();
  }
  render() {
    return (
      <article>
        <Helmet>
          <title>Auth Page</title>
          <meta name="description" content="An EACH application auth page" />
        </Helmet>
        <P style={PStyle}>Authorization</P>
        <LoadingIndicator />
      </article>
    );
  }
}
