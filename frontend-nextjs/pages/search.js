import React, { useCallback, useState } from 'react';
import Head from 'next/head';

import Header from 'components/Header';
import InputSearch from 'components/InputSearch';

import Emoji from '../components/Emoji';

import { Container, ItemResult } from '../styles/Search';
import { person, yinYang } from '../components/Emoji/emojis';

import api from '../services/api';

export default function Search() {
  const [search, setSearch] = useState('');

  const [result, setResult] = useState([]);

  const handleSearch = useCallback(async (e, searchValue) => {
    e.preventDefault();
    setSearch(searchValue);
    const { data } = await api.get('search', { params: { q: searchValue } });
    setResult(data.data);
  }, []);

  return (
    <Container>
      <Head>
        <title>Pesquisa - Ramen Jutsus</title>
      </Head>

      <Header
        showSwitch={false}
        showSearch={!!search}
        showGoBack
        searchOptions={{ defaultSearch: search, onSubmit: handleSearch }}
      />

      <section>
        {!search && (
          <main>
            <InputSearch onSubmit={handleSearch} />
          </main>
        )}

        {!search && (
          <div>
            <h1>Qual Jutsu você quer Dominar?</h1>
            <h2>Use a busca para procurar personagens e habilidades de Naruto, Naruto Shippunden e Boruto.</h2>
          </div>
        )}

        <ul>
          {result.map(item => {
            return (
              <ItemResult key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h1>{item.name}</h1>
                  <span>
                    {item.isJutsu ? (
                      <>
                        <Emoji emoji={yinYang} /> Jutsu
                      </>
                    ) : (
                      <>
                        <Emoji emoji={person} /> Personagem
                      </>
                    )}
                  </span>
                </div>
              </ItemResult>
            );
          })}
        </ul>
      </section>
    </Container>
  );
}
