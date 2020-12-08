import React, { useEffect } from 'react';

import { Container } from './styles';

function Transition({ execute, onAfter }) {
  useEffect(() => {
    if (execute) {
      setTimeout(onAfter, 300);
    }
  }, [execute, onAfter]);

  return <Container showTransition={execute} />;
}

export default Transition;
