import styled from 'styled-components';

import { Container as Brand } from '../components/Brand/styles';
import { Container as Emoji } from '../components/Emoji/styles';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: #111;
  flex-direction: column;

  section + section {
    width: 800px;
    margin: auto;

    header {
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;

      ${Brand} {
        margin: auto;
      }

      h1 {
        margin-top: 32px;
        color: #111;
      }
    }
    main {
      margin: 40px 0;
    }
  }
`;

export const ItemResult = styled.li`
  display: flex;
  background: #111;
  border: 1px solid #df872d;
  border-radius: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
  min-height: 5rem;

  & > div {
    margin: auto 1rem;

    h1 {
      color: #df872d;
    }

    span {
      display: flex;
      align-items: center;
      color: #fff;
      margin-top: 0.5rem;

      ${Emoji} {
        height: 1.5rem;
        width: auto;
        margin-right: 0.25rem;
      }
    }
  }

  img {
    width: 7rem;
    height: 7rem;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  button {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    background: #222;
    color: #df872d;
    border: none;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto 1rem auto auto;
    cursor: pointer;
  }
`;
