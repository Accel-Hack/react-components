import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { IColumn, IRow, ITableOptions } from './Interface'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

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
          <td className={'rc-Table-td_option'}>
            <svg
              aria-hidden='true'
              focusable='false'
              data-prefix='fas'
              data-icon='bars'
              className='svg-inline--fa fa-bars '
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 448 512'
            >
              <path
                fill='currentColor'
                d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z'
              ></path>
            </svg>
            {/*<input*/}
            {/*  type='checkbox'*/}
            {/*  ref={refCheckBox}*/}
            {/*  onClick={(_event) => _event.stopPropagation()}*/}
            {/*  onChange={onChangeCheckbox}*/}
            {/*  style={{ display: 'flex' }}*/}
            {/*/>*/}
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
