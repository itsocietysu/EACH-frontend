/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { withRequest } from '../../utils/auth';
import {
  makeSelectContent,
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
} from './selectors';
import H1 from '../../components/H1';
import messages from './messages';
import mMessages from '../MuseumsPage/messages';
import DataList from '../../components/DataList';
import FeedsListItem from '../../containers/FeedListItem';
import { contentChanged, loadData } from './actions';
import reducer from './reducer';
import saga from './saga';
import { FEED_CFG, MUSEUM_CFG } from '../EditPage/configs';
import { colors } from '../../utils/constants';

const styleButton = {
  position: 'absolute',
  cursor: 'pointer',
  outline: 'none',
};

const styleButtonFeed = color =>
  Object.assign(
    {
      right: '50vw',
      color,
    },
    styleButton,
  );

const styleButtonMuseum = color =>
  Object.assign(
    {
      left: '50vw',
      color,
    },
    styleButton,
  );

function separateData(data) {
  const derData = [];
  let item = [];
  data.forEach(element => {
    const len = item.push(element);
    if (len === 2) {
      derData.push(item);
      item = [];
    }
  });
  if (item.length) derData.push(item);
  return derData;
}

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  componentDidMount() {
    this.props.init();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.homeContent !== this.props.homeContent) this.props.init();
  }

  render() {
    const { loading, error, data, homeContent } = this.props;
    const setData = data ? separateData(data) : false;
    const dataListProps = {
      loading,
      error,
      data: setData,
      component: FeedsListItem,
      scroll: false,
      array: true,
    };
    const colorFeed = homeContent === FEED_CFG ? `${colors.base}` : '#000';
    const colorMuseum = homeContent === MUSEUM_CFG ? `${colors.base}` : '#000';
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="An EACH application homepage" />
        </Helmet>
        <div style={{ height: '3em', textAlign: 'center' }}>
          <button
            style={styleButtonFeed(colorFeed)}
            onClick={() => this.props.change(FEED_CFG)}
          >
            <H1 style={{ marginTop: '0.25em' }}>
              <FormattedMessage {...messages.feeds} />
            </H1>
          </button>
          <button
            style={styleButtonMuseum(colorMuseum)}
            onClick={() => this.props.change(MUSEUM_CFG)}
          >
            <H1 style={{ marginTop: '0.25em' }}>
              <FormattedMessage {...mMessages.header} />
            </H1>
          </button>
          <img
            src="/images/separator.PNG"
            alt=""
            style={{ height: 'inherit' }}
          />
        </div>
        <DataList {...dataListProps} />
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  init: PropTypes.func,
  change: PropTypes.func,
  homeContent: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    init: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadData());
    },
    change: content => {
      dispatch(contentChanged(content));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  homeContent: makeSelectContent(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withRequest,
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
