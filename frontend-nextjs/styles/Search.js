import styled, { css } from 'styled-components';

import { Container as Emoji } from '../components/Emoji/styles';
import { mixins } from './responsive';

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  background: #111;
  flex-direction: column;
  overflow: auto;

  ${mixins.sm(css`
    min-height: 100vh;
  `)}

  section + section {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 24px;

    ${mixins.sm(css`
      padding: 0;
    `)}

    main {
      width: 800px;
      max-width: 100%;
      margin: 0 auto;
      display: block;

      ${mixins.sm(css`
        display: ${({ showInput }) => (showInput ? 'block' : 'none')};
      `)}
    }

    & > div {
      width: 800px;
      max-width: 100%;
      margin: 80px auto;

      h1 {
        color: #df872d;
        font-size: 48px;
        margin-bottom: 24px;

        ${mixins.sm(css`
          font-size: 64px;
        `)}
      }

      h2 {
        color: #df872d;
        font-size: 24px;
        margin-bottom: 24px;
        font-weight: normal;
        opacity: 0.7;

        ${mixins.sm(css`
          font-size: 32px;
        `)}
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      padding: 0px;
      grid-gap: 24px;
      margin-top: 120px;

      ${mixins.sm(css`
        display: grid;
        padding: 64px;
        margin-top: 0px;
      `)}
    }
  }
`;

export const ItemResult = styled.li`
  display: flex;
  background: #222;
  border: 1px solid #df872d;
  border-radius: 0.5rem;
  flex-direction: row;
  cursor: pointer;
  transition: ease all 0.2s;

  ${mixins.sm(css`
    flex-direction: column;
  `)}

  &:hover {
    transform: scale(1.08);

    & > img {
      filter: grayscale(0);
    }
  }

  & > div {
    margin: 8px 0;
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;

    h1 {
      color: #df872d;
      margin-bottom: 0.5rem;
    }

    span {
      display: flex;
      color: #fff;
      margin-top: auto;

      ${Emoji} {
        height: 1.5rem;
        width: auto;
        margin-right: 0.25rem;
      }
    }
  }

  & > img {
    width: 100px;
    min-height: 120px;
    object-fit: cover;
    border-radius: 0.5rem 0.5rem 0 0;
    filter: grayscale(1);
    transition: ease 0.2s all;

    ${mixins.sm(css`
      width: 100%;
      height: 250px;
    `)}
  }
`;
