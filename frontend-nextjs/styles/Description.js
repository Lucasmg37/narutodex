import styled, { css } from 'styled-components';
import { mixins } from './responsive';

export const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: auto;
  width: 100vw;
  background: #111;
  flex-direction: column;

  position: relative;

  ${mixins.sm(css`
    min-height: 100vh;
    background: rgba(17, 17, 17, 0.9);
  `)}

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(5px);
    z-index: -1;

    display: none;

    ${mixins.sm(css`
      min-height: 100vh;
      display: block;
    `)}
  }
`;
