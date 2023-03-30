import React, { ChangeEvent, memo, useEffect, useState } from 'react'
import { CTableHeader, IHeaderDelegate } from './CTableHeader'
import { CTableRow } from './CTableRow'
import { IColumn, IDisplay, IRow, IRowResult, ITable, ITableDelegate, ITableDispatch, ITableOptions } from './Interface'
import { usePrevious } from '../../shared/usePrevious'
import '../../index.scss'

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
      <div className={'rc-Table'} style={{ position: 'relative' }}>
        <table className={'divide-y divide-gray-300'}>
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
          <tbody className={'divide-y divide-gray-200'}>
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
        <div className={'rc-Table_bottom'}>
          <div className={'align-center-box'}>
            <span style={{ marginRight: '0.5rem' }}>最大表示件数</span>
            <select defaultValue={limit} onChange={onChangeLimit} className='rc-select'>
              {limits.map((_limit, index) => (
                <option value={_limit} key={index}>
                  {_limit}
                </option>
              ))}
            </select>
            <span>全 {result?.total ?? 0} 件</span>
            <span>全 {lastPage()} ページ</span>
          </div>

          {/*　FIXME：矢印ボタンをdisabledのときはグレー、押せる時は色つきにしたい*/}
          <nav className='isolate inline-flex -space-x-px rounded-md shadow-sm' aria-label='Pagination'>
            <button disabled={page == 1} onClick={() => pagingTo(1)}>
              <svg className='h-3 w-3' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 512 512'>
                <path d='M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z' />
              </svg>
            </button>
            <button disabled={page - 1 < 1} onClick={() => pagingTo(page - 1)}>
              <svg className='h-3 w-3' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 512 512'>
                <path d='M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z' />
              </svg>
            </button>
            <button disabled={true}>{page}</button>
            <button disabled={page + 1 > lastPage()} onClick={() => pagingTo(page + 1)}>
              <svg className='h-3 w-3' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 512 512'>
                <path d='M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z' />
              </svg>
            </button>
            <button disabled={page == lastPage()} onClick={() => pagingTo(lastPage())}>
              <svg className='h-3 w-3' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 512 512'>
                <path d='M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z' />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    )
  }

  export const Component = memo(_Component)
}
