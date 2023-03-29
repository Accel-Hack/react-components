import React, { useState } from 'react'
import { ARFilterTable, FilterType } from '@accelhack-org/react-components'

export const SampleFilterTable = () => {
  const _filterTable = new ARFilterTable.Class({
    filters: [
      { type: FilterType.TEXT, name: '検索ワード', field: 'word' },
      {
        type: FilterType.TOGGLE,
        name: '大文字・小文字',
        field: 'font',
        options: [
          { caption: 'ABC', value: 'upper' },
          { caption: 'abc', value: 'lower' },
        ],
      },
      {
        type: FilterType.SELECTABLE,
        name: '言語',
        field: 'language',
        maxCount: 2,
        options: [
          { caption: 'English', value: 'en' },
          { caption: 'Japanese', value: 'ja' },
          { caption: 'French', value: 'fr' },
        ],
      },
    ],
    options: { selectable: { enabled: true, identifier: 'id' } },
    columns: [
      { field: 'id', children: 'ID', sortable: true },
      { field: 'name', children: '名前', sortable: true },
      { field: 'desc', children: '説明' },
    ],
    delegate: {
      getRows: async (limit, offset, sort, options) => {
        console.log(`getRows(${limit}, ${offset}, ${JSON.stringify(sort)}, ${JSON.stringify(options)})`)
        const rand = Math.floor(10 * Math.random() + 1)
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
          { id: 11, name: 'aa', desc: 'desc1' },
          { id: 12, name: 'aa', desc: 'desc1' },
          { id: 13, name: 'aa', desc: 'desc1' },
          { id: 14, name: 'aa', desc: 'desc1' },
          { id: 15, name: 'aa', desc: 'desc1' },
          { id: 16, name: 'aa', desc: 'desc1' },
          { id: 17, name: 'aa', desc: 'desc1' },
          { id: 18, name: 'aa', desc: 'desc1' },
          { id: 19, name: 'aa', desc: 'desc1' },
          { id: 20, name: 'aa', desc: 'desc1' },
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
  const [filterTable] = useState(_filterTable)
  return (
    <div>
      <h2>Sample Table with Filter</h2>
      <div>
        <ARFilterTable.Component table={filterTable} />
        <button
          onClick={() => {
            console.log('get Rows', filterTable.getRows())
          }}
        >
          get Rows
        </button>
        <button
          onClick={() => {
            console.log('get selected rows', filterTable.getSelectedRows?.())
          }}
        >
          get selected rows
        </button>
      </div>
    </div>
  )
}
