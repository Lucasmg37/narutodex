import React, { useState } from 'react';
import { classesToString, classificationsToString } from 'utils/jutsu';

import { Container, LiNav } from './styles';

function Description({ jutsu }) {
  const [active, setActive] = useState(1);

  return (
    <Container>
      <aside>
        <img src={`http://localhost:3333/api/v1/jutsu/${jutsu.id}/image`} alt="" />
        <div>
          <h1>{jutsu.name}</h1>
        </div>
      </aside>
      <main>
        <nav>
          <ul>
            <LiNav isActive={active === 1} onClick={() => setActive(1)}>
              Informações
            </LiNav>
            <LiNav isActive={active === 2} onClick={() => setActive(2)}>
              Selos
            </LiNav>
            <LiNav isActive={active === 3} onClick={() => setActive(3)}>
              Usuários
            </LiNav>
          </ul>
        </nav>

        <section>
          {active === 1 && (
            <div>
              <h3>{jutsu.name}</h3>
              <div>
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

                <h3>Descrição</h3>

                <div className="description">
                  <p>{jutsu.description}</p>
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
                {jutsu.groupjutsusstamp &&
                  !!jutsu.characters.length &&
                  jutsu.characters.map(item => {
                    return (
                      <li>
                        <img src={`http://localhost:3333/api/v1/character/${item.id}/image`} alt={item.name} />
                        {item.name}
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}

          <div>
            <h1>
              {active === 1 && 'O que você deve saber sobre essa técnica.'}
              {active === 2 && 'Bora tentar? Bastar seguir a sequência de selos.'}
              {active === 3 && 'Estes Personagens dominam este jutsu com perfeição.'}
            </h1>
            <p>Algo errado? Envie seu feedback.</p>
          </div>
        </section>
      </main>
    </Container>
  );
}

export default Description;
