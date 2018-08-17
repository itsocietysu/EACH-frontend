/* eslint-disable react/prop-types */
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
import { Switch, Route, Redirect } from 'react-router-dom';

import { getLogined, getSession } from 'cookieManager';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import MuseumsPage from 'containers/MuseumsPage/Loadable';
import NewsPage from 'containers/NewsPage/Loadable';
import EditMuseumsPage from 'containers/EditMuseumsPage/Loadable';
import AuthPage from 'containers/AuthPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
  background-color: white;
`;

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={() =>
      getLogined() === 'true' && getSession() ? (
        <Component />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - EACH" defaultTitle="EACH">
        <meta name="description" content="An EACH application" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <AuthRoute path="/museums" component={MuseumsPage} />
        <AuthRoute path="/editNews" component={NewsPage} />
        <AuthRoute path="/editMuseums" component={EditMuseumsPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
    </AppWrapper>
  );
}
