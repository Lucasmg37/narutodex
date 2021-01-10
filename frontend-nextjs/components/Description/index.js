import Emoji from 'components/Emoji';
import { handWithFingersSplayed } from 'components/Emoji/emojis';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { classesToString, classificationsToString } from 'utils/jutsu';

import { Container, LiNav } from './styles';

function Description({
  jutsu,
  isInitialCard = false,
  current = 0,
  showOne = false,
  setShowOne,
  character,
  isJutsu = true,
}) {
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
    <Container position={isJutsu ? jutsu.position : character.position} showOne={showOne}>
      <aside onClick={handleClickCard}>
        <img
          src={`http://localhost:3333/api/v1/${isJutsu ? 'jutsu' : 'character'}/${
            isJutsu ? jutsu.id : character.id
          }/image`}
          alt=""
        />
        <div>
          <h1>{isJutsu ? jutsu.name : character.name}</h1>
          <div className="icons">
            {isJutsu && !!jutsu.groupjutsusstamp.length && <Emoji emoji={handWithFingersSplayed} />}
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
              {isJutsu && !!jutsu.groupjutsusstamp.length && (
                <LiNav isActive={active === 2} onClick={() => setActive(2)}>
                  Selos
                </LiNav>
              )}

              {isJutsu && (
                <LiNav isActive={active === 3} onClick={() => setActive(3)}>
                  Usuários
                </LiNav>
              )}

              {!isJutsu && (
                <LiNav isActive={active === 4} onClick={() => setActive(4)}>
                  Jutsus
                </LiNav>
              )}
            </ul>
          </nav>

          <section>
            {active === 1 && (
              <div>
                <h3>{isJutsu ? jutsu.name : character.name}</h3>
                <div>
                  {isJutsu && (
                    <>
                      <div className="tagDotted">
                        <div>
                          <span>Rank</span>
                          {jutsu.rank || '-'}
                        </div>

                        <div>
                          <span>Alcance</span>
                          {jutsu.reach || '-'}
                        </div>
                      </div>

                      <div className="tagDotted">
                        <div>
                          <span>Classe</span>
                          {classesToString(jutsu.classes)}
                        </div>

                        <div>
                          <span>Classificação</span>
                          {classificationsToString(jutsu.classifications)}
                        </div>
                      </div>
                    </>
                  )}

                  <h3>Descrição</h3>

                  <div className="description">
                    <p>{isJutsu ? jutsu.description : character.description}</p>
                  </div>
                </div>
              </div>
            )}

            {active === 2 && (
              <div className="list">
                <ul>
                  {jutsu.groupjutsusstamp &&
                    !!jutsu.groupjutsusstamp.length &&
                    jutsu.groupjutsusstamp[0].stamps.map(item => {
                      return (
                        <li>
                          {!!item.image && <img src={`http://localhost:3333${item.image}`} alt={item.name} />}
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
                  {jutsu.characters &&
                    !!jutsu.characters.length &&
                    jutsu.characters.map(item => {
                      return (
                        <li onClick={() => router.push(`/characters/${item.id}`)}>
                          <img src={`http://localhost:3333/api/v1/character/${item.id}/image`} alt={item.name} />
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
                  {character.jutsus &&
                    !!character.jutsus.length &&
                    character.jutsus.map(item => {
                      return (
                        <li onClick={() => router.push(`/jutsus/${item.id}`)}>
                          <img src={`http://localhost:3333/api/v1/jutsu/${item.id}/image`} alt={item.name} />
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
