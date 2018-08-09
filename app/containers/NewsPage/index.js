/* eslint-disable import/first,react/no-children-prop,react/prefer-stateless-function */
/*
 * NewsPage
 *
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
} from 'containers/HomePage/selectors';
import messages from './messages';
import Button from 'components/Button';
import Nav from 'containers/LinkList/Nav';
import H1 from 'components/H1';
import DataList from 'components/DataList';
import NewsListItem from 'containers/NewsListItem';
import Popup from 'containers/EditNews';
import { loadFeeds } from 'containers/HomePage/actions';
import reducer from './reducer';
import saga from './saga';

export class NewsPage extends React.Component {
  componentDidMount() {
    this.props.init();
  }
  render() {
    const { loading, error, data } = this.props;
    const dataListProps = {
      loading,
      error,
      data,
      component: NewsListItem,
    };
    return (
      <article>
        <Helmet>
          <title>News Page</title>
          <meta name="description" content="News page of EACH application" />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <Nav>
          <Popup
            trigger={
              <Button children={<FormattedMessage {...messages.add} />} />
            }
            item={{
              eid: 'addNews',
              image: '',
              title: '',
              text: '',
            }}
            mod="add"
          />
        </Nav>
        <DataList {...dataListProps} />
      </article>
    );
  }
}

NewsPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  init: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(loadFeeds()),
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

const withReducer = injectReducer({ key: 'news', reducer });
const withSaga = injectSaga({ key: 'news', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewsPage);
