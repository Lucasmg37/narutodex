import React from 'react';
import Emoji from '../Emoji';
import { steamingBowl } from '../Emoji/emojis';

import { Container } from './styles';

function Brand({ ...props }) {
  return (
    <Container {...props}>
      <Emoji emoji={steamingBowl} /> NARUTO<span>DEX</span>
    </Container>
  );
}

export default Brand;
