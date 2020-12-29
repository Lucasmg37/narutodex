import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 0vw;
  height: 0vw;
  background: #111;
  position: absolute;
  border-radius: 50%;
  transition: all ease-in 0.3s;
  z-index: 999;

  ${({ showTransition }) =>
    showTransition &&
    css`
      width: 250vw;
      height: 250vw;
    `}
`;
