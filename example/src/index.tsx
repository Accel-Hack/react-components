import React from 'react'
import ReactDOM from 'react-dom/client'
import { FilterTable, FilterType, Sort, TableFunctions } from 'ah-react-components'

const filters = [
  {
    type: FilterType.TEXT,
    name: '検索ワード',
    field: 'word',
  },
  {
    type: FilterType.TOGGLE,
    name: '大文字・小文字',
    field: 'font',
    options: [
      { caption: 'ABC', value: 'upper' },
      { caption: 'abc', value: 'lower' },
    ],
  },
]

const columns = [
  { field: 'id', children: 'ID', sortable: true },
  { field: 'name', children: '名前', sortable: true },
  { field: 'desc', children: '説明' },
]

const options = {
  selectable: { enabled: true, identifier: 'id' },
}

const getRows = async (limit: number, offset: number, sort: Sort[], options?: any[]) => {
  console.log(
    `getRows(limit: ${limit}, offset: ${offset}, sort: ${JSON.stringify(sort)}, options: ${JSON.stringify(options)})`,
  )
  return {
    total: 10,
    rows: [
      { id: 1, name: 'aa', desc: 'desc1' },
      { id: 2, name: 'aa', desc: 'desc1' },
      { id: 3, name: 'aa', desc: 'desc1' },
    ],
  }
}

const func: TableFunctions = {
  delegate: {
    getRows,
    onRowClick: (row: any) => {
      console.log('onRowClick', row)
    },
    onDataLoaded: () => {
      console.log('onDataLoaded')
    },
  },
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <h2>Sample Table</h2>
    <div>
      <FilterTable filters={filters} columns={columns} func={func} options={options} />
      <button
        onClick={() => {
          console.log('get Rows', func.dispatch?.getRows())
        }}
      >
        get Rows
      </button>
      <button
        onClick={() => {
          console.log('get selected rows', func.dispatch?.getSelectedRows?.())
        }}
      >
        get selected rows
      </button>
    </div>
  </React.StrictMode>,
)
