import { useEffect } from "react";
import { EXPENSE_TABLE_HEADERS } from "@/utilities/fields";
import { BudgetType, TableType } from "@/types/budget";
import { useToast } from "@/hooks/use-toast";
import { InputTable } from "./Tables/";

type ExpenseSheetProps = {
  budget: BudgetType;
  onChange: (update: Partial<BudgetType>) => void;
};

export default function ExpenseSheet({ budget, onChange }: ExpenseSheetProps) {
  const { toast } = useToast();

  const getTotalExpenses = () => {
    let biWeeklyTotal: number = 0;
    let monthlyTotal: number = 0;
    let yearlyTotal: number = 0;

    budget.expenseTables.map((table) => {
      const { totals } = table;
      biWeeklyTotal += totals["biWeekly"];
      monthlyTotal += totals["monthly"];
      yearlyTotal += totals["yearly"];
    });

    onChange({
      budgetTotals: {
        ...budget.budgetTotals,
        totalExpenses: {
          biWeekly: biWeeklyTotal,
          monthly: monthlyTotal,
          yearly: yearlyTotal,
        },
      },
    });
  };

  useEffect(() => {
    getTotalExpenses();
  }, [budget.expenseTables]);

  const onRemoveExpenseTable = (id: string): void => {
    if (budget.expenseTables.length === 1) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You cannot delete the only table in a budget.",
      });
      return;
    }
    onChange({
      expenseTables: budget.expenseTables.filter((item) => item.id !== id),
    });
  };

  const onChangeExpenseTables = (update: TableType): void => {
    let newExpenseTables = [
      ...budget.expenseTables.map((table) => {
        if (table.id === update.id) return { ...update };
        return { ...table };
      }),
    ];
    onChange({ expenseTables: newExpenseTables });
  };
  return (
    <div className="expense-tables">
      {budget.expenseTables.map((expenseTable) => {
        return (
          <div key={expenseTable.id} className="mb-8">
            <InputTable
              table={expenseTable}
              headers={EXPENSE_TABLE_HEADERS}
              onChange={onChangeExpenseTables}
              onRemove={onRemoveExpenseTable}
            />
          </div>
        );
      })}
    </div>
  );
}
