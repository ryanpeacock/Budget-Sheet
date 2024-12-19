import {
  TableCell as ShadTableCell,
  TableRow as ShadTableRow,
} from "@/components/ui/table";
import TableCell from "./TableCell";
import { TableRowInputItemType, TableRowType } from "@/types/budget";
import { Trash2 } from "lucide-react";

type TableRowProps = {
  tableRow: TableRowType;
  onChange: (row: TableRowType) => void;
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
  const onChangeRowItem = (updatedRowItem: TableRowInputItemType): void => {
    let newTableRow = {
      ...tableRow,
      rowItems: tableRow.rowItems.map((item) => {
        if (updatedRowItem.id === item.id) return { ...updatedRowItem };
        return { ...item };
      }),
    };
    onChange({ ...newTableRow });
  };

  const setRowLockType = (setType: "biWeekly" | "monthly" | "yearly"): void => {
    let newTableRow: TableRowType = {
      ...tableRow,
      setType: tableRow.setType === setType ? "none" : setType,
    };
    onChange({ ...newTableRow });
  };
  return (
    <ShadTableRow key={tableRow.id} className="even:bg-[#F9F9F9] ">
      {tableRow.rowItems.map((rowItem) => {
        return (
          <TableCell
            key={rowItem.id}
            rowItem={rowItem}
            onChangeRow={onChange}
            onChange={onChangeRowItem}
            setLockType={setRowLockType}
            tableRow={tableRow}
          />
        );
      })}
      <ShadTableCell>
        <Trash2 className="cursor-pointer" size={17} onClick={handleOnDelete} />
      </ShadTableCell>
    </ShadTableRow>
  );
}
