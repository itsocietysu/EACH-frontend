import React from 'react';

import PageLayout from '../components/PageLayout';
import Header from '../components/Header';
import Footer from '../components/Footer';

import HomePage from '../containers/HomePage/Loadable';
import FeaturePage from '../containers/FeaturePage/Loadable';
import MuseumsPage from '../containers/MuseumsPage/Loadable';
import AuthPage from '../containers/AuthPage/Loadable';
import EditContentPage from '../containers/EditContentPage';
import NewsPage from '../containers/NewsPage/Loadable';
import MuseumsEditPage from '../containers/MuseumsEditPage/Loadable';
import ScenarioEditPage from '../containers/ScenarioEditPage/Loadable';
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
  r.component = () => Page(Header, HomePage, Footer);
  return r;
})();

const FeatureRoute = (() => {
  const r = new Route();
  r.path = '/features';
  r.exact = false;
  r.component = () => Page(Header, FeaturePage, Footer);
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
      {},
      { search: parseQueryString(location.search.substring(1)) },
    );
  return r;
})();

const EditRoute = (() => {
  const r = new Route();
  r.path = '/edit/:content(news|museums|locations)';
  r.exact = false;
  r.component = ({ location, match }) =>
    Page(
      Header,
      EditContentPage,
      Footer,
      {},
      {
        search: parseQueryString(location.search.substring(1)),
        content: match.params.content,
      },
    );
  return r;
})();

const NewsRoute = (() => {
  const r = new Route();
  r.path = '/news/:newsId';
  r.exact = false;
  r.component = ({ match }) => Page(Header, NewsPage, Footer, {}, match.params);
  return r;
})();

const MuseumsEditRoute = (() => {
  const r = new Route();
  r.path = '/museum/edit/:museumId';
  r.exact = false;
  r.component = ({ match }) =>
    Page(Header, MuseumsEditPage, Footer, { back: true }, match.params);
  return r;
})();

const ScenarioEditRoute = (() => {
  const r = new Route();
  r.path = '/scenario/edit/:scenarioId';
  r.exact = false;
  r.component = ({ match }) =>
    Page(Header, ScenarioEditPage, Footer, { back: true }, match.params);
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
  r.component = () => Page(Header, NotFoundPage, Footer);
  return r;
})();

const routes: Array<Route> = [
  HomeRoute,
  FeatureRoute,
  MuseumsRoute,
  EditRoute,
  NewsRoute,
  MuseumsEditRoute,
  ScenarioEditRoute,
  AuthRoute,
  NotFoundRoute,
];

export default routes;
