import { describe, expect, test } from 'vitest'
import { render, screen, } from '@testing-library/react'
import { CustomHeader } from './CustomHeader'


describe('CustomHeader', () => {
    const title = 'Mi Titulo'
    test('should render the title correctly', () => {

        render(<CustomHeader title={title} />)
        expect(screen.getByText(title)).toBeDefined()
    })

    test('should render the description when is provided', () => {
        const description = 'Mi Descripción'

        render(<CustomHeader title={title} description={description} />)
        expect(screen.getByText(description)).toBeDefined()
    })

    test('should not render the description when is not provided', () => {

        const { container } = render(<CustomHeader title={title} />)
        const divElement = container.querySelector('.content-center')

        const h1 = divElement?.querySelector('h1')
        const p = divElement?.querySelector('p')
        expect(h1?.innerHTML).toBe(title)
        expect(p).toBeNull()
    })


})