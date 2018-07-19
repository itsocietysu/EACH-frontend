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
    <StyledButton type="button" onClick={props.onClick}>
      {props.children}
    </StyledButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.object,
};

export default Button;
