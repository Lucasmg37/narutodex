import styled from 'styled-components';

import { Container as Emoji } from '../Emoji/styles';

export const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  cursor: not-allowed;
  z-index: 10;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  ${Emoji} {
    height: 64px;
    animation: emojiMove 5s infinite;
  }

  @keyframes emojiMove {
    0% {
      transform: translate(-150px, 100px) scale(1);
    }

    25% {
      transform: translate(100px, 0px) scale(1.4);
    }

    50% {
      transform: translate(0px, -100px) scale(1.5);
    }

    100% {
      transform: translate(-150px, 100px) scale(1);
    }
  }
`;

export const Line = styled.div`
  height: 10px;
  width: 100%;
  background: #333;

  &:before {
    content: '';
    height: 100%;
    width: 100%;
    background: #df872d;
    display: block;
    margin-left: 50%;
    animation: lineLoading 2s infinite linear;
  }

  @keyframes lineLoading {
    0% {
      margin-left: -100%;
    }

    25% {
      margin-left: 0%;
    }

    50% {
      margin-left: 75%;
    }

    100% {
      margin-left: 100%;
    }
  }
`;
