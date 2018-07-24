/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import TextArea from './TextArea';

export default function createTextArea({ name, value, change, message, rows }) {
  return (
    <div>
      <FormattedMessage {...message} />
      <br />
      <TextArea
        name={name}
        onChange={change}
        value={value}
        cols="50"
        rows={rows}
      />
    </div>
  );
}
