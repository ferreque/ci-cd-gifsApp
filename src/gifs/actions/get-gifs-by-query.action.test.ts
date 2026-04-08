import { describe, expect, test } from 'vitest'
import { getGifsByQuery } from './get-gifs-by-query.action'

describe('getGifsByQuery', () => {
    test('should return a list of gifs', async () => {
        const gifs = await getGifsByQuery('goku')
        const [gif1] = gifs
        expect(gifs.length).toBe(10)
        expect(gif1).toEqual({
            id: expect.any(String),
            title: expect.any(String),
            url: expect.any(String),
            width: expect.any(Number),
            height: expect.any(Number),
        })
    })
})