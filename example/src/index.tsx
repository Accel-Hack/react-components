import React from 'react'
import ReactDOM from 'react-dom/client'
import {FilterTable, FilterType, MyCounter, Sort} from 'ah-react-components'

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
      {caption: 'ABC', value: 'upper'},
      {caption: 'abc', value: 'lower'},
    ],
  },
]

const columns = [
  {field: 'id', children: 'ID', sortable: true},
  {field: 'name', children: '名前', sortable: true},
  {field: 'desc', children: '説明'},
]

const getRows = async (limit: number, offset: number, sort: Sort[], options?: any[]) => {
  console.log(
    `getRows(limit: ${limit}, offset: ${offset}, sort: ${JSON.stringify(sort)}, options: ${JSON.stringify(options)})`,
  )
  return {
    total: 10,
    rows: [
      {id: 1, name: 'aa', desc: 'desc1'},
      {id: 2, name: 'aa', desc: 'desc1'},
      {id: 3, name: 'aa', desc: 'desc1'},
    ],
  }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <FilterTable filters={filters} columns={columns} delegate={{getRows}}/>
    <div>
      <h2>Default counter</h2>
      <MyCounter/>
    </div>
    <hr/>
    <div>
      <h2>Counter with predefined value</h2>
      <MyCounter value={5}/>
    </div>
  </React.StrictMode>,
)
