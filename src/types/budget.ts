export type RowItemType = {
  readonly id: string;
  rowId: string;
  name: string;
  value: string | number;
  isInput: boolean;
  inputType?: string;
};

export type RowItemsType = {
  [key: string]: RowItemType; // Keys for direct access
};

export type RowType = {
  readonly id: string;
  tableId: string;
  setType: "none" | "biWeekly" | "monthly" | "yearly";
  rowItems: RowItemsType;
};

export type TableType = {
  readonly id: string;
  budgetId: string;
  name: string;
  totals: {
    biWeekly: number;
    monthly: number;
    yearly: number;
  };
  rows: RowType[];
};

export type BudgetType = {
  readonly id: string;
  name: string;
  incomeTable: TableType;
  expenseTables: TableType[];
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
