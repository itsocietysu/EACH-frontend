/* eslint-disable react/prefer-stateless-function */
/*
 * AuthPage
 *
 * This is the page for getting token
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import LoadingIndicator from '../../components/LoadingIndicator';
import H1 from '../../components/H1';
import { getToken } from './oauth2-authorize';
import { colors } from '../../utils/constants';

const PStyle = {
  textAlign: 'center',
  color: colors.base,
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
        <H1 style={PStyle}>Authorization</H1>
        <LoadingIndicator />
      </article>
    );
  }
}
