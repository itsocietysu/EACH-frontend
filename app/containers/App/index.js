/* eslint-disable react/prop-types,react/no-array-index-key */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import routes from '../../utils/routeConfig';
import CookieBanner from '../CookieBanner';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
  background-color: white;
`;

export default function App() {
  return (
    <div>
      <CookieBanner />
      <AppWrapper>
        <Helmet titleTemplate="%s - EACH" defaultTitle="EACH">
          <meta name="description" content="An EACH application" />
        </Helmet>
        <Switch>
          {routes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </AppWrapper>
    </div>
  );
}
