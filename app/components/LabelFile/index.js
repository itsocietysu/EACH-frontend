/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from './Button';
import Label from './Label';
import messages from './messages';

export default function LabelInput({ id, change, accept }) {
  return (
    <Label htmlFor={id}>
      <Button>
        <FormattedMessage {...messages.selectFile} />
      </Button>
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
