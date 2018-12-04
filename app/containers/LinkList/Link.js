import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from '../../utils/constants';

export default styled(Link)`
  padding-top: 7px;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Book Antiqua', Palatino, 'Palatino Linotype', serif;
  font-weight: bold;
  font-size: 16px;
  color: ${colors.base};
  height: 46px;

  &:hover {
    background: ${colors.base};
    color: #fff;
  }

  @media screen and (max-width: 530px) {
    height: calc(9.238vw - 2.9614px);
    padding-top: calc(
      (calc(9.238vw - 2.9614px) - calc(6.095vw - 0.3035px)) / 2
    );
  }
`;
