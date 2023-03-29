import React from 'react'
import { SortDirection } from './Enums'

interface IRow {
  [name: string]: React.ReactNode
}

interface IRowResult {
  readonly total: number
  readonly rows: IRow[]
}

interface ISort {
  readonly field: string
  readonly direction: SortDirection
}

interface ITable {
  readonly columns: IColumn[]
  options?: ITableOptions
  delegate: ITableDelegate
  _dispatch?: ITableDispatch
}

interface ITableOptions {
  limit?: number[]
  selectable?: {
    enabled: boolean
    identifier: string
  }
}

interface ITableDelegate {
  getRows: (limit: number, offset: number, sort: ISort[], options: any) => Promise<IRowResult>
  onRowClick?: (row: IRow) => void
  onDataLoaded?: () => void
}

interface ITableDispatch {
  search: (filter: any[]) => void
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
  readonly sort: ISort[]
  readonly filters: any
}

export { IColumn, IDisplay, IRow, IRowResult, ISort, ITable, ITableDelegate, ITableOptions, ITableDispatch }
