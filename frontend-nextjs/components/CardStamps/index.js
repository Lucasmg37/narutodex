import React from 'react';
import { Container } from './styles';

function CardStamps({ groupJutsusStamp = [] }) {
  // console.log(groupJutsusStamp[0].stamps);

  return (
    <Container>
      <h3>☝️ Selos</h3>

      <ul>
        {!!groupJutsusStamp.length &&
          groupJutsusStamp[0].stamps.map(item => {
            return (
              <li>
                <img
                  src="https://raw.githubusercontent.com/Lucasmg37/ninjutsu-learn-game/main/src/assets/img/maos/1.png"
                  alt=""
                />
                {item.name}
              </li>
            );
          })}
      </ul>
    </Container>
  );
}

export default CardStamps;
