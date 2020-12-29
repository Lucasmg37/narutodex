import styled from 'styled-components';

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
      justify-content: center;

      li + li {
        margin-top: 16px;
      }

      li button {
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

        span {
          transition: all ease-in-out 0.2s;
          opacity: 0;
          font-weight: bold;
          font-size: 1rem;
          max-width: 0;
          display: none;
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
            min-width: 64px;
            display: flex;
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
