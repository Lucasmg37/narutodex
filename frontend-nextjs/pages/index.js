import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { GiPerspectiveDiceSixFacesOne } from 'react-icons/gi';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import { FaRandom } from 'react-icons/fa';
import CardJutsu from '../components/CardJutsu';
import api from '../services/api';
import styles from '../styles/Home.module.scss';
import CardStamps from '../components/CardStamps';

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

  const changeCurrent = useCallback(
    positon => {
      setCurrent(positon);
      setCurrentJutsu(jutsus[positon]);
    },
    [jutsus],
  );

  return (
    <div className={styles.container}>
      <aside>
        <nav>
          <ul>
            <li>
              <FiSearch /> <span>Pesquisar</span>
            </li>
            <li>
              <FaRandom /> <span>Misturar</span>
            </li>
            <li>
              <GiPerspectiveDiceSixFacesOne /> <span>Aleatório</span>
            </li>
          </ul>
        </nav>
      </aside>

      <img className={styles.background} src={`http://localhost:3333/api/v1/jutsu/${currentJutsu.id}/image`} alt="" />

      <main>
        <section className={styles.topMenu}>
          <ul>
            <li>
              <img src="/images/steaming-bowl_1f35c.png" alt="" /> RAMEN JUTSUS
            </li>

            <li>
              <button type="button">☯️ Jutsus</button>
              <button type="button">🧘 Personagens</button>
            </li>
          </ul>
        </section>

        <article>
          <section className={styles.cards}>
            <button onClick={() => changeCurrent(current - 1)} type="button" className={styles.previous}>
              <FiChevronLeft />
            </button>

            {jutsus &&
              jutsus.map((jutsu, index) => {
                if (
                  index === current ||
                  index === current - 1 ||
                  index === current + 1 ||
                  index === current + 2 ||
                  index === current - 2
                ) {
                  let position = 0;

                  if (index === current - 2) {
                    position = -2;
                  }

                  if (index === current - 1) {
                    position = -1;
                  }

                  if (index === current) {
                    position = 0;
                  }

                  if (index === current + 1) {
                    position = 1;
                  }

                  if (index === current + 2) {
                    position = 2;
                  }

                  return (
                    <CardJutsu
                      jutsu={{
                        ...jutsu,
                        position,
                      }}
                    />
                  );
                }
                return null;
              })}

            <button type="button" onClick={() => changeCurrent(current + 1)} className={styles.next}>
              <FiChevronRight />
            </button>
          </section>
          <section className={styles.stamps}>
            {!!currentJutsu.groupjutsusstamp.length && <CardStamps groupJutsusStamp={currentJutsu.groupjutsusstamp} />}
          </section>
        </article>
      </main>
    </div>
  );
}
