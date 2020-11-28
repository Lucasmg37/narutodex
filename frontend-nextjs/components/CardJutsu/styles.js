import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
 from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  max-width: 90%;
  width: 360px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  z-index: 4;

  ${({ position }) =>
    position &&
    (position === 1 || position === -1) &&
    css`
      opacity: 0.8;
      transform: scale(0.9);
      z-index: 3;
    `}

  ${({ position }) =>
    position &&
    (position === 2 || position === -2) &&
    css`
      opacity: 0.5;
      transform: scale(0.7);
      z-index: 2;
    `}


  ${({ position }) =>
    position &&
    position === -1 &&
    css`
      margin-right: -280px;
    `}

    ${({ position }) =>
    position &&
    position === 1 &&
    css`
      margin-left: -280px;
    `}


  ${({ position }) =>
    position &&
    position === -2 &&
    css`
      margin-right: -257px;
    `}

    ${({ position }) =>
    position &&
    position === 2 &&
    css`
      margin-left: -275px;
    `}
`;

export const Content = styled.div`
  position: relative;
  width: 360px;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  box-shadow: 0px 0px 28px 1px rgba(0, 0, 0, 0.5);

  ${({ isBack }) =>
    isBack &&
    css`
      transform: rotateY(180deg);
    `}
`;

export const SeeMoreButton = styled.button`
  background: linear-gradient(0deg, #df872d 0%, #df872d 50%, rgba(0, 0, 0, 0) 100%);
  border: none;
  position: absolute;
  top: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: #fff;
  width: 100%;
  left: 0;
  cursor: pointer;
  z-index: 3;
  height: 50px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const BackCard = styled.div`
  position: absolute;
  width: 360px;
  height: 100%;
  top: 0;
  left: 0;
  transform: rotateY(180deg);
  display: flex;
  /* display: ${({ isBack }) => (isBack ? 'flex' : 'none')}; */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(5px);
    transform: scale(1.05);
  }

  div {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    padding: 24px;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar-track {
      background-color: #070719;
    }

    &::-webkit-scrollbar {
      width: 8px;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #101022;
    }

    h3 {
      text-align: left;
      color: #df872d;
      margin-bottom: 16px;
      font-size: 32px;
    }

    p {
      color: #fff;
      text-align: justify;
      margin-bottom: 24px;
    }

    button {
      background: #fff;
      font-weight: 900;
      border: none;
      font-size: 20px;
      padding: 8px 16px;
      border-radius: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      margin: auto auto 0;

      svg {
        margin-right: 8px;
      }
    }
  }

  ::before {
    content: '';
    background: #111;
    opacity: 0.8;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
  }

  backface-visibility: hidden;
`;

export const FrontCard = styled.div`
  backface-visibility: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  header {
    width: 100%;
    height: 300px;
    position: relative;
    transition: all 0.2s ease-in-out;
    background: #111;

    ::after {
      content: '';
      width: 100%;
      height: 100%;
      /* background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 72%); */
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0) 50%,
        rgba(0, 0, 0, 0) 72%,
        rgba(0, 0, 0, 0.7) 100%
      );
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
    }

    button {
      position: absolute;
      bottom: 20px;
      left: 20px;
      z-index: 3;
      transition: ease-in-out 0.2s all;
      cursor: pointer;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: #df862d94;
      transition: ease-in-out 0.2s all;
      color: #fff;
      font-size: 1.8em;
      bottom: ${({ upButtonBottom }) => `${upButtonBottom}px`};

      :hover {
        background: #df872d;
        transform: scale(1.1);
      }
    }
  }

  main {
    background: #df872d;
    padding: 24px;
    display: flex;
    flex-direction: column;
    height: 300px;
    border-radius: 24px;
    margin-top: -24px;
    z-index: 2;
    position: relative;
    transition: all 0.2s ease-in-out;
    overflow-y: hidden;

    height: ${({ heightMain }) => `${heightMain}px`};
    margin-top: ${({ marginTopMain }) => `${marginTopMain}px`};

    /* ::after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
    } */
    h3 {
      color: #111;
      margin-bottom: 16px;
      font-size: 24px;
      text-align: left;
    }

    p {
      color: #111;
      opacity: 0.7;
    }

    .contentInfo {
      display: flex;
      margin-top: auto;

      .rank {
        border: dashed 3px rgba(51, 51, 51, 0.363);
        padding: 10px 16px;
        border-radius: 8px;
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;
        font-weight: 500;
        text-align: center;
      }

      .rank + div {
        margin-left: 8px;
      }

      .rank span {
        position: absolute;
        background: #df872d;
        top: -12px;
        padding: 0 8px;
        font-weight: 300;
        color: #333;
      }
    }

    .class {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      font-weight: 500;
      margin-top: 16px;
    }

    .class span {
      padding: 0 8px;
      font-weight: 300;
      color: #333;
      margin-bottom: 4px;
    }

    .classification {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      font-weight: 500;
      margin-top: 16px;
      text-align: center;
    }

    .classification span {
      padding: 0 8px;
      font-weight: 300;
      color: #333;
      margin-bottom: 4px;
    }

    footer {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 16px;
      z-index: 2;

      button {
        margin: 0 8px;
        background: #fff;
        font-weight: 900;
        border: none;
        font-size: 20px;
        padding: 8px 16px;
        border-radius: 24px;
        cursor: pointer;
      }
    }
  }
`;
