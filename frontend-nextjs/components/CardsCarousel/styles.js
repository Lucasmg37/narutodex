import styled, { css } from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

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
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #fff;
    font-size: 1.8rem;
    cursor: pointer;
    border: 3px solid #df872d;
    transition: all ease-in-out 0.2s;

    &:hover {
      background: #df872d;
    }
  }
`;
