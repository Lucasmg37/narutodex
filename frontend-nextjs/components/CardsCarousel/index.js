import Description from 'components/Description';
import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Container } from './styles';

function CardsCarousel({ changeCurrent, current, data, isJutsu }) {
  const [showOne, setShowOne] = useState(false);

  useEffect(() => {
    setShowOne(false);
  }, [current]);

  return (
    <Container>
      <button onClick={() => changeCurrent(current - 1)} type="button" className="previous">
        <FiChevronLeft />
      </button>

      {data && current === 0 && (
        <>
          <Description
            isInitialCard
            current={current}
            setShowOne={setShowOne}
            showOne={showOne}
            isJutsu={isJutsu}
            data={{
              ...data[data.length - 2],
              position: -2,
            }}
          />
          <Description
            isInitialCard
            current={current}
            setShowOne={setShowOne}
            showOne={showOne}
            isJutsu={isJutsu}
            data={{
              ...data[data.length - 1],
              position: -1,
            }}
          />
        </>
      )}

      {data && current === 1 && (
        <Description
          isInitialCard
          current={current}
          setShowOne={setShowOne}
          showOne={showOne}
          isJutsu={isJutsu}
          data={{
            ...data[data.length - 1],
            position: -2,
          }}
        />
      )}

      {data &&
        data.map((item, index) => {
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
                isJutsu={isJutsu}
                data={{
                  ...item,
                  position,
                }}
              />
            );
          }
          return null;
        })}

      {data && current === data.length - 1 && (
        <>
          <Description
            isInitialCard
            current={current}
            setShowOne={setShowOne}
            showOne={showOne}
            isJutsu={isJutsu}
            data={{
              ...data[0],
              position: 1,
            }}
          />
          <Description
            isInitialCard
            current={current}
            setShowOne={setShowOne}
            showOne={showOne}
            isJutsu={isJutsu}
            data={{
              ...data[1],
              position: 2,
            }}
          />
        </>
      )}

      {data && current === data.length - 2 && (
        <Description
          isInitialCard
          current={current}
          setShowOne={setShowOne}
          showOne={showOne}
          isJutsu={isJutsu}
          data={{
            ...data[0],
            position: 2,
          }}
        />
      )}

      <button type="button" onClick={() => changeCurrent(current + 1)} className="next">
        <FiChevronRight />
      </button>
    </Container>
  );
}

export default CardsCarousel;
