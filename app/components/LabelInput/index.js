/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Input from 'components/Input';

export default function LabelInput({ id, type, value, change, message }) {
  return (
    <label htmlFor={id}>
      <FormattedMessage {...message} />
      <Input id={id} type={type} value={value} onChange={change} />
    </label>
  );
}
