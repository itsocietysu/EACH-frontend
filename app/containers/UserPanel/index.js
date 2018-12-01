/* eslint-disable react/prefer-stateless-function,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { FormattedMessage } from 'react-intl';

import Button from './Button';
import messages from './messages';
import OptionsList from '../OptionsList';
import { colors } from '../../utils/constants';
import H1 from '../../components/H1';
import H3 from '../../components/H3';

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

const panelStyle = {
  float: 'right',
  display: 'flex',
  flexDirection: 'row',
};

class UserPanel extends React.Component {
  render() {
    return (
      <div style={panelStyle}>
        <div>
          <H3 style={{ margin: '0', float: 'right' }}>МАСТЕР</H3>
          <H3 style={{ color: `${colors.base}`, margin: '0' }}>Баллы:12345</H3>
        </div>
        <H1
          style={{
            color: `${colors.base}`,
            borderLeft: `2px solid ${colors.base}`,
            paddingLeft: '0.2em',
          }}
        >
          <FormattedMessage
            {...messages.user}
            values={{ user: this.props.username }}
          />
        </H1>
        <Popup
          trigger={
            <Button borderRadius="10px" borderWidth="1px" type="button">
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
