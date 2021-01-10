import styled from 'styled-components';
import { Container as Brand } from '../Brand/styles';
import { Container as InputSearch } from '../InputSearch/styles';

export const Container = styled.section`
  padding: 64px 64px 16px;

  ul {
    list-style: none;
    display: flex;
    align-items: center;

    ${Brand} {
      cursor: pointer;
    }

    ${InputSearch} {
      input {
        padding: 8px 8px;
      }
    }

    .separator {
      margin-right: auto;
    }

    .navItemButton,
    .backButton {
      background: #df872d;
      color: #fff;
      margin-right: 8px;
      border: none;
      font-size: 20px;
      border-radius: 32px;
      padding: 8px 24px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all ease 0.2s;
      border: 3px solid transparent;

      svg {
        margin-right: 8px;
      }
    }

    li.toogle {
      button {
        border: 3px solid #df872d;
        font-size: 1.3rem;
        padding: 8px 24px;
        font-weight: bold;
        background: none;
        cursor: pointer;
        color: #fff;
      }

      button:first-child {
        border-radius: 24px 0 0 24px;

        background: #df872d;
      }

      button:last-child {
        border-radius: 0 24px 24px 0;
      }
    }
  }
`;
