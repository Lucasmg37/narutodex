import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: #111;
  flex-direction: column;

  section + section {
    display: flex;
    flex-direction: column;
    margin: auto;

    h1 {
      font-size: 15rem;
      color: #333;
    }

    > div {
      display: flex;

      div {
        h2 {
          color: #df872d;
          font-size: 5rem;
          width: 700px;
          max-width: 100%;

          strong {
            color: #fff;
          }
        }

        h3 {
          color: #df872d;
          font-size: 2rem;
          font-weight: lighter;
          margin-top: 24px;
        }
      }
    }
  }
`;
