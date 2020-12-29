import Brand from 'components/Brand';
import InputSearch from 'components/InputSearch';
import { useRouter } from 'next/router';
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';

import { Container } from './styles';

function Header({ showSwitch = true, showSearch = false, showGoBack = false, searchOptions = {} }) {
  const router = useRouter();

  return (
    <Container>
      <ul>
        <li>
          <Brand />
        </li>

        {showGoBack && (
          <li>
            <button className="backButton" type="button" onClick={() => router.push('/', '/')}>
              <FiChevronLeft /> <span>Voltar</span>
            </button>
          </li>
        )}

        {showSwitch && (
          <li className="toogle">
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
