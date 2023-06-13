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

  const onChangeCheckbox = (_event: ChangeEvent<HTMLInputElement>) => {
    const identifier = options?.selectable?.identifier
    if (!identifier) return

    checked.set((_prev) => {
      const filteredIds = _prev.filter((_id) => _id != row[identifier])
      // @ts-ignore
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
          <td className={'rc-Table-td'}>
            <div className={'rc-Table-td_option'}>
              <input
                type='checkbox'
                ref={refCheckBox}
                onClick={(_event) => _event.stopPropagation()}
                onChange={onChangeCheckbox}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </td>
        )}
        {columns.map((_col, index) => {
          if (row[_col.field] == undefined) console.error('empty field')
          return (
            <td key={index} className={'rc-Table-td'}>
              {row[_col.field]}
            </td>
          )
        })}
      </>
    </>
  )
}

export { CTableRow }
