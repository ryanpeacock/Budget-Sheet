import { TableRowItemType } from "../../types/budget";
import { CheckIcon } from "lucide-react";
import { TableCell as ShadTableCell } from "@/components/ui/table";
import { Input } from "../ui/input";

type TableDateItemProps = {
  item: TableRowItemType;
  align?: string;
  onChange: (rowItem: TableRowItemType) => void;
  isTypeLocked: boolean;
  rowSetType: "none" | "biWeekly" | "monthly" | "yearly";
  onSetType: (setType: "biWeekly" | "monthly" | "yearly") => void;
};

export default function TableDataItem({
  item,
  align = "left",
  onChange,
  isTypeLocked,
  rowSetType,
  onSetType,
}: TableDateItemProps) {
  const { name, value, inputType } = item;
  const showLockCircle = name !== "name" && name !== "date";
  const disabledInput =
    rowSetType !== "none" &&
    !isTypeLocked &&
    name !== "name" &&
    name !== "date";
  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    let newRowItem = { ...item, value };
    onChange({ ...newRowItem });
  };

  const handleOnSetType = (): void => {
    if (name === "biWeekly" || name === "monthly" || name === "yearly") {
      onSetType(name);
      return;
    }
  };
  return (
    <ShadTableCell className="p-3">
      <div className="relative">
        {showLockCircle ? (
          <div
            className={`absolute -top-2 -right-2 cursor-pointer text-center w-5 h-5 flex justify-center items-center text-white rounded-full z-40 transition-all ${
              isTypeLocked ? "bg-green-500" : "bg-slate-500"
            }`}
            onClick={handleOnSetType}
          >
            <CheckIcon className="m-0" size={16} />
          </div>
        ) : null}
        <Input
          className={`text-${align}`}
          name={name}
          type={inputType}
          value={value}
          disabled={disabledInput}
          onChange={handleOnChange}
        />
      </div>
    </ShadTableCell>
  );
}
