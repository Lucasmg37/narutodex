import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Header from 'components/Header';
import api from '../services/api';
import CardsCarousel from '../components/CardsCarousel';
import { Container } from '../styles/Home';

export async function getStaticProps() {
  const { data } = await api.get('jutsu');
  const { data: dataCharacters } = await api.get('character');

  const { data: jutsus } = data;
  const { data: characters } = dataCharacters;
  return {
    props: {
      jutsus,
      characters,
    },
  };
}

export default function Home({ jutsus, characters }) {
  const [current, setCurrent] = useState(0);
  const [currentJutsu, setCurrentJutsu] = useState(jutsus[0]);
  const [typeData, setTypeData] = useState('JUTSU');
  const [data, setData] = useState(jutsus);

  const [showStamps, setShowStamps] = useState(false);

  useEffect(() => {
    setCurrent(0);
    setShowStamps(false);

    if (typeData === 'JUTSU') {
      setData(jutsus);
      setCurrentJutsu(jutsus[0]);
      return;
    }

    setCurrentJutsu(characters[0]);
    setData(characters);
  }, [characters, jutsus, typeData]);

  const changeCurrent = useCallback(
    positon => {
      if (positon < 0) {
        setCurrent(data.length - 1);
        setCurrentJutsu(data[data.length - 1]);
        setShowStamps(false);
        return;
      }

      if (positon >= data.length) {
        setCurrent(0);
        setCurrentJutsu(data[0]);
        setShowStamps(false);
        return;
      }

      setCurrent(positon);
      setCurrentJutsu(data[positon]);
      setShowStamps(false);
    },
    [data],
  );

  return (
    <Container>
      <Head>
        <title>NARUTODEX</title>
      </Head>

      <img className="background" src={`${process.env.api}jutsu/${currentJutsu.id}/image`} alt="" />

      <main>
        <Header
          switcher={{
            selected: typeData,
            onChange: type => setTypeData(type),
          }}
        />

        <article>
          <CardsCarousel
            setShowStamps={setShowStamps}
            showStamps={showStamps}
            data={data}
            changeCurrent={changeCurrent}
            current={current}
            isJutsu={typeData === 'JUTSU'}
          />
        </article>
      </main>
    </Container>
  );
}
