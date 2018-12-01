import styled from 'styled-components';

import { colors } from '../../utils/constants';

export default styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: 0;
  border-radius: 5px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  outline: 0;
  border: 1px solid ${colors.base};
  color: ${colors.base};
  box-shadow: 0 0 10px ${colors.base};
  text-align: center;
  background: white;
`;
