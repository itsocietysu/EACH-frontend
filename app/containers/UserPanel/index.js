/* eslint-disable react/prefer-stateless-function,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { FormattedMessage } from 'react-intl';

import Button from './Button';
import messages from './messages';
import OptionsList from '../OptionsList';
import { PopupArrowStyle, PopupContentStyle, panelStyle } from '../LoginButton';

class UserPanel extends React.Component {
  render() {
    return (
      <div style={panelStyle}>
        <Popup
          trigger={
            <Button type="button">
              <FormattedMessage
                {...messages.user}
                values={{ user: this.props.username }}
              />
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
