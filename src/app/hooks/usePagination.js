import { useState, useMemo } from 'react';

const usePagination = (pokemons, visible = 9) => {
  const [offset, setOffset] = useState(0);

  const page = useMemo(() => {
    return pokemons.slice(offset, offset + visible);
  }, [pokemons, offset, visible]);

  const next = () => {
    setOffset((prev) => prev + visible);
  };

  const back = () => {
    setOffset((prev) => prev - visible);
  };

  const hasPrev = offset > 0;
  const hasNext = offset + visible < pokemons.length;

  const total = pokemons.length;
  const from = total === 0 ? 0 : offset + 1;
  const to = Math.min(offset + visible, total);

  const currentPage = Math.floor(offset / visible) + 1;
  const totalPages = Math.ceil(total / visible);

  return {
    page,
    next,
    back,
    hasPrev,
    hasNext,
    from,
    to,
    total,
    currentPage,
    totalPages,
  };
};

export default usePagination;
