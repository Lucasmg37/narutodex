import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { FiLink2, FiSearch } from 'react-icons/fi';

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
        searchOptions={{ defaultSearch: search, onSubmit: handleSearch }}
      />

      <section>
        {!search && (
          <main>
            <InputSearch onSubmit={handleSearch} />
          </main>
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

                <button type="button">
                  <FiLink2 />
                </button>
              </ItemResult>
            );
          })}
        </ul>
      </section>
    </Container>
  );
}
