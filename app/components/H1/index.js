import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 2em;
  margin-bottom: 0.25em;
  font-family: 'No Continue';
  white-space: pre-wrap;

  @media screen and (max-width: 530px) {
    font-size: calc(6.095vw - 0.3035px);
  }
`;

export default H1;
