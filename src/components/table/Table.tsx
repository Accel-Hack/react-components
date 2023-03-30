import React, { ChangeEvent, memo, useEffect, useState } from 'react'
import { CTableHeader, IHeaderDelegate } from './CTableHeader'
import { CTableRow } from './CTableRow'
import { IColumn, IDisplay, IRow, IRowResult, ITable, ITableDelegate, ITableDispatch, ITableOptions } from './Interface'
import { usePrevious } from '../../shared/usePrevious'

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

    search(filters?: any[]): void {
      if (!this._dispatch?.search) throw new Error()
      this._dispatch?.search(filters ?? [])
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

  const _Component: React.FC<{ table: Class }> = ({ table }) => {
    const limits = table.options?.limit ?? [20, 50, 100, 200]
    const defaultDisplay: IDisplay = { limit: limits[0], page: 1, sort: [], filters: [] }

    const [{ limit, page, sort, filters }, setDisplay] = useState<IDisplay>(defaultDisplay)
    const [result, setResult] = useState<IRowResult | undefined>(undefined)

    const [checked, setChecked] = useState<any[]>([])
    const prevChecked = usePrevious<any[]>(checked)

    const lastPage = () => Math.max(Math.ceil((result?.total ?? 0) / limit), 1)
    const pagingTo = (_displayPage: number) => {
      if (_displayPage <= 0 || _displayPage > lastPage()) throw new DOMException()
      setDisplay((prev) => {
        return { ...prev, page: _displayPage }
      })
    }

    // set dispatch
    const search = (_filters: any[]) =>
      setDisplay((prev) => {
        return { ...prev, filters: _filters }
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

    const headerDelegate: IHeaderDelegate = {}

    const onAllChecked = (_checked: boolean) => {
      const identifier = table.options?.selectable?.identifier
      if (!identifier) return
      if (_checked) {
        setChecked(result?.rows.map((_) => _[identifier]) ?? [])
      } else {
        setChecked([])
      }
    }

    useEffect(() => {
      headerDelegate.setCheckBox?.(checked.length == result?.rows.length)
      const identifier = table.options?.selectable?.identifier
      if (prevChecked && identifier) {
        if (checked.length > prevChecked.length) {
          // add item
          const added = checked.filter((id: any) => prevChecked.includes(id))
          const changed = result?.rows.filter((_) => added.includes(_[identifier])) ?? []
          table.delegate.onRowChecked?.(changed, true, checked)
        } else {
          // remove item
          const removed = prevChecked.filter((id: any) => checked.includes(id))
          const changed = result?.rows.filter((_) => removed.includes(_[identifier])) ?? []
          table.delegate.onRowChecked?.(changed, false, checked)
        }
      }
    }, [checked])

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
              <CTableHeader
                columns={table.columns}
                options={table.options}
                sort={sort}
                setDisplay={setDisplay}
                checked={onAllChecked}
                delegate={headerDelegate}
              />
            </tr>
          </thead>
          <tbody>
            {result?.rows.map((_row, index) => (
              <tr key={index} onClick={() => table.delegate.onRowClick?.(_row)}>
                <CTableRow
                  columns={table.columns}
                  options={table.options}
                  row={_row}
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

  export const Component = memo(_Component)
}
