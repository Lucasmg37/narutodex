import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Header from 'components/Header';
import api from '../services/api';
import CardStamps from '../components/CardStamps';
import CardsCarousel from '../components/CardsCarousel';
import { Container } from '../styles/Home';

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

  const changeCurrent = useCallback(
    positon => {
      setCurrent(positon);
      setCurrentJutsu(jutsus[positon]);
      setShowStamps(false);
    },
    [jutsus],
  );

  return (
    <Container>
      <Head>
        <title>Ramen Jutsus</title>
      </Head>

      <img className="background" src={`http://localhost:3333/api/v1/jutsu/${currentJutsu.id}/image`} alt="" />

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
