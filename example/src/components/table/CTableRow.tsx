import React from "react";
import {IColumn, IRow} from "./Interface";

interface _CTableRowProps {
  readonly columns: IColumn[]
  readonly row: IRow
}

const CTableRow: React.FC<_CTableRowProps> = ({columns, row}) => {
  return (
    <>
      <>
        {columns.map((_col, index) => {
          if (row[_col.field] == undefined)
            console.error("empty field")
          return <td key={index}>{row[_col.field]}</td>
        })}
      </>
    </>
  )
}

export {CTableRow}