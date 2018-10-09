/* eslint-disable react/prop-types,jsx-a11y/label-has-for */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import TextArea from './TextArea';

export default function createTextArea({
  name,
  value,
  change,
  message,
  rows,
  isPlaceholder,
}) {
  return (
    <div
      style={{
        fontFamily: '"Book Antiqua", Palatino, "Palatino Linotype", serif',
      }}
    >
      <label htmlFor={name}>
        {isPlaceholder ? (
          <FormattedMessage {...message}>
            {placeholder => (
              <TextArea
                name={name}
                onChange={change}
                placeholder={placeholder}
                value={value}
                cols="50"
                rows={rows}
              />
            )}
          </FormattedMessage>
        ) : (
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
        )}
      </label>
    </div>
  );
}
