/*
 * MuseumsPage
 *
 * List all the museums
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { withAuth } from '../../utils/auth';
import {
  makeSelectCount,
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
  makeSelectPage,
} from './selectors';
import messages from './messages';
import H1 from '../../components/H1';
import { PageList } from '../PageList';
import DataList from '../../components/DataList';
import MuseumListItem from '../MuseumListItem';
import { loadMuseums } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class MuseumsPage extends React.Component {
  componentDidMount() {
    const page = this.props.search.page ? Number(this.props.search.page) : 1;
    this.props.init(page);
  }
  componentDidUpdate(prevProps) {
    const page = this.props.search.page ? Number(this.props.search.page) : 1;
    const prevPage = prevProps.search.page ? Number(prevProps.search.page) : 1;
    if (prevPage !== page && page !== this.props.page) this.props.init(page);
  }

  render() {
    const pageUrl = this.props.search.page ? Number(this.props.search.page) : 1;
    const { loading, error, data, count, page } = this.props;
    const maxPage = Math.ceil(this.props.count / 10.0);
    if (data && pageUrl !== page && (pageUrl <= 0 || pageUrl > maxPage))
      return <Redirect to={`?page=${page}`} />;
    const dataListProps = {
      loading,
      error,
      data,
      component: MuseumListItem,
      scroll: true,
    };
    return (
      <article>
        <Helmet>
          <title>Museums Page</title>
          <meta name="description" content="Museums page of EACH application" />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <PageList countElements={count} elementsPerPage={10} />
        <DataList {...dataListProps} />
      </article>
    );
  }
}

MuseumsPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  init: PropTypes.func,
  count: PropTypes.number,
  search: PropTypes.object,
  page: PropTypes.number,
};

export function mapDispatchToProps(dispatch) {
  return {
    init: page => dispatch(loadMuseums(page)),
  };
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  count: makeSelectCount(),
  page: makeSelectPage(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'museums', reducer });
const withSaga = injectSaga({ key: 'museums', saga });

export default compose(
  withAuth,
  withReducer,
  withSaga,
  withConnect,
)(MuseumsPage);
