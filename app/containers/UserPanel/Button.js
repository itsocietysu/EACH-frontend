import styled from 'styled-components';

import { colors } from '../../utils/constants';

export default styled.button`
  display: inline-flex;
  border-radius: ${props => props.borderRadius};
  padding: 0 0.1em;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-weight: bold;
  font-size: 16px;
  border: ${props => props.borderWidth} solid ${colors.base};
  color: ${colors.base};

  &:hover {
    background: ${colors.base};
    color: #fff;
  }
`;
