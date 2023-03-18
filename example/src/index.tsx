import React from 'react'
import ReactDOM from 'react-dom/client'
import { ARFilter, ARFilterTable, ARTable, FilterType } from 'ah-react-components'

const filter = new ARFilter.Class({
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
  onFiltered: (options) => console.log('filtered param', options),
})

const table = new ARTable.Class({
  options: { selectable: { enabled: true, identifier: 'id' } },
  columns: [
    { field: 'id', children: 'ID', sortable: true },
    { field: 'name', children: '名前', sortable: true },
    { field: 'desc', children: '説明' },
  ],
  delegate: {
    getRows: async (limit, offset, sort, options?) => {
      console.log(`getRows(${limit}, ${offset}, ${JSON.stringify(sort)}, ${JSON.stringify(options)})`)
      return {
        total: 10,
        rows: [
          { id: 1, name: 'aa', desc: 'desc1' },
          { id: 2, name: 'aa', desc: 'desc1' },
          { id: 3, name: 'aa', desc: 'desc1' },
        ],
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

const filterTable = new ARFilterTable.Class({
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
    getRows: async (limit, offset, sort, options?) => {
      console.log(`getRows(${limit}, ${offset}, ${JSON.stringify(sort)}, ${JSON.stringify(options)})`)
      return {
        total: 10,
        rows: [
          { id: 1, name: 'aa', desc: 'desc1' },
          { id: 2, name: 'aa', desc: 'desc1' },
          { id: 3, name: 'aa', desc: 'desc1' },
        ],
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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div>
      <h2>Filters</h2>
      <div>
        <ARFilter.Component filterBox={filter} />
      </div>
    </div>
    <hr></hr>
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
    <hr></hr>
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
  </React.StrictMode>,
)
