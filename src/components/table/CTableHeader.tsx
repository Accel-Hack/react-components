import React, { Dispatch, SetStateAction } from 'react'
import { SortDirection } from './Enums'
import { IColumn, IDisplay, ITableOptions } from './Interface'
import { Sort } from './Table'

interface _ITableHeaderProps {
  readonly options?: ITableOptions
  readonly columns: IColumn[]
  readonly sort: Sort[]
  setDisplay: Dispatch<SetStateAction<IDisplay>>
}

const CTableHeader: React.FC<_ITableHeaderProps> = ({ columns, sort, setDisplay, options }) => {
  const onClickColumn = (col: IColumn) => {
    if (!col.sortable)
      // no sort available
      return

    setDisplay((prev) => {
      if (prev.sort.some((s) => s.field === col.field)) {
        const newSort = prev.sort.flatMap((s) => {
          if (s.field === col.field)
            switch (s.direction) {
              case SortDirection.ASC:
                return [{ field: s.field, direction: SortDirection.DESC }]
              case SortDirection.DESC:
                return []
            }
          return [s]
        })
        return { ...prev, page: 1, sort: newSort }
      }
      return { ...prev, page: 1, sort: [...prev.sort, { field: col.field, direction: SortDirection.ASC }] }
    })
  }

  const findSort = (col: IColumn) => sort.findIndex((s) => s.field === col.field)

  return (
    <>
      {options?.selectable?.enabled && <td />}
      {columns.map((_col, index) => (
        <td key={index} onClick={() => onClickColumn(_col)}>
          {_col.sortable ? (
            <>
              <div>{_col.children}</div>
              <div>
                {findSort(_col) >= 0 && <span>{findSort(_col) + 1}</span>}
                <button disabled={sort[findSort(_col)]?.direction != SortDirection.ASC}>△</button>
                <button disabled={sort[findSort(_col)]?.direction != SortDirection.DESC}>▽</button>
              </div>
            </>
          ) : (
            <> {_col.children}</>
          )}
        </td>
      ))}
    </>
  )
}

export { CTableHeader }
