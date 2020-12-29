import styled from 'styled-components';

import { Container as Emoji } from '../components/Emoji/styles';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: #111;
  flex-direction: column;

  section + section {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;

    main {
      width: 800px;
      margin: auto;
    }

    & > div {
      width: 800px;
      margin: 40px auto;

      h1 {
        max-width: 400px;
        color: #df872d;
        font-size: 64px;
        margin-bottom: 24px;
      }

      h2 {
        max-width: 600px;
        color: #df872d;
        font-size: 32px;
        margin-bottom: 24px;
        font-weight: normal;
        opacity: 0.7;
      }
    }

    ul {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      padding: 64px;
      grid-gap: 24px;
    }
  }
`;

export const ItemResult = styled.li`
  display: flex;
  background: #222;
  border: 1px solid #df872d;
  border-radius: 0.5rem;
  flex-direction: column;
  cursor: pointer;
  transition: ease all 0.2s;

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
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 0.5rem 0.5rem 0 0;
    filter: grayscale(1);
    transition: ease 0.2s all;
  }
`;
