import styled from 'styled-components';

export const Container = styled.form`
  border-radius: 50px;
  display: flex;
  background: #111;
  border: 3px solid #df872d;

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
    width: 150px;
    border-radius: 50px;
    transform: scale(1.05);
    color: #fff;
  }
`;
