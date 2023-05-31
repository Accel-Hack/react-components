import React, { memo } from 'react'
import { Filter, IFilterParams } from '../filter/FilterBox'
import { TFilters } from '../filter/CFilter'
import { InitProps, Table } from '../table/Table'

interface _InitProps extends InitProps {
  filters: TFilters[]
}

export namespace FilterTable {
  export class Class extends Table.Class {
    readonly filters: TFilters[]
    filter?: Filter.Class

    constructor(init: _InitProps) {
      super(init)
      this.filters = init.filters
    }

    search(): void {
      if (!this._dispatch?.search) throw new Error()
      this.filter?._dispatch?.search()
    }
  }

  const _Component: React.FC<{ table: Class }> = ({ table }) => {
    const searchCallback = (params: IFilterParams[]) => table._dispatch?.search(params)

    const filterBox = new Filter.Class({
      filters: table.filters,
      onFiltered: searchCallback,
    })

    table.filter = filterBox

    return (
      <div className={'rc-FilterTable'}>
        <Filter.Component filterBox={filterBox} />
        <Table.Component table={table} />
      </div>
    )
  }

  export const Component = memo(_Component)
}
