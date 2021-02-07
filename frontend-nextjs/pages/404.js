import React from 'react';
import Head from 'next/head';

import Header from 'components/Header';

import { Container } from '../styles/404';

export default function Custom404() {
  return (
    <Container>
      <Head>
        <title>404 | NARUTODEX</title>
      </Head>

      <Header showSwitch={false} />

      <section>
        <h1>404</h1>
        <div>
          <div>
            <h2>
              Você deve estar em um <strong>genjutsu</strong>!
            </h2>
            <h3>Não tem nada aqui.</h3>
          </div>
        </div>
      </section>
    </Container>
  );
}
