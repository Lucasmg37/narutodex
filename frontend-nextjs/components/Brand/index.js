import React from 'react';
import Emoji from '../Emoji';
import { steamingBowl } from '../Emoji/emojis';

import { Container } from './styles';

function Brand() {
  return (
    <Container>
      <Emoji emoji={steamingBowl} /> RAMEN JUTSUS
    </Container>
  );
}

export default Brand;
