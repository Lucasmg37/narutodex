import React from 'react';
import { FiX } from 'react-icons/fi';
import Emoji from '../Emoji';
import { handWithFingersSplayed } from '../Emoji/emojis';

import { Container } from './styles';

function CardStamps({ groupJutsusStamp = [], onCloseStamps }) {
  return (
    <Container>
      <button onClick={onCloseStamps} type="button">
        <FiX />
      </button>

      <div>
        <h3>
          <Emoji height="32px" emoji={handWithFingersSplayed} /> Selos
        </h3>

        <ul>
          {!!groupJutsusStamp.length &&
            groupJutsusStamp[0].stamps.map(item => {
              return (
                <li>
                  {!!item.image && <img src={`http://localhost:3333${item.image}`} alt={item.name} />}
                  {item.name}
                </li>
              );
            })}
        </ul>
      </div>
    </Container>
  );
}

export default CardStamps;
