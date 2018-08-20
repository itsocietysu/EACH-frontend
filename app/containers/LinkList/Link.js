import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  padding: 1.5px 0.5em;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Book Antiqua', Palatino, 'Palatino Linotype', serif;
  font-weight: bold;
  font-size: 16px;
  color: rgb(66, 31, 25);

  &:hover {
    background: rgb(217, 146, 92);
    color: #fff;
  }
`;
