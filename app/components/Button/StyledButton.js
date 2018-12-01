import styled from 'styled-components';

import { colors } from '../../utils/constants';

const StyledButton = styled.button`
  padding: 0.25em 0.5em;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Book Antiqua', Palatino, 'Palatino Linotype', serif;
  font-weight: bold;
  font-size: 16px;
  color: ${colors.base};

  &:hover {
    background: ${colors.base};
    color: #fff;
  }

  &:disabled {
    background: #ccc;
    color: #fff;
    cursor: not-allowed;
  }
`;

export default StyledButton;
