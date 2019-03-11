/*
 * MuseumsEditPage
 *
 * This is page of one museum for editing quests, at the '/museum/:museumId' route
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
import { loadMuseum } from './actions';
import reducer from './reducer';
import saga from './saga';
import { withAuthAdmin } from '../../utils/auth';

export class MuseumPage extends React.Component {
  componentDidMount() {
    if (String(this.props.museumId) !== this.props.data.eid)
      this.props.init(this.props.museumId);
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
          <title>Museums Edit Page</title>
          <meta
            name="description"
            content="An EACH application museum page for editing quests"
          />
        </Helmet>
        <DataList {...dataListProps} />
      </article>
    );
  }
}

MuseumPage.propTypes = {
  museumId: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  init: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    init: eid => dispatch(loadMuseum(eid)),
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

const withReducer = injectReducer({ key: 'museumId', reducer });
const withSaga = injectSaga({ key: 'museumId', saga });

export default compose(
  withAuthAdmin,
  withReducer,
  withSaga,
  withConnect,
)(MuseumPage);
