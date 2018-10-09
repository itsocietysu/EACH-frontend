/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
/*
 * EditNewsPage
 *
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
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
  makeSelectCount,
  makeSelectPage,
} from '../HomePage/selectors';
import { PageList } from '../PageList';
import Button from '../../components/Button';
import Nav from '../LinkList/Nav';
import H1 from '../../components/H1';
import DataList from '../../components/DataList';
import Form from '../EditForm';
import { loadFeeds } from '../HomePage/actions';
import EditListItem from '../EditListItem';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { deleteData, sendData } from './actions';

const emptyItem = {
  eid: '0',
  image: '',
  title: { RU: '', EN: '' },
  text: { RU: '', EN: '' },
  desc: { RU: '', EN: '' },
  priority: '0',
};

const settings = {
  locales: [
    {
      field: 'title',
      rows: '2',
    },
    {
      field: 'desc',
      rows: '2',
    },
    {
      field: 'text',
      rows: '5',
    },
  ],
  images: [
    {
      field: 'image',
    },
  ],
  numbers: [
    {
      field: 'priority',
      format: 'int',
    },
  ],
  news: true,
  title: 'title',
};

export const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
};

export const refreshStyle = {
  maxWidth: '27px',
  cursor: 'pointer',
};

export class EditNewsPage extends React.Component {
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
      component: item => (
        <EditListItem
          item={item}
          settings={settings}
          onDelete={eid => this.props.delete(eid)}
          onUpdate={this.props.send}
          isUpdate
        />
      ),
      scroll: true,
    };
    return (
      <article>
        <Helmet>
          <title>Edit news page</title>
          <meta
            name="description"
            content="Edit news page of EACH application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <PageList countElements={count} elementsPerPage={10} />
        <div style={rowStyle}>
          <Nav>
            <Form
              trigger={
                <Button>
                  <FormattedMessage {...messages.add} />
                </Button>
              }
              item={emptyItem}
              isPopup
              mod="add"
              settings={settings}
              onSubmit={this.props.send}
              isPlaceholder={false}
              flexDirection="column"
            />
          </Nav>
          <Nav>
            <img
              style={refreshStyle}
              src="/Refresh.png"
              alt="Refresh"
              onClick={() => this.props.init(page)}
            />
          </Nav>
        </div>
        <DataList {...dataListProps} />
      </article>
    );
  }
}

EditNewsPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  count: PropTypes.number,
  page: PropTypes.number,
  init: PropTypes.func,
  delete: PropTypes.func,
  send: PropTypes.func,
  search: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    init: page => dispatch(loadFeeds(page)),
    delete: eid => dispatch(deleteData(eid)),
    send: () => dispatch(sendData()),
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

const withReducer = injectReducer({ key: 'editNewsData', reducer });
const withSaga = injectSaga({ key: 'editNewsData', saga });

export default compose(
  withAuth,
  withReducer,
  withSaga,
  withConnect,
)(EditNewsPage);
