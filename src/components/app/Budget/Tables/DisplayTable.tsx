import { ReactNode } from "react";
import { BasicTable } from "./";
import { TableType } from "@/types/budget";

import {
  TableCell as ShadTableCell,
  TableRow as ShadTableRow,
} from "@/components/ui/table";

type DisplayTableProps = {
  headers: string[];
  children?: ReactNode;
  table?: TableType;
};

export default function DisplayTable({
  table,
  headers,
  children,
}: DisplayTableProps) {
  return (
    <BasicTable headers={headers} title={table?.name}>
      {children
        ? children
        : table
        ? table.rows.map((tableRow) => {
            return (
              <ShadTableRow key={tableRow.id}>
                {tableRow.rowItems.map((rowItem) => {
                  return (
                    <ShadTableCell className="p-3">
                      {rowItem.value}
                    </ShadTableCell>
                  );
                })}
              </ShadTableRow>
            );
          })
        : null}
    </BasicTable>
  );
}
