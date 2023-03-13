import React from 'react'
import { IColumn, IRow, ITableOptions } from './Interface'

interface _CTableRowProps {
  readonly options?: ITableOptions
  readonly columns: IColumn[]
  readonly row: IRow
}

const CTableRow: React.FC<_CTableRowProps> = ({ columns, row, options }) => {
  return (
    <>
      <>
        {options?.selectable && (
          <td>
            <input type='checkbox' />
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
