import { describe, expect, test } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useGifs } from './useGifs'
// import { getGifsByQuery } from '../actions/get-gifs-by-query.action';

// // const mockGifs = vi.fn()
// // const mockHandleSerach = vi.fn()
// // const mockHandleTermClicked = vi.fn()
// // const mockPreviousTerms = vi.fn()

// vi.mock('../actions/get-gifs-by-query.action', () => ({
//     getGifsByQuery: async () => ({
//         await 
//     })
// }))


describe('useGifs', () => {



    test('should return default values and methods', () => {
        const { result } = renderHook(() => useGifs())

        expect(result.current.gifs).toBeTypeOf('object')
        expect(result.current.handleSearch).toBeTypeOf('function')
        expect(result.current.handleTermClicked).toBeTypeOf('function')
        expect(result.current.previousTerms).toBeTypeOf('object')

    })

    test('should return a list of gifs', async () => {

        const { result } = renderHook(() => useGifs())

        await act(() => result.current.handleSearch('goku'))


        expect(result.current.gifs.length).toBe(10)

    })
    test('should return a list of gifs when handleTermClicked is called', async () => {

        const { result } = renderHook(() => useGifs())

        await act(() => result.current.handleTermClicked('goku'))


        expect(result.current.gifs.length).toBe(10)

    })
})
