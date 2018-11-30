/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the .htaccess file
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions

// Load the images
import '!file-loader?name=[name].[ext]&outputPath=images/!./images/favicon.ico';
import '!file-loader?name=[name].[ext]&outputPath=images/!./images/logo.svg';
import '!file-loader?name=[name].[ext]&outputPath=images/!./images/logo-vk.png';
import '!file-loader?name=[name].[ext]&outputPath=images/!./images/logo-google.png';
import '!file-loader?name=[name].[ext]&outputPath=images/!./images/border_top.PNG';
import '!file-loader?name=[name].[ext]&outputPath=images/!./images/Photo.png';

// Load the fonts
import '!file-loader?name=[name].[ext]&outputPath=fonts/header/!./fonts/header/font.ttf';
import '!file-loader?name=[name].[ext]&outputPath=fonts/header/!./fonts/header/font.woff';
import '!file-loader?name=[name].[ext]&outputPath=fonts/header/!./fonts/header/font.woff2';

import '!file-loader?name=[name].[ext]&outputPath=fonts/title/!./fonts/title/font.ttf';
import '!file-loader?name=[name].[ext]&outputPath=fonts/title/!./fonts/title/font.woff';
import '!file-loader?name=[name].[ext]&outputPath=fonts/title/!./fonts/title/font.woff2';

import '!file-loader?name=[name].[ext]&outputPath=fonts/text/!./fonts/text/font.ttf';
import '!file-loader?name=[name].[ext]&outputPath=fonts/text/!./fonts/text/font.woff';
import '!file-loader?name=[name].[ext]&outputPath=fonts/text/!./fonts/text/font.woff2';

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './global-styles';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/ru.js'),
      ]),
    )
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
