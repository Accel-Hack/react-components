import React, {ChangeEvent, useEffect, useState} from "react"
import {SortDirection} from "./Enums";
import {CTableHeader} from "./CTableHeader";
import {CTableRow} from "./CTableRow";
import {IDisplay, IRowResult, ITable, ITableTrigger} from "./Interface";

interface Sort {
  readonly field: string
  readonly direction: SortDirection
}

interface _ITableProps {
  table: ITable
  trigger?: ITableTrigger
}

const Table: React.FC<_ITableProps> = ({table, trigger}) => {

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
    table.delegate?.getRows(limit, (page - 1) * limit, sort, options).then(_ => setResult(_))
  }

  if (trigger) {
    trigger.search = search
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
          <CTableHeader columns={table.columns} sort={sort} setDisplay={setDisplay}/>
        </tr>
        </thead>
        <tbody>
        {result?.rows.map((_row, index) =>
          <tr key={index} onClick={() => table.onRowClick?.(_row)}>
            <CTableRow columns={table.columns} row={_row}/>
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

export {Sort, Table}