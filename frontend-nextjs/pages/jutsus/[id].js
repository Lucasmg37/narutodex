import Head from 'next/head';
import React from 'react';
import api from 'services/api';

import Description from 'components/Description';
import { Container } from '../../styles/Description';

import Header from '../../components/Header';

function jutsus({ jutsu }) {
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
  // const { data } = await api.get(`jutsu/${params.id}`);

  const { item: jutsu } = params;

  return {
    props: {
      jutsu,
    },
  };
}

export default jutsus;
