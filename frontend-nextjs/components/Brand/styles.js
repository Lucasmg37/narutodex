import styled from 'styled-components';
import { Container as Emoji } from '../Emoji/styles';

export const Container = styled.div`
  ${Emoji} {
    height: 60px;
    margin-right: 8px;
  }

  font-weight: 900;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 2rem;
  margin-right: auto;

  span {
    font-weight: 300;
    color: #df872d;
  }
`;
