import React from 'react';
import Emoji from '../Emoji';
import { openBook } from '../Emoji/emojis';

import { Container } from './styles';

function Brand({ ...props }) {
  return (
    <Container {...props}>
      <Emoji emoji={openBook} /> NARUTO<span>DEX</span>
    </Container>
  );
}

export default Brand;
