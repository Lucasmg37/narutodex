import styled, { css } from 'styled-components';
import { mixins } from 'styles/responsive';

export const Container = styled.section`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;

  ${mixins.sm(css`
    position: static;
    align-items: center;
    justify-content: center;
  `)}

  ${({ showStamps }) =>
    showStamps &&
    css`
      .next {
        transform: translateX(-64px);
        opacity: 0;
      }

      .previous {
        transform: translateX(64px);
        opacity: 0;
      }
    `}

  .next,
  .previous {
    background: none;
    width: 64px;
    height: 64px;
    display: none;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #fff;
    font-size: 1.8rem;
    cursor: pointer;
    border: 3px solid #df872d;
    transition: all ease-in-out 0.2s;

    ${mixins.sm(css`
      display: flex;
    `)}

    &:hover {
      background: #df872d;
    }
  }
`;
