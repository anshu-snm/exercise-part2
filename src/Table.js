import React, { useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";

function Table({ final_data }) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => final_data, []);
  const tableInstance = useTable({
    columns: COLUMNS,
    data: final_data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups?.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroups?.headers?.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row?.cells?.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
