import styled, { css } from 'styled-components';
import { Container as Brand } from '../Brand/styles';
import { Container as InputSearch } from '../InputSearch/styles';
import { mixins } from '../../styles/responsive';

export const Container = styled.section`
  padding: 64px 64px 16px;
  display: none;

  ${mixins.sm(css`
    display: block;
  `)}

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

      button {
        font-size: 18px;
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
      font-size: 20px;
      border-radius: 32px;
      padding: 8px 24px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all ease 0.2s;
      border: 1px solid transparent;

      :hover {
        background: transparent;
        border: 1px solid #df872d;
      }

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

      button.selected {
        background: #df872d;
      }

      button:first-child {
        border-radius: 24px 0 0 24px;
      }

      button:last-child {
        border-radius: 0 24px 24px 0;
      }
    }
  }
`;
