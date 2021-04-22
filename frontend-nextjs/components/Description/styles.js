import styled, { css } from 'styled-components';
import { mixins } from 'styles/responsive';

import { Container as Emoji } from '../Emoji/styles';

export const LiNav = styled.li`
  flex: 1;
  align-items: center;
  text-align: center;
  font-size: 24px;
  padding: 16px 0;
  color: #fff;
  cursor: pointer;
  transition: ease 0.2s all;
  border-radius: 0px;
  margin: 0px;
  font-weight: bold;

  ${mixins.sm(css`
    margin: 8px;
    border-radius: 50px;
    background: ${({ isActive }) => (isActive ? '#222' : '#111')};
  `)}

  &:hover {
    background: #222;
  }
`;

export const Container = styled.div`
  margin: auto;
  display: flex;
  height: 100%;
  border-radius: 0px;
  width: 100%;
  overflow: auto;
  z-index: 4;
  transition: all ease 0.5s;
  flex-direction: column;

  position: absolute;
  top: 0;
  left: 0;
  margin: 0;

  ${({ position }) =>
    position &&
    position !== 0 &&
    css`
      display: none;
    `};

  ${mixins.sm(css`
    height: 600px;
    flex-direction: row;
    width: auto;
    overflow: hidden;
    border-radius: 16px;
    position: static;
    display: flex;

    ${({ showOne }) =>
      showOne &&
      css`
        margin: auto;
        top: auto;
        left: auto;
      `};

    ${({ position }) =>
      position &&
      (position === 1 || position === -1) &&
      css`
        z-index: 3;
        transform: scale(0.9);
      `};

    ${({ position }) =>
      position &&
      (position === 2 || position === -2) &&
      css`
        z-index: 2;
        opacity: 0.5;
        transform: scale(0.7);
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
        margin-right: -450px;
      `};

    ${({ showOne, position }) =>
      showOne &&
      position > 0 &&
      css`
        margin-left: -450px;
        opacity: 0;
      `};
  `)}

  main {
    display: flex;
    flex-direction: column;
    width: 100%;

    &::before {
      content: '';
      height: 60vh;

      ${mixins.sm(css`
        height: 0vh;
      `)}
    }

    position: relative;
    z-index: 2;

    ${mixins.sm(css`
      width: 800px;
      background: #df872d;
      position: static;
      top: 0;
    `)}

    nav {
      background: #111;

      ${mixins.sm(css`
        background: transparent;
      `)}

      ul {
        display: flex;
        list-style: none;
      }
    }

    section {
      display: flex;
      padding: 24px;
      overflow: hidden;
      color: #eee;
      background: #111;
      min-height: 100%;

      ${mixins.sm(css`
        background: transparent;
      `)}

      ${mixins.sm(css`
        color: #000;
      `)}

      .list {
        display: flex;
        width: 100%;

        ul {
          list-style: none;
          overflow: auto;
          padding-right: 0px;

          ${mixins.sm(css`
            padding-right: 8px;
          `)}

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
            font-size: 18px;
            font-weight: bold;
            background: #222;
            padding: 8px 24px;
            margin-bottom: 16px;
            color: #fff;
            width: 100%;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;

            ${mixins.sm(css`
              font-size: 24px;
              background: rgba(0, 0, 0, 0.2);
            `)}

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
        display: none;
        flex-direction: column;
        justify-content: center;

        h1 {
          font-size: 32px;
          line-height: 1;
          margin-bottom: 8px;
        }

        ${mixins.sm(css`
          display: flex;
        `)}
      }

      & > div:first-child {
        display: flex;
        flex-direction: column;
        flex: 1;

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
              border: dashed 2px #df872d;
              padding: 10px 16px;
              border-radius: 8px;
              flex: 1;
              display: flex;
              align-items: center;
              position: relative;
              font-weight: 500;
              text-align: center;
              font-size: 18px;

              ${mixins.sm(css`
                border: dashed 3px rgba(51, 51, 51, 0.363);
              `)}

              span {
                position: absolute;
                background: #111;
                top: -12px;
                padding: 0 8px;
                font-weight: 300;
                color: #df872d;

                ${mixins.sm(css`
                  color: #333;
                  background: #df872d;
                `)}
              }
            }
          }
        }
      }
    }
  }

  aside {
    width: 100%;
    position: relative;
    display: flex;
    min-height: 60vh;
    cursor: pointer;
    overflow: hidden;
    position: fixed;
    z-index: 1;

    ${mixins.sm(css`
      width: 400px;
      position: relative;
      z-index: auto;
    `)}

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
