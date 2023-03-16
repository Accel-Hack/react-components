# react-components
[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

[**Live Demo**](https://accel-hack.github.io/react-components/)

## Installation:

```bash
npm install ah-react-components --save-dev
```

or

```bash
yarn add -D ah-react-components
```

## Usage 

### Simple Table

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {ARTable} from 'ah-react-components'

const table = new ARTable.Class({
  options: {selectable: {enabled: true, identifier: 'id'}},
  columns: [
    {field: 'id', children: 'ID', sortable: true},
    {field: 'name', children: '名前', sortable: true},
    {field: 'desc', children: '説明'},
  ],
  delegate: {
    getRows: async (limit, offset, sort, options?) => {
      console.log(`getRows(${limit}, ${offset}, ${JSON.stringify(sort)}, ${JSON.stringify(options)})`)
      return {
        total: 10,
        rows: [
          {id: 1, name: 'aa', desc: 'desc1'},
          {id: 2, name: 'aa', desc: 'desc1'},
          {id: 3, name: 'aa', desc: 'desc1'},
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
    <h2>Sample Table</h2>
    <div>
      <ARTable.Component table={table}/>
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
  </React.StrictMode>,
)
```
### Table with filters

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ARFilterTable, FilterType } from 'ah-react-components'

// "filters" field is new from simple table
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
    <h2>Sample Table with Filter</h2>
    <div>
      <ARFilterTable.Component table={filterTable} />
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
  </React.StrictMode>,
)
```

#### Reference

* [How to Create and Publish React TypeScript npm Package With Demo and Automated Build](https://betterprogramming.pub/how-to-create-and-publish-react-typescript-npm-package-with-demo-and-automated-build-80c40ec28aca)

[npm-url]: https://www.npmjs.com/package/@accelhack-org/react-components
[npm-image]: https://img.shields.io/npm/v/@accelhack-org/react-components
[github-license]: https://img.shields.io/github/license/Accel-Hack/react-components
[github-license-url]: https://github.com/Accel-Hack/react-components/blob/master/LICENSE
[github-build]: https://github.com/Accel-Hack/react-components/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/Accel-Hack/react-components/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/ah-react-components
