/**
 *
 * Button.js
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import StyledButton from './StyledButton';

function Button(props) {
  return (
    <StyledButton
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </StyledButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Button;
