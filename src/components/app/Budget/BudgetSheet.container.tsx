import { BudgetType } from "@/types/budget";
import { generateNewBudget } from "@/utilities/tools";
import { useState } from "react";
import { ExpenseSheet, IncomeSection, TotalsTable } from "./";

export default function BudgetSheet() {
  const [budget, setBudget] = useState<BudgetType>(generateNewBudget());

  const onChangeBudget = (update: Partial<BudgetType>): void => {
    setBudget((prevBudget) => ({
      ...prevBudget,
      ...update,
    }));
  };

  return (
    <div className="flex flex-col">
      <div className="div sticky bg-white z-50 top-0 left-0 w-full">
        <TotalsTable budget={budget} onChange={onChangeBudget} />
      </div>
      <ExpenseSheet budget={budget} onChange={onChangeBudget} />
      <IncomeSection budget={budget} onChange={onChangeBudget} />
    </div>
  );
}
