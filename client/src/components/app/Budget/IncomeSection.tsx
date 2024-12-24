import { BudgetType, TableType } from "@/types/budget";
import { EXPENSE_TABLE_HEADERS } from "@/utilities/fields";
import { InputTable } from "./Tables/";

type IncomeSectionProps = {
  budget: BudgetType;
  onChange: (update: Partial<BudgetType>) => void;
};

export default function IncomeSection({
  budget,
  onChange,
}: IncomeSectionProps) {
  const onChangeIncomeTable = (update: TableType): void => {
    onChange({ incomeTable: update });
  };
  return (
    <div className="income-table">
      <InputTable
        table={budget.incomeTable}
        headers={EXPENSE_TABLE_HEADERS}
        onChange={onChangeIncomeTable}
        isIncomeTable
      />
    </div>
  );
}
