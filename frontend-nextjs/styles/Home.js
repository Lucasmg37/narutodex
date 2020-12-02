import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: rgba(17, 17, 17, 0.9);

  main {
    display: flex;
    flex-direction: column;
    flex: 1;

    article {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }

    .stamps {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 80px;
    }
  }

  aside nav {
    display: flex;
    height: 100vh;
    margin-right: auto;
    padding: 24px;
    width: 100px;

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      li {
        background: none;
        width: 64px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 64px;
        color: #df872d;
        font-size: 1.8rem;
        cursor: pointer;
        border: 3px solid #df872d;
        transition: all ease-in-out 0.2s;

        .transition {
          width: 0vw;
          height: 0vw;
          background: #df872d;
          position: absolute;
          border-radius: 50%;
          transition: all ease-in 1s;
          z-index: 999;

          ${({ showTransition }) =>
            showTransition &&
            css`
              width: 250vw;
              height: 250vw;
            `}
        }

        span {
          transition: all ease-in-out 0.2s;
          opacity: 0;
          font-weight: bold;
          font-size: 1rem;
          max-width: 0;
        }

        &:hover {
          background: #df872d;
          color: #fff;
          width: auto;
          padding: 16px;

          span {
            opacity: 1;
            max-width: 100px;
            margin-left: 8px;
          }
        }
      }
    }
  }

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(5px);
    z-index: -1;
  }
`;

export const TopMenu = styled.section`
  padding: 64px 64px 16px;

  ul {
    list-style: none;
    display: flex;

    li:first-child {
      font-weight: 900;
      color: #fff;
      display: flex;
      align-items: center;
      font-size: 2rem;
      margin-right: auto;

      img {
        height: 60px;
        margin-right: 8px;
      }
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
