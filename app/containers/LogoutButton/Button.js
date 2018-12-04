import styled from 'styled-components';
import NormalButton from '../../components/Button/StyledButton';

const Button = styled(NormalButton)`
  padding: 0;
  height: 46px;

  @media screen and (max-width: 530px) {
    height: calc(9.238vw - 2.9614px);
  }
`;

export default Button;
