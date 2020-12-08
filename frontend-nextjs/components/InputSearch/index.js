import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Container } from './styles';

function InputSearch({ onSubmit, defaultSearch = '' }) {
  const [search, setSearch] = useState(defaultSearch);

  return (
    <Container onSubmit={event => onSubmit(event, search)}>
      <FiSearch />
      <input
        minLength={3}
        value={search}
        onChange={e => setSearch(e.target.value)}
        type="text"
        placeholder="Personagem ou Habilidade"
      />
      <button type="submit">Buscar</button>
    </Container>
  );
}

export default InputSearch;
