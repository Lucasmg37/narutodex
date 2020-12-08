import styled from 'styled-components';

export const Container = styled.section`
  padding: 64px 64px 16px;

  ul {
    list-style: none;
    display: flex;

    li:first-child {
      margin-right: auto;
    }

    li:last-child {
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
