import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GiPerspectiveDiceSixFacesOne } from 'react-icons/gi';
import { FiSearch } from 'react-icons/fi';
import { FaGit, FaRandom } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Header from 'components/Header';
import api from '../services/api';
import CardStamps from '../components/CardStamps';
import CardsCarousel from '../components/CardsCarousel';
import { Container } from '../styles/Home';
import Transition from '../components/Transition';

export async function getStaticProps() {
  const { data } = await api.get('jutsu');

  const { data: jutsus } = data;
  return {
    props: {
      jutsus,
    },
  };
}

export default function Home({ jutsus }) {
  const [current, setCurrent] = useState(2);
  const [currentJutsu, setCurrentJutsu] = useState(jutsus[2]);

  const [showStamps, setShowStamps] = useState(false);
  const [goToSearch, setGoToSearch] = useState(false);

  const router = useRouter();

  const changeCurrent = useCallback(
    positon => {
      setCurrent(positon);
      setCurrentJutsu(jutsus[positon]);
      setShowStamps(false);
    },
    [jutsus],
  );

  const handleTransition = useCallback(() => {
    router.push('/search', '/search');
  }, [router]);

  return (
    <Container>
      <Head>
        <title>Ramen Jutsus</title>
      </Head>

      <img className="background" src={`http://localhost:3333/api/v1/jutsu/${currentJutsu.id}/image`} alt="" />

      <aside>
        <nav>
          <ul>
            <li>
              <button onClick={() => setGoToSearch(true)} type="button">
                <Transition execute={goToSearch} onAfter={handleTransition} />
                <FiSearch /> <span>Pesquisar</span>
              </button>
            </li>
            <li>
              <button type="button">
                <FaRandom /> <span>Misturar</span>
              </button>
            </li>

            <li>
              <button type="button">
                <GiPerspectiveDiceSixFacesOne /> <span>Aleatório</span>
              </button>
            </li>
            <li>
              <button type="button">
                <FaGit /> <span>Sobre</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main>
        <Header />

        <article>
          <CardsCarousel
            setShowStamps={setShowStamps}
            showStamps={showStamps}
            jutsus={jutsus}
            changeCurrent={changeCurrent}
            current={current}
          />

          <AnimatePresence>
            {!!showStamps && (
              <motion.section
                initial={{ marginRight: -360, opacity: 0 }}
                animate={{ marginRight: 0, opacity: 1 }}
                exit={{ marginRight: -380, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {!!currentJutsu.groupjutsusstamp.length && (
                  <CardStamps
                    onCloseStamps={() => setShowStamps(false)}
                    groupJutsusStamp={currentJutsu.groupjutsusstamp}
                  />
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </article>
      </main>
    </Container>
  );
}
