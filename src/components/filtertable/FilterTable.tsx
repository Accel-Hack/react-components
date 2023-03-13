import React from 'react'
import { FilterBox, IFilterParams } from '../filter/FilterBox'
import { ICFilter } from '../filter/CFilter'
import { IColumn, ITable, ITableOptions, TableFunctions } from '../table/Interface'
import { Table } from '../table/Table'

interface _FilterTableProps {
  options?: ITableOptions
  filters: ICFilter<any>[]
  columns: IColumn[]
  func: TableFunctions
}

const FilterTable: React.FC<_FilterTableProps> = ({ filters, columns, func, options }) => {
  const searchCallback = (params?: IFilterParams[]) => func.dispatch?.search?.(params)

  const tableProps: ITable = {
    columns: columns,
    func: func,
  }

  return (
    <div>
      <FilterBox filters={filters} onFiltered={searchCallback} />
      <Table table={tableProps} options={options} />
    </div>
  )
}

export { FilterTable, TableFunctions }
