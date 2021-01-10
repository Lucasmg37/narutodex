import styled, { css } from 'styled-components';

import { Container as Emoji } from '../Emoji/styles';

export const LiNav = styled.li`
  flex: 1;
  align-items: center;
  text-align: center;
  font-size: 24px;
  padding: 16px;
  color: #fff;
  cursor: pointer;
  transition: ease 0.2s all;
  border-radius: 50px;
  margin: 8px;
  background: ${({ isActive }) => (isActive ? '#222' : '#111')};

  &:hover {
    background: #222;
  }
`;

export const Container = styled.div`
  margin: auto;
  display: flex;
  height: 600px;
  border-radius: 16px;
  overflow: hidden;
  z-index: 4;
  transition: all ease 0.5s;

  ${({ position }) =>
    position &&
    (position === 1 || position === -1) &&
    css`
      transform: scale(0.9);
      z-index: 3;
    `};

  ${({ position }) =>
    position &&
    (position === 2 || position === -2) &&
    css`
      opacity: 0.5;
      transform: scale(0.7);
      z-index: 2;
    `};

  ${({ position }) =>
    position &&
    position === -1 &&
    css`
      margin-right: -280px;
    `};

  ${({ position }) =>
    position &&
    position === 1 &&
    css`
      margin-left: -280px;
    `};

  ${({ position }) =>
    position &&
    position === -2 &&
    css`
      margin-right: -257px;
    `};

  ${({ position }) =>
    position &&
    position === 2 &&
    css`
      margin-left: -275px;
    `};

  ${({ showOne, position }) =>
    showOne &&
    position < 0 &&
    css`
      opacity: 0;
      margin-right: -360px;
    `};

  ${({ showOne, position }) =>
    showOne &&
    position > 0 &&
    css`
      margin-left: -360px;
      opacity: 0;
    `};

  main {
    display: flex;
    flex-direction: column;
    width: 800px;
    background: #df872d;

    nav {
      ul {
        display: flex;
        list-style: none;
      }
    }

    section {
      display: flex;
      padding: 24px;
      overflow: hidden;
      flex: 1;

      .list {
        display: flex;
        width: 100%;

        ul {
          list-style: none;
          overflow: auto;
          padding-right: 8px;

          &::-webkit-scrollbar-track {
            background-color: #df872d;
          }
          &::-webkit-scrollbar {
            width: 4px;
            background: #222;
          }
          &::-webkit-scrollbar-thumb {
            background: #222;
          }

          li {
            display: flex;
            align-items: center;
            font-size: 24px;
            font-weight: bold;
            background: rgba(0, 0, 0, 0.2);
            padding: 8px 24px;
            margin-bottom: 16px;
            color: #fff;
            width: 100%;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
              background: rgba(0, 0, 0, 0.5);
            }

            img {
              width: 72px;
              height: 72px;
              border-radius: 50%;
              object-fit: cover;
              margin-right: 16px;
            }
          }
        }
      }

      & > div:last-child {
        min-width: 250px;
        max-width: 250px;
        margin-left: auto;
        padding-left: 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        h1 {
          font-size: 32px;
          line-height: 1;
          margin-bottom: 8px;
        }
      }

      & > div:first-child {
        display: flex;
        flex-direction: column;
        & > h3 {
          font-size: 24px;
          margin-bottom: 24px;
        }

        & > div {
          display: flex;
          flex-direction: column;
          margin-top: auto;
          flex: 1;
          overflow: hidden;
          padding-top: 12px;

          h3 {
            font-size: 24px;
            margin-bottom: 8px;
            margin-top: 16px;
          }

          & > div.description {
            display: flex;
            flex: 1;
            flex-direction: column;
            overflow: auto;

            &::-webkit-scrollbar-track {
              background-color: #222;
            }
            &::-webkit-scrollbar {
              width: 4px;
              background: #000;
            }
            &::-webkit-scrollbar-thumb {
              background: #000;
            }
          }

          & > div.tagDotted {
            display: flex;
            margin-bottom: 16px;

            div + div {
              margin-left: 8px;
            }

            div {
              border: dashed 3px rgba(51, 51, 51, 0.363);
              padding: 10px 16px;
              border-radius: 8px;
              flex: 1;
              display: flex;
              align-items: center;
              position: relative;
              font-weight: 500;
              text-align: center;
              font-size: 18px;

              span {
                position: absolute;
                background: #df872d;
                top: -12px;
                padding: 0 8px;
                font-weight: 300;
                color: #333;
              }
            }
          }
        }
      }
    }
  }

  aside {
    width: 400px;
    position: relative;
    display: flex;
    height: 100%;
    cursor: pointer;
    overflow: hidden;

    ${({ position }) =>
      position === 0 &&
      css`
        &:hover {
          > img {
            transform: scale(1.1);
          }
        }
      `};

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      z-index: 0;
      transition: ease 0.2s all;
    }

    & > div {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%);
      z-index: 1;
      margin-top: auto;
      width: 100%;
      min-height: 50%;
      padding: 24px;
      font-size: 32px;
      display: flex;
      justify-content: flex-end;
      color: #df872d;
      flex-direction: column;

      & > div {
        display: flex;
        margin-top: 16px;

        ${Emoji} {
          height: 40px;
        }
      }
    }
  }
`;
