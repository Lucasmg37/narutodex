import styled, { css } from 'styled-components';
import { mixins } from './responsive';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  ${mixins.sm(css`
    overflow: auto;
  `)}
`;
