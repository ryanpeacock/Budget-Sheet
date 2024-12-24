import {
  TableCell as ShadTableCell,
  TableRow as ShadTableRow,
} from "@/components/ui/table";
import TableCell from "./TableCell";

import { Trash2 } from "lucide-react";
import { RowItemType, RowType } from "@/types/budget";
import { getLockMultipledRowItems } from "@/utilities/tools";

type TableRowProps = {
  tableRow: RowType;
  onChange: (row: RowType) => void;
  onDelete: (id: string) => void;
};

export default function TableRow({
  tableRow,
  onChange,
  onDelete,
}: TableRowProps) {
  const handleOnDelete = () => {
    onDelete(tableRow.id);
  };

  const onChangeRowItem = (updatedRowItem: RowItemType): void => {
    let newRowItems = {
      ...tableRow.rowItems,
      [updatedRowItem.name]: updatedRowItem,
    };

    if (
      tableRow.setType === updatedRowItem.name &&
      tableRow.setType !== "none"
    ) {
      newRowItems = getLockMultipledRowItems(tableRow.setType, newRowItems);
    }
    const newTableRow: RowType = {
      ...tableRow,
      rowItems: {
        ...newRowItems,
      },
    };
    onChange(newTableRow);
  };

  const setRowLockType = (setType: "biWeekly" | "monthly" | "yearly"): void => {
    const isDeselecting: boolean = tableRow.setType === setType;
    const newTableRow: RowType = {
      ...tableRow,
      setType: isDeselecting ? "none" : setType,
    };
    if (!isDeselecting)
      newTableRow.rowItems = getLockMultipledRowItems(
        setType,
        newTableRow.rowItems
      );
    onChange(newTableRow);
  };

  return (
    <ShadTableRow key={tableRow.id} className="even:bg-zinc-50">
      {Object.keys(tableRow.rowItems).map((key) => {
        const rowItem = tableRow.rowItems[key];
        return (
          <TableCell
            key={rowItem.id}
            rowItem={rowItem}
            onChangeRow={onChangeRowItem}
            onChange={onChangeRowItem}
            setLockType={setRowLockType}
            tableRow={tableRow}
          />
        );
      })}
      <ShadTableCell className="text-center pr-4">
        <Trash2
          className="cursor-pointer text-red-300"
          size={17}
          onClick={handleOnDelete}
        />
      </ShadTableCell>
    </ShadTableRow>
  );
}
