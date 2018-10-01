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

function Content({ onSubmit, message, cancel, close }) {
  return (
    <CenteredDiv>
      <Img />
      <Close onClick={close} />
      <FormattedMessage {...message} />
      <div>
        <Button
          onClick={() => {
            onSubmit();
            close();
          }}
          children={<FormattedMessage {...messages.yes} />}
        />
        {cancel && (
          <Button
            onClick={close}
            children={<FormattedMessage {...messages.no} />}
          />
        )}
      </div>
    </CenteredDiv>
  );
}

Content.propTypes = {
  message: PropTypes.object,
  onSubmit: PropTypes.func,
  cancel: PropTypes.bool,
  close: PropTypes.func,
};

export default function MsgBox({
  trigger,
  onSubmit,
  message,
  cancel,
  open,
  onClose,
}) {
  const contentStyle = {
    maxWidth: '30em',
    padding: '0',
    border: '1px solid rgb(217, 146, 92)',
    borderRadius: '5px',
  };
  if (trigger)
    return (
      <Popup
        trigger={trigger}
        closeOnDocumentClick
        modal
        contentStyle={contentStyle}
      >
        {close => (
          <Content
            close={close}
            onSubmit={onSubmit}
            cancel={cancel}
            message={message}
          />
        )}
      </Popup>
    );
  return (
    <Popup open={open} closeOnDocumentClick modal contentStyle={contentStyle}>
      <Content
        close={onClose}
        onSubmit={onSubmit}
        cancel={cancel}
        message={message}
      />
    </Popup>
  );
}

MsgBox.propTypes = {
  trigger: PropTypes.object,
  message: PropTypes.object,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  cancel: PropTypes.bool,
  open: PropTypes.bool,
};
