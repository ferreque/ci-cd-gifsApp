import { describe, expect, test } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MyCounterApp } from './MyCounterApp'


describe('MyCounterApp', () => {

    test('should render component', () => {
        render(<MyCounterApp />)
        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain('counter: 10')
        expect(screen.getByRole('button', { name: '+1' })).toBeDefined()
        expect(screen.getByRole('button', { name: '-1' })).toBeDefined()
        expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined()
    })

    test('should increment counter on click button', () => {
        render(<MyCounterApp />)
        const h1 = screen.getByRole('heading', { level: 1 })
        const addButton = screen.getByRole('button', { name: '+1' })
        fireEvent.click(addButton)
        expect(h1.innerHTML).toBe('counter: 11')
    })
    test('should increment counter on click button', () => {
        render(<MyCounterApp />)
        const h1 = screen.getByRole('heading', { level: 1 })
        const substractButton = screen.getByRole('button', { name: '-1' })
        fireEvent.click(substractButton)
        expect(h1.innerHTML).toBe('counter: 9')
    })
    test('should increment counter on click button', () => {
        render(<MyCounterApp />)
        const h1 = screen.getByRole('heading', { level: 1 })
        const resetButton = screen.getByRole('button', { name: 'Reset' })
        const substractButton = screen.getByRole('button', { name: '-1' })
        fireEvent.click(substractButton)
        fireEvent.click(resetButton)
        expect(h1.innerHTML).toBe('counter: 10')
    })
})