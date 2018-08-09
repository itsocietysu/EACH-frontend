/* eslint-disable import/first */
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

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
} from './selectors';
import H1 from 'components/H1';
import messages from './messages';
import DataList from 'components/DataList';
import FeedsListItem from 'containers/FeedListItem';
import { loadFeeds } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { loading, error, data } = this.props;
    const dataListProps = {
      loading,
      error,
      data,
      component: FeedsListItem,
    };
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="An EACH application homepage" />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.feeds} />
        </H1>
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
};

export function mapDispatchToProps(dispatch) {
  return {
    init: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadFeeds());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'feeds', reducer });
const withSaga = injectSaga({ key: 'feeds', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
