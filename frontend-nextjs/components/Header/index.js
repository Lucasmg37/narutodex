import Brand from 'components/Brand';
import InputSearch from 'components/InputSearch';
import Loading from 'components/Loading';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { FaGit } from 'react-icons/fa';
import { FiChevronLeft, FiSearch } from 'react-icons/fi';
import { GiPerspectiveDiceSixFacesOne } from 'react-icons/gi';
import api from 'services/api';

import { Container } from './styles';

function Header({ showSwitch = true, showSearch = false, showGoBack = false, searchOptions = {}, switcher }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleTransition = useCallback(() => {
    router.push('/search', '/search');
  }, [router]);

  const getRandom = useCallback(async () => {
    setLoading(true);

    let randomType = false;

    if (showSwitch && switcher) {
      if (switcher.selected === 'JUTSU') {
        randomType = 'jutsu';
      }

      if (switcher.selected === 'CHARACTER') {
        randomType = 'character';
      }
    }

    if (!randomType) {
      if (Math.floor(Math.random() * 2)) {
        randomType = 'character';
      } else {
        randomType = 'jutsu';
      }
    }

    const { data } = await api.get(`${randomType}/random`);
    setLoading(false);

    const { data: result } = data;

    if (randomType === 'character') {
      router.push(`/characters/${result.id}`, `/characters/${result.id}`);
    } else {
      router.push(`/jutsus/${result.id}`, `/jutsus/${result.id}`);
    }
  }, [showSwitch, switcher, router]);

  return (
    <Container>
      {loading && <Loading />}

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
            <button
              className={switcher.selected === 'JUTSU' && 'selected'}
              onClick={() => switcher.onChange('JUTSU')}
              type="button"
            >
              ☯️ Jutsus
            </button>
            <button
              className={switcher.selected === 'CHARACTER' && 'selected'}
              onClick={() => switcher.onChange('CHARACTER')}
              type="button"
            >
              🧘 Personagens
            </button>
          </li>
        )}

        <span className="separator" />

        <li>
          <button className="navItemButton" onClick={getRandom} type="button">
            <GiPerspectiveDiceSixFacesOne /> <span>Aleatório</span>
          </button>
        </li>

        <li>
          <button className="navItemButton" onClick={handleTransition} type="button">
            <FiSearch /> <span>Pesquisar</span>
          </button>
        </li>
        <li>
          <button className="navItemButton" onClick={() => router.push('/about', '/about')} type="button">
            <FaGit /> <span>Sobre</span>
          </button>
        </li>
      </ul>
    </Container>
  );
}

export default Header;
