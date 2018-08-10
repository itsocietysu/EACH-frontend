/* eslint-disable import/first,react/prop-types,react/prefer-stateless-function,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React from 'react';
import Popup from 'reactjs-popup';
import { FormattedMessage } from 'react-intl';

import Button from './Button';
import messages from './messages';
import OptionsList from 'containers/OptionsList';

class UserPanel extends React.Component {
  render() {
    return (
      <div style={{ float: 'right', marginRight: '30px' }}>
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
          arrowStyle={{
            border: '2px solid rgb(217, 146, 92)',
            borderLeft: 'none',
            borderTop: 'none',
          }}
          contentStyle={{
            boxShadow: 'none',
            width: '150px',
            padding: '0px',
            border: 'none',
          }}
        >
          {close => (
            <div style={{ textAlign: 'center' }} onClick={close}>
              <OptionsList accessType={this.props.accessType} />
            </div>
          )}
        </Popup>
      </div>
    );
  }
}

export default UserPanel;
