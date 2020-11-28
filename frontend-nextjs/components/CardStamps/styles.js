import styled from 'styled-components';

export const Container = styled.div`
  width: 360px;
  height: 576px;

  h3 {
    background: #df872d;
    text-align: center;
    padding: 16px;
    border-radius: 4px;
    color: #fff;
  }

  ul {
    list-style: none;

    li {
      padding: 8px 24px;
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      background: #df872d;
      margin-top: 8px;
      border-radius: 4px;
      color: #fff;

      img {
        height: 64px;
        width: 64px;
        border-radius: 50%;
        margin-right: 16px;
      }
    }
  }
`;
