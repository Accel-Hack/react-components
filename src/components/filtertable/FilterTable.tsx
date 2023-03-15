import React from 'react'
import { FilterBox, IFilterParams } from '../filter/FilterBox'
import { TFilters } from '../filter/CFilter'
import { Table } from '../table/Table'

export namespace FilterTable {
  interface _InitProps extends Table._InitProps {
    filters: TFilters[]
  }

  export class Class extends Table.Class {
    readonly filters: TFilters[]
    constructor(init: _InitProps) {
      super(init)
      this.filters = init.filters
    }
  }

  export const Component: React.FC<{ table: Class }> = ({ table }) => {
    const searchCallback = (params?: IFilterParams[]) => table.search(params)

    return (
      <div>
        <FilterBox filters={table.filters} onFiltered={searchCallback} />
        <Table.Component table={table} />
      </div>
    )
  }
}
