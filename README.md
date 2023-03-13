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

## Usage :

Add `ATTable` to your component:

```tsx
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
```

[npm-url]: https://www.npmjs.com/package/ah-react-components
[npm-image]: https://img.shields.io/npm/v/ah-react-components
[github-license]: https://img.shields.io/github/license/Accel-Hack/react-components
[github-license-url]: https://github.com/Accel-Hack/react-components/blob/master/LICENSE
[github-build]: https://github.com/Accel-Hack/react-components/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/Accel-Hack/react-components/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/ah-react-components

#### Reference

* [How to Create and Publish React TypeScript npm Package With Demo and Automated Build](https://betterprogramming.pub/how-to-create-and-publish-react-typescript-npm-package-with-demo-and-automated-build-80c40ec28aca)