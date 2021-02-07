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
    padding: 8px;
    width: 900px;
    max-width: 90vw;
    background: #222;
    border-radius: 40px;

    h1 {
      color: #df872d;
      font-size: 32px;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    h2 {
      font-size: 24px;
      color: #df872d;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    > div {
      color: #ddd;
      font-size: 20px;
      padding: 16px;

      strong {
        color: #df872d;
      }

      a {
        color: #df872d;
      }

      :nth-child(5) {
        /* background: #111; */
        border-radius: 24px;

        > div {
          display: flex;
          align-items: center;
          font-weight: bold;

          > div {
            flex: 1;
            flex-direction: column;

            div {
              display: flex;
              margin-top: 8px;
            }

            a {
              margin-right: 16px;
              text-decoration: none;
              display: flex;
              align-items: center;
              font-weight: lighter;
              transition: all 0.2s ease-in-out;

              svg {
                margin-right: 4px;
                font-size: 24px;
              }

              :hover {
                color: #fff;
              }
            }
          }
        }

        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-right: 16px;
        }
      }
    }

    > div + div {
      margin-top: 16px;
    }
  }
`;
