import React from 'react';

import PageLayout from '../components/PageLayout';
import Header from '../components/Header';
import Footer from '../components/Footer';

import HomePage from '../containers/HomePage/Loadable';
import FeaturePage from '../containers/FeaturePage/Loadable';
import MuseumsPage from '../containers/MuseumsPage/Loadable';
import AuthPage from '../containers/AuthPage/Loadable';
import EditNewsPage from '../containers/EditNewsPage/Loadable';
import EditMuseumsPage from '../containers/EditMuseumsPage/Loadable';
import NewsPage from '../containers/NewsPage/Loadable';
import NotFoundPage from '../containers/NotFoundPage/Loadable';

import { parseQueryString } from './utils';

class Route {
  path: string;
  exact: boolean;
  component: any;
}

function Page(header, component, footer, headerProps, componentProps) {
  return (
    <PageLayout
      header={header}
      component={component}
      footer={footer}
      headerProps={headerProps}
      componentProps={componentProps}
    />
  );
}

const HomeRoute = (() => {
  const r = new Route();
  r.path = '/';
  r.exact = true;
  r.component = () => Page(Header, HomePage, Footer, { user: true });
  return r;
})();

const FeatureRoute = (() => {
  const r = new Route();
  r.path = '/features';
  r.exact = false;
  r.component = () =>
    Page(Header, FeaturePage, Footer, { user: true, simple: true });
  return r;
})();

const MuseumsRoute = (() => {
  const r = new Route();
  r.path = '/museums';
  r.exact = false;
  r.component = ({ location }) =>
    Page(
      Header,
      MuseumsPage,
      Footer,
      { user: true, simple: true },
      { search: parseQueryString(location.search.substring(1)) },
    );
  return r;
})();

const EditNewsRoute = (() => {
  const r = new Route();
  r.path = '/edit/news';
  r.exact = false;
  r.component = ({ location }) =>
    Page(
      Header,
      EditNewsPage,
      Footer,
      { user: true, simple: true },
      { search: parseQueryString(location.search.substring(1)) },
    );
  return r;
})();

const EditMuseumsRoute = (() => {
  const r = new Route();
  r.path = '/edit/museums';
  r.exact = false;
  r.component = ({ location }) =>
    Page(
      Header,
      EditMuseumsPage,
      Footer,
      { user: true, simple: true },
      { search: parseQueryString(location.search.substring(1)) },
    );
  return r;
})();

const NewsRoute = (() => {
  const r = new Route();
  r.path = '/news/:newsId';
  r.exact = false;
  r.component = ({ match }) =>
    Page(Header, NewsPage, Footer, { simple: true }, match.params);
  return r;
})();

const AuthRoute = (() => {
  const r = new Route();
  r.path = '/auth';
  r.exact = false;
  r.component = () => Page(null, AuthPage, null);
  return r;
})();

const NotFoundRoute = (() => {
  const r = new Route();
  r.path = '';
  r.exact = false;
  r.component = () =>
    Page(Header, NotFoundPage, Footer, { user: true, simple: true });
  return r;
})();

const routes: Array<Route> = [
  HomeRoute,
  FeatureRoute,
  MuseumsRoute,
  EditNewsRoute,
  EditMuseumsRoute,
  NewsRoute,
  AuthRoute,
  NotFoundRoute,
];

export default routes;
