/* eslint-disable import/first,react/prop-types,react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Button from './Button';
import messages from './messages';
import DivVisible from './DivVisible';
import DivHidden from './DivHidden';
import OptionsList from 'containers/OptionsList';
import { changeShow } from './actions';
import { makeSelectShow } from './selectors';
import reducer from './reducer';
import saga from './saga';

function List(props) {
  if (props.show)
    return (
      <DivVisible>
        <OptionsList username={props.username} />
      </DivVisible>
    );
  return (
    <DivHidden>
      <OptionsList />
    </DivHidden>
  );
}

class UserPanel extends React.Component {
  render() {
    return (
      <div style={{ float: 'right', marginRight: '30px' }}>
        <Button type="button" onClick={this.props.onChangeShow}>
          <FormattedMessage
            {...messages.user}
            values={{ user: this.props.username }}
          />
        </Button>
        <List show={this.props.show} username={this.props.username} />
      </div>
    );
  }
}

UserPanel.propTypes = {
  show: PropTypes.bool,
  onChangeShow: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeShow: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(changeShow());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  show: makeSelectShow(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userPanel', reducer });
const withSaga = injectSaga({ key: 'userPanel', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserPanel);
