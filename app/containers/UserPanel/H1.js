import styled from 'styled-components';
import NormalH1 from '../../components/H1';
import { colors } from '../../utils/constants';

const H1 = styled(NormalH1)`
  color: ${colors.base};
  border-left: 2px solid ${colors.base};
  padding-left: 0.2em;

  @media screen and (max-width: 420px) {
    border-left: none;
  }
`;

export default H1;
