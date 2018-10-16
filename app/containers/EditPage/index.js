/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
/*
 *
 * EditPage
 *
 * Page for editing all
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
import { Redirect } from 'react-router-dom';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { withAuthAdmin } from '../../utils/auth';
import {
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
  makeSelectCount,
  makeSelectPage,
} from './selectors';
import { PageList } from '../PageList';
import Button from '../../components/Button';
import Nav from '../LinkList/Nav';
import DataList from '../../components/DataList';
import Form from '../EditForm';
import { loadData, deleteData, sendData, setContent } from './actions';
import EditListItem, { arrowStyle, contentStyle } from '../EditListItem';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

import { settings, emptyItems } from './configs';

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const refreshStyle = {
  maxWidth: '27px',
  cursor: 'pointer',
};

export class EditPage extends React.Component {
  constructor(props) {
    super(props);
    props.init(props.content);
    this.state = { content: props.content };
  }
  componentDidMount() {
    const page = this.props.search.page ? Number(this.props.search.page) : 1;
    this.props.load(page);
  }
  componentDidUpdate(prevProps) {
    const page = this.props.search.page ? Number(this.props.search.page) : 1;
    const prevPage = prevProps.search.page ? Number(prevProps.search.page) : 1;
    if (prevPage !== page && page !== this.props.page) this.props.load(page);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.content !== state.content) {
      props.init(props.content);
      props.load(1);
    }
    return null;
  }
  componentWillUnmount() {
    this.props.init(this.props.content);
  }
  render() {
    let { data } = this.props;
    const { loading, error, count, page, content, search } = this.props;
    const pageUrl = search.page ? Number(search.page) : 1;
    const maxPage = Math.ceil(count / 10.0);
    if (data && pageUrl !== page && (pageUrl <= 0 || pageUrl > maxPage))
      return <Redirect to={`?page=${page}`} />;
    const setting = settings[content];
    const emptyItem = emptyItems[content];
    if (content !== this.state.content) {
      this.state.content = content;
      data = false;
    }
    const dataListProps = {
      loading,
      error,
      data,
      component: item => (
        <EditListItem
          item={item}
          content={content}
          onDelete={eid => this.props.delete(eid)}
          onUpdate={this.props.send}
          isUpdate={setting.isUpdate}
        />
      ),
      scroll: true,
    };
    return (
      <article>
        <Helmet>
          <title>{`Edit ${content} page`}</title>
          <meta
            name="description"
            content={`Edit ${content} page of EACH application`}
          />
        </Helmet>
        <div style={rowStyle}>
          {setting.addModal ? (
            <Nav>
              <Form
                trigger={
                  <Button>
                    <FormattedMessage {...messages[content].add} />
                  </Button>
                }
                item={emptyItem}
                emptyItem={emptyItem}
                isPopup
                mod="add"
                settings={setting}
                onSubmit={this.props.send}
                isPlaceholder={false}
                flexDirection="column"
              />
            </Nav>
          ) : (
            <Popup
              trigger={
                <Nav>
                  <Button>
                    <FormattedMessage {...messages[content].add} />
                  </Button>
                </Nav>
              }
              arrowStyle={arrowStyle}
              contentStyle={contentStyle('50em')}
              position="bottom center"
            >
              <Nav style={{ left: '0', position: 'absolute' }}>
                <Form
                  item={emptyItem}
                  emptyItem={emptyItem}
                  mod="add"
                  settings={setting}
                  onSubmit={this.props.send}
                  isPlaceholder
                  flexDirection="row"
                />
              </Nav>
            </Popup>
          )}
          <Nav>
            <img
              style={refreshStyle}
              src="/Refresh.png"
              alt="Refresh"
              onClick={() => this.props.load(page)}
            />
          </Nav>
        </div>
        <PageList countElements={count} elementsPerPage={10} />
        <DataList {...dataListProps} />
      </article>
    );
  }
}

EditPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  count: PropTypes.number,
  page: PropTypes.number,
  init: PropTypes.func,
  load: PropTypes.func,
  delete: PropTypes.func,
  send: PropTypes.func,
  search: PropTypes.object,
  content: PropTypes.oneOf(['museum', 'feed', 'location']),
};

export function mapDispatchToProps(dispatch) {
  return {
    init: content => dispatch(setContent(content)),
    load: page => dispatch(loadData(page)),
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

const withReducer = injectReducer({ key: 'editDataPage', reducer });
const withSaga = injectSaga({ key: 'editDataPage', saga });

export default compose(
  withAuthAdmin,
  withReducer,
  withSaga,
  withConnect,
)(EditPage);
