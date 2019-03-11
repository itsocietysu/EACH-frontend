/* eslint-disable react/no-children-prop */
import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from './Button';
import messages from './messages';
import CenteredDiv from './CenteredDiv';
import Close from './Cross';
import Header from './Header';

import { colors } from '../../utils/constants';

function Content({ onSubmit, message, cancel, close }) {
  return (
    <CenteredDiv>
      <Header />
      <Close onClick={close} />
      <FormattedMessage {...message} />
      <div>
        <Button
          borderRadius="4px"
          borderWidth="2px"
          onClick={() => {
            onSubmit();
            close();
          }}
          children={<FormattedMessage {...messages.yes} />}
        />
        {cancel && (
          <Button
            borderRadius="4px"
            borderWidth="2px"
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
    border: `1px solid ${colors.base}`,
    borderRadius: '5px',
  };
  if (trigger)
    return (
      <Popup
        trigger={trigger}
        closeOnDocumentClick={false}
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
    <Popup
      open={open}
      modal
      closeOnDocumentClick={false}
      contentStyle={contentStyle}
    >
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
