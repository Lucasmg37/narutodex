import React from 'react';
import Head from 'next/head';

import Header from 'components/Header';

import { FaGithubSquare, FaLinkedinIn } from 'react-icons/fa';
import { Container } from '../styles/About';

export default function About() {
  return (
    <Container>
      <Head>
        <title>Sobre | NARUTODEX</title>
      </Head>

      <Header showSwitch={false} />

      <section>
        <div>
          <h1>Sobre a NARUTODEX</h1>
          <p>
            A NARUTODEX é uma aplicação para buscar informações sobre Personagens e Técnicas das franquias:{' '}
            <strong>Naruto</strong>, <strong>Naruto Shippunden</strong> e <strong>Boruto Next Generation</strong>.
          </p>
        </div>
        <div>
          <h2>Privacidade</h2>
          <p>Nenhuma informação do usuário é coletada. Não nos responsabilizamos pela veracidade das informações.</p>
        </div>
        <div>
          <h2>Das informações</h2>
          <p>
            Todas as informações foram coletadas de{' '}
            <a href="https://naruto.fandom.com/pt-br/wiki/Wiki_Naruto">naruto.fandom.com</a>. Elas podem estar
            desatualizadas ou com divergências da fonte.
            <br />O uso das informações deve seguir as regras do criador do conteúdo mencionado.
          </p>
        </div>
        <div>
          <h2>Feedbacks</h2>
          <p>
            Feedbacks, sugestões ou bugs devem ser enviados em forma de issue no respositório do projeto{' '}
            <a href="https://github.com/Lucasmg37/ramen-justus">NarutoDex</a>.
          </p>
        </div>

        <div>
          <h2>Quem sou</h2>
          <div>
            <img
              src="https://avatars.githubusercontent.com/u/25160385?s=460&u=210ad7ca8bdee219f7f3eccf50768477e5abf6e9&v=4"
              alt="Lucas Dias - Foto de Perfil"
            />
            <div>
              <p>Lucas Dias</p>
              <div>
                <a href="https://github.com/Lucasmg37">
                  <FaGithubSquare /> lucasmg37
                </a>
                <a href="https://www.linkedin.com/in/lucas-junior/">
                  <FaLinkedinIn /> Lucas Dias
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
