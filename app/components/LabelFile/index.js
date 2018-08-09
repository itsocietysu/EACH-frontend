/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from './Button';
import Div from './Div';
import Label from './Label';
import messages from './messages';

export default function LabelInput({ id, value, change, accept, message }) {
  return (
    <Label htmlFor={id}>
      <FormattedMessage {...message} />
      <Div>
        <Button>
          <FormattedMessage {...messages.select} />
        </Button>
        <div>{value || <FormattedMessage {...messages.selectFile} />}</div>
      </Div>
      <input
        id={id}
        type="file"
        accept={accept}
        onChange={change}
        style={{ display: 'none' }}
      />
    </Label>
  );
}
