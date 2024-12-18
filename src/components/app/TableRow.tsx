import { TableRowItemType, TableRowType } from "@/types/budget";
import TableDataItem from "./TableDataItem";

import {
  TableCell as ShadTableCell,
  TableRow as ShadTableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

type TableRowProps = {
  tableRow: TableRowType;
  onChange: (row: TableRowType) => void;
  removeRow: (id: string) => void;
};

export default function TableRow({
  tableRow,
  onChange,
  removeRow,
}: TableRowProps) {
  const onChangeRow = (rowItem: TableRowItemType): void => {
    let newRow = {
      ...tableRow,
      rowItems: tableRow.rowItems.map((item) => {
        if (item.id === rowItem.id) return { ...rowItem };
        return { ...item };
      }),
    };
    onChange({ ...newRow });
  };
  const onRemoveRow = (): void => {
    removeRow(tableRow.id);
  };

  const onChangeRowSetType = (
    setType: "biWeekly" | "monthly" | "yearly"
  ): void => {
    let newRow = { ...tableRow };
    newRow.setType = setType === tableRow.setType ? "none" : setType;
    onChange({ ...newRow });
  };

  return (
    <ShadTableRow key={tableRow.id}>
      {tableRow.rowItems.map((rowItem) => {
        return (
          <TableDataItem
            key={rowItem.id}
            item={rowItem}
            onChange={onChangeRow}
            isTypeLocked={tableRow?.setType === rowItem?.name}
            rowSetType={tableRow.setType}
            onSetType={onChangeRowSetType}
          />
        );
      })}
      <ShadTableCell>
        <Trash2 className="cursor-pointer" size={17} onClick={onRemoveRow} />
      </ShadTableCell>
    </ShadTableRow>
  );
}
