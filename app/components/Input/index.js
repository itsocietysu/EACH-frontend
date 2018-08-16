import styled from 'styled-components';

const Input = styled.input`
  outline: none;
  border: 1px solid rgb(217, 146, 92);
  text-align: left;
  font-family: 'Book Antiqua', Palatino, 'Palatino Linotype', serif;
  margin-left: 1em;
  @media screen and (max-width: 1280px) {
    max-width: 50em;
  }
  @media screen and (max-width: 420px) {
    max-width: 20em;
  }
`;

export default Input;
