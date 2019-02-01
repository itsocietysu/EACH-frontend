/*
 * AgreementPage
 *
 * Page with user agreement
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import H1 from '../../components/H1';
import messages from './messages';
import { withRequest } from '../../utils/auth';

import { loadData } from './actions';

import {
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import DataList from '../../components/DataList';

export class AgreementPage extends React.Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    const { loading, error, data } = this.props;
    const dataListProps = {
      loading,
      error,
      data: data ? [data] : false,
      component: item => <p style={{ whiteSpace: 'pre-wrap' }}>{item.item}</p>,
      scroll: false,
    };
    return (
      <div>
        <Helmet>
          <title>User Agreement Page</title>
          <meta
            name="description"
            content="User agreement page of EACH application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <DataList {...dataListProps} />
      </div>
    );
  }
}

AgreementPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  load: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(loadData()),
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

const withReducer = injectReducer({ key: 'agreementPage', reducer });
const withSaga = injectSaga({ key: 'agreementPage', saga });

export default compose(
  withRequest,
  withReducer,
  withSaga,
  withConnect,
)(AgreementPage);
