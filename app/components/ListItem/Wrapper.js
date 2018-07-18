import styled from 'styled-components';

const Wrapper = styled.li`
  width: 100%;
  position: relative;
  border-top: 1px solid #eee;

  &:first-child {
    border-top: none;
  }
`;

export default Wrapper;
