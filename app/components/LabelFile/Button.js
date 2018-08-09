import styled from 'styled-components';

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
  font-family: 'Book Antiqua', Palatino, 'Palatino Linotype', serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid rgb(217, 146, 92);
  color: rgb(66, 31, 25);

  &:hover {
    background: rgb(217, 146, 92);
    color: #fff;
  }
`;

export default Button;
