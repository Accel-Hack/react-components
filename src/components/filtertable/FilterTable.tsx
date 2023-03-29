import React from 'react'
import { Filter, IFilterParams } from '../filter/FilterBox'
import { TFilters } from '../filter/CFilter'
import { InitProps, Table } from '../table/Table'

interface _InitProps extends InitProps {
  filters: TFilters[]
}

export namespace FilterTable {
  export class Class extends Table.Class {
    readonly filters: TFilters[]

    constructor(init: _InitProps) {
      super(init)
      this.filters = init.filters
    }
  }

  export const Component: React.FC<{ table: Class }> = ({ table }) => {
    const searchCallback = (params: IFilterParams[]) => table.search(params)

    const filterBox = new Filter.Class({
      filters: table.filters,
      onFiltered: searchCallback,
    })

    return (
      <div>
        <Filter.Component filterBox={filterBox} />
        <Table.Component table={table} />
      </div>
    )
  }
}
