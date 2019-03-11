import styled from 'styled-components';

const Div = styled.div`
  width: ${props => props.width};
  overflow: auto;
  float: left;
  margin-left: ${props => props.marginLeft};
`;

export default Div;
