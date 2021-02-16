import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import api from 'services/api';

import Description from 'components/Description';
import { Container } from '../../styles/Description';

import Header from '../../components/Header';

function characters({ id }) {
  const [character, setCharacter] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get(`character/${id}`);
      setCharacter(data.data);
    };

    getData();
  }, [id]);

  return (
    <Container>
      <Head>
        <title>Personagem | {character.name}</title>
      </Head>

      <img className="background" src={`${process.env.api}character/${character.id}/image`} alt="" />

      <Header showSwitch={false} />

      <Description data={character} isJutsu={false} />
    </Container>
  );
}

export async function getStaticPaths() {
  const { data } = await api.get('character');

  const paths = data.data.map(item => {
    const obj = {
      params: {
        id: `${item.id}`,
        item,
      },
    };

    return obj;
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}

export default characters;
