/* eslint-disable react/prefer-stateless-function */
/*
 *
 * AgreementEditForm
 *
 * Form for updating an user agreement
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import messages from './messages';
import { withAuthAdmin } from '../../utils/auth';
import { AGREEMENT_CFG } from '../../utils/constants';
import Form from '../EditForm';
import Button from '../../components/Button';
import { translateFromForm, translateToForm } from '../EditForm/config-form';
import Nav from '../LinkList/Nav';
import { configs } from '../EditForm/configs';
import { sendData } from './actions';

import { makeSelectError } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class AgreementEditForm extends React.Component {
  render() {
    return (
      <Nav>
        <Form
          trigger={
            <Button>
              <FormattedMessage {...messages[AGREEMENT_CFG]} />
            </Button>
          }
          item={translateToForm[AGREEMENT_CFG](configs[AGREEMENT_CFG].empty)}
          isPopup
          settings={configs[AGREEMENT_CFG]}
          onSubmit={form =>
            this.props.send(translateFromForm[AGREEMENT_CFG](form))
          }
          isPlaceholder={false}
          flexDirection="column"
        />
      </Nav>
    );
  }
}

AgreementEditForm.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  send: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    send: data => dispatch(sendData(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'editAgreementForm', reducer });
const withSaga = injectSaga({ key: 'editAgreementForm', saga });

export default compose(
  withAuthAdmin,
  withReducer,
  withSaga,
  withConnect,
)(AgreementEditForm);
