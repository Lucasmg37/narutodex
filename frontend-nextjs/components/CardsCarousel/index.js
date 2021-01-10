import Description from 'components/Description';
import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Container } from './styles';

function CardsCarousel({ changeCurrent, current, jutsus }) {
  const [showOne, setShowOne] = useState(false);

  useEffect(() => {
    setShowOne(false);
  }, [current]);

  return (
    <Container>
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
              <Description
                isInitialCard
                current={current}
                setShowOne={setShowOne}
                showOne={showOne}
                jutsu={{
                  ...jutsu,
                  position,
                }}
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
