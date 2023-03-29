import React from 'react'
import { ARTable } from '@accelhack-org/react-components'

export const SampleTable = () => {
  const table = new ARTable.Class({
    options: { selectable: { enabled: true, identifier: 'id' } },
    columns: [
      { field: 'id', children: 'ID', sortable: true },
      { field: 'name', children: '名前', sortable: true },
      { field: 'desc', children: '説明' },
    ],
    delegate: {
      getRows: async (limit, offset, sort, options) => {
        console.log(`getRows(${limit}, ${offset}, ${JSON.stringify(sort)}, ${JSON.stringify(options)})`)
        const rand = Math.floor(3 * Math.random() + 1)
        const rows = [
          { id: 1, name: 'aa', desc: 'desc1' },
          { id: 2, name: 'aa', desc: 'desc1' },
          { id: 3, name: 'aa', desc: 'desc1' },
          { id: 4, name: 'aa', desc: 'desc1' },
          { id: 5, name: 'aa', desc: 'desc1' },
          { id: 6, name: 'aa', desc: 'desc1' },
          { id: 7, name: 'aa', desc: 'desc1' },
          { id: 8, name: 'aa', desc: 'desc1' },
          { id: 9, name: 'aa', desc: 'desc1' },
          { id: 10, name: 'aa', desc: 'desc1' },
        ].filter((r) => r.id % rand == 0)
        return {
          total: 10,
          rows: rows,
        }
      },
      onRowClick: (row: any) => {
        console.log('onRowClick', row)
      },
      onDataLoaded: () => {
        console.log('onDataLoaded')
      },
    },
  })
  return (
    <div>
      <h2>Sample Table</h2>
      <div>
        <ARTable.Component table={table} />
        <button
          onClick={() => {
            console.log('get Rows', table.getRows())
          }}
        >
          get Rows
        </button>
        <button
          onClick={() => {
            console.log('get selected rows', table.getSelectedRows())
          }}
        >
          get selected rows
        </button>
      </div>
    </div>
  )
}
