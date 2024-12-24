import { TableCell as ShadTableCell } from "@/components/ui/table";
import { TableRowInputItemType, TableRowType } from "@/types/budget";
import { Input } from "@/components/ui/input";
import { CheckIcon } from "lucide-react";

type TableCellProps = {
  rowItem: TableRowInputItemType;
  onChange: (rowItem: TableRowInputItemType) => void;
  onChangeRow: (tableRow: TableRowType) => void;
  setLockType: (setType: "biWeekly" | "monthly" | "yearly") => void;
  tableRow: TableRowType;
};

export default function TableCell({
  rowItem,
  onChange,
  setLockType,
  tableRow,
}: TableCellProps) {
  const { name, inputType, value } = rowItem;
  const isTypeLockSet = tableRow.setType !== "none";
  const isSetTypeLocked = tableRow.setType === name;
  const disabled =
    isTypeLockSet && !isSetTypeLocked && name !== "name" && name !== "date";
  const onChangeRowItemValue = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue: number | string = value;
    if (value === "") inputValue = 0;
    const newTableRowItem = { ...rowItem, value: inputValue };
    onChange({ ...newTableRowItem });
  };
  const showLockCircle = name !== "name" && name !== "date";

  const handleOnSetType = () => {
    if (name === "biWeekly" || name === "monthly" || name === "yearly") {
      setLockType(name);
    }
  };

  return (
    <ShadTableCell className="p-3">
      <div className="relative">
        {showLockCircle ? (
          <div
            className={`absolute -top-2 -right-2 cursor-pointer text-center w-5 h-5 flex justify-center items-center text-white rounded-full z-40 transition-all ${
              isSetTypeLocked ? "bg-cyan-600" : "bg-slate-500"
            }`}
            onClick={handleOnSetType}
          >
            <CheckIcon className="m-0" size={16} />
          </div>
        ) : null}
        <Input
          className={`text-left`}
          name={name}
          type={inputType}
          value={value}
          disabled={disabled}
          onChange={onChangeRowItemValue}
        />
      </div>
    </ShadTableCell>
  );
}
