import React, { useCallback, useState } from 'react';
import Head from 'next/head';

import Header from 'components/Header';
import InputSearch from 'components/InputSearch';

import { useRouter } from 'next/router';
import Loading from 'components/Loading';
import Emoji from '../components/Emoji';

import { Container, ItemResult } from '../styles/Search';
import { person, yinYang } from '../components/Emoji/emojis';

import api from '../services/api';

export default function Search() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasResponse, setHasResponse] = useState(false);
  const [result, setResult] = useState([]);

  const handleSearch = useCallback(async (e, searchValue) => {
    e.preventDefault();
    setSearch(searchValue);
    try {
      setLoading(true);
      const { data } = await api.get('search', { params: { q: searchValue } });
      setResult(data.data);
      setHasResponse(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Ops Deu Ruim!');
    } finally {
      setLoading(false);
    }
  }, []);

  const router = useRouter();

  const goToDescription = useCallback(
    item => {
      if (item.isJutsu) {
        router.push(`/jutsus/${item.id}`);
        return;
      }

      router.push(`/characters/${item.id}`);
    },
    [router],
  );

  return (
    <Container>
      <Head>
        <title>Pesquisar | NARUTODEX</title>
      </Head>

      {loading && <Loading />}

      <Header
        showSwitch={false}
        showSearch={!!search}
        searchOptions={{ defaultSearch: search, onSubmit: handleSearch }}
      />

      <section>
        {!search && (
          <div>
            <h1>Qual Jutsu você quer Dominar?</h1>
            <h2>Use a busca para procurar personagens e habilidades de Naruto, Naruto Shippunden e Boruto.</h2>
          </div>
        )}

        {search && hasResponse && !result.length && (
          <div>
            <h1>Opa! Não encontramos nada.</h1>
            <h2>Confira o texto que está buscando.</h2>
          </div>
        )}

        {!search && (
          <main>
            <InputSearch onSubmit={handleSearch} />
          </main>
        )}

        <ul>
          {result.map(item => {
            return (
              <ItemResult onClick={() => goToDescription(item)} key={item.id}>
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
