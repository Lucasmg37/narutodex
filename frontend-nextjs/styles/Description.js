import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: rgba(17, 17, 17, 0.9);
  flex-direction: column;

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(5px);
    z-index: -1;
  }
`;
