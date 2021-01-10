import Brand from 'components/Brand';
import InputSearch from 'components/InputSearch';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { FaGit } from 'react-icons/fa';
import { FiChevronLeft, FiSearch } from 'react-icons/fi';
import { GiPerspectiveDiceSixFacesOne } from 'react-icons/gi';

import { Container } from './styles';

function Header({ showSwitch = true, showSearch = false, showGoBack = false, searchOptions = {} }) {
  const router = useRouter();

  const handleTransition = useCallback(() => {
    router.push('/search', '/search');
  }, [router]);

  return (
    <Container>
      <ul>
        {showGoBack && (
          <li>
            <button className="backButton" type="button" onClick={() => router.push('/', '/')}>
              <FiChevronLeft /> <span>Voltar</span>
            </button>
          </li>
        )}

        <li>
          <Brand onClick={() => router.push('/', '/')} />
        </li>

        <span className="separator" />
        {showSearch && <InputSearch {...searchOptions} />}

        {showSwitch && (
          <li className="toogle">
            <button type="button">☯️ Jutsus</button>
            <button type="button">🧘 Personagens</button>
          </li>
        )}

        <span className="separator" />

        <li>
          <button className="navItemButton" type="button">
            <GiPerspectiveDiceSixFacesOne /> <span>Aleatório</span>
          </button>
        </li>

        <li>
          <button className="navItemButton" onClick={handleTransition} type="button">
            <FiSearch /> <span>Pesquisar</span>
          </button>
        </li>
        <li>
          <button className="navItemButton" type="button">
            <FaGit /> <span>Sobre</span>
          </button>
        </li>
      </ul>
    </Container>
  );
}

export default Header;
