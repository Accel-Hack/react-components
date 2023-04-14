import React, { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react'
import { SortDirection } from './Enums'
import { IColumn, IDisplay, ISort, ITableOptions } from './Interface'

interface _ITableHeaderProps {
  readonly options?: ITableOptions
  readonly columns: IColumn[]
  readonly sort: ISort[]
  setDisplay: Dispatch<SetStateAction<IDisplay>>
  checked?: (_0: boolean) => void
  delegate: IHeaderDelegate
}

export interface IHeaderDelegate {
  setCheckBox?: (_0: boolean) => void
}

const CTableHeader: React.FC<_ITableHeaderProps> = ({ columns, sort, setDisplay, options, checked, delegate }) => {
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

  const refCheckBox = useRef<HTMLInputElement>(null)
  const onChangeCheckbox = (_event: ChangeEvent<HTMLInputElement>) => checked?.(_event.target.checked)

  const findSort = (col: IColumn) => sort.findIndex((s) => s.field === col.field)

  delegate.setCheckBox = (checked: boolean) => {
    if (refCheckBox.current) refCheckBox.current.checked = checked
  }

  return (
    <>
      {options?.selectable?.enabled && (
        <td className={'rc-Table-td_option'}>
          <input
            type='checkbox'
            ref={refCheckBox}
            onClick={(_event) => _event.stopPropagation()}
            onChange={onChangeCheckbox}
            style={{ display: 'flex' }}
          />
        </td>
      )}
      {columns.map((_col, index) => (
        <td key={index} onClick={() => onClickColumn(_col)} className={'rc-Table-td'}>
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
