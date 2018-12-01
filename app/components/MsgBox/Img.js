import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  display: block;
  height: 20px;
  border: 1px solid transparent;
`;

export default function() {
  return <Img src="/images/border_top.PNG" />;
}
