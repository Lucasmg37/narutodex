import React, { useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import CardJutsu from '../CardJutsu';
import { Container } from './styles';

function CardsCarousel({ changeCurrent, current, jutsus, setShowStamps, showStamps }) {
  const handleShowStamps = useCallback(() => {
    setShowStamps(true);
  }, [setShowStamps]);

  return (
    <Container showStamps={showStamps}>
      <button onClick={() => changeCurrent(current - 1)} type="button" className="previous">
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
                handleShowStamps={handleShowStamps}
                showOne={showStamps}
              />
            );
          }
          return null;
        })}

      <button type="button" onClick={() => changeCurrent(current + 1)} className="next">
        <FiChevronRight />
      </button>
    </Container>
  );
}

export default CardsCarousel;
