// import React from "react"
//
// const TableCell: React.FC = () => {
//   return (<td></td>)
// }
//
// const TableHeaderRow: React.FC = () => {
//   return (
//     <tr>
//       <TableCell/>
//       <TableCell/>
//     </tr>
//   )
// }
//
// const TableDataRow = () => {
//   return (
//     <tr>
//       <TableHeaderRow/>
//       <TableHeaderRow/>
//     </tr>
//   )
// }
//
// interface ITable<RowEntity> {
//   onRowClick?: (row: RowEntity) => void
//   onDataLoaded?: () => void
// }
//
// const Table: React.FC<{ table: ITable<number> }> = ({table}) => {
//
//   const rows = [1, 2, 3]
//
//   return (
//     <div>
//       <table>
//         <thead>
//         <TableHeaderRow/>
//         </thead>
//         <tbody>
//         {rows.map((i) =>
//           <tr key={i} onClick={() => table.onRowClick?.(i)}>
//             <TableDataRow/>
//           </tr>
//         )}
//         </tbody>
//       </table>
//       <button>&lt;</button>
//       <button>&gt;</button>
//     </div>
//   )
// }
//
// export default Table
