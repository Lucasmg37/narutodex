import Brand from 'components/Brand';
import InputSearch from 'components/InputSearch';
import React from 'react';

import { Container } from './styles';

function Header({ showSwitch = true, showSearch = false, searchOptions = {} }) {
  return (
    <Container>
      <ul>
        <li>
          <Brand />
        </li>

        {showSwitch && (
          <li>
            <button type="button">☯️ Jutsus</button>
            <button type="button">🧘 Personagens</button>
          </li>
        )}

        {showSearch && <InputSearch {...searchOptions} />}
      </ul>
    </Container>
  );
}

export default Header;
