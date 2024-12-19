import {} from "react";

import { TableCell as ShadTableCell } from "@/components/ui/table";
import { TableRowInputItemType } from "@/types/budget";
import { Input } from "@/components/ui/input";
import { CheckIcon } from "lucide-react";

type TableCellProps = {
  rowItem: TableRowInputItemType;
  onChange: (rowItem: TableRowInputItemType) => void;
};

export default function TableCell({ rowItem, onChange }: TableCellProps) {
  const { name, inputType, value, isInput } = rowItem;
  const onChangeRowItemValue = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    let newTableRowItem = { ...rowItem, value };
    onChange({ ...newTableRowItem });
  };
  const showLockCircle = name !== "name" && name !== "date";
  return (
    <ShadTableCell className="p-3">
      <div className="relative">
        {showLockCircle ? (
          <div
            className={`absolute -top-2 -right-2 cursor-pointer text-center w-5 h-5 flex justify-center items-center text-white rounded-full z-40 transition-all ${
              true ? "bg-green-500" : "bg-slate-500"
              //   isTypeLocked ? "bg-green-500" : "bg-slate-500"
            }`}
            onClick={() => {}}
            // onClick={handleOnSetType}
          >
            <CheckIcon className="m-0" size={16} />
          </div>
        ) : null}
        <Input
          className={`text-left`}
          name={name}
          type={inputType}
          value={value}
          //   disabled={disabledInput}
          onChange={onChangeRowItemValue}
        />
      </div>
    </ShadTableCell>
  );
}
