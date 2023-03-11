import React from 'react'
import ReactDOM from 'react-dom/client'
import {MyCounter} from 'ah-react-components'
import {IColumn, IRowResult, ISort, ITableDelegate, Table} from "./Table";
import {ATextSearch, AToggleSearch, SearchBox, SearchParams} from "./Search";

const getRows = async (limit: number, offset: number, sort: ISort[], options?: any[]): Promise<IRowResult> => {
  console.log(`getRows(limit: ${limit}, offset: ${offset}, sort: ${JSON.stringify(sort)}, options: ${JSON.stringify(options)})`)
  return {
    total: 10,
    rows: [
      {id: 1, name: "aa", desc: "desc1"},
      {id: 2, name: "aa", desc: "desc1"},
      {id: 3, name: "aa", desc: "desc1"}
    ]
  } as IRowResult
}

const columns: IColumn[] = [
  {field: "id", children: "ID", sortable: true},
  {field: "name", children: "名前", sortable: true},
  {field: "desc", children: "説明"}
]

const searches = [
  new ATextSearch({
    name: "検索ワード",
    field: "word"
  }),
  new AToggleSearch({
    name: "大文字・小文字",
    field: "font",
    options: [{caption: "ABC", value: "upper"}, {caption: "abc", value: "lower"}]
  }),
]


const delegate: ITableDelegate = {}

const searchCallback = (params: SearchParams[]) => {
  delegate.search?.(params)
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <SearchBox searches={searches} searchCallback={searchCallback}/>
    <Table table={{getRows, columns}} delegate={delegate}/>
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
