import { useState } from "react";
import { BudgetType } from "@/types/budget";
import { generateNewBudget, generateNewTable } from "@/utilities/tools";
import { ExpenseSheet, IncomeSection, TotalsTable } from "./";
import { PlusCircle } from "lucide-react";

export default function BudgetSheet() {
  const [sheetView, setSheetView] = useState("expense");
  const [budget, setBudget] = useState<BudgetType>(generateNewBudget());

  const onChangeBudget = (update: Partial<BudgetType>): void => {
    setBudget((prevBudget) => ({
      ...prevBudget,
      ...update,
    }));
  };

  const addNewExpenseTable = (): void => {
    if (sheetView === "income") {
      return;
    }
    onChangeBudget({
      expenseTables: [...budget.expenseTables, generateNewTable(budget.id)],
    });
  };

  const toggleSheetView = (type: string): void => {
    setSheetView(type);
  };

  return (
    <div className="h-full bg-slate-100">
      <div className="sticky bg-white z-50 top-0 left-0 w-full py-4">
        <div className="w-full md:w-10/12 mx-auto">
          <TotalsTable budget={budget} onChange={onChangeBudget} />
        </div>
        <div className="flex justify-around items-center mt-4">
          <div className="view-options inline-flex bg-gray-200 px-1 py-1.5 rounded-lg">
            <span
              className={`${
                sheetView === "expense" ? "bg-white shadow-sm" : ""
              } px-3 mx-1 py-0.5 rounded-md cursor-pointer transition-colors`}
              onClick={() => toggleSheetView("expense")}
            >
              Expenses
            </span>
            <span
              className={`${
                sheetView === "income" ? "bg-white" : ""
              } px-3 mx-1 py-0.5 rounded-md cursor-pointer transition-colors`}
              onClick={() => toggleSheetView("income")}
            >
              Income
            </span>
          </div>
          <div
            onClick={addNewExpenseTable}
            className={`flex items-center italic cursor-pointer ${
              sheetView === "expense" ? "text-slate-600" : "text-slate-400"
            }`}
          >
            <PlusCircle /> <span className="ml-1">Add New Table</span>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-11/12 mx-auto mt-4">
        {sheetView === "expense" ? (
          <ExpenseSheet budget={budget} onChange={onChangeBudget} />
        ) : (
          <IncomeSection budget={budget} onChange={onChangeBudget} />
        )}
      </div>
    </div>
  );
}
