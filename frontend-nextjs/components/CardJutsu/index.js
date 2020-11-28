import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiChevronUp, FiXCircle } from 'react-icons/fi';
import { classesToString, classificationsToString } from '../../utils/jutsu';

import { BackCard, Container, Content, FrontCard, SeeMoreButton } from './styles';

function CardJutsu({ jutsu }) {
  const infoRef = useRef(null);
  const [showArrowUp, setShowArrowUp] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [height, setHeight] = useState(300);
  const [margin, setMargin] = useState(24);

  useEffect(() => {
    const { scrollHeight } = infoRef.current;

    if (scrollHeight > 300) {
      setShowArrowUp(true);
    }
  }, []);

  useEffect(() => {
    setHeight(300);
    setMargin(24);
    setIsBack(false);
  }, [jutsu.position]);

  const handleFlipCard = useCallback(() => {
    setIsBack(!isBack);
  }, [isBack]);

  const handleShowMore = useCallback(() => {
    const { scrollHeight } = infoRef.current;

    if (height > 300) {
      setHeight(300);
      setMargin(24);
      return;
    }

    if (scrollHeight > 300) {
      setHeight(scrollHeight);
      setMargin(scrollHeight - 300 + 24);
    }
  }, [height]);

  return (
    <Container position={jutsu.position}>
      <Content isBack={isBack && jutsu.position === 0}>
        <FrontCard upButtonBottom={20 + margin} heightMain={height} marginTopMain={-margin}>
          <header>
            <img src={`http://localhost:3333/api/v1/jutsu/${jutsu.id}/image`} alt={jutsu.name} />
            {showArrowUp && (
              <button onClick={handleShowMore} type="button">
                {height > 300 ? <FiChevronDown /> : <FiChevronUp />}
              </button>
            )}
          </header>
          <main ref={infoRef}>
            <h3>{jutsu.name}</h3>
            <div className="contentInfo">
              <div className="rank">
                <span>Rank</span>
                {jutsu.rank || '-'}
              </div>

              <div className="rank">
                <span>Alcance</span>
                {jutsu.reach || '-'}
              </div>
            </div>
            <div className="class">
              <span>Classe</span>
              {classesToString(jutsu.classes)}
            </div>

            <div className="classification">
              <span>Classificação</span>
              {classificationsToString(jutsu.classifications)}
            </div>

            <footer>
              {!!jutsu.groupjutsusstamp.length && <button type="button">☝️ Selos</button>}

              <button type="button" onClick={handleFlipCard}>
                🔍 Info
              </button>
            </footer>

            {showArrowUp && height === 300 && (
              <SeeMoreButton onClick={handleShowMore} type="button">
                <FiChevronUp />
              </SeeMoreButton>
            )}
          </main>
        </FrontCard>

        <BackCard isBack={isBack && jutsu.position === 0}>
          <img src={`http://localhost:3333/api/v1/jutsu/${jutsu.id}/image`} alt={jutsu.name} />

          <div>
            <h3>{jutsu.name}</h3>
            <p>{jutsu.description}</p>
            <button onClick={handleFlipCard} type="button">
              <FiXCircle /> Fechar
            </button>
          </div>
        </BackCard>
      </Content>
    </Container>
  );
}

export default CardJutsu;
