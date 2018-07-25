import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Cross = styled.a`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 0;
  line-height: 18px;
  right: 0px;
  top: 0px;
  font-size: 30px;
  font-weight: 1000;
  background: none;
  border: 1px solid transparent;
  font-family: 'Book Antiqua', Palatino, 'Palatino Linotype', serif;
`;

export default function Close({ onClick }) {
  return <Cross onClick={onClick}>&times;</Cross>;
}

Close.propTypes = {
  onClick: PropTypes.func,
};
