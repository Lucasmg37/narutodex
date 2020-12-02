import React from 'react';

import { Container } from './styles';

function Emoji({ emoji, height = 'auto', width = 'auto' }) {
  return <Container src={emoji.img} alt={emoji.alt} height={height} width={width} />;
}

export default Emoji;
