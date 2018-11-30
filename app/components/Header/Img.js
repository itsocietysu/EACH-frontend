import styled from 'styled-components';

import NormalImg from '../../components/Img';

import { colors } from '../../utils/constants';

const Img = styled(NormalImg)`
  width: 3.4em;
  height: 3em;
  float: left;
  padding-right: 0.5em;
  border-right: 2px solid ${colors.base};
`;

export default Img;
