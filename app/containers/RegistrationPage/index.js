/*
 * RegistrationPage
 *
 * This is the '/registration' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';

/* eslint-disable react/prefer-stateless-function */
export class RegistrationPage extends React.PureComponent {

  render() {
    return (
      <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="An EACH application registrationpage"
        />
      </Helmet>
      Try Registration page</article>
    );
  }
}

export default RegistrationPage;
