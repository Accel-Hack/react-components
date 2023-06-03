import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { ARFilterTable, ARTable } from '../src'
import { act } from 'react-dom/test-utils'

describe('Table render', () => {
  it('with no options', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getRows = async (_1: any, _2: any, _3: any, _4: any) => ({ total: 1, rows: [] })
    const table = new ARTable.Class({ columns: [], delegate: { getRows } })
    await act(async () => render(<ARTable.Component table={table} />))
  })

  it('with no options', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getRows = async (_1: any, _2: any, _3: any, _4: any) => ({ total: 1, rows: [] })
    const options = { selectable: { enabled: true, identifier: 'id' } }
    const table = new ARTable.Class({ options, columns: [], delegate: { getRows } })
    await act(async () => render(<ARTable.Component table={table} />))
  })
})

describe('FilterTable render', () => {
  it('with no options', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getRows = async (_1: any, _2: any, _3: any, _4: any) => ({ total: 1, rows: [] })
    const table = new ARFilterTable.Class({ filters: [], columns: [], delegate: { getRows } })
    await act(async () => render(<ARFilterTable.Component table={table} />))
  })

  it('with sort options', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getRows = async (_1: any, _2: any, _3: any, _4: any) => ({ total: 1, rows: [] })
    const options = { selectable: { enabled: true, identifier: 'id' } }
    const table = new ARFilterTable.Class({ filters: [], options, columns: [], delegate: { getRows } })
    await act(async () => render(<ARFilterTable.Component table={table} />))
  })
})
