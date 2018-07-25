/* eslint-disable react/no-children-prop */
import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'containers/UserPanel/Button';
import messages from './messages';
import CenteredDiv from './CenteredDiv';
import Close from './Cross';
import Img from './Img';

export default function MsgBox({ trigger, onSubmit, message }) {
  return (
    <Popup
      trigger={trigger}
      closeOnDocumentClick
      modal
      contentStyle={{
        maxWidth: '30em',
        padding: '0',
        border: '1px solid rgb(217, 146, 92)',
        borderRadius: '5px',
      }}
    >
      {close => (
        <CenteredDiv>
          <Img />
          <Close onClick={close} />
          <FormattedMessage {...message} />
          <div>
            <Button
              onClick={() => {
                close();
                onSubmit();
              }}
              children={<FormattedMessage {...messages.yes} />}
            />
            <Button
              onClick={close}
              children={<FormattedMessage {...messages.no} />}
            />
          </div>
        </CenteredDiv>
      )}
    </Popup>
  );
}

MsgBox.propTypes = {
  trigger: PropTypes.object,
  message: PropTypes.object,
  onSubmit: PropTypes.func,
};
