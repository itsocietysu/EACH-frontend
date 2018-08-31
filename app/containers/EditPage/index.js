/* eslint-disable react/no-children-prop,react/prefer-stateless-function,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
/*
 * EditPage
 *
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
import { withAuth } from '../../utils/auth';
import {
  makeSelectData as makeSelectMuseumData,
  makeSelectError as makeSelectMuseumError,
  makeSelectLoading as makeSelectMuseumLoading,
} from '../MuseumsPage/selectors';
import {
  makeSelectData as makeSelectFeedData,
  makeSelectError as makeSelectFeedError,
  makeSelectLoading as makeSelectFeedLoading,
} from '../HomePage/selectors';
import Button from '../../components/Button';
import Nav from '../LinkList/Nav';
import H1 from '../../components/H1';
import DataList from '../../components/DataList';
import Popup from '../EditForm';
import { loadMuseums } from '../MuseumsPage/actions';
import { loadFeeds } from '../HomePage/actions';
import EditListItem from '../EditListItem';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

const emptyItem = {
  eid: '0',
  image: '',
  title: { RU: '', EN: '' },
  text: { RU: '', EN: '' },
  desc: { RU: '', EN: '' },
  priority: '0',
};

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const refreshStyle = {
  maxWidth: '27px',
  cursor: 'pointer',
};

export class EditPage extends React.Component {
  FeedSet = {
    match: 'news',
    messages: {
      header: messages.headerFeed,
      add: messages.addFeed,
    },
    init: this.props.initFeed,
  };

  MuseumSet = {
    match: 'museums',
    messages: {
      header: messages.headerMuseum,
      add: messages.addMuseum,
    },
    init: this.props.initMuseum,
  };

  constructor(props) {
    super(props);
    const { content } = props;
    this.state = { default: {}, another: [] };
    if (content === 'news') {
      this.state.default = this.FeedSet;
      this.state.another = [this.MuseumSet];
    }
    if (content === 'museums') {
      this.state.default = this.MuseumSet;
      this.state.another = [this.FeedSet];
    }
  }
  static getDerivedStateFromProps(props, state) {
    const { content } = props;
    if (content !== state.default.match) {
      const i = state.another.findIndex(
        element => (element.match === content ? element : false),
      );
      const s = state.default;
      const newState = state;
      newState.default = newState.another[i];
      newState.another[i] = s;
      newState.default.init();
      return newState;
    }
    return null;
  }
  componentDidMount() {
    this.state.default.init();
  }
  render() {
    let dataListProps;
    const { content } = this.props;
    if (content === 'museums') {
      const { museumLoading, museumError, museumData } = this.props;
      dataListProps = {
        loading: museumLoading,
        error: museumError,
        data: museumData,
        component: item => <EditListItem item={item} Museum />,
        scroll: true,
      };
    }
    if (content === 'news') {
      const { feedLoading, feedError, feedData } = this.props;
      dataListProps = {
        loading: feedLoading,
        error: feedError,
        data: feedData,
        component: item => <EditListItem item={item} Feed />,
        scroll: true,
      };
    }
    return (
      <article>
        <Helmet>
          <title>Edit {this.state.default.match} Page</title>
          <meta
            name="description"
            content={`Edit ${
              this.state.default.match
            } page of EACH application`}
          />
        </Helmet>
        <H1>
          <FormattedMessage {...this.state.default.messages.header} />
        </H1>
        <div style={rowStyle}>
          <Nav>
            <Popup
              trigger={
                <Button
                  children={
                    <FormattedMessage {...this.state.default.messages.add} />
                  }
                />
              }
              item={emptyItem}
              mod="add"
              Museum={content === 'museums'}
              Feed={content === 'news'}
            />
          </Nav>
          {content === 'news' && (
            <Nav>
              <img
                style={refreshStyle}
                src="/Refresh.png"
                alt="Refresh"
                onClick={this.state.default.init}
              />
            </Nav>
          )}
        </div>
        <DataList {...dataListProps} />
      </article>
    );
  }
}

EditPage.propTypes = {
  museumLoading: PropTypes.bool,
  museumError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  museumData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  feedLoading: PropTypes.bool,
  feedError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  feedData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  initFeed: PropTypes.func,
  initMuseum: PropTypes.func,
  content: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    initFeed: () => dispatch(loadFeeds()),
    initMuseum: () => dispatch(loadMuseums()),
  };
}

const mapStateToProps = createStructuredSelector({
  museumData: makeSelectMuseumData(),
  museumLoading: makeSelectMuseumLoading(),
  museumError: makeSelectMuseumError(),
  feedData: makeSelectFeedData(),
  feedLoading: makeSelectFeedLoading(),
  feedError: makeSelectFeedError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'deleteData', reducer });
const withSaga = injectSaga({ key: 'deleteData', saga });

export default compose(
  withAuth,
  withReducer,
  withSaga,
  withConnect,
)(EditPage);
