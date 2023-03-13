import React from 'react'
import { Sort } from './Table'

interface IRow {
  [name: string]: React.ReactNode
}

interface IRowResult {
  readonly total: number
  readonly rows: IRow[]
}

interface ITable {
  readonly limit?: number
  readonly columns: IColumn[]
  func: TableFunctions
}

interface TableFunctions {
  delegate: ITableDelegate
  dispatch?: ITableDispatch
}

interface ITableOptions {
  selectable?: {
    enabled: boolean
    identifier: string
  }
}

interface ITableDelegate {
  getRows: (limit: number, offset: number, sort: Sort[], options?: any) => Promise<IRowResult>
  onRowClick?: (row: IRow) => void
  onDataLoaded?: () => void
}

interface ITableDispatch {
  search: (option?: any[]) => void
  getRows: () => IRow[]
  getSelectedRows: () => IRow[]
}

interface IColumn {
  readonly field: string
  readonly children: React.ReactNode
  readonly sortable?: boolean
}

interface IDisplay {
  readonly limit: number
  readonly page: number
  readonly sort: Sort[]
  readonly filters: any
}

export { IColumn, IDisplay, IRow, IRowResult, ITable, ITableDelegate, ITableOptions, ITableDispatch }

export { TableFunctions }
