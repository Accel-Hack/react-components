import React, { ChangeEvent, useEffect, useState } from 'react'
import { CTableHeader } from './CTableHeader'
import { CTableRow } from './CTableRow'
import { IColumn, IDisplay, IRow, IRowResult, ITable, ITableDelegate, ITableDispatch, ITableOptions } from './Interface'

export interface InitProps {
  options?: ITableOptions
  columns: IColumn[]
  delegate: ITableDelegate
}

export namespace Table {
  export class Class implements ITable {
    options?: ITableOptions
    readonly columns: IColumn[]
    delegate: ITableDelegate
    _dispatch?: ITableDispatch
    constructor(init: InitProps) {
      this.options = init.options
      this.columns = init.columns
      this.delegate = init.delegate
    }

    search(option?: any[]): void {
      if (!this._dispatch?.search) throw new Error()
      this._dispatch?.search(option)
    }

    getRows(): IRow[] {
      if (!this._dispatch?.getRows) throw new Error()
      return this._dispatch?.getRows()
    }

    getSelectedRows(): IRow[] {
      if (!this._dispatch?.getSelectedRows) throw new Error()
      return this._dispatch?.getSelectedRows()
    }
  }

  export const Component: React.FC<{ table: Class }> = ({ table }) => {
    const limits = [1, 2, 3, 4]
    const defaultDisplay: IDisplay = { limit: limits[0], page: 1, sort: [], filters: undefined }

    const [{ limit, page, sort, filters }, setDisplay] = useState<IDisplay>(defaultDisplay)
    const [result, setResult] = useState<IRowResult | undefined>(undefined)

    const [checked, setChecked] = useState<any[]>([])

    const lastPage = () => Math.max(Math.ceil((result?.total ?? 0) / limit), 1)

    const pagingTo = (_displayPage: number) => {
      if (_displayPage <= 0 || _displayPage > lastPage()) throw new DOMException()
      setDisplay((prev) => {
        return { ...prev, page: _displayPage }
      })
    }

    // set dispatch
    const search = (_options: any) =>
      setDisplay((prev) => {
        return { ...prev, filters: _options }
      })
    const getRows = () => result?.rows ?? []
    const getSelectedRows = () => {
      const identifier = table.options?.selectable?.identifier
      if (!identifier) return []
      return result?.rows.filter((_row) => checked.includes(_row[identifier])) ?? []
    }
    table._dispatch = { search, getRows, getSelectedRows }

    const onChangeLimit = (_event: ChangeEvent<HTMLSelectElement>) =>
      setDisplay((prev) => {
        return { ...prev, limit: Number(_event.target.value), page: 1 }
      })

    useEffect(() => {
      setChecked([])
      table.delegate
        .getRows(limit, (page - 1) * limit, sort, filters)
        .then((_) => setResult(_))
        .then(() => table.delegate.onDataLoaded?.())
    }, [limit, page, sort, filters])

    return (
      <div>
        <table>
          <thead>
            <tr>
              <CTableHeader columns={table.columns} sort={sort} setDisplay={setDisplay} options={table.options} />
            </tr>
          </thead>
          <tbody>
            {result?.rows.map((_row, index) => (
              <tr key={index} onClick={() => table.delegate.onRowClick?.(_row)}>
                <CTableRow
                  columns={table.columns}
                  row={_row}
                  options={table.options}
                  checked={{ list: checked, set: setChecked }}
                />
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <span>limit:</span>
          <select defaultValue={limit} onChange={onChangeLimit}>
            {limits.map((_limit, index) => (
              <option value={_limit} key={index}>
                {_limit}
              </option>
            ))}
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
        <button disabled={page == 1} onClick={() => pagingTo(1)}>
          &lt;&lt;
        </button>
        <button disabled={page - 1 < 1} onClick={() => pagingTo(page - 1)}>
          &lt;
        </button>
        <span>{page}</span>
        <button disabled={page + 1 > lastPage()} onClick={() => pagingTo(page + 1)}>
          &gt;
        </button>
        <button disabled={page == lastPage()} onClick={() => pagingTo(lastPage())}>
          &gt;&gt;
        </button>
      </div>
    )
  }
}
