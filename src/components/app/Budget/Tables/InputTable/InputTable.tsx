import { useEffect } from "react";
import { BasicTable } from "../";
import { RowType, TableType } from "@/types/budget";
import { TableRow, InputTableHeaderBtns } from "./";
import { useToast } from "@/hooks/use-toast";

import {
  TableCell as ShadTableCell,
  TableRow as ShadTableRow,
} from "@/components/ui/table";

type InputTableProps = {
  headers: string[];
  table: TableType;
  onChange: (update: TableType) => void;
  onRemove?: ((id: string) => void) | null;
  isIncomeTable?: boolean;
};

export default function InputTable({
  headers,
  table,
  onChange,
  onRemove = null,
  isIncomeTable = false,
}: InputTableProps) {
  const { toast } = useToast();

  const getTableTotals = () => {
    let biWeeklyTotals: number = 0;
    let monthlyTotals: number = 0;
    let yearlyTotals: number = 0;

    table.rows.map((tableRow) => {
      biWeeklyTotals += parseFloat(`${tableRow.rowItems["biWeekly"].value}`);
      monthlyTotals += parseFloat(`${tableRow.rowItems["monthly"].value}`);
      yearlyTotals += parseFloat(`${tableRow.rowItems["yearly"].value}`);
    });
    const newTableData = {
      ...table,
      totals: {
        biWeekly: biWeeklyTotals,
        monthly: monthlyTotals,
        yearly: yearlyTotals,
      },
    };
    onChange({ ...newTableData });
  };

  useEffect(() => {
    getTableTotals();
  }, [table.rows]);

  const onDeleteTableRow = (id: string) => {
    if (table.rows.length === 1) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You cannot delete the only row in a table",
      });
      return;
    }
    const newTableData: TableType = {
      ...table,
      rows: table.rows.filter((tableRow) => tableRow.id !== id),
    };
    onChange(newTableData);
  };

  const onChangeTableRow = (updatedTableRow: RowType) => {
    const newTableData: TableType = {
      ...table,
      rows: table.rows.map((row) => {
        if (row.id === updatedTableRow.id) return { ...updatedTableRow };
        return { ...row };
      }),
    };
    onChange({ ...newTableData });
  };

  return (
    <BasicTable
      headers={headers}
      title={table.name}
      titleBtns={
        <InputTableHeaderBtns
          table={table}
          onChange={onChange}
          removeTable={onRemove}
          isIncomeTable={isIncomeTable}
        />
      }
    >
      <>
        {table.rows.map((tableRow) => {
          return (
            <TableRow
              key={tableRow.id}
              tableRow={tableRow}
              onChange={onChangeTableRow}
              onDelete={onDeleteTableRow}
            />
          );
        })}
        <ShadTableRow className="">
          <ShadTableCell className="text-center" colSpan={2}>
            Table Totals:
          </ShadTableCell>
          <ShadTableCell>{table.totals.biWeekly}</ShadTableCell>
          <ShadTableCell>{table.totals.monthly}</ShadTableCell>
          <ShadTableCell>{table.totals.yearly}</ShadTableCell>
        </ShadTableRow>
      </>
    </BasicTable>
  );
}
