import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckSquare, PencilIcon, PlusCircle, Trash2 } from "lucide-react";
import { TableType } from "@/types/budget";
import { generateNewRow } from "@/utilities/tools";

type InputTableHeaderBtns = {
  table: TableType;
  onChange: (update: TableType) => void;
  removeTable?: ((id: string) => void) | null;
  isIncomeTable?: boolean;
};

export default function InputTableHeaderBtns({
  table,
  onChange,
  removeTable,
  isIncomeTable = false,
}: InputTableHeaderBtns) {
  const [openEditName, setOpenEditName] = useState(false);
  const [tableName, setTableName] = useState(table.name);

  const onUpdateTableName = (): void => {
    setOpenEditName(false);
    const newTableData = { ...table, name: tableName };
    onChange({ ...newTableData });
  };

  const onChangeTableName = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setTableName(value);
  };

  const addRowToTable = (): void => {
    const newTableData = {
      ...table,
      rows: [...table.rows, generateNewRow(table.id)],
    };
    onChange({ ...newTableData });
  };

  const onRemoveTable = () => {
    if (removeTable) {
      removeTable(table.id);
    }
  };

  return (
    <div className="btns flex gap-2">
      {isIncomeTable ? null : (
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
      )}
      <PlusCircle
        className="cursor-pointer m-0"
        size={17}
        onClick={addRowToTable}
      />
      {isIncomeTable ? null : (
        <Trash2
          className="cursor-pointer text-red-300"
          size={17}
          onClick={onRemoveTable}
        />
      )}
    </div>
  );
}
