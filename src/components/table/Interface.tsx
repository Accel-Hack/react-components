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
  delegate?: ITableDelegate
  onRowClick?: (row: IRow) => void
  onDataLoaded?: () => void
  readonly columns: IColumn[]
}

interface ITableDelegate {
  getRows: (limit: number, offset: number, sort: Sort[], options?: any) => Promise<IRowResult>
}

interface ITableTrigger {
  search?: (option?: any[]) => void
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
  readonly options: any
}

export { IColumn, IDisplay, IRow, IRowResult, ITable, ITableDelegate, ITableTrigger }
