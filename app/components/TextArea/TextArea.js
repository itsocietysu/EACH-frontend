import styled from 'styled-components';

const TextArea = styled.textarea`
  outline: initial;
  border: 1px solid rgb(217, 146, 92);
  text-align: left;
  font-family: 'Book Antiqua', Palatino, 'Palatino Linotype', serif;
  max-height: 6em;
  @media screen and (max-width: 1280px) {
    max-width: 50em;
  }
  @media screen and (max-width: 420px) {
    max-width: 20em;
  }
`;

export default TextArea;
