import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { IColumn, IRow, ITableOptions } from './Interface'

interface _CTableRowProps {
  readonly options?: ITableOptions
  readonly columns: IColumn[]
  readonly row: IRow
  readonly checked: {
    list: any[]
    set: Dispatch<SetStateAction<any[]>>
  }
}

const CTableRow: React.FC<_CTableRowProps> = ({ columns, row, options, checked }) => {
  const refCheckBox = useRef<HTMLInputElement>(null)

  const onChangeCheck = (_event: ChangeEvent<HTMLInputElement>) => {
    const identifier = options?.selectable?.identifier
    if (!identifier) return

    checked.set((_prev) => {
      const filteredIds = _prev.filter((_id) => _id != row[identifier])
      if (!_event.target.checked) {
        return filteredIds
      }
      return [...filteredIds, row[identifier]]
    })
  }

  useEffect(() => {
    const identifier = options?.selectable?.identifier
    if (!identifier || !refCheckBox.current) return

    refCheckBox.current.checked = checked.list.includes(row[identifier])
  }, [checked.list])

  return (
    <>
      <>
        {options?.selectable?.enabled && (
          <td>
            <input type='checkbox' ref={refCheckBox} onChange={onChangeCheck} />
          </td>
        )}
        {columns.map((_col, index) => {
          if (row[_col.field] == undefined) console.error('empty field')
          return <td key={index}>{row[_col.field]}</td>
        })}
      </>
    </>
  )
}

export { CTableRow }
