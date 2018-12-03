/* eslint-disable react/prefer-stateless-function,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { FormattedMessage } from 'react-intl';

import Button from './Button';
import messages from './messages';
import OptionsList from '../OptionsList';
import { colors } from '../../utils/constants';
import H1 from './H1';
import H3 from './H3';
import './index.css';

const PopupContentStyle = {
  boxShadow: 'none',
  width: 'initial',
  padding: '0px',
  borderRadius: '5px',
  border: '0px',
};

const PopupArrowStyle = {
  border: `1px solid ${colors.base}`,
  borderLeft: 'none',
  borderTop: 'none',
};

class UserPanel extends React.Component {
  render() {
    return (
      <div className="user-panel">
        <div className="user-points">
          <H3 color="#000">
            <FormattedMessage {...messages.beginner} />
          </H3>
          <H3 color={`${colors.base}`}>
            <FormattedMessage {...messages.points} values={{ points: 0 }} />
          </H3>
        </div>
        <H1>
          <FormattedMessage
            {...messages.user}
            values={{ user: this.props.username }}
          />
        </H1>
        <Popup
          trigger={
            <Button
              borderRadius="10px"
              borderWidth="1px"
              type="button"
              className="user-button"
            >
              <i className="fas fa-chevron-down fa-3x" />
            </Button>
          }
          closeOnDocumentClick
          arrowStyle={PopupArrowStyle}
          contentStyle={PopupContentStyle}
        >
          {close => (
            <div onClick={close}>
              <OptionsList accessType={this.props.accessType} />
            </div>
          )}
        </Popup>
      </div>
    );
  }
}

UserPanel.propTypes = {
  username: PropTypes.string,
  accessType: PropTypes.string,
};

export default UserPanel;
