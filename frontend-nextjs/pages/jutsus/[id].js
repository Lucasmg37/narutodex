import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import api from 'services/api';

import Description from 'components/Description';
import { Container } from '../../styles/Description';

import Header from '../../components/Header';

function jutsus({ id }) {
  const [jutsu, setJutsu] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get(`jutsu/${id}`);
      setJutsu(data.data);
    };

    getData();
  }, [id]);

  return (
    <Container>
      <Head>
        <title>Jutsu | {jutsu.name}</title>
      </Head>

      <img className="background" src={`${process.env.api}jutsu/${jutsu.id}/image`} alt="" />

      <Header showSwitch={false} />

      <Description data={jutsu} />
    </Container>
  );
}

export async function getStaticPaths() {
  const { data } = await api.get('jutsu');

  const paths = data.data.map(item => {
    const obj = {
      params: {
        id: `${item.id}`,
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

export default jutsus;
