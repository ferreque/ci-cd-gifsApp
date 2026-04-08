import { useRef, useState } from 'react';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';
import type { Gif } from '../interfaces/gif.interface';

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>(JSON.parse(localStorage.getItem('lastQuery') || '[]'));
  const [previousTerms, setPreviousTerms] = useState<string[]>(JSON.parse(localStorage.getItem('lastTenQuerys') || '[]'));

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }

    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };

  const handleSearch = async (query: string = '') => {
    query = query.trim().toLowerCase();
    if (query.length === 0) return;
    if (previousTerms.includes(query))
      return;

    setPreviousTerms([query, ...previousTerms].slice(0, 10));
    localStorage.setItem('lastTenQuerys', JSON.stringify([query, ...previousTerms].slice(0, 10)))


    const gifs = await getGifsByQuery(query);
    setGifs(gifs);

    gifsCache.current[query] = gifs;
    localStorage.setItem('lastQuery', JSON.stringify(gifs))

  };

  return {
    // Properties
    gifs,

    // Methods
    handleSearch,
    handleTermClicked,
    previousTerms,
  };
};
