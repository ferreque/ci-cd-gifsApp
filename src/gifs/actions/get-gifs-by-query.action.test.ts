import { beforeEach, describe, expect, test, vi } from 'vitest';

import { giphyApi } from '../api/giphy.api';
import { getGifsByQuery } from './get-gifs-by-query.action';

vi.mock('../api/giphy.api', () => ({
  giphyApi: vi.fn(),
}));

describe('getGifsByQuery', () => {
  beforeEach(() => {
    vi.mocked(giphyApi).mockResolvedValue({
      data: {
        data: Array.from({ length: 10 }, (_, index) => ({
          id: `id-${index}`,
          title: `title-${index}`,
          images: {
            original: {
              url: `https://test/${index}.gif`,
              width: '200',
              height: '100',
            },
          },
        })),
      },
    });
  });

  test('should return a list of gifs', async () => {
    const gifs = await getGifsByQuery('goku');
    const [gif1] = gifs;

    expect(gifs.length).toBe(10);
    expect(gif1).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      url: expect.any(String),
      width: expect.any(Number),
      height: expect.any(Number),
    });
    expect(giphyApi).toHaveBeenCalledWith('/search', {
      params: {
        q: 'goku',
        limit: 10,
      },
    });
  });
}); 