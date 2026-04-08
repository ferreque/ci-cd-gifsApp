import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { gifsMock } from '../../../test/mock/test.gifs.data';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';
import { useGifs } from './useGifs';

vi.mock('../actions/get-gifs-by-query.action', () => ({
  getGifsByQuery: vi.fn(),
}));

describe('useGifs', () => {
  beforeEach(() => {
    vi.mocked(getGifsByQuery).mockResolvedValue(gifsMock);
  });

  test('should return default values and methods', () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs).toEqual([]);
    expect(result.current.previousTerms).toEqual([]);
    expect(result.current.handleSearch).toBeTypeOf('function');
    expect(result.current.handleTermClicked).toBeTypeOf('function');
  });

  test('should return a list of gifs', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch('goku');
    });

    expect(result.current.gifs).toHaveLength(10);
    expect(getGifsByQuery).toHaveBeenCalledWith('goku');
  });

  test('should return a list of gifs when handleTermClicked is called', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked('goku');
    });

    expect(result.current.gifs).toHaveLength(10);
    expect(getGifsByQuery).toHaveBeenCalledWith('goku');
  });
});
