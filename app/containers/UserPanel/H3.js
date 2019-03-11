import styled from 'styled-components';
import NormalH3 from '../../components/H3';

const H3 = styled(NormalH3)`
  margin: 0;
  color: ${props => props.color};

  @media screen and (max-width: 530px) {
    font-size: calc(3.566vw - 0.1798px);
  }

  @media screen and (max-width: 420px) {
    display: none;
  }
`;

export default H3;
