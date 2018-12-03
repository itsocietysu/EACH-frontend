import styled from 'styled-components';

import { colors } from '../../utils/constants';

const Input = styled.input`
  outline: none;
  border: 1px solid ${colors.base};
  text-align: left;
  font-family: 'Book Antiqua', Palatino, 'Palatino Linotype', serif;
  margin-left: 1em;
  color: #000;
  @media screen and (max-width: 1280px) {
    max-width: 50em;
  }
  @media screen and (max-width: 420px) {
    max-width: 20em;
  }
`;

export default Input;
