import styled, { css } from 'styled-components';
import { mixins } from './responsive';

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  overflow: auto;
  background: rgba(17, 17, 17, 0.9);

  ${mixins.sm(css`
    min-height: 100vh;
  `)}

  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-x: hidden;

    article {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }

    .stamps {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 80px;
    }
  }

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(5px);
    z-index: -1;
  }
`;
