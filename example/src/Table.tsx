import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react"

interface _ITableHeaderProps {
  readonly columns: IColumn[]
  readonly sort: ISort[]
  setDisplay: Dispatch<SetStateAction<IDisplay>>
}

const TableHeader: React.FC<_ITableHeaderProps> = ({columns, sort, setDisplay}) => {

  const onClickColumn = (col: IColumn) => {
    if (!col.sortable) // no sort available
      return;

    console.log(`onClickColumn.sort(${col.field})`)
    setDisplay((prev) => {
      if (prev.sort.some(s => s.field === col.field)) {
        const newSort = prev.sort.flatMap(s => {
          if (s.field === col.field)
            switch (s.direction) {
              case SortDirection.ASC:
                return [{field: s.field, direction: SortDirection.DESC}]
              case SortDirection.DESC:
                return []
            }
          return [s]
        })
        return {limit: prev.limit, page: 1, sort: newSort}
      }
      return {limit: prev.limit, page: 1, sort: [...prev.sort, {field: col.field, direction: SortDirection.ASC}]}
    })
  }

  const findSort = (col: IColumn) =>
    sort.findIndex(s => s.field === col.field)

  return (
    <>
      {columns.map((_col, index) =>
        <td key={index} onClick={(_) => onClickColumn(_col)}>
          {_col.sortable
            ? <>
              <div>
                {_col.children}
              </div>
              <div>
                {findSort(_col) >= 0 && <span>{findSort(_col) + 1}</span>}
                <button disabled={sort[findSort(_col)]?.direction != SortDirection.ASC}>△</button>
                <button disabled={sort[findSort(_col)]?.direction != SortDirection.DESC}>▽</button>
              </div>
            </>
            : <> {_col.children}</>}
        </td>
      )}
    </>
  )
}

const TableDataRow: React.FC<{ columns: IColumn[], row: Row }> = ({columns, row}) => {
  return (
    <>
      <>
        {columns.map((_col, index) => {
          if (row[_col.field] == undefined)
            console.error("empty field")
          return <td key={index}>{row[_col.field]}</td>
        })}
      </>
    </>
  )
}

interface IRowResult {
  readonly total: number
  readonly rows: Row[]
}

interface ITableDelegate {
  search?: (option?: any[]) => void
}

interface ITable {
  readonly limit?: number
  getRows: (limit: number, offset: number, sort: ISort[], options?: any) => Promise<IRowResult>
  onRowClick?: (row: Row) => void
  onDataLoaded?: () => void
  readonly columns: IColumn[]
}

interface IColumn {
  readonly field: string
  readonly children: React.ReactNode
  readonly sortable?: boolean
}

type Row = {
  [name: string]: React.ReactNode
}

enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

interface ISort {
  readonly field: string
  readonly direction: SortDirection
}

interface IDisplay {
  readonly limit: number
  readonly page: number
  readonly sort: ISort[]
}

interface _ITableProps {
  table: ITable
  delegate?: ITableDelegate
}

const Table: React.FC<_ITableProps> = ({table, delegate}) => {

  const limits = [1, 2, 3, 4]
  const defaultDisplay: IDisplay = {limit: table.limit ?? limits[0], page: 1, sort: []}

  let [{limit, page, sort}, setDisplay] = useState<IDisplay>(defaultDisplay)
  let [result, setResult] = useState<IRowResult | undefined>(undefined)
  let [options, setOptions] = useState<any>(undefined)

  const lastPage = () =>
    Math.max(Math.ceil((result?.total ?? 0) / limit), 1)

  const pagingTo = (displayPage: number) => {
    if (displayPage <= 0 || displayPage > lastPage())
      throw new DOMException()
    setDisplay({limit, page: displayPage, sort})
  }

  const search = (options: any) => {
    setOptions(options)
    table.getRows(limit, (page - 1) * limit, sort, options).then(_ => setResult(_))
  }

  if (delegate) {
    delegate.search = search
  }

  const onChangeLimit = (event: ChangeEvent<HTMLSelectElement>) =>
    setDisplay({limit: Number(event.target.value), page: 1, sort})

  useEffect(() => {
    console.log(`limit(${limit}) or page(${page}) has changed.`)
    search(options)
  }, [limit, page, sort])

  return (
    <div>
      <table>
        <thead>
        <tr>
          <TableHeader columns={table.columns} sort={sort} setDisplay={setDisplay}/>
        </tr>
        </thead>
        <tbody>
        {result?.rows.map((_row, index) =>
          <tr key={index} onClick={() => table.onRowClick?.(_row)}>
            <TableDataRow columns={table.columns} row={_row}/>
          </tr>
        )}
        </tbody>
      </table>
      <div>
        <span>limit:</span>
        <select defaultValue={limit} onChange={onChangeLimit}>
          {limits.map((_limit, index) =>
            <option value={_limit} key={index}>{_limit}</option>
          )}
        </select>
      </div>
      <div>
        <span>total:</span>
        <span>{result?.total ?? 0}</span>
      </div>
      <div>
        <span>total page:</span>
        <span>{lastPage()}</span>
      </div>
      <button disabled={page == 1} onClick={(_) => pagingTo(1)}>
        &lt;&lt;
      </button>
      <button disabled={page - 1 < 1} onClick={(_) => pagingTo(page - 1)}>
        &lt;
      </button>
      <span>{page}</span>
      <button disabled={page + 1 > lastPage()} onClick={(_) => pagingTo(page + 1)}>
        &gt;
      </button>
      <button disabled={page == lastPage()} onClick={(_) => pagingTo(lastPage())}>
        &gt;&gt;
      </button>
    </div>
  )
}

export {
  IColumn, IRowResult, ISort, ITable, ITableDelegate, SortDirection, Table
}