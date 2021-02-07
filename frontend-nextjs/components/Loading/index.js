import Emoji from 'components/Emoji';
import { magnifyingGlassTiltedLeft } from 'components/Emoji/emojis';
import React from 'react';

import { Container, Line, Content } from './styles';

function Loading({ children }) {
  return (
    <Container title="Carregando...">
      <Line />
      <Content>
        <div>{children || <Emoji emoji={magnifyingGlassTiltedLeft} />}</div>
      </Content>
    </Container>
  );
}

export default Loading;
