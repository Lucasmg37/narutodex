import Loading from 'components/Loading';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { FaGit } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { GiPerspectiveDiceSixFacesOne } from 'react-icons/gi';
import { AiFillHome } from 'react-icons/ai';
import api from 'services/api';

import { Container } from './styles';

function TabNavigation({ showSwitch = true, switcher }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleTransition = useCallback(() => {
    router.push('/search', '/search');
  }, [router]);

  const getRandom = useCallback(async () => {
    setLoading(true);

    let randomType = false;

    if (showSwitch) {
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
        <li>
          <button onClick={() => router.push('/', '/')} type="button">
            <AiFillHome />
          </button>
        </li>

        <li>
          <button onClick={getRandom} type="button">
            <GiPerspectiveDiceSixFacesOne />
          </button>
        </li>

        <li>
          <button onClick={handleTransition} type="button">
            <FiSearch />
          </button>
        </li>
        <li>
          <button onClick={() => router.push('/about', '/about')} type="button">
            <FaGit />
          </button>
        </li>
      </ul>
    </Container>
  );
}

export default TabNavigation;
