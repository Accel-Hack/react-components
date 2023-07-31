import React from 'react'
import { SelectableMode, SortDirection } from './Enums'

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
    mode: SelectableMode
    enabled: boolean
    identifier: string
  }
  draggable?: boolean
}

interface ITableDelegate {
  getRows: (limit: number, offset: number, sort: ISort[], options: any) => Promise<IRowResult>
  onRowClick?: (row: IRow) => void
  onRowChecked?: (changed: IRow[], added: boolean, checked: IRow[]) => void
  onRowDragged?: () => void
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
  readonly filters: any[]
}

export { IColumn, IDisplay, IRow, IRowResult, ISort, ITable, ITableDelegate, ITableOptions, ITableDispatch }
