import React from 'react';

import PageLayout from 'components/PageLayout';
import Header from 'components/Header';
import Footer from 'components/Footer';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import MuseumsPage from 'containers/MuseumsPage/Loadable';
import NewsPage from 'containers/NewsPage/Loadable';
import EditMuseumsPage from 'containers/EditMuseumsPage/Loadable';
import AuthPage from 'containers/AuthPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

class Route {
  path: string;
  exact: boolean;
  auth: boolean;
  component: any;
}

function Page(header, component, footer, props) {
  return (
    <PageLayout
      header={header}
      component={component}
      footer={footer}
      {...props}
    />
  );
}

const HomeRoute = (() => {
  const r = new Route();
  r.path = '/';
  r.exact = true;
  r.auth = false;
  r.component = () => Page(Header, HomePage, Footer);
  return r;
})();

const FeatureRoute = (() => {
  const r = new Route();
  r.path = '/features';
  r.exact = false;
  r.auth = false;
  r.component = () => Page(Header, FeaturePage, Footer);
  return r;
})();

const MuseumRoute = (() => {
  const r = new Route();
  r.path = '/museums';
  r.exact = false;
  r.auth = true;
  r.component = () => Page(Header, MuseumsPage, Footer);
  return r;
})();

const EditMuseumRoute = (() => {
  const r = new Route();
  r.path = '/editMuseums';
  r.exact = false;
  r.auth = true;
  r.component = () => Page(Header, EditMuseumsPage, Footer);
  return r;
})();

const EditNewsRoute = (() => {
  const r = new Route();
  r.path = '/editNews';
  r.exact = false;
  r.auth = true;
  r.component = () => Page(Header, NewsPage, Footer);
  return r;
})();

const AuthRoute = (() => {
  const r = new Route();
  r.path = '/auth';
  r.exact = false;
  r.auth = false;
  r.component = () => Page(null, AuthPage, null);
  return r;
})();

const NotFoundRoute = (() => {
  const r = new Route();
  r.path = '';
  r.exact = false;
  r.auth = false;
  r.component = () => Page(Header, NotFoundPage, Footer);
  return r;
})();

const routes: Array<Route> = [
  HomeRoute,
  FeatureRoute,
  MuseumRoute,
  EditMuseumRoute,
  EditNewsRoute,
  AuthRoute,
  NotFoundRoute,
];

export default routes;
