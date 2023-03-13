import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { ARFilterTable, ARTable } from '../src'
import { act } from 'react-dom/test-utils'

describe('Table render', () => {
  it('with no options', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getRows = async (_1: any, _2: any, _3: any, _4: any) => ({ total: 1, rows: [] })
    const func = { delegate: { getRows } }
    await act(async () => render(<ARTable columns={[]} func={func} />))
  })

  it('with no options', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getRows = async (_1: any, _2: any, _3: any, _4: any) => ({ total: 1, rows: [] })
    const func = { delegate: { getRows } }
    const options = { selectable: { enabled: true, identifier: 'id' } }
    await act(async () => render(<ARTable columns={[]} func={func} options={options} />))
  })
})

describe('FilterTable render', () => {
  it('with no options', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getRows = async (_1: any, _2: any, _3: any, _4: any) => ({ total: 1, rows: [] })
    const func = { delegate: { getRows } }
    await act(async () => render(<ARFilterTable columns={[]} filters={[]} func={func} />))
  })

  it('with sort options', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getRows = async (_1: any, _2: any, _3: any, _4: any) => ({ total: 1, rows: [] })
    const func = { delegate: { getRows } }
    const options = { selectable: { enabled: true, identifier: 'id' } }
    await act(async () => render(<ARFilterTable columns={[]} filters={[]} func={func} options={options} />))
  })
})
