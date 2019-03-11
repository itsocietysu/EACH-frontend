/* eslint-disable react/prop-types,jsx-a11y/label-has-for */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Input from '../Input';

export default function LabelInput({
  id,
  type,
  value,
  change,
  accept,
  message,
  isPlaceholder,
}) {
  return (
    <label htmlFor={id}>
      {isPlaceholder ? (
        <FormattedMessage {...message}>
          {placeholder => (
            <Input
              id={id}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={change}
              accept={accept}
            />
          )}
        </FormattedMessage>
      ) : (
        <div>
          <FormattedMessage {...message} />
          <Input
            id={id}
            type={type}
            value={value}
            onChange={change}
            accept={accept}
          />
        </div>
      )}
    </label>
  );
}
