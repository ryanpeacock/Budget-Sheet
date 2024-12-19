export type TableRowInputItemType = {
  readonly id: string;
  name: string;
  value: string | number;
  isInput: boolean;
  inputType?: string;
};
export type TableRowDisplayItemType = {
  readonly id: string;
  name: string;
  value: string | number;
};

export type TableRowType = {
  readonly id: string;
  setType: "none" | "biWeekly" | "monthly" | "yearly";
  rowItems: TableRowInputItemType[];
};

export type TableType = {
  readonly id: string;
  name: string;
  totals: {
    biWeekly: number;
    monthly: number;
    yearly: number;
  };
  rows: Array<TableRowType>;
};

export type BudgetType = {
  readonly id: string;
  name: string;
  incomeTable: TableType;
  expenseTables: Array<TableType>;
  budgetTotals: {
    leftToBudget: {
      biWeekly: number;
      monthly: number;
      yearly: number;
    };
    totalExpenses: {
      biWeekly: number;
      monthly: number;
      yearly: number;
    };
  };
};
