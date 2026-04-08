import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MyCounterApp } from './MyCounterApp'

const handleAddMock = vi.fn()
const handleResetMock = vi.fn()
const handleSubtractMock = vi.fn()

vi.mock('../hooks/useCounter', () => ({
    useCounter: () => ({
        counter: 20,
        handleAdd: handleAddMock,
        handleReset: handleResetMock,
        handleSubtract: handleSubtractMock,
    })
}))


describe('MyCounterApp2', () => {

    test('should render component', () => {
        render(<MyCounterApp />)
        screen.debug()
        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain('counter: 20')
        expect(screen.getByRole('button', { name: '+1' })).toBeDefined()
        expect(screen.getByRole('button', { name: '-1' })).toBeDefined()
        expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined()

    })

    test('should call handleAdd if button is clicked', () => {
        render(<MyCounterApp />)
        const addButton = screen.getByRole('button', { name: '+1' })
        fireEvent.click(addButton)
        expect(handleAddMock).toHaveBeenCalled()


    })
    test('should call handleSubstract if button is clicked', () => {
        render(<MyCounterApp />)
        const substractButton = screen.getByRole('button', { name: '-1' })
        fireEvent.click(substractButton)
        expect(handleSubtractMock).toHaveBeenCalled()

    })
    test('should call handleReset if button is clicked', () => {
        render(<MyCounterApp />)
        const resetButton = screen.getByRole('button', { name: 'Reset' })
        fireEvent.click(resetButton)
        expect(handleResetMock).toHaveBeenCalled()

    })
})