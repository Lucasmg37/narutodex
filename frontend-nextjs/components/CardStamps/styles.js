import styled from 'styled-components';
import { Container as Emogi } from '../Emoji/styles';

export const Container = styled.div`
  width: 380px;
  height: 576px;
  position: relative;

  div {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    padding: 0 16px;

    &::-webkit-scrollbar-track {
      /* background-color: #df872d; */
    }

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgb(223, 135, 45);
    }
  }

  button {
    position: absolute;
    height: 48px;
    width: 48px;
    background: #fff;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -20px;
    right: -10px;
    cursor: pointer;
    transition: all ease 0.2s;

    &:hover {
      transform: scale(1.09);
    }
  }

  h3 {
    padding: 16px 0;
    border-radius: 4px;
    color: #fff;
    font-size: 32px;
    background: #df872d;
    /* border: 3px solid #df872d; */
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    ${Emogi} {
      margin-right: 8px;
    }
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;

    li {
      padding: 8px 24px;
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      border: 1px solid #df872d;

      background: #111;

      margin-top: 8px;
      border-radius: 4px;
      color: #fff;
      transition: ease-in 0.2s all;
      cursor: pointer;

      img {
        height: 64px;
        width: 64px;
        border-radius: 50%;
        margin-right: 16px;
      }

      &:hover {
        transform: scale(1.05);
        background: #df872d;
      }
    }
  }
`;
