import styled from 'styled-components';

import { colors } from '../../utils/constants';

const Button = styled.div`
  line-height: 24px;
  display: inline-block;
  padding: 0.25em 2em;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'MurraySlab';
  font-weight: bold;
  font-size: 16px;
  border: 2px solid ${colors.base};
  color: #000;

  &:hover {
    background: ${colors.base};
    color: #fff;
  }
`;

export default Button;
