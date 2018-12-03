import styled from 'styled-components';

import { colors } from '../../utils/constants';

const TextArea = styled.textarea`
  outline: initial;
  border: 1px solid ${colors.base};
  text-align: left;
  font-family: 'Book Antiqua', Palatino, 'Palatino Linotype', serif;
  max-height: 6em;
  color: #000;
  @media screen and (max-width: 1280px) {
    max-width: 50em;
  }
  @media screen and (max-width: 420px) {
    max-width: 20em;
  }
  @media screen and (max-width: 340px) {
    max-width: 15em;
  }
`;

export default TextArea;
