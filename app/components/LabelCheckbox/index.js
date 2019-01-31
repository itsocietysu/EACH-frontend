/* eslint-disable react/prop-types,jsx-a11y/label-has-for */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Input from '../Input';

export default function LabelCheckbox({ id, checked, change, message }) {
  return (
    <label htmlFor={id}>
      <div>
        <FormattedMessage {...message} />
        <Input id={id} type="checkbox" onChange={change} checked={checked} />
      </div>
    </label>
  );
}
