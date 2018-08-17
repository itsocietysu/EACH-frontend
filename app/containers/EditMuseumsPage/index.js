/* eslint-disable react/no-children-prop,react/prefer-stateless-function */
/*
 * EditMuseumsPage
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
} from 'containers/MuseumsPage/selectors';
import Button from 'components/Button';
import Nav from 'containers/LinkList/Nav';
import H1 from 'components/H1';
import DataList from 'components/DataList';
import Popup from 'containers/EditForm';
import { loadMuseums } from 'containers/MuseumsPage/actions';
import PageLayout from 'components/PageLayout';
import Header from 'components/Header';
import Footer from 'components/Footer';
import EditMuseumListItem from './ListItem';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

export class EditMuseumsPage extends React.Component {
  componentDidMount() {
    this.props.init();
  }
  render() {
    const { loading, error, data } = this.props;
    const dataListProps = {
      loading,
      error,
      data,
      component: EditMuseumListItem,
      scroll: true,
    };
    return (
      <article>
        <Helmet>
          <title>Edit Museums Page</title>
          <meta
            name="description"
            content="Edit museums page of EACH application"
          />
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
              eid: 'addMuseum',
              image: '',
              title: '',
              text: '',
              priority: '0',
            }}
            mod="add"
            Museum
          />
        </Nav>
        <DataList {...dataListProps} />
      </article>
    );
  }
}

EditMuseumsPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  init: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(loadMuseums()),
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

const withReducer = injectReducer({ key: 'deleteMuseum', reducer });
const withSaga = injectSaga({ key: 'deleteMuseum', saga });

export default function() {
  return (
    <PageLayout
      header={Header}
      component={compose(
        withReducer,
        withSaga,
        withConnect,
      )(EditMuseumsPage)}
      footer={Footer}
    />
  );
}
