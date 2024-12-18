import { BudgetType, TableType } from "@/types/budget";
import { generateNewTable } from "@/utilities/tools";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Table from "./Table";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import TotalsTable from "./TotalsTable";

export default function BudgetSheet() {
  const { toast } = useToast();
  const [budget, setBudget] = useState<BudgetType>({
    id: uuidv4(),
    name: "",
    tables: [generateNewTable()],
  });

  const addNewTable = (): void => {
    setBudget({ ...budget, tables: [...budget.tables, generateNewTable()] });
  };

  const onChangeBudget = (table: TableType): void => {
    let newBudget: BudgetType = {
      ...budget,
      tables: budget.tables.map((item) => {
        if (table.id === item.id) {
          return { ...table };
        }
        return { ...item };
      }),
    };
    setBudget(newBudget);
  };

  const onRemoveTable = (id: string): void => {
    if (budget.tables.length === 1) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You cannot delete the only table in a budget.",
      });
      return;
    }
    let newBudget: BudgetType = {
      ...budget,
      tables: budget.tables.filter((item) => item.id !== id),
    };
    setBudget(newBudget);
  };

  return (
    <div className="flex flex-col">
      <div className="budget-totals sticky top-0 left-0 bg-white opacity-100 p-5 z-50 border-2 border-slate-700">
        <TotalsTable />
      </div>
      <div className="budget-body overflow-y-scroll bg-yellow-400">
        <div className="flex justify-center my-3">
          <span
            onClick={addNewTable}
            className="cursor-pointer italic text-xl text-slate-700 font-extralight flex bg-white  py-2 px-3 rounded-lg"
          >
            <Plus className="mr-1" />
            Add New Table
          </span>
        </div>
        {budget.tables.map((item: TableType) => {
          return (
            <Table
              key={item.id}
              table={item}
              onChange={onChangeBudget}
              removeTable={onRemoveTable}
            />
          );
        })}
      </div>
      <div className="budget-income sticky bottom-0 left-0 bg-white opacity-100 p-5 z-50 mt-auto border-2 border-slate-700">
        <TotalsTable />
      </div>
    </div>
  );
}
