import { useEffect } from "react";
import {
  TableCell as ShadTableCell,
  TableRow as ShadTableRow,
} from "@/components/ui/table";
import { BudgetType } from "@/types/budget";
import { BUDGET_TOTAL_TABLE_HEADERS } from "@/utilities/fields";
import { DisplayTable } from "./Tables/";

type TotalsTableProps = {
  budget: BudgetType;
  onChange: (update: Partial<BudgetType>) => void;
};

export default function TotalsTable({ budget, onChange }: TotalsTableProps) {
  const getLeftToBudgetTotals = () => {
    onChange({
      budgetTotals: {
        ...budget.budgetTotals,
        leftToBudget: {
          biWeekly:
            budget.incomeTable.totals.biWeekly -
            budget.budgetTotals.totalExpenses.biWeekly,
          monthly:
            budget.incomeTable.totals.monthly -
            budget.budgetTotals.totalExpenses.monthly,
          yearly:
            budget.incomeTable.totals.yearly -
            budget.budgetTotals.totalExpenses.yearly,
        },
      },
    });
  };

  useEffect(() => {
    getLeftToBudgetTotals();
  }, [budget.incomeTable, budget.budgetTotals.totalExpenses]);

  return (
    <>
      <DisplayTable headers={BUDGET_TOTAL_TABLE_HEADERS}>
        <ShadTableRow>
          <ShadTableCell colSpan={2} className="text-center">
            Expense Totals
          </ShadTableCell>
          <ShadTableCell className="font-bold">
            {budget.budgetTotals["totalExpenses"].biWeekly}
          </ShadTableCell>
          <ShadTableCell className="font-bold">
            {budget.budgetTotals["totalExpenses"].monthly}
          </ShadTableCell>
          <ShadTableCell className="font-bold">
            {budget.budgetTotals["totalExpenses"].yearly}
          </ShadTableCell>
        </ShadTableRow>
        <ShadTableRow>
          <ShadTableCell colSpan={2} className="text-center">
            Left To Budget
          </ShadTableCell>
          <ShadTableCell
            className={`${
              budget.budgetTotals["leftToBudget"].biWeekly < 0
                ? "text-red-800"
                : budget.budgetTotals["leftToBudget"].biWeekly === 0
                ? "text-slate-700"
                : "text-green-600"
            } font-bold`}
          >
            {budget.budgetTotals["leftToBudget"].biWeekly}
          </ShadTableCell>
          <ShadTableCell
            className={`${
              budget.budgetTotals["leftToBudget"].monthly < 0
                ? "text-red-800"
                : budget.budgetTotals["leftToBudget"].monthly === 0
                ? "text-slate-700"
                : "text-green-600"
            } font-bold`}
          >
            {budget.budgetTotals["leftToBudget"].monthly}
          </ShadTableCell>
          <ShadTableCell
            className={`${
              budget.budgetTotals["leftToBudget"].yearly < 0
                ? "text-red-800"
                : budget.budgetTotals["leftToBudget"].yearly === 0
                ? "text-slate-700"
                : "text-green-600"
            } font-bold`}
          >
            {budget.budgetTotals["leftToBudget"].yearly}
          </ShadTableCell>
        </ShadTableRow>
      </DisplayTable>
    </>
  );
}
