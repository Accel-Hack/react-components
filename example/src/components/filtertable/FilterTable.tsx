import React from "react"
import {FilterBox, IFilterParams} from "../filter/FilterBox";
import {ICFilter} from "../filter/CFilter";
import {IColumn, ITable, ITableDelegate, ITableTrigger} from "../table/Interface";
import {Table} from "../table/Table";

interface _FilterTableProps {
  filters: ICFilter<any>[]
  columns: IColumn[]
  delegate: ITableDelegate
}

const FilterTable: React.FC<_FilterTableProps> = ({filters, columns, delegate}) => {

  const trigger: ITableTrigger = {}

  const searchCallback = (params?: IFilterParams[]) =>
    trigger.search?.(params)

  const tableProps: ITable = {
    columns: columns,
    delegate: delegate
  }

  return (
    <div>
      <FilterBox filters={filters} onFiltered={searchCallback}/>
      <Table table={tableProps} trigger={trigger}/>
    </div>
  )
}

export {FilterTable}