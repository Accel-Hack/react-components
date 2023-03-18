import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import 'jest-canvas-mock'

import { TextFilter } from '../../../src/components/filter/TextFilter'
import { FilterType } from '../../../src'

describe('TextFilter', () => {
  it('render & change values', async () => {
    const textFilter = new TextFilter.Class({ type: FilterType.TEXT, name: '検索ワード', field: 'word' })
    render(<TextFilter.Component filter={textFilter} />)

    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: '🐙' } })
    expect(input.value).toBe('🐙')
    expect(textFilter.value).toBe('🐙')

    textFilter.delegate?.clear()
    expect(input.value).toBe('')
    expect(textFilter.value).toBe('')
  })
})
