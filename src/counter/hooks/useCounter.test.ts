import { test, describe, expect } from 'vitest'
import { useCounter } from './useCounter'
import { act, renderHook } from '@testing-library/react'

describe('useContext', () => {
    const initVal = 20
    test('should initialize with default value of 10', () => {
        const { result } = renderHook(() => useCounter())
        expect(result.current.counter).toBe(10)
    })
    test('should initialize with default value of 20', () => {
        const { result } = renderHook(() => useCounter(initVal))
        expect(result.current.counter).toBe(initVal)
    })
    test('should increment counter when handleAdd is called', () => {
        const { result } = renderHook(() => useCounter())
        act(() => result.current.handleAdd())
        expect(result.current.counter).toBe(11)
    })
    test('should decrement counter when handleDecrese is called', () => {
        const { result } = renderHook(() => useCounter())
        act(() => result.current.handleSubtract())
        expect(result.current.counter).toBe(9)
    })
    test('should reset counter when handlereset is called', () => {
        const { result } = renderHook(() => useCounter(initVal))
        act(() => result.current.handleAdd())
        act(() => result.current.handleReset())
        expect(result.current.counter).toBe(initVal)
    })
})

