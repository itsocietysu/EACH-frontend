/*
 * NewsPage
 *
 * This is page of one news, at the '/news/:newsId' route
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import DataList from '../../components/DataList';

import Item from './item';
import {
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
} from './selectors';
import { loadFeed } from './actions';
import reducer from './reducer';
import saga from './saga';

export class NewsPage extends React.Component {
  componentDidMount() {
    if (String(this.props.newsId) !== this.props.data.eid)
      this.props.init(this.props.newsId);
  }
  render() {
    const { loading, error, data } = this.props;
    const dataListProps = {
      loading,
      error,
      data: data ? [data] : false,
      component: Item,
      scroll: false,
    };
    return (
      <article>
        <Helmet>
          <title>News Page</title>
          <meta name="description" content="An EACH application news page" />
        </Helmet>
        <DataList {...dataListProps} />
      </article>
    );
  }
}

NewsPage.propTypes = {
  newsId: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  init: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    init: eid => dispatch(loadFeed(eid)),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  data: makeSelectData(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'feedId', reducer });
const withSaga = injectSaga({ key: 'feedId', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewsPage);
