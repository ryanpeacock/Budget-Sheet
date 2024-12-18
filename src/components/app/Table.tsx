import { TableRowType, TableType } from "../../types/budget";
import { generateNewRow } from "../../utilities/tools";
import { CheckSquare, PencilIcon, Plus, PlusIcon, Trash2 } from "lucide-react";
import TableRow from "./TableRow";
import { useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Table as ShadTable,
  TableBody as ShadTableBody,
  TableCell as ShadTableCell,
  TableHead as ShadTableHead,
  TableHeader as ShadTableHeader,
  TableRow as ShadTableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";

const tableHeaders: Array<string> = [
  "Expense Name",
  "Due Date",
  "BiWeekly",
  "Monthly",
  "Yearly",
];

type TableProps = {
  table: TableType;
  onChange: (table: TableType) => void;
  removeTable: (id: string) => void;
};

type tableTotalsType = {
  biWeeklyTotals: number;
  monthlyTotals: number;
  yearlyTotals: number;
};

export default function Table({ table, onChange, removeTable }: TableProps) {
  const [openEditName, setOpenEditName] = useState(false);
  const [tableName, setTableName] = useState(table.name);
  const { toast } = useToast();
  const { biWeeklyTotals, monthlyTotals, yearlyTotals } =
    useMemo((): tableTotalsType => {
      let biWeeklyTotals: number = 0;
      let monthlyTotals: number = 0;
      let yearlyTotals: number = 0;

      table.rows.map((row) => {
        row.rowItems.map((item) => {
          if (item.name === "biWeekly") {
            biWeeklyTotals = biWeeklyTotals + parseInt(`${item.value}`);
          }
          if (item.name === "monthly") {
            monthlyTotals = monthlyTotals + parseInt(`${item.value}`);
          }
          if (item.name === "yearly") {
            yearlyTotals = yearlyTotals + parseInt(`${item.value}`);
          }
        });
      });
      return { biWeeklyTotals, monthlyTotals, yearlyTotals };
    }, [table]);

  const addRowToTable = (): void => {
    onChange({ ...table, rows: [...table.rows, generateNewRow()] });
  };

  const onChangeTable = (row: TableRowType): void => {
    let newTable = {
      ...table,
      rows: table.rows.map((item) => {
        if (row.id === item.id) return { ...row };
        return { ...item };
      }),
    };
    onChange({ ...newTable });
  };

  const onChangeTableName = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setTableName(value);
  };

  const onUpdateTableName = () => {
    if (tableName === "") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You cannot submit an empty table name.",
      });
      return;
    }
    setOpenEditName(false);
    onChange({ ...table, name: tableName });
  };

  const onRemoveTable = (): void => {
    removeTable(table.id);
  };

  const onRemoveRow = (id: string): void => {
    if (table.rows.length === 1) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You cannot delete the only row in a table",
      });
      return;
    }
    let newTable = {
      ...table,
      rows: table.rows.filter((row) => row.id !== id),
    };
    onChange({ ...newTable });
  };

  return (
    <div className="my-8 bg-white border-2 border-slate-700 p-4">
      <div className="w-full py-2">
        <div className="flex items-center">
          <span className="block text-xl font-semibold mr-2">{table.name}</span>
          <div className="btns flex gap-2">
            <Popover
              open={openEditName}
              onOpenChange={() => {
                setTableName(table.name);
                setOpenEditName(!openEditName);
              }}
            >
              <PopoverTrigger>
                <PencilIcon
                  className="cursor-pointer"
                  size={17}
                  onClick={() => setOpenEditName(true)}
                />
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex items-center">
                  <Input
                    value={tableName}
                    onChange={onChangeTableName}
                    className="mr-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateTableName();
                      }
                    }}
                  />
                  <CheckSquare
                    className="cursor-pointer"
                    size={25}
                    onClick={onUpdateTableName}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <PlusIcon
              className="cursor-pointer m-0"
              size={17}
              onClick={addRowToTable}
            />
            <Trash2
              className="cursor-pointer"
              size={17}
              onClick={onRemoveTable}
            />
          </div>
        </div>
      </div>
      <ShadTable>
        <ShadTableHeader>
          <ShadTableRow>
            {tableHeaders.map((header, index) => {
              return <ShadTableHead key={index}>{header}</ShadTableHead>;
            })}
            <ShadTableHead></ShadTableHead>
          </ShadTableRow>
        </ShadTableHeader>
        <ShadTableBody>
          {table.rows.map((tableRow) => {
            return (
              <TableRow
                key={tableRow.id}
                tableRow={tableRow}
                onChange={onChangeTable}
                removeRow={onRemoveRow}
              />
            );
          })}
          <ShadTableRow>
            <ShadTableCell className="text-center" colSpan={2}>
              Table Totals:
            </ShadTableCell>
            <ShadTableCell>{biWeeklyTotals}</ShadTableCell>
            <ShadTableCell>{monthlyTotals}</ShadTableCell>
            <ShadTableCell>{yearlyTotals}</ShadTableCell>
          </ShadTableRow>
        </ShadTableBody>
      </ShadTable>
    </div>
  );
}
