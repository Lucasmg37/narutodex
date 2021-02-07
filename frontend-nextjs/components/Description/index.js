import Emoji from 'components/Emoji';
import { handWithFingersSplayed } from 'components/Emoji/emojis';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { classesToString, classificationsToString } from 'utils/jutsu';

import { Container, LiNav } from './styles';

function Description({ isInitialCard = false, current = 0, showOne = false, setShowOne, isJutsu = true, data = {} }) {
  const [active, setActive] = useState(1);

  const [isClose, setClose] = useState(isInitialCard);

  const handleClickCard = useCallback(() => {
    setClose(false);
    if (setShowOne) {
      setShowOne(true);
    }
  }, [setShowOne]);

  useEffect(() => {
    if (current) {
      setClose(true);
    }
  }, [current]);

  const router = useRouter();

  return (
    <Container position={data.position} showOne={showOne}>
      <aside onClick={handleClickCard}>
        <img src={`${process.env.api}${isJutsu ? 'jutsu' : 'character'}/${data.id}/image`} alt="" />
        <div>
          <h1>{data.name}</h1>
          <div className="icons">
            {isJutsu && data.groupjutsusstamp && !!data.groupjutsusstamp.length && (
              <Emoji emoji={handWithFingersSplayed} />
            )}
          </div>
        </div>
      </aside>

      {!isClose && (
        <main>
          <nav>
            <ul>
              <LiNav isActive={active === 1} onClick={() => setActive(1)}>
                Informações
              </LiNav>
              {isJutsu && data.groupjutsusstamp && !!data.groupjutsusstamp.length && (
                <LiNav isActive={active === 2} onClick={() => setActive(2)}>
                  Selos
                </LiNav>
              )}

              {isJutsu && (
                <LiNav isActive={active === 3} onClick={() => setActive(3)}>
                  Usuários
                </LiNav>
              )}

              {!isJutsu && data.jutsus && !!data.jutsus.length && (
                <LiNav isActive={active === 4} onClick={() => setActive(4)}>
                  Jutsus
                </LiNav>
              )}
            </ul>
          </nav>

          <section>
            {active === 1 && (
              <div>
                <h3>{data.name}</h3>
                <div>
                  {isJutsu && (
                    <>
                      <div className="tagDotted">
                        <div>
                          <span>Rank</span>
                          {data.rank || '-'}
                        </div>

                        <div>
                          <span>Alcance</span>
                          {data.reach || '-'}
                        </div>
                      </div>

                      <div className="tagDotted">
                        <div>
                          <span>Classe</span>
                          {classesToString(data.classes)}
                        </div>

                        <div>
                          <span>Classificação</span>
                          {classificationsToString(data.classifications)}
                        </div>
                      </div>
                    </>
                  )}

                  <h3>Descrição</h3>

                  <div className="description">
                    <p>{data.description}</p>
                  </div>
                </div>
              </div>
            )}

            {active === 2 && (
              <div className="list">
                <ul>
                  {data.groupjutsusstamp &&
                    !!data.groupjutsusstamp.length &&
                    data.groupjutsusstamp[0].stamps.map(item => {
                      return (
                        <li>
                          {!!item.image && <img src={`${process.env.apiBase}${item.image}`} alt={item.name} />}
                          {item.name}
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            {active === 3 && (
              <div className="list">
                <ul>
                  {data.characters &&
                    !!data.characters.length &&
                    data.characters.map(item => {
                      return (
                        <li onClick={() => router.push(`/characters/${item.id}`)}>
                          <img src={`${process.env.api}character/${item.id}/image`} alt={item.name} />
                          {item.name}
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            {active === 4 && (
              <div className="list">
                <ul>
                  {data.jutsus &&
                    !!data.jutsus.length &&
                    data.jutsus.map(item => {
                      return (
                        <li onClick={() => router.push(`/jutsus/${item.id}`)}>
                          <img src={`${process.env.api}jutsu/${item.id}/image`} alt={item.name} />
                          {item.name}
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            <div>
              <h1>
                {active === 1 && isJutsu && 'O que você deve saber sobre essa técnica.'}
                {active === 1 && !isJutsu && 'O que você deve saber sobre esse personagem.'}
                {active === 2 && 'Bora tentar? Bastar seguir a sequência de selos.'}
                {active === 3 && 'Estes Personagens dominam este jutsu com perfeição.'}
                {active === 4 && 'Jutsus que esse personagem domina com perfeição.'}
              </h1>
              <p>Algo errado? Envie seu feedback.</p>
            </div>
          </section>
        </main>
      )}
    </Container>
  );
}

export default Description;
