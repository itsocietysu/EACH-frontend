import styled from 'styled-components';

export default styled.ul`
  display: inline-flex;
  flex-direction: ${props => props.flexDirection};
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
  position: relative;
  width: ${props => props.width};
`;
