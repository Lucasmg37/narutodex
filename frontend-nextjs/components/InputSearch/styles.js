import styled, { css } from 'styled-components';
import { mixins } from 'styles/responsive';

export const Container = styled.form`
  border-radius: 50px;
  display: flex;
  background: #111;
  border: 3px solid #df872d;
  flex-direction: column;
  position: relative;

  ${mixins.sm(css`
    flex-direction: row;
  `)}

  input {
    background: none;
    border: none;
    color: #fff;
    font-size: 24px;
    flex: 1;
    padding: 16px 8px;
  }

  svg {
    color: #df872d;
    font-size: 32px;
    margin: auto 0 auto 16px;
    display: none;

    ${mixins.sm(css`
      display: block;
    `)}
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    background: #df872d;
    font-size: 24px;
    padding: auto 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 50px;
    transform: scale(1.05);
    color: #fff;
    position: absolute;
    top: 140%;
    padding: 16px 8px;

    ${mixins.sm(css`
      position: static;
      padding: auto 8px;
      width: 150px;
    `)}
  }
`;
