/* eslint-disable import/first,react/no-children-prop,react/prefer-stateless-function */
/*
 * NewsPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
import PopupEl from 'containers/EditNews';
import { loadFeeds } from 'containers/HomePage/actions';
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
        <H1 style={{ float: 'left' }}>
          <FormattedMessage {...messages.header} />
        </H1>
        <Popup
          trigger={
            <img
              src="https://vk.com/images/post_more.png?1"
              alt=""
              style={{
                width: '3%',
                float: 'left',
                marginLeft: '3em',
                marginTop: '3em',
              }}
            />
          }
          closeOnDocumentClick
          position="bottom center"
          arrowStyle={{
            border: '2px solid rgb(217, 146, 92)',
            borderLeft: 'none',
            borderTop: 'none',
          }}
          contentStyle={{
            boxShadow: 'none',
            width: '150px',
            padding: '0px',
            border: 'none',
          }}
        >
          <Nav>
            <PopupEl
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
        </Popup>
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

const withSaga = injectSaga({ key: 'news', saga });

export default compose(
  withSaga,
  withConnect,
)(NewsPage);
