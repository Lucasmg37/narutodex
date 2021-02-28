import styled, { css } from 'styled-components';
import { mixins } from '../../styles/responsive';

export const Container = styled.section`
  display: block;
  width: 100%;

  ${mixins.sm(css`
    display: none;
  `)}

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    width: 100%;

    li {
      flex: 1;

      button {
        background: #df872d;
        color: #fff;
        font-size: 32px;
        padding: 24px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all ease 0.2s;
        width: 100%;
        border: none;

        :hover {
          background: #333;
        }
      }
    }
  }
`;
